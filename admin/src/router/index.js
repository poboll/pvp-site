// 导入 Vue 和 VueRouter
import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用 VueRouter 插件
Vue.use(VueRouter)

// 动态导入视图组件
// 懒加载： 使用动态导入实现了懒加载，只有在需要时才会加载相应的组件，减小初始加载体积，提高应用性能。
// 简洁： 相对路径使用别名@，使得路径更加简洁。
const Main = () => import('@/views/Main.vue')
const CategoryEdit = () => import('@/views/Categories/Edit.vue')
const CategoryList = () => import('@/views/Categories/List.vue')

// 定义路由规则
const routes = [
  {
    path: '/',         // 根路径
    name: 'main',      // 路由名称
    component: Main,   // 对应的组件
    children: [        // 子路由
      { path: '/categories/create', component: CategoryEdit },  // 创建分类
      { path: '/categories/edit/:id', component: CategoryEdit, props: true },  // 编辑分类，传递 id 作为 props
      { path: '/categories/list', component: CategoryList }  // 分类列表
    ]
  }
]

// 创建 VueRouter 实例，配置路由规则和基础路径
const router = new VueRouter({
  base: process.env.BASE_URL,  // 从环境变量获取基础路径
  routes  // 路由规则
})

// 导出路由实例
export default router