<template>
    <div class="item-container">
        <h1>{{ id ? '编辑' : '新建' }}物品</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="图标">
                <el-upload class="avatar-uploader" :action="`${$.defaults.baseURL}/upload`" :show-file-list="false"
                    :on-success="uploadSuccess">
                    <img v-if="model.icon" :src="model.icon" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "edit",
    props: {
        id: {}
    },
    data() {
        return {
            model: {
                // name: "",
                // icon: ""
            }
        };
    },
    created() {
        // &&代表满足前面的条件之后才执行后面的函数
        this.id && this.getmodel();
    },
    methods: {
        // 获取物品信息
        async getmodel() {
            let res = await this.$.get(`rest/items/${this.id}`);
            this.model = res.data;
        },
        async save() {
            if (this.id) {
                await this.$.put(`rest/items/${this.id}`, this.model);
            } else {
                await this.$.post("rest/items", this.model);
            }
            this.$router.push("/items/list");
        },
        //图片上传完成
        uploadSuccess(res) {
            this.$set(this.model, 'icon', res.url)
            // this.model.icon = res.url;// 触发 VUE 无法赋值 => 显式赋值
        }
    }
};
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>