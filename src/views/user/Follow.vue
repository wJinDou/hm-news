<template>
  <div>
      <hm-header>我的关注</hm-header>
      <div class="item" v-for="item in list" :key="item.id" >
          <div class="img">
              <img :src="$base + item.head_img" alt="">
          </div>
          <div class="content">
              <p class="title" >{{item.nickname}}</p>
              <p class="time" >{{item.create_date | filterTime}}</p>
          </div>
          <div >
              <van-button class="btn" @click="cancelFollow(item.id)" round size="small" color="linear-gradient(to right, #FF416C, #FF4B2B)">
                  取消关注
              </van-button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getUserFollow()
  },
  methods: {
    async getUserFollow () {
      const res = await this.$axios.get('/user_follows')
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    },
    async cancelFollow (id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '确定要取关该用户吗？🖤'
        })
      } catch {
        return this.$toast('取消操作')
      }
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      // console.log(res)
      if (res.data.statusCode === 200) {
        this.$toast.success('取关成功')
        this.getUserFollow()
      }
    }
  }
}
</script>

<style lang="less" scoped >
.item{
    height: 100px;
    padding: 26px 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    .img{
        width: 50px;
        height: 50px;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    .content{
        flex: 1;
        padding-left: 10px;
        .title{
            font-size: 16px;
        }
        .time{
            font-size: 14px;
            color: #666;
        }
    }
    .btn{
        padding: 0 20px;
    }
}
</style>
