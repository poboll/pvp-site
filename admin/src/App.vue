<template>
  <div id="app">
    <!-- router-view 用于显示当前路由对应的组件内容 -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',  // 组件名称
  components: {}  // 组件中引入的其他组件，此处为空
}
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
}
</style>