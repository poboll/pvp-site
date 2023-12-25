// 导入 @vue/cli-service 中的 defineConfig 方法
const { defineConfig } = require('@vue/cli-service')

// 导出配置对象
module.exports = defineConfig({
  // 是否对依赖进行转译，通常用于第三方库的处理
  transpileDependencies: true,

  // 关闭 eslint 校验
  lintOnSave: false
})