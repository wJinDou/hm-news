<template>
<div>
    <div class="header">
      <div class="back">
        <span class="iconfont iconjiantou2" ></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew" ></span>
      </div>
      <div class="btnfollow">
        已关注
      </div>
  </div>
  <div class="title">
    <h4>{{post.title}}</h4>
    <div class="user">
      <span class="nickname"> {{post.user.nickname}} </span>
      <span class="time"> {{post.create_date | filterTime}} </span>
    </div>
  </div>
  <div class="content" v-html="post.content" >
  </div>
  <div class="like">
    <div class="btnGood">
      <span class="iconfont icondianzan" ></span>
      <span>112</span>
    </div>
    <div class="wechat">
      <span class="iconfont iconweixin" ></span>
      <span>微信</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      post: {
        user: {}
      }
    }
  },
  created () {
    // console.log(this.$route.params)
    this.getPost()
  },
  methods: {
    async getPost () {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post/${id}`)
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.post = data
      }
    }
  }
}
</script>

<style lang="less" scoped >
.header{
  display: flex;
  padding: 16px 20px;
  height: 50px;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .back{
    width: 30px;
  }
  .back{
    font-size: 18px;
  }
  .btnfollow{
    width: 80px;
    border-radius: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #ccc;
    font-size: 14px;
  }
  .logo{
    flex: 1;
    .iconfont{
      font-size: 60px;
    }
  }
}

.title{
  padding: 16px 20px;
  h4 {
    font-size: 20px;
  }
  .user{
    margin-top: 10px;
    color: #666;
    font-size: 16px;
    .time{
      margin-left: 10px;
    }
  }
}
.content{
  font-size: 16px;
  color: #666;
  /deep/ img {
    width: 100%;
    object-fit: cover;
  }
}
.like{
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  .btnGood,.wechat{
    width: 100px;
    height: 35px;
    border: 1px solid #ccc;
    color: #666;
    border-radius: 35px;
    text-align: center;
    line-height: 35px;
    font-size: 18px;
    .iconfont {
       margin-right: 5px;
    }
  }
  .wechat{
    .iconfont{
      font-size: 18px;
      color:#0d5;
    }
  }

}
</style>
