<template>
    <div>
        <!-- 页面标题 -->
        <h1>物品列表</h1>
        <!-- 使用Element UI的表格组件展示物品列表 -->
        <el-table :data="list" style="width: 100%">
            <!-- 表格列，显示物品的id -->
            <el-table-column prop="_id" label="id"></el-table-column>
            <!-- 表格列，显示物品的名称 -->
            <el-table-column prop="name" label="物品名称"></el-table-column>
            <!-- 表格列，显示物品的图标 -->
            <el-table-column prop="icon" label="图标">
                <!-- 使用插槽自定义显示图标，限制高度为3rem -->
                <template slot-scope="scope">
                    <img :src="scope.row.icon" style="height: 3rem;" />
                </template>
            </el-table-column>
            <!-- 表格列，固定在右侧，包含编辑和删除按钮 -->
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <!-- 编辑按钮，点击调用edit方法跳转到编辑页面 -->
                    <el-button type="text" size="small" @click="edit(scope.row._id)">编辑</el-button>
                    <!-- 删除按钮，点击弹出确认框，确认后调用del方法删除物品并刷新列表 -->
                    <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: "itemList",
    data() {
        return {
            // 物品列表
            list: []
        };
    },
    created() {
        // 在组件创建时调用获取物品列表的方法
        this.getItemsList();
    },
    methods: {
        // 获取物品列表
        async getItemsList() {
            // 使用this.$来调用Vue实例的方法，通过REST API获取物品列表
            let res = await this.$.get("rest/items");
            // 将获取到的物品列表保存到list变量中
            this.list = res.data;
        },
        // 编辑物品，跳转到编辑页面
        edit(id) {
            this.$router.push(`/items/edit/${id}`);
        },
        // 删除物品，弹出确认框，确认后调用REST API删除物品并刷新列表
        async del(row) {
            this.$confirm(`是否确定要删除物品 "${row.name}" 吗？`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(async () => {
                if (!row._id) {
                    this.$message({
                        type: "warning",
                        message: "文章ID无效，无法删除。"
                    });
                    return;
                }
                // 调用REST API删除物品
                await this.$.delete(`rest/items/${row._id}`);
                console.log(`${new Date().toLocaleString()}\n保存物品：${this.model.name}成功`);
                // 提示删除成功
                this.$message({
                    type: "success",
                    message: "删除成功!"
                });
                // 删除成功后刷新物品列表
                this.getItemsList();
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