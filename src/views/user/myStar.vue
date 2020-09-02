<template>
  <div class="mystar">
      <hm-header>我的收藏</hm-header>
      <div class="item" v-for="item in list" :key="item.id" >
          <div class="content">
              <div class="title"> {{item.title}} </div>
              <div class="user">
                <p class="nickname" >{{item.user.nickname}}</p>
                <p class="comment" >{{item.comments.length}}跟帖</p> </div>
          </div>
          <div class="img">
              <img :src="$url(item.cover[0].url)" alt="">
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
    this.getUserStar()
  },
  methods: {
    async getUserStar () {
      const res = await this.$axios.get('/user_star')
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    }
  }
}
</script>

<style lang="less" scoped >
.item{
    display: flex;
    padding: 18px;
    border-bottom: 1px solid #ccc;
    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title{
            font-size: 16px;
        }
        .user{
            display: flex;
            padding-right: 20px;
            font-size: 13px;
            color: #666;
            .nickname{
              flex: 1;
            }
        }
    }
    .img{
        img {
            width: 120px;
            height: 74px;
            object-fit: cover;
        }
    }
}

</style>
