<template>
  <div>
    <div class="user">
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
    <hm-navtem to="/setting" >
        <template #title >设置</template>
    </hm-navtem>
    <hm-navtem to="/exit" >
        <template #title >退出</template>
    </hm-navtem>
  </div>
</template>

<script>
export default {
  async created () {
    const id = localStorage.getItem('userId')
    const res = await this.$axios.get(`/user/${id}`, {
      headers: { Authorization: localStorage.getItem('token') }
    })
    const { statusCode, message } = res.data
    if (statusCode === 200) {
      this.user = res.data.data
      console.log(this.user)
    } else {
      this.$toast(message)
      this.$router.push('/login')
    }
  },
  data () {
    return {
      user: {}
    }
  },
  computed: {
    base () {
      // console.log(this.$axios.defaults.baseURL)
      return this.$axios.defaults.baseURL
    }
  }
  // beforeRouteEnter (to, from, next) {
  //   console.log(11)
  //   next()
  // },
  // beforeRouteUpdate (to, from, next) {
  //   console.log(22)
  //   next()
  // },
  // beforeRouteLeave (to, from, next) {
  //   console.log(33)
  //   next()
  // }
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
    .iconfont {
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
</style>
