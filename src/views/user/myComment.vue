<template>
  <div class="my-comment">
    <hm-header>我的跟帖</hm-header>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功" >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check='false'
        :offset="100"
        @load="onLoad"
      >
      <div class="list" v-for="item in list" :key="item.id"  @click="$router.push(`/postdetail/${item.post.id}`)" >
        <div class="item">
          <div class="time">{{item.create_date | filterTime('YYYY-MM-DD HH:mm') }}</div>
          <div class="comment" v-if="item.parent" >
            <div class="name">回复：{{item.parent.user.nickname}} </div>
            <div class="comment_content"> {{item.parent.content}} </div>
          </div>
          <div class="content">{{item.content}}</div>
          <div class="origin">
            <div class="oneline-text" >原文: {{item.post.title}}</div>
            <div class="iconfont iconjiantou1 " > </div>
          </div>
        </div>
      </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 6,
      isLoading: false
    }
  },
  created () {
    this.getInfoComment()
  },
  methods: {
    async getInfoComment () {
      const res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = [...this.list, ...data]
      }
      this.loading = false
      this.isLoading = false

      if (data.length < this.pageSize) {
        this.finished = true
      }
    },
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        console.log('下拉刷新')
        this.pageIndex++
        this.getInfoComment()
      }, 1000)
    },
    onRefresh () {
      setTimeout(() => {
        console.log('上拉刷新')
        this.pageIndex = 1
        this.list = []
        this.finished = false
        this.loading = true
        this.getInfoComment()
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped >
.item{
  padding: 20px 16px;
  border-bottom: 1px solid #ccc;
  .time{
    font-size: 16px;
    color: #666;
  }
  .comment{
    margin-top: 15px;
    width: 100%;
    padding: 16px 10px;
    background-color: #eee;
    color: #666;
    .name{
      font-size: 14px;
    }
    .comment_content{
      margin-top: 10px;
      font-size: 15px;
    }
  }
  .content{
    margin-top: 15px;
    font-size: 16px;
  }
  .origin{
    margin-top: 15px;
    font-size: 14px;
    color: #666;
    display: flex;
    align-items: center;
    .oneline-text {
      flex: 1;
      font-size: 14px;
      color: #666;
    }
    .iconfont{
      text-align: right;
    }
  }
}
</style>
