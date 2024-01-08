<template>
  <div>
    <!-- el-container 用于整体布局，设置高度为 100vh 表示占满整个视口高度 -->
    <el-container style="height: 100vh">
      <!-- el-aside 为侧边栏，设置宽度为 200px，背景颜色为浅灰色 -->
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <!-- el-menu 为菜单组件，使用 router 属性开启路由模式 -->
        <el-menu router :default-openeds="['1']" :default-active="$route.path">
          <!-- el-submenu 为子菜单组件，index 属性为子菜单的标识 -->
          <el-submenu v-for="(submenu, index) in menu" :index="String(++index)" :key="index">
            <!-- 子菜单标题，包含一个图标和文字 -->
            <template slot="title">
              <i :class="submenu.icon"></i>
              {{ submenu.title }}
            </template>
            <!-- el-menu-item-group 为菜单项组，包含一个标题和多个菜单项 -->
            <el-menu-item-group v-for="(items, index) in submenu.itemsGroup" :key="index">
              <template slot="title">{{ items.itemsTitle }}</template>
              <!-- el-menu-item 为菜单项，设置路由路径 -->
              <el-menu-item v-for="(item, index) in items.items" :index="item.path" :key="index">
                {{ item.itemName }}
              </el-menu-item>
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
          <span>在虎</span>
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
      //子菜单
      menu: [
        {
          title: "内容管理",
          icon: "el-icon-message",
          itemsGroup: [
            {
              itemsTitle: "分类",
              items: [
                {
                  itemName: "新建分类",
                  path: "/categories/create"
                },
                {
                  itemName: "分类列表",
                  path: "/categories/list"
                }
              ]
            },
            {
              itemsTitle: "物品",
              items: [
                {
                  itemName: "新建物品",
                  path: "/items/create"
                },
                {
                  itemName: "物品列表",
                  path: "/items/list"
                }
              ]
            },
            {
              itemsTitle: "英雄",
              items: [
                {
                  itemName: "新建英雄",
                  path: "/heroes/create"
                },
                {
                  itemName: "英雄列表",
                  path: "/heroes/list"
                }
              ]
            },
            {
              itemsTitle: "文章",
              items: [
                {
                  itemName: "新建文章",
                  path: "/articles/create"
                },
                {
                  itemName: "文章列表",
                  path: "/articles/list"
                }
              ]
            }
          ]
        }
      ]
    };
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>