# 目录结构

```
biopathofocus/
├── .env.development              # 开发环境变量（VITE_MOCK=true）
├── .env.production               # 生产环境变量（VITE_MOCK=false）
├── .gitignore                    # Git 忽略规则
├── .vscode/
│   └── extensions.json           # VS Code 推荐扩展
├── index.html                    # HTML 入口
├── package.json                  # 项目依赖与脚本
├── package-lock.json             # 依赖锁定文件
├── tsconfig.json                 # TypeScript 总配置
├── tsconfig.app.json             # 应用代码 TS 配置
├── tsconfig.node.json            # Node 端 TS 配置（Vite）
├── vite.config.ts                # Vite 构建配置
├── public/
│   ├── favicon.svg               # 网站图标
│   ├── icons.svg                 # 图标资源
│   └── mockServiceWorker.js      # MSW Service Worker 文件
├── docs/
│   ├── FEATURES.md               # 功能设计文档
│   ├── ARCHITECTURE.md           # 架构设计文档
│   └── DIRECTORY.md              # 本文档
└── src/
    ├── App.vue                   # 根组件（仅 <router-view />）
    ├── main.ts                   # 应用入口（创建 App、注册插件、启动 MSW）
    ├── env.d.ts                  # 环境变量类型声明
    ├── style.css                 # 全局样式（备用）
    │
    ├── api/                      # API 请求层
    │   ├── dofetch.ts            #   泛型请求函数 dofetch<T> / dofetchPaginated<T>
    │   ├── endpoints.ts          #   API 端点常量（20 个端点）
    │   ├── dashboard.ts          #   Dashboard 模块 API（6 个方法）
    │   ├── sample.ts             #   Sample 模块 API（2 个方法）
    │   ├── typing.ts             #   Typing 模块 API（4 个方法）
    │   ├── amr.ts                #   AMR 模块 API（3 个方法）
    │   ├── vf.ts                 #   VF 模块 API（3 个方法）
    │   └── tree.ts               #   Tree 模块 API（3 个方法）
    │
    ├── assets/                   # 静态资源
    │   ├── styles/
    │   │   └── main.css          #   全局样式 + Tailwind @theme 主题色定义
    │   ├── hero.png              #   Hero 图片
    │   ├── vite.svg              #   Vite Logo
    │   └── vue.svg               #   Vue Logo
    │
    ├── components/               # 公共组件
    │   ├── layout/               #   布局组件
    │   │   ├── AppLayout.vue     #     全局布局（Header + Sidebar + Content）
    │   │   ├── TheHeader.vue     #     顶部导航栏（Logo + 导航 + 面包屑 + 用户）
    │   │   └── TheSidebar.vue    #     左侧边栏（功能导航 + 快捷操作 + 版本）
    │   │
    │   ├── chart/                #   ECharts 图表组件
    │   │   ├── ChartContainer.vue#     通用图表容器（接收任意 ECharts option）
    │   │   ├── BarChart.vue      #     柱状图（支持垂直/水平方向）
    │   │   ├── PieChart.vue      #     环形饼图（8 色调色板）
    │   │   └── HeatmapChart.vue  #     热力图（基因 x 样本矩阵）
    │   │
    │   ├── common/               #   基础 UI 组件
    │   │   ├── BaseButton.vue    #     按钮（primary/ghost, sm/md）
    │   │   ├── BaseCard.vue      #     卡片容器（标题 + header-extra 插槽）
    │   │   ├── BaseEmpty.vue     #     空状态提示
    │   │   ├── BaseInput.vue     #     文本输入框
    │   │   ├── BaseLoading.vue   #     加载状态（spinner + 文字）
    │   │   ├── BaseModal.vue     #     模态框（Teleport + 遮罩）
    │   │   ├── BasePagination.vue#     分页器（含省略号算法）
    │   │   ├── BaseSelect.vue    #     自定义下拉选择
    │   │   ├── BaseTabs.vue      #     Tab 切换（下划线式）
    │   │   ├── BaseTag.vue       #     标签（药丸样式，可选 closable）
    │   │   └── BaseTooltip.vue   #     文字提示（CSS-only hover）
    │   │
    │   ├── filter/
    │   │   └── FilterBar.vue     #   筛选栏容器（slot + 搜索/重置按钮）
    │   │
    │   ├── table/
    │   │   ├── DataTable.vue     #   通用数据表格（列定义/排序/固定表头/插槽）
    │   │   └── GeneMatrix.vue    #   基因矩阵表格（首列固定/蓝色高亮）
    │   │
    │   └── HelloWorld.vue        #   Vite 脚手架示例组件（可删除）
    │
    ├── composables/              # 可复用逻辑
    │   ├── useECharts.ts         #   ECharts 初始化/更新/销毁（ResizeObserver）
    │   ├── useTable.ts           #   表格数据加载 + 分页逻辑
    │   ├── useFilter.ts          #   泛型筛选器（isDirty 追踪 + getParams）
    │   ├── useExport.ts          #   数据导出（SVG/PNG/CSV）
    │   ├── useResize.ts          #   ResizeObserver 封装
    │   └── useLinkedCharts.ts    #   图表联动状态管理
    │
    ├── mocks/                    # MSW Mock 数据
    │   ├── browser.ts            #   MSW Worker 入口（注册 21 个 handler）
    │   ├── data/                 #   JSON 模拟数据
    │   │   ├── samples.json      #     30 条样本数据
    │   │   ├── mlst.json         #     20 条 MLST 分型数据
    │   │   ├── cgmlst.json       #     15 条 cgMLST 等位基因数据
    │   │   ├── antigen.json      #     20 条血清分型数据
    │   │   ├── amr.json          #     15 条耐药基因数据
    │   │   ├── vf.json           #     10 条毒力基因数据
    │   │   └── tree.json         #     10 节点 + 9 连线树数据
    │   └── handlers/             #   请求处理器
    │       ├── dashboard.ts      #     6 个 handler（geo/timeline/pie/amr/vf/attrs）
    │       ├── sample.ts         #     2 个 handler（list 分页/detail）
    │       ├── typing.ts         #     4 个 handler（mlst/mlst-pie/cgmlst/antigen）
    │       ├── amr.ts            #     3 个 handler（matrix 分页/stats/classes）
    │       ├── vf.ts             #     3 个 handler（matrix 分页/stats/categories）
    │       └── tree.ts           #     3 个 handler（data/config/heatmap）
    │
    ├── router/                   # 路由
    │   └── index.ts              #   Vue Router 配置（嵌套路由 + 懒加载 + meta）
    │
    ├── stores/                   # Pinia 状态管理
    │   ├── index.ts              #   统一导出所有 Store
    │   ├── app.ts                #   全局 UI 状态（侧边栏折叠、加载状态）
    │   ├── dataset.ts            #   当前数据集选择
    │   ├── sample.ts             #   样本筛选条件
    │   ├── typing.ts             #   分型筛选条件（MLST + 抗原）
    │   ├── amr.ts                #   AMR 筛选 + 分页状态
    │   └── vf.ts                 #   VF 筛选 + 分页状态
    │
    ├── types/                    # TypeScript 类型定义
    │   ├── api.ts                #   通用类型（ApiResponse/PaginatedData/Column/SelectOption）
    │   ├── sample.ts             #   样本类型（SampleFilter/SampleFilterKey）
    │   ├── typing.ts             #   分型类型（MlstRow/CgmlstRow/AntigenRow）
    │   ├── amr.ts                #   AMR 类型（AmrGeneRow/AmrStats）
    │   ├── vf.ts                 #   VF 类型（VfGeneRow/VfStats）
    │   ├── dashboard.ts          #   Dashboard 类型（GeoDistribution/TimelineData/PieDataItem）
    │   └── tree.ts               #   Tree 类型（TreeNode/TreeLink/TreeData/HeatmapCell）
    │
    ├── utils/                    # 工具函数
    │   ├── constants.ts          #   常量定义（NAV_ITEMS/筛选选项）
    │   ├── format.ts             #   格式化函数（日期/数字）
    │   ├── color.ts              #   颜色工具（调色板生成）
    │   ├── download.ts           #   文件下载工具（Blob 触发下载）
    │   └── request.ts            #   Axios 实例配置（baseURL/timeout/拦截器）
    │
    └── views/                    # 页面组件
        ├── NotFoundPage.vue      #   404 页面
        ├── dashboard/
        │   └── DashboardPage.vue #   数据集概览仪表盘
        ├── sample/
        │   ├── SamplePage.vue    #   样本信息容器（4 Tab）
        │   └── tabs/
        │       ├── SampleCsvTab.vue    # CSV 样本列表（筛选 + 分页）
        │       ├── SampleMlstTab.vue   # MLST 分型表格
        │       ├── SampleCgmlstTab.vue # cgMLST 等位基因矩阵
        │       └── SampleAntigenTab.vue# 血清抗原表格
        ├── typing/
        │   ├── TypingPage.vue    #   分型信息容器（3 Tab）
        │   ├── MlstView.vue      # MLST 表格/饼图双视图
        │   ├── CgmlstView.vue    # cgMLST 等位基因矩阵
        │   └── AntigenView.vue   # 表面抗原表格（三维筛选）
        ├── amr/
        │   └── AmrPage.vue       # 耐药基因（矩阵/统计图双视图）
        ├── vf/
        │   └── VfPage.vue        # 毒力基因（矩阵/统计图双视图）
        └── tree/
            └── TreeHeatmapPage.vue# MLST 最小生成树 + 热力图
```

## 文件统计

| 类别 | 文件数 | 说明 |
|------|--------|------|
| 页面组件 (views/) | 14 | 6 个主页面 + 7 个子 Tab/View + 404 |
| 公共组件 (components/) | 21 | 11 基础 + 4 图表 + 2 表格 + 1 筛选 + 3 布局 |
| Composable | 6 | ECharts/表格/筛选/导出/Resize/联动 |
| Store | 7 | 6 个 Store + 1 个 barrel 导出 |
| API | 8 | 1 泛型函数 + 1 端点 + 6 模块 |
| 类型定义 (types/) | 7 | 7 个类型文件 |
| Mock | 14 | 1 入口 + 7 数据 + 6 handler |
| 工具函数 (utils/) | 5 | 常量/格式化/颜色/下载/请求 |
| 路由/配置 | 8 | router + vite + tsconfig(x3) + env(x2) + html |
| **总计** | **~90** | |
