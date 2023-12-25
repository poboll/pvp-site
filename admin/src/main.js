// 导入 Vue 框架和 App 组件
import Vue from 'vue'
import App from './App.vue'

// 导入 Element UI 插件
import './plugins/element.js'

// 导入路由配置
import router from './router'

// 导入自定义的 http 模块，将其挂载到 Vue 的原型链上
import http from './ajax'
Vue.prototype.$ = http

// 配置生产环境提示
Vue.config.productionTip = false

// 创建 Vue 实例，传入路由配置和根组件 App
new Vue({
  router,
  render: h => h(App)
}).$mount('#app') // 将实例挂载到页面上的 #app 元素上