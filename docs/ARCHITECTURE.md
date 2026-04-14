# 架构设计

## 一、技术架构总览

```
┌──────────────────────────────────────────────────────────────┐
│                        浏览器                                 │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                    Vue 3 Application                     │ │
│  │  ┌──────────┐  ┌──────────┐  ┌───────────────────────┐  │ │
│  │  │  Views    │  │Components│  │    Composables        │  │ │
│  │  │ (Pages)   │→ │ (UI/Chart│→ │ (useECharts/useTable/ │  │ │
│  │  │           │  │  /Table) │  │  useFilter/useExport) │  │ │
│  │  └────┬─────┘  └────┬─────┘  └───────────┬───────────┘  │ │
│  │       │              │                     │              │ │
│  │  ┌────┴──────────────┴─────────────────────┴───────────┐ │ │
│  │  │                  Pinia Stores                        │ │ │
│  │  │     (app / dataset / sample / typing / amr / vf)    │ │ │
│  │  └──────────────────────┬──────────────────────────────┘ │ │
│  │                         │                                │ │
│  │  ┌──────────────────────┴──────────────────────────────┐ │ │
│  │  │                  API Layer (Axios)                   │ │ │
│  │  │     dofetch<T> / dofetchPaginated<T>                 │ │ │
│  │  └──────────────────────┬──────────────────────────────┘ │ │
│  └─────────────────────────┼────────────────────────────────┘ │
│                            │                                  │
│              ┌─────────────┴─────────────┐                   │
│              │                           │                   │
│        ┌─────┴─────┐             ┌───────┴───────┐           │
│        │   MSW      │             │  Backend API  │           │
│        │ (Dev Mode) │             │ (Production)  │           │
│        └───────────┘             └───────────────┘           │
└──────────────────────────────────────────────────────────────┘
```

## 二、分层设计

### 2.1 视图层 (Views)

**职责**：页面级组件，组合业务逻辑与 UI 展示。

**设计原则**：
- 每个页面对应一个 `.vue` 文件，放在 `src/views/` 下按模块分子目录
- 容器页面（SamplePage、TypingPage）仅负责 Tab 切换和 `<router-view>` 嵌套
- 业务页面直接调用 API 层获取数据，通过 Composable 复用通用逻辑

**页面清单**：

```
views/
├── dashboard/DashboardPage.vue    # 概览仪表盘
├── sample/
│   ├── SamplePage.vue             # 样本容器（Tab 切换）
│   └── tabs/                      # 样本子 Tab
│       ├── SampleCsvTab.vue       # CSV 列表 + 筛选
│       ├── SampleMlstTab.vue      # MLST 表格
│       ├── SampleCgmlstTab.vue    # cgMLST 矩阵
│       └── SampleAntigenTab.vue   # 抗原表格
├── typing/
│   ├── TypingPage.vue             # 分型容器（Tab 切换）
│   ├── MlstView.vue               # MLST 表格/饼图
│   ├── CgmlstView.vue             # cgMLST 矩阵
│   └── AntigenView.vue            # 抗原表格 + 筛选
├── amr/AmrPage.vue                # 耐药基因
├── vf/VfPage.vue                  # 毒力基因
├── tree/TreeHeatmapPage.vue       # 树 + 热图
└── NotFoundPage.vue               # 404 页面
```

### 2.2 组件层 (Components)

**职责**：可复用的 UI 组件，与业务逻辑解耦。

**分类**：

| 目录 | 职责 | 组件数 |
|------|------|--------|
| `common/` | 基础 UI 原子组件 | 11 个 |
| `chart/` | ECharts 图表封装 | 4 个 |
| `table/` | 数据表格组件 | 2 个 |
| `filter/` | 筛选栏容器 | 1 个 |
| `layout/` | 全局布局组件 | 3 个 |

**组件通信模式**：
- **Props down**：父组件通过 props 传递数据和配置
- **Events up**：子组件通过 `defineEmits` 向父组件发送事件
- **Slots**：通过具名插槽实现内容分发（DataTable 单元格、FilterBar 控件、BaseCard header-extra）
- **Provide/Inject**：未使用（当前规模不需要）

### 2.3 Composable 层

**职责**：封装可复用的有状态逻辑，遵循 Vue 3 Composable 模式。

