<template>
    <div>
        <!-- 页面标题 -->
        <h1>英雄列表</h1>
        <!-- 使用Element UI的表格组件展示英雄列表 -->
        <el-table :data="list" style="width: 100%">
            <!-- 表格列，显示英雄的id -->
            <el-table-column prop="_id" label="id"></el-table-column>
            <!-- 表格列，显示英雄的名称 -->
            <el-table-column prop="name" label="英雄名称"></el-table-column>
            <!-- 表格列，显示英雄的称号 -->
            <el-table-column prop="title" label="称号"></el-table-column>
            <!-- 表格列，显示英雄的头像 -->
            <el-table-column prop="avatar" label="头像">
                <!-- 使用插槽自定义显示头像，限制高度为3rem -->
                <template slot-scope="scope">
                    <img :src="scope.row.avatar" style="height: 3rem;" />
                </template>
            </el-table-column>
            <!-- 表格列，固定在右侧，包含编辑和删除按钮 -->
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <!-- 编辑按钮，点击调用edit方法跳转到编辑页面 -->
                    <el-button type="text" size="small" @click="edit(scope.row._id)">编辑</el-button>
                    <!-- 删除按钮，点击弹出确认框，确认后调用del方法删除英雄并刷新列表 -->
                    <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: "heroList",
    data() {
        return {
            // 英雄列表
            list: []
        };
    },
    created() {
        // 在组件创建时调用获取英雄列表的方法
        this.getHeroList();
    },
    methods: {
        // 获取英雄列表
        async getHeroList() {
            // 使用this.$来调用Vue实例的方法，通过REST API获取英雄列表
            let res = await this.$.get("rest/heroes");
            // 将获取到的英雄列表保存到list变量中
            this.list = res.data;
        },
        // 编辑英雄，跳转到编辑页面
        edit(id) {
            this.$router.push(`/heroes/edit/${id}`);
        },
        // 删除英雄，弹出确认框，确认后调用REST API删除英雄并刷新列表
        async del(row) {
            if (!row._id) {
                this.$message({
                    type: "warning",
                    message: "英雄ID无效，无法删除。"
                });
                return;
            }
            this.$confirm(`是否确定要删除英雄 "${row.name}" 吗？`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(async () => {
                // 调用REST API删除英雄
                await this.$.delete(`rest/heroes/${row._id}`);
                console.log(`${new Date().toLocaleString()}\n删除英雄：${row.name}成功`);
                // 提示删除成功
                this.$message({
                    type: "success",
                    message: "删除成功!"
                });
                // 删除成功后刷新英雄列表
                this.getHeroList();
            })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        }
    }
};
</script>

<style></style>