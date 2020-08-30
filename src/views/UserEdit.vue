<template>
  <div>
      <hm-header>编辑资料</hm-header>
      <div class="img">
          <img :src=" this.$axios.defaults.baseURL + user.head_img " alt="">
      </div>
      <hm-navtem @click="isShowNickName" >
          <template #title >昵称</template>
          <template> {{user.nickname}} </template>
      </hm-navtem>
      <hm-navtem @click="isShowPassword"  >
          <template #title >密码</template>
          <template>******</template>
      </hm-navtem>
      <hm-navtem @click='isShowGender' >
          <template #title  >性别</template>
          <template> {{user.gender?'男':'女'}} </template>
      </hm-navtem>
      <!-- 更改用户名 -->
      <van-dialog v-model="showNickName" title="更改用户名" show-cancel-button @confirm='updateNickname' >
        <van-cell-group>
          <van-field v-model="nickname" placeholder="请输入用户名" />
        </van-cell-group>
      </van-dialog>
      <!-- 更改密码 -->
      <van-dialog v-model="showPassword" title="更改密码" show-cancel-button @confirm='updatePassword' >
        <van-cell-group>
          <van-field v-model="password" placeholder="请输入新的密码" />
        </van-cell-group>
      </van-dialog>
      <!-- 更改性别 -->
      <van-dialog v-model="showGender" title="更改性别" show-cancel-button @confirm='updateGender' >
        <van-radio-group v-model="gender">
          <van-cell-group>
            <van-cell title="男" clickable @click="gender = 1">
              <template #right-icon>
                <van-radio :name="1" />
              </template>
            </van-cell>
            <van-cell title="女" clickable @click="gender = 0">
              <template #right-icon>
                <van-radio :name="0" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-dialog>
  </div>
</template>

<script>
export default {
  created () {
    this.getUserInfo()
  },
  data () {
    return {
      user: {},
      showNickName: false,
      nickname: '',
      showPassword: false,
      password: '',
      showGender: false,
      gender: ''
    }
  },
  methods: {
    async getUserInfo () {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      console.log(res)
      if (res.data.statusCode === 200) {
        this.user = res.data.data
      }
    },
    isShowNickName () {
      // console.log('更改用户名')
      this.showNickName = true
      this.nickname = this.user.nickname
    },
    isShowPassword () {
      // console.log('更改用户名')
      this.showPassword = true
      this.password = this.user.password
    },
    isShowGender () {
      this.showGender = true
      this.gender = this.user.gender
    },
    async updateUserInfo (data) {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      // console.log(res)
      if (res.data.statusCode === 200) {
        this.getUserInfo()
      }
    },
    updateNickname () {
      this.updateUserInfo({
        nickname: this.nickname
      })
    },
    updatePassword () {
      this.updateUserInfo({
        password: this.password
      })
    },
    updateGender () {
      this.updateUserInfo({
        gender: this.gender
      })
    }
  }
}
</script>

<style lang="less" scoped >
.img{
  padding: 25px;
  text-align: center;
  img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
}
/deep/ .van-dialog__content{
  margin: 20px;
  .van-field{
    border: 1px solid #eee;
  }
}
</style>
