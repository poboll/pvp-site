<template>
  <div>

    <!-- el-container 用于布局，设置高度为 100vh 表示占满整个视口高度 -->
    <el-container style="height: 100vh">
      <!-- el-aside 为侧边栏，设置宽度为 200px，背景颜色为浅灰色 -->
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <!-- el-menu 为菜单组件，使用 router 属性开启路由模式 -->
        <el-menu router :default-openeds="['1', '3']">
          <!-- el-submenu 为子菜单组件，index 属性为子菜单的标识 -->
          <el-submenu index="1">
            <!-- 子菜单标题，包含一个图标和文字 -->
            <template slot="title">
              <i class="el-icon-message"></i>
              内容管理
            </template>
            <!-- el-menu-item-group 为菜单项组，包含一个标题和多个菜单项 -->
            <el-menu-item-group>
              <!-- 组标题 -->
              <template slot="title">分类</template>
              <!-- 菜单项，使用 index 属性指定跳转路径 -->
              <el-menu-item index="/categories/create">新建分类</el-menu-item>
              <el-menu-item index="/categories/list">分类列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- el-container 包含 el-header 和 el-main，用于上下布局 -->
      <el-container>
        <!-- el-header 为顶部导航栏，右侧包含一个 el-dropdown 下拉菜单 -->
        <el-header style="text-align: right; font-size: 12px">
          <!-- el-dropdown 下拉菜单组件，包含一个设置图标和一个下拉菜单 -->
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <!-- el-dropdown-menu 为下拉菜单，包含多个 el-dropdown-item 菜单项 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- 用户名显示区域 -->
          <span>王小虎</span>
        </el-header>

        <!-- el-main 为主要内容区域，包含一个用于显示路由组件的 router-view -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<!-- 样式定义，设置 el-header 和 el-aside 的样式 -->
<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  name: 'home',  // 组件名称
  data() {
    return {
      // 组件数据，可以为空
    }
  }
};
</script>