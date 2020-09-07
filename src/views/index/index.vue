<template>
  <div class="index">
    <van-sticky>
      <div class="header">
          <div class="logo">
              <span class="iconfont iconnew" ></span>
          </div>
          <div class="search">
              <span class="iconfont iconsearch" > </span>搜索
          </div>
        <div class="user" @click="$router.push('/user')" >
              <span class="iconfont iconwode" ></span>
          </div>
      </div>
    </van-sticky>
    <van-sticky :z-index="999" >
          <div class="more" @click="$router.push('/manage')" >
                <div class="iconfont iconjiantou2"  ></div>
          </div>
        </van-sticky>
      <van-tabs sticky :offset-top="45" animated swipeable v-model="active">
            <!-- 栏目管理链接 -->
        <van-tab v-for="item in tabList" :key="item.id" :title="item.name">
          <!-- 上拉刷新 -->
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <!-- 滚动加载 -->
          <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              :immediate-check="false"
              :offset="100"
              @load="onLoad"
            >
          <hm-post :post="item" v-for="item in newsList" :key="item.id" ></hm-post>
          </van-list>
          </van-pull-refresh>
        </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      active: 0,
      pageIndex: 1,
      pageSize: 6,
      tabList: [],
      newsList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  created () {
    console.log('index的创建')
    this.getUserCategory()
  },
  destroyed () {
    console.log('index的销毁')
  },
  activated () {
    console.log('激活缓存时')
    this.getUserCategory()
  },
  deactivated () {
    console.log('不激活缓存时')
  },
  methods: {
    async getUserCategory () {
      const activeList = JSON.parse(localStorage.getItem('activeList'))
      if (activeList) {
        this.tabList = activeList
        this.getUserPost(this.tabList[this.active].id)
        return
      }
      const res = await this.$axios.get('/category')
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data
        this.getUserPost(this.tabList[this.active].id)
      }
    },
    async getUserPost (id) {
      const res = await this.$axios.get('/post', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          category: id
        }
      })
      if (this.pageIndex === 1) {
        this.newsList = []
      }
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.newsList = [...this.newsList, ...data]
      }
      this.loading = false
      this.refreshing = false
      // 检测是否还有更多数据
      if (data.length < this.pageSize) {
        this.finished = true
      }
    },
    onLoad () {
      setTimeout(() => {
        console.log('滚动加载')
        this.pageIndex++
        this.getUserPost(this.tabList[this.active].id)
      }, 1000)
    },
    onRefresh () {
      console.log('上拉刷新')
      setTimeout(() => {
        this.pageIndex = 1
        this.finished = false
        this.loading = true
        this.newsList = []
        this.getUserPost(this.tabList[this.active].id)
      }, 1000)
    }
  },
  watch: {
    active (val) {
      console.log('切换加载')
      this.newsList = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      this.getUserPost(this.tabList[val].id)
    }
  }
}
</script>

<style lang="less" scoped >
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
/deep/ .van-tabs__wrap  {
  width: 85%;
}
 /deep/ .more{
  position: fixed;
  width: 15%;
  height: 44px;
  background-color: #fff;
  text-align: center;
  line-height: 44px;
  z-index: 666;
  top: 50px;
  right: 0;
   /deep/ div {
    transform: rotate(-90deg);
  }
}
</style>
