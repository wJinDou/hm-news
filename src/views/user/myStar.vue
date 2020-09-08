<template>
  <div class="mystar">
      <hm-header>我的收藏</hm-header>
      <hm-post :post="item" v-for="item in list" :key="item.id"></hm-post>
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
        this.list.forEach(item => {
          item.comment_length = item.comments.length
        })
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
