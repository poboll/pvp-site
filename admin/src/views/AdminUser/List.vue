<template>
    <div>
        <h1>管理员列表</h1>
        <el-table :data="list" style="width: 100%">
            <el-table-column prop="_id" label="id"></el-table-column>
            <el-table-column prop="username" label="管理员"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="edit(scope.row._id)">编辑</el-button>
                    <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: "adminList",
    data() {
        return {
            //管理员列表
            list: []
        };
    },
    created() {
        this.getAdmin();
    },
    methods: {
        //获取管理员列表
        async getAdmin() {
            let res = await this.$.get("rest/admin_users");
            this.list = res.data;
        },
        //编辑
        edit(id) {
            this.$router.push(`/admin_users/edit/${id}`);
        },
        //删除
        del(row) {
            this.$confirm(`是否确定要删除管理员 "${row.username}" 吗？`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(async () => {
                await this.$.delete(`rest/admin_users/${row._id}`)
                console.log(`${new Date().toLocaleString()}\n删除管理员：${row.username}成功`);
                this.$message({
                    type: "success",
                    message: "删除成功!"
                });
                this.getAdmin()
            }).catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除"
                });
            });
        }
    }
};
</script>