| Composable | 功能 | 核心返回值 |
|-----------|------|-----------|
| `useECharts` | ECharts 初始化/更新/销毁 | `init`, `setOption`, `getInstance` |
| `useTable` | 表格数据加载 + 分页 | `data`, `loading`, `pagination`, `loadData`, `changePage` |
| `useFilter` | 泛型筛选器管理 | `filter`, `isDirty`, `setField`, `reset`, `getParams` |
| `useExport` | 数据导出（SVG/PNG/CSV） | `exportSvg`, `exportPng`, `exportCsv` |
| `useResize` | ResizeObserver 封装 | （void，回调模式） |
| `useLinkedCharts` | 图表联动状态 | `linkedValue`, `setLinked`, `clearLinked` |

**useECharts 设计要点**：

```
useECharts(chartRef)
  ├── echarts/core 按需导入（tree-shaking）
  ├── shallowRef 存储 ECharts 实例（避免深层响应式）
  ├── ResizeObserver 监听容器尺寸变化
  ├── init(): 创建实例 + 设置 option + 挂载 observer
  ├── setOption(): notMerge=true 完全替换配置
  └── onUnmounted(): disconnect observer + dispose 实例
```

### 2.4 状态管理层 (Stores)

**职责**：全局共享状态管理，使用 Pinia Composition API 风格。

| Store | 状态 | 作用域 |
|-------|------|--------|
| `useAppStore` | `sidebarCollapsed`, `loading` | 全局 UI 状态 |
| `useDatasetStore` | `currentId`, `currentName` | 当前数据集选择 |
| `useSampleStore` | `filters`, `activeFilterTags` | 样本筛选条件 |
| `useTypingStore` | `mlstFilter`, `antigenFilter` | 分型筛选条件 |
| `useAmrStore` | `filter`, `pagination` | AMR 筛选与分页 |
| `useVfStore` | `filter`, `pagination` | VF 筛选与分页 |

**设计原则**：
- Store 仅存储**跨组件共享**的状态，页面内部状态用 `ref`/`reactive`
- 使用 Composition API 风格（`defineStore('name', () => {...})`）
- 筛选器 Store 提供 `reset` 方法一键清空

### 2.5 API 层

**职责**：封装 HTTP 请求，提供类型安全的 API 调用方法。

**架构**：

```
api/
├── dofetch.ts          # 泛型请求函数（底层）
├── endpoints.ts        # API 端点常量（20 个）
├── dashboard.ts        # Dashboard 模块 API
├── sample.ts           # Sample 模块 API
├── typing.ts           # Typing 模块 API
├── amr.ts              # AMR 模块 API
├── vf.ts               # VF 模块 API
└── tree.ts             # Tree 模块 API
```

**dofetch 核心设计**：

```typescript
// 泛型请求
async function dofetch<T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>>

// 分页请求
async function dofetchPaginated<T>(url: string, params?: PaginationParams & Record<string, any>): Promise<ApiResponse<PaginatedData<T>>>
```

- 基于 Axios 实例（`utils/request.ts`），baseURL = `VITE_API_BASE_URL || '/api'`
- 请求超时 30 秒
- 自动附加 Bearer Token（从 localStorage 读取）
- 响应拦截器提取 `response.data`

**端点常量**：所有 API 路径集中定义在 `endpoints.ts`，避免硬编码散落各处。

### 2.6 Mock 层 (MSW)

**职责**：开发环境拦截 API 请求，返回模拟数据，实现前后端独立开发。

**架构**：

```
mocks/
├── browser.ts          # MSW Worker 入口（注册 21 个 handler）
├── data/               # JSON 模拟数据（7 个文件）
│   ├── samples.json    # 30 条样本
│   ├── mlst.json       # 20 条 MLST
│   ├── cgmlst.json     # 15 条 cgMLST
│   ├── antigen.json    # 20 条血清分型
│   ├── amr.json        # 15 条耐药基因
│   ├── vf.json         # 10 条毒力基因
│   └── tree.json       # 10 节点 + 9 连线
└── handlers/           # 请求处理器（6 个模块，21 个 handler）
    ├── dashboard.ts    # 6 个 handler
    ├── sample.ts       # 2 个 handler
    ├── typing.ts       # 4 个 handler
    ├── amr.ts          # 3 个 handler
    ├── vf.ts           # 3 个 handler
    └── tree.ts         # 3 个 handler
```

**启用机制**：

```typescript
// main.ts
if (import.meta.env.VITE_MOCK === 'true') {
  const { worker } = await import('./mocks/browser')
  await worker.start({ onUnhandledRequest: 'bypass' })
}
```

