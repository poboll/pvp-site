// 导入 Vue 和 VueRouter
import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用 VueRouter 插件
Vue.use(VueRouter)

// 动态导入视图组件
// 懒加载： 使用动态导入实现了懒加载，只有在需要时才会加载相应的组件，减小初始加载体积，提高应用性能。
// 简洁： 相对路径使用别名@，使得路径更加简洁。
const Home = () => import('@/views/Home')
const CategoryEdit = () => import('@/views/Category/Edit.vue')
const CategoryList = () => import('@/views/Category/List.vue')

// 定义路由规则
const routes = [
  //登录页面
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',         // 根路径
    name: 'home',      // 路由名称
    component: Home,   // 对应的组件
    children: [        // 子路由
      // 分类管理
      { path: '/categories/create', name: 'categoryCreate', component: CategoryEdit },  // 创建分类
      { path: '/categories/list', name: 'categoryList', component: CategoryList },  // 分类列表
      { path: '/categories/edit/:id', name: 'categoryEdit', component: CategoryEdit, props: true },  // 编辑分类，传递 id 作为 props, 将任何参数注入
      // 物品管理
      {
        path: 'items/create',
        name: 'itemCreate',
        component: () => import('@/views/Item/Edit')
      },
      {
        path: 'items/list',
        name: 'itemList',
        component: () => import('@/views/Item/List')
      },
      {
        path: 'items/edit/:id',
        name: 'itemEdit',
        component: () => import('@/views/Item/Edit'),
        props: true
      },
      // 英雄管理
      {
        path: 'heroes/create',
        name: 'heroCreate',
        component: () => import('@/views/Hero/Edit')
      },
      {
        path: 'heroes/list',
        name: 'heroList',
        component: () => import('@/views/Hero/List')
      },
      {
        path: 'heroes/edit/:id',
        name: 'heroEdit',
        component: () => import('@/views/Hero/Edit'),
        props: true
      },
      // 文章管理
      {
        path: 'articles/create',
        name: 'articleCreate',
        component: () => import('@/views/Article/Edit')
      },
      {
        path: 'articles/list',
        name: 'articleList',
        component: () => import('@/views/Article/List')
      },
      {
        path: 'articles/edit/:id',
        name: 'articleEdit',
        component: () => import('@/views/Article/Edit'),
        props: true
      },
      // 广告位管理
      {
        path: 'ads/create',
        name: 'adCreate',
        component: () => import('@/views/Ad/Edit')
      },
      {
        path: 'ads/list',
        name: 'adList',
        component: () => import('@/views/Ad/List')
      },
      {
        path: 'ads/edit/:id',
        name: 'adEdit',
        component: () => import('@/views/Ad/Edit'),
        props: true
      },
      // 管理员管理
      {
        path: 'admin_users/create',
        name: 'adminCreate',
        component: () => import('@/views/AdminUser/Edit')
      },
      {
        path: 'admin_users/list',
        name: 'adminList',
        component: () => import('@/views/AdminUser/List')
      },
      {
        path: 'admin_users/edit/:id',
        name: 'adminEdit',
        component: () => import('@/views/AdminUser/Edit'),
        props: true
      },
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