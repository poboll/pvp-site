<template>
    <!-- 分类列表组件的模板 -->
    <div>
        <h1>分类列表</h1>
        <!-- 使用 Element UI 的表格组件，绑定数据源为 items -->
        <el-table :data="items">
            <!-- 配置表格列，显示 ID 列 -->
            <el-table-column prop="_id" label="ID" width="230"></el-table-column>
            <!-- 配置表格列，显示分类名称列 -->
            <el-table-column prop="name" label="分类名称"></el-table-column>
            <!-- 配置固定在右侧的操作列，包含编辑按钮 -->
            <el-table-column fixed="right" label="操作" width="180">
                <!-- 使用插槽自定义列的内容 -->
                <template slot-scope="scope">
                    <!-- 编辑按钮，点击时调用 edit 方法 按钮样式：text\primary-->
                    <el-button type="primary" size="small" @click="edit(scope.row._id)">编辑</el-button>
                    <!-- @click="$router.push(`/categories/edit/${scope.row._id}`)")>-->
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
// 导出组件配置对象
export default {
    // 组件名称
    name: "items",
    // 组件的数据
    data() {
        return {
            // 分类数据的数组
            items: []
        };
    },
    // 在组件创建时调用的生命周期钩子
    created() {
        // 调用 fetch 方法获取分类数据
        this.fetch();
    },
    // 组件的方法
    methods: {
        // 异步方法，用于获取分类数据
        async fetch() {
            // 使用实例上的 $ 对象调用 get 方法，获取分类数据
            let res = await this.$.get("categories");
            // 将获取到的分类数据设置到组件的 items 属性上
            this.items = res.data;
        },
        //编辑
        edit(id) {
            this.$router.push(`/categories/edit/${id}`);
        }
    }
};
</script>

/* 组件的局部样式，仅在当前组件生效，使用 SCSS 语法 */
<style scoped lang="scss"></style>