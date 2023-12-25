<template>
    <div class="about">
        <!-- 根据 id 是否存在显示编辑或新建 -->
        <h1>{{ id ? '编辑' : '新建' }}分类</h1>

        <!--  
        @ 符号是 Vue 模板中事件绑定的缩写，等同于 v-on。
        submit 是要监听的事件类型，这里是表单提交事件。
        native 表示监听原生事件，而不是 Vue 包装过的事件。
        prevent 是事件修饰符，表示调用 event.preventDefault() 阻止事件的默认行为。 
        -->
        <el-form label-width="120px" @submit.native.prevent="save">
            <!-- 表单项：名称 -->
            <el-form-item label="名称">
                <!-- 使用 v-model 将输入框的值与 model.name 进行双向绑定 -->
                <el-input v-model="model.name"></el-input>
            </el-form-item>

            <!-- 表单项：保存按钮 -->
            <el-form-item>
                <!-- 提交按钮，点击触发 save 方法 -->
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script>
export default {
    props: {
        id: {} // 组件、与路由解耦
    },
    data() {
        return {
            // 表单数据模型
            model: {}
        }
    },
    /* eslint-disable */
    methods: {
        // 保存表单数据的方法
        async save() {
            console.log('save')
            // 异步变同步
            let res
            if (this.id) {
                // 如果存在 id，则是编辑，使用 put 请求
                res = await this.$http.put(`categories/${this.id}`, this.model)
            } else {
                // 如果不存在 id，则是新建，使用 post 请求
                res = await this.$http.post('categories', this.model)
            }
            // 保存成功后跳转到分类列表
            this.$router.push('/categories/list')
            // 弹出保存成功的消息
            this.$message({
                type: 'success',
                message: '保存成功'
            })
        },

        // 从服务器获取数据的方法
        async fetch() {
            // 发送 get 请求获取指定 id 的分类数据
            const res = await this.$http.get(`categories/${this.id}`)
            // 将获取的数据赋值给表单数据模型
            this.model = res.data
        }
    },

    // 组件创建时执行的生命周期钩子
    created() {
        // 如果存在 id，则调用 fetch 方法加载数据
        this.id && this.fetch()
    }
}
</script>