<template>
  <div class="my-comment">
    <hm-header>我的跟帖</hm-header>
    <div class="list" v-for="item in list" :key="item.id"  >
      <div class="item">
        <div class="time">{{item.create_date | filterTime('YYYY-MM-DD HH:mm') }}</div>
        <div class="comment" v-if="item.parent" >
          <div class="name">回复：{{item.parent.user.nickname}} </div>
          <div class="comment_content"> {{item.parent.content}} </div>
        </div>
        <div class="content">{{item.content}}</div>
        <div class="origin">
          <a :href="item.post.content" class="oneline-text" >原文: {{item.post.title}}</a>
          <span class="iconfont iconjiantou1 " > </span>
        </div>
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
    this.getInfoComment()
  },
  methods: {
    async getInfoComment () {
      const res = await this.$axios.get('/user_comments')
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
    a {
      font-size: 14px;
      color: #666;
    }
  }
}
</style>
