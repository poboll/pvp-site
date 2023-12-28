<template>
    <div>
        <h1>分类列表</h1>
        <el-table :data="item">
            <el-table-column prop="_id" label="ID" width="220"></el-table-column>
            <el-table-column prop="name" label="分类名称"></el-table-column>
        </el-table>
    </div>
</template>
  
<script>
export default {
    name: "list",
    data() {
        return {
            list: []
        };
    },
    created() {
        this.getCategoryList();
    },
    methods: {
        async getCategoryList() {
            let res = await this.$.get("categories");
            this.list = res.data;
        }
    }
};
</script>
<style scoped lang="scss"></style>