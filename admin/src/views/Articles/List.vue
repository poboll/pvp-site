<template>
    <div>
        <!-- 页面标题 -->
        <h1>文章列表</h1>
        <!-- 使用Element UI的表格组件显示文章列表 -->
        <el-table :data="articleList" style="width: 100%">
            <!-- 表格列，显示文章的id -->
            <el-table-column prop="_id" label="id"></el-table-column>
            <!-- 表格列，显示文章的标题 -->
            <el-table-column prop="name" label="标题"></el-table-column>
            <!-- 表格列，固定在右侧，包含编辑和删除按钮 -->
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <!-- 编辑按钮，点击调用edit方法跳转到编辑页面 -->
                    <el-button type="text" size="small" @click="edit(scope.row._id)">编辑</el-button>
                    <!-- 删除按钮，点击弹出确认框，确认后调用del方法删除文章并刷新列表 -->
                    <el-button type="text" size="small" @click="del(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
  
<script>
export default {
    name: "articleList",
    data() {
        return {
            // 文章列表
            articleList: []
        };
    },
    created() {
        // 在组件创建时调用获取文章列表的方法
        this.getArticleList();
    },
    methods: {
        // 获取文章列表
        async getArticleList() {
            // 使用this.$来调用Vue实例的方法，通过REST API获取文章列表
            let res = await this.$.get("rest/article");
            // 将获取到的文章列表保存到articleList变量中
            this.articleList = res.data;
        },
        // 编辑文章，跳转到编辑页面
        edit(id) {
            this.$router.push(`/item/article/${id}`);
        },
        // 删除文章，弹出确认框，确认后调用REST API删除文章并刷新列表
        del(id) {
            this.$confirm("确认删除吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(async () => {
                // 调用REST API删除文章
                await this.$.delete(`rest/article/${id}`);
                // 提示删除成功
                this.$message({
                    type: "success",
                    message: "删除成功!"
                });
                // 删除成功后刷新文章列表
                this.getArticleList();
            });
        }
    }
};
</script>

<style></style>