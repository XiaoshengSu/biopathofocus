import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AppLayout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('@/views/dashboard/DashboardPage.vue'),
          meta: { title: '数据集概览' },
        },
        {
          path: 'sample',
          component: () => import('@/views/sample/SamplePage.vue'),
          redirect: '/sample/csv',
          meta: { title: '样本信息' },
          children: [
            {
              path: 'csv',
              name: 'SampleCsv',
              component: () => import('@/views/sample/tabs/SampleCsvTab.vue'),
              meta: { title: 'CSV 数据' },
            },
            {
              path: 'mlst',
              name: 'SampleMlst',
              component: () => import('@/views/sample/tabs/SampleMlstTab.vue'),
              meta: { title: 'MLST' },
            },
            {
              path: 'cgmlst',
              name: 'SampleCgmlst',
              component: () => import('@/views/sample/tabs/SampleCgmlstTab.vue'),
              meta: { title: 'cgMLST' },
            },
            {
              path: 'antigen',
              name: 'SampleAntigen',
              component: () => import('@/views/sample/tabs/SampleAntigenTab.vue'),
              meta: { title: '血清分型' },
            },
          ],
        },
        {
          path: 'typing',
          component: () => import('@/views/typing/TypingPage.vue'),
          redirect: '/typing/mlst',
          meta: { title: '分型信息' },
          children: [
            {
              path: 'mlst',
              name: 'TypingMlst',
              component: () => import('@/views/typing/MlstView.vue'),
              meta: { title: 'MLST 分型' },
            },
            {
              path: 'cgmlst',
              name: 'TypingCgmlst',
              component: () => import('@/views/typing/CgmlstView.vue'),
              meta: { title: 'cgMLST 分型' },
            },
            {
              path: 'antigen',
              name: 'TypingAntigen',
              component: () => import('@/views/typing/AntigenView.vue'),
              meta: { title: '血清分型' },
            },
          ],
        },
        {
          path: 'amr',
          name: 'Amr',
          component: () => import('@/views/amr/AmrPage.vue'),
          meta: { title: '耐药基因' },
        },
        {
          path: 'vf',
          name: 'Vf',
          component: () => import('@/views/vf/VfPage.vue'),
          meta: { title: '毒力基因' },
        },
        {
          path: 'tree-heatmap',
          name: 'TreeHeatmap',
          component: () => import('@/views/tree/TreeHeatmapPage.vue'),
          meta: { title: 'Tree Heatmap' },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundPage.vue'),
    },
  ],
})

export default router
