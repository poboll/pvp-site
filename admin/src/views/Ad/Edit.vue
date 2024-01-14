<template>
    <div class="item-container">
        <h1>{{ id ? '编辑' : '新建' }}广告位</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="广告">
                <!-- 添加技能按钮，点击调用 model.items.push({}) 来添加新的技能项 -->
                <el-button size="small" @click="model.items.push({})"> <i class="el-icon-plus"></i> 添加广告
                </el-button>
                <!-- 技能列表，使用 el-row 和 el-col 来展示技能项的表单 -->
                <el-row type="flex" style="flex-wrap: wrap">
                    <el-col style="margin-top: 20px;" :md="24" v-for="(item, index) in model.items" :key="index">
                        <el-form-item label="跳转链接（URL）">
                            <el-input v-model="item.url"></el-input>
                        </el-form-item>
                        <el-form-item label="图标" style="margin-top: 0.5rem;">
                            <el-upload class="ad-uploader" :action="$.defaults.baseURL + '/upload'"
                                :show-file-list="false" :on-success="res => $set(item, 'image', res.url)">
                                <img v-if="item.image" :src="item.image"/>
                                <i v-else class="el-icon-plus ad-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="small" type="danger" @click="model.items.splice(index, 1)">删除</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "adCreate",
    props: {
        id: {}
    },
    data() {
        return {
            model: {
                items: []
            }
        };
    },
    created() {
        //&&代表满足前面的条件之后才执行后面的函数
        this.id && this.getAd();
    },
    methods: {
        //获取首页轮播图信息
        async getAd() {
            let res = await this.$.get(`rest/ads/${this.id}`);
            this.model = Object.assign({}, this.model, res.data);
        },
        async save() {
            if (this.id) {
                await this.$.put(`rest/ads/${this.id}`, this.model);
            } else {
                await this.$.post("rest/ads", this.model);
            }
            this.$router.push("/ads/list");
        },
    }
};
</script>