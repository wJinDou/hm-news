<template>
  <div>
    <div class="user" @click='toEdit' >
      <div class="pic">
        <img :src="(base + user.head_img)" alt />
      </div>
      <div class="info">
        <div class="nickname">
          <span class="iconfont" :class="user.gender? ' iconxingbienan' : 'iconxingbienv'" ></span>
          {{user.nickname}}
        </div>
        <div class="time"> {{user.create_date | filterTime('YYYY-MM-DD') }} </div>
      </div>
      <div class="arrow">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <hm-navtem to="/guanzhu" >
        <template>关注的用户</template>
        <template #title >我的关注</template>
    </hm-navtem>
    <hm-navtem to="/gentie" >
        <template>我的跟帖</template>
        <template #title >跟帖/回复</template>
    </hm-navtem>
    <hm-navtem to="/shoucang" >
        <template>我的收藏</template>
        <template #title >文章/视频</template>
    </hm-navtem>
    <hm-navtem to="/user-edit" >
        <template #title >设置</template>
    </hm-navtem>
    <div class="exit" >
      <van-button @click='exit' block type="danger">退出系统</van-button>
    </div>
  </div>
</template>

<script>
export default {
  async created () {
    // 请求用户信息并渲染
    const id = localStorage.getItem('userId')
    const res = await this.$axios.get(`/user/${id}`)
    const { statusCode } = res.data
    if (statusCode === 200) {
      this.user = res.data.data
      console.log(this.user)
    }
  },
  data () {
    return {
      user: {}
    }
  },
  methods: {
    // 登出功能
    async exit () {
      try {
        await this.$dialog.confirm({
          title: '温馨提示❕',
          message: '您确定要登出本系统吗？💨'
        })
      } catch (err) {
        return this.$toast('您取消了退出')
      }
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this.$toast.success('已成功退出')
      this.$router.push('/login')
    },
    toEdit () {
      this.$router.push('user-edit')
    }
  },
  computed: {
    base () {
      return this.$axios.defaults.baseURL
    }
  }
}
</script>

<style lang="less" scoped >
.user {
  display: flex;
  align-items: center;
  padding: 24px 18px;
  border-bottom: 5px solid #eee;
  .pic {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
    }
  }
  .info {
    flex: 1;
    margin-left: 15px;
    font-size: 14px;
    line-height: 20px;
    .iconxingbienan {
      color: skyblue;
    }
    .iconxingbienv {
      color: pink;
    }
    .time {
      font-size: 12px;
      color: #999;
    }
  }
  .arrow {
    .iconfont {
      color: #999;
    }
  }
}
.exit{
  padding: 10px;
}
</style>
