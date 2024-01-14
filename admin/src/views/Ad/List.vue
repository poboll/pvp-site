<template>
    <div>
        <h1>广告位列表</h1>
        <el-table :data="list" style="width: 100%">
            <el-table-column prop="_id" label="id"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column label="图片">
                <template slot-scope="scope">
                    <div
                        style="width: 100px; height: 100px; overflow: hidden; position: relative; display: flex; justify-content: center; align-items: center;">
                        <img v-if="scope.row.imgUrl" :src="scope.row.imgUrl" style="width: 100%; height: auto;" />
                        <img v-else-if="scope.row.items && scope.row.items.length > 0 && scope.row.items[0].image"
                            :src="scope.row.items[0].image" style="width: 100%; height: auto;" />
                    </div>
                </template>
            </el-table-column>

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
    name: "adList",
    data() {
        return {
            //首页轮播图列表
            list: []
        };
    },
    created() {
        this.getAdList();
    },
    methods: {
        //获取首页轮播图列表
        async getAdList() {
            let res = await this.$.get("rest/ads");
            this.list = res.data;
        },
        //编辑
        edit(id) {
            this.$router.push(`/ads/edit/${id}`);
        },
        //删除
        del(row) {
            this.$confirm(`是否确定要删除文章 "${row.path}" 吗？`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(async () => {
                await this.$.delete(`rest/ads/${row._id}`);
                console.log(`${new Date().toLocaleString()}\n删除广告：${row.path}成功`);
                // 提示删除成功
                // 删除成功后刷新文章列表
                this.$message({
                    type: "success",
                    message: "删除成功!"
                });
                this.getAdList();
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