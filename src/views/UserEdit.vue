<template>
  <div>
      <hm-header>编辑资料</hm-header>
      <div class="img">
          <van-uploader class="upload" :after-read="afterRead" :before-read="beforeRead" />
          <img :src="$base + user.head_img " alt="">
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
          <van-field v-model="nickname" ref="nickname" placeholder="请输入用户名" />
        </van-cell-group>
      </van-dialog>
      <!-- 更改密码 -->
      <van-dialog v-model="showPassword" title="更改密码" show-cancel-button @confirm='updatePassword' >
        <van-cell-group>
          <van-field v-model="password" ref="password"  placeholder="请输入新的密码" />
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
      <div class="crop"  v-show="showCrop" >
        <div class="btn">
          <van-button type="default" @click="cancel" size="large">取消</van-button>
          <van-button type="primary" @click="uploadImg" size="large" >裁剪</van-button>
        </div>
        <vueCropper
        ref="cropper"
        :img="cropImg"
        :autoCrop="true"
        :autoCropWidth="150"
        :autoCropHeight="150"
        :fixed="true"
        :centerBox="true"
        ></vueCropper>
      </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
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
      gender: '',
      cropImg: '',
      showCrop: false
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
    async isShowNickName () {
      // console.log('更改用户名')
      this.showNickName = true
      this.nickname = this.user.nickname
      // DOM更新是异步，这里数据先全部执行后然后DOM才进行渲染
      await this.$nextTick()
      this.$refs.nickname.focus()
    },
    async isShowPassword () {
      // console.log('更改用户名')
      this.showPassword = true
      this.password = this.user.password
      await this.$nextTick()
      this.$refs.password.focus()
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
        this.$toast.success('修改成功')
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
    },
    // 上传文件准备裁切
    afterRead (file) {
      this.cropImg = file.content
      this.showCrop = true
    },
    // 裁切完毕发送请求
    uploadImg () {
      this.$refs.cropper.getCropBlob(async (file) => {
        console.log(file)
        const formdata = new FormData()
        formdata.append('file', file)
        const res = await this.$axios.post('/upload', formdata)
        console.log(res)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.updateUserInfo({
            head_img: data.url
          })
          this.showCrop = false
        }
      })
    },
    // 取消裁切
    cancel () {
      this.$toast('取消了操作')
      this.showCrop = false
    },
    // 上传之前验证图片
    beforeRead (file) {
      // console.log('上传完毕之前')
      if ((file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif') && file.size <= 500 * 1024) {
        console.log('文件格式正确')
        return true
      }
      this.$toast.fail('请上传图片格式,并且大小小于500kb')
      return false
    }
  },
  components: {
    VueCropper
  }
}
</script>

<style lang="less" scoped >
.img{
  padding: 25px;
  text-align: center;
  position: relative;
  .upload{
    position: absolute;
    transform: scale(1.5);
    opacity: 0;
  }
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
.crop{
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  .btn{
    position: absolute;
    width: 100%;
    display: flex;
    bottom: 0;
    z-index: 1;
    justify-content: space-between;
  }

}
</style>
