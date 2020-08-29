<template>
  <div class="login">
    <my-header>登录</my-header>
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
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          登录
        </van-button>
      </div>
      <p class="tips">没有账号？去 <router-link to='/resgiter' >注册</router-link></p>
    </van-form>
  </div>
</template>

<script>
export default {
  created () {
    // 方式一：通过url的方式
    // console.log(this.$route)
    // const { username, password } = this.$route.query
    // this.username = username
    // this.password = password

    // 方式二：通过query对象
    // console.log(this.$route)
    // const { username, password } = this.$route.query
    // this.username = username
    // this.password = password

    // 方式三：通过params对象传递
    const { username, password } = this.$route.params
    this.username = username
    this.password = password
  },
  data () {
    return {
      username: '',
      password: '',
      rules: {
        userNameRules: [{ required: true, message: '请填写用户名' }],
        passwordRules: [{ required: true, message: '请输入密码' }]
      }
    }
  },
  methods: {
    async onSubmit () {
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      // console.log(res)
      const { message, statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.$router.push('/user')
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang="less" scoped >
.login{
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