**Handler 设计模式**：
- 静态数据：直接返回 JSON 文件内容
- 动态数据：在 handler 中根据请求参数（分页、筛选）动态生成
- 分页支持：`page` + `pageSize` 参数切片数组

## 三、路由设计

### 3.1 路由结构

采用嵌套路由，所有业务页面嵌套在 `AppLayout` 下：

```
/ (AppLayout)
├── /dashboard
├── /sample
│   ├── /sample/csv
│   ├── /sample/mlst
│   ├── /sample/cgmlst
│   └── /sample/antigen
├── /typing
│   ├── /typing/mlst
│   ├── /typing/cgmlst
│   └── /typing/antigen
├── /amr
├── /vf
├── /tree-heatmap
└── /:pathMatch(.*)* → NotFoundPage
```

### 3.2 路由元信息

每个路由配置 `meta.title`，用于：
- 面包屑导航自动生成
- 页面标题显示

### 3.3 懒加载

所有页面组件使用动态 `import()` 实现路由级代码分割：

```typescript
component: () => import('@/views/dashboard/DashboardPage.vue')
```

## 四、样式体系

### 4.1 Tailwind CSS 4.x 主题

使用 `@theme` 指令定义自定义设计令牌：

```css
@theme {
  /* 文字色系 */
  --color-ink: #1a1a2e;              /* 主文字 */
  --color-ink-secondary: #6b7280;     /* 次要文字 */
  --color-ink-disabled: #9ca3af;      /* 禁用文字 */

  /* 主色调 */
  --color-primary-500: #1890ff;       /* 主色 */
  --color-primary-600: #096dd9;       /* Hover */
  --color-primary-700: #0050b3;       /* Active */
  --color-primary-50: #e6f7ff;        /* 极浅背景 */
  --color-primary-100: #bae7ff;       /* 浅背景 */

  /* 表面色 */
  --color-surface-border: #e5e7eb;    /* 边框 */
  --color-surface-header: #f9fafb;    /* 表头 */
  --color-surface-hover: #f3f4f6;     /* 悬浮行 */
}
```

### 4.2 设计原则

- **纯 Tailwind**：不使用任何 UI 组件库，所有样式手写
- **语义化颜色**：`ink-*` 表示文字色，`primary-*` 表示品牌色，`surface-*` 表示背景/边框色
- **极简科研风格**：以蓝白灰为主色调，信息密度高，装饰性元素少
- **一致性**：所有组件遵循相同的间距（gap-2/4/5）、圆角（rounded-lg/md）、阴影（shadow-sm）规范

## 五、类型系统

### 5.1 类型文件

| 文件 | 核心类型 |
|------|---------|
| `api.ts` | `ApiResponse<T>`, `PaginatedData<T>`, `Column`, `SelectOption`, `PaginationParams` |
| `sample.ts` | `SampleFilter`, `SampleFilterKey` |
| `typing.ts` | `MlstRow`, `CgmlstRow`, `AntigenRow` |
| `amr.ts` | `AmrGeneRow`, `AmrStats` |
| `vf.ts` | `VfGeneRow`, `VfStats` |
| `dashboard.ts` | `GeoDistribution`, `TimelineData`, `PieDataItem`, `AttributeStats` |
| `tree.ts` | `TreeNode`, `TreeLink`, `TreeData`, `HeatmapCell` |

### 5.2 泛型约束

API 层和 Composable 层大量使用 TypeScript 泛型：

```typescript
// API 层
dofetch<GeoDistribution[]>(API.DASHBOARD_GEO)
dofetchPaginated<MlstRow>(API.TYPING_MLST, { page, pageSize })

// Composable 层
useTable<MlstRow, TypingParams>(fetchFn, defaultParams)
useFilter<SampleFilter>({ sampleType: '', host: '', ... })
```

## 六、构建与部署

### 6.1 Vite 配置

```typescript
{
  plugins: [vue(), tailwindcss()],
  resolve: { alias: { '@': './src' } },
  server: { port: 3000 }
}
```

### 6.2 构建产物

```bash
npm run build  # vue-tsc 类型检查 + vite build
```

产物输出到 `dist/`，可直接部署到任何静态文件服务器。

### 6.3 环境切换

| 环境 | VITE_MOCK | API 来源 |
|------|-----------|---------|
| 开发 | `true` | MSW 拦截，返回 Mock 数据 |
| 生产 | `false` | 真实后端 API（`VITE_API_BASE_URL`） |
