<template>
  <div class="resgiter">
    <my-header>注册</my-header>
    <hm-logo></hm-logo>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="请输入用户名"
        :rules="rules.userNameRules"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入密码"
        :rules="rules.passwordRules"
      />
      <van-field
        v-model="nickname"
        name="昵称"
        label="昵称"
        placeholder="请输入昵称"
        :rules="rules.nicknameRules"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          注册
        </van-button>
      </div>
      <p class="tips">已有账号？去 <router-link to='/login' >登录</router-link></p>
    </van-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      nickname: '',
      rules: {
        userNameRules: [{ required: true, message: '请填写用户名/手机' }, { pattern: /^\d{6,11}$/, trigger: 'onChange', message: '请输入6-11位的账号(#`O′)' }],
        passwordRules: [{ required: true, message: '请输入密码' }, { pattern: /^\w{3,9}$/, trigger: 'onChange', message: '密码只能是3到9位(#`O′)' }],
        nicknameRules: [{ required: true, message: '请输入昵称' }, { pattern: /^[\u4e00-\u9fa5]{2,5}$/, trigger: 'onChange', message: '昵称只能是2到5位的中文(#`O′)' }]
      }
    }
  },
  methods: {
    async onSubmit () {
      const res = await this.$axios.post('/register', {
        username: this.username,
        password: this.password,
        nickname: this.nickname
      })
      const { message, statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        // 路由传参方式一,通过url
        // this.$router.push(`/login?username=${this.username}&password=${this.password}`)
        // 路由传参方式二：通过query对象
        // this.$router.push({
        //   path: '/login',
        //   query: {
        //     username: this.username,
        //     password: this.password
        //   }
        // })
        // 路由传参方式三：通过params传递
        this.$router.push({
          name: 'login',
          params: {
            username: this.username,
            password: this.password
          }
        })
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang="less" scoped >
.resgiter{
  height: 100vh;
}
.tips{
    margin: 0 20px;
    text-align: right;
    font-size: 14px;
    a{
      color:cornflowerblue;
    }
  }
</style>
