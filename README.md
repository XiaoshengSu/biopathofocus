# BioPathoFocus - 微生物基因组数据库展示系统

> 基于 Vue 3 + TypeScript + Vite 构建的微生物基因组数据库前端展示平台，面向科研用户提供菌株数据的可视化分析与浏览能力。

## 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | Vue 3 (Composition API + `<script setup>`) | ^3.5 |
| 语言 | TypeScript | ~6.0 |
| 构建 | Vite | ^8.0 |
| 样式 | Tailwind CSS 4.x（纯手写，无组件库） | ^4.2 |
| 状态管理 | Pinia | ^3.0 |
| 路由 | Vue Router | ^4.6 |
| HTTP | Axios | ^1.15 |
| 图表 | ECharts 6.x（按需导入） | ^6.0 |
| 数据可视化 | D3.js 7.x | ^7.9 |
| Mock | MSW (Mock Service Worker) | ^2.13 |

## 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9

### 安装与运行

```bash
# 克隆仓库
git clone https://github.com/XiaoshengSu/biopathofocus.git
cd biopathofocus

# 安装依赖
npm install

# 启动开发服务器（默认开启 Mock 模式）
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

开发服务器默认运行在 `http://localhost:3000`。

### 环境变量

| 文件 | 变量 | 说明 |
|------|------|------|
| `.env.development` | `VITE_MOCK=true` | 开发环境启用 MSW Mock |
| `.env.production` | `VITE_MOCK=false` | 生产环境禁用 Mock |
| - | `VITE_API_BASE_URL` | API 基础路径，默认 `/api` |

## 功能模块

| 模块 | 路径 | 说明 |
|------|------|------|
| 数据集概览 | `/dashboard` | KPI 统计卡片、地理分布散点图、时间线柱状图、国家/AMR/VF 饼图、属性统计 |
| 样本信息 | `/sample` | CSV 样本列表（多维筛选 + 分页）、MLST/cgMLST/血清分型 Tab 切换 |
| 分型信息 | `/typing` | MLST 分型（表格/饼图切换）、cgMLST 等位基因矩阵、血清抗原分型 |
| 耐药基因 | `/amr` | 基因-样本矩阵热力图、AMR 类别分布/Top 基因携带率统计图 |
| 毒力基因 | `/vf` | 基因-样本矩阵热力图、VF 类别分布/Top 基因覆盖率统计图 |
| Tree Heatmap | `/tree-heatmap` | MLST 最小生成树 + 基因分布热力图联合分析 |

## 项目结构

```
src/
├── api/            # API 请求封装（Axios + 泛型）
├── assets/         # 静态资源与全局样式
├── components/     # 公共组件
│   ├── chart/      # ECharts 图表组件
│   ├── common/     # 基础 UI 组件（Button/Card/Input/Select/Tabs 等）
│   ├── filter/     # 筛选栏组件
│   ├── layout/     # 布局组件（Header/Sidebar/Layout）
│   └── table/      # 表格组件（DataTable/GeneMatrix）
├── composables/    # 可复用逻辑（ECharts/分页/筛选/导出）
├── mocks/          # MSW Mock 数据与处理器
├── router/         # Vue Router 路由配置
├── stores/         # Pinia 状态管理
├── types/          # TypeScript 类型定义
├── utils/          # 工具函数（常量/格式化/颜色/下载）
└── views/          # 页面组件
```

详细目录说明请参阅 [docs/DIRECTORY.md](docs/DIRECTORY.md)。

## 文档

| 文档 | 说明 |
|------|------|
| [功能设计](docs/FEATURES.md) | 各模块功能详细设计与交互说明 |
| [架构设计](docs/ARCHITECTURE.md) | 技术架构、数据流、分层设计与设计模式 |
| [目录结构](docs/DIRECTORY.md) | 完整目录树与各文件职责说明 |

## 开发特性

- **纯 Tailwind CSS**：不依赖任何 UI 组件库，全部样式手写，保持极简科研风格
- **ECharts 按需导入**：通过 `echarts/core` tree-shaking，仅打包实际使用的图表类型
- **ResizeObserver 自适应**：图表容器使用 ResizeObserver 监听尺寸变化，自动重绘
- **MSW 浏览器级 Mock**：21 个 API handler 拦截请求，无需后端即可完整运行
- **TypeScript 全量类型**：API 响应、组件 Props、Store 状态均有完整类型定义
- **Composable 复用**：ECharts 初始化、表格分页、筛选器、数据导出等逻辑抽取为可复用 composable

## License

MIT
