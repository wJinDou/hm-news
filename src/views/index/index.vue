<template>
  <div class="index">
      <div class="header">
          <div class="logo">
              <span class="iconfont iconnew" ></span>
          </div>
          <div class="search">
              <span class="iconfont iconsearch" > </span>搜索
          </div>
        <div class="user">
              <span class="iconfont iconwode" ></span>
          </div>
      </div>
      <van-tabs sticky animated  swipeable v-model="active">
        <van-tab v-for="item in tabList" :key="item.id" :title="item.name">
          <hm-post :post="item" v-for="item in newsList" :key="item.id" ></hm-post>
        </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      pageIndex: 2,
      pageSize: 6,
      tabList: [],
      newsList: []
    }
  },
  created () {
    this.getUserCategory()
  },
  methods: {
    async getUserCategory () {
      const res = await this.$axios.get('/category')
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data
        this.getUserPost(this.tabList[0].id)
      }
    },
    async getUserPost (id) {
      const res = await this.$axios.get('/post', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.newsList = data
      }
    }
  }
}
</script>

<style lang="less" scoped >
.index{
    height: 5000px;
}
.header{
    display: flex;
    padding: 0 10px;
    height: 50px;
    background-color: #ee1111;
    align-items: center;
    color: #fff;
    .logo,
    .user{
        width: 50px;
        text-align: center;
    }
    .logo{
        .iconfont{
            font-size: 50px;
        }
    }
    .user{
        .iconfont{
            font-size: 25px;
        }
    }
    .search{
        flex: 1;
        text-align: center;
        font-size: 18px;
        height: 30px;
        line-height: 30px;
        border-radius: 30px;
        margin: 0 10px;
        background-color: rgba(255,255,255,.5);
        .iconfont{
            margin-right: 10px;
            font-size: 18px;
        }
    }
}
</style>
