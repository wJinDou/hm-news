<template>
<div class="postdetail" >
    <div class="header">
      <div class="back" @click="$router.go(-1)">
        <span class="iconfont iconjiantou2" ></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew" ></span>
      </div>
      <!-- 关注按钮 -->
      <div>
        <div v-if="post.has_follow" @click="unfollow(post.user.id)"  class="btnfollow">
          已关注
        </div>
        <div v-else class="follow" @click="follows(post.user.id)" >
          关注
        </div>
      </div>
  </div>
  <!-- 标题部分 -->
  <div class="title">
    <h4>{{post.title}}</h4>
    <div class="user">
      <span class="nickname"> {{post.user.nickname}} </span>
      <span class="time"> {{post.create_date | filterTime}} </span>
    </div>
  </div>
  <!-- 内容部分 -->
  <div class="content" v-if="post.type===1" v-html="post.content" >
  </div>
  <div class="video" v-else >
    <video controls v-if="video(post.content).startsWith('http') " autoplay :src="video(post.content)"></video>
    <div v-else v-html="post.content" ></div>
  </div>
  <!-- 点赞功能 -->
  <div class="like">
    <div class="btnGood" :class="{'is_like': post.has_like}" @click="like(post.id)" >
      <span class="iconfont icondianzan"  ></span>
      <span> {{post.like_length}} </span>
    </div>
    <div class="wechat">
      <span class="iconfont iconweixin" ></span>
      <span>微信</span>
    </div>
  </div>

  <!-- 评论列表 -->
  <div class="commment_list">
    <h3>精彩跟帖</h3>
    <hm-comment @reply="reply"  :comment="item" v-for="item in commentList" :key="item.id" ></hm-comment>
  </div>

  <!-- 回复功能 -->
  <div class="footer_textarea"  v-if="isShowTextarea"  >
    <div class="write_back">
      <textarea  ref="textarea" :placeholder="'回复: ' + nickname" v-model="content"></textarea>
    </div>
    <van-button class="write_back_btn" type="primary" round size="small" block color="#f33" @click="postComment(post.id)" >发送</van-button>
  </div>
  <div class="footer_input"  v-else >
    <div class="write_back">
      <input type="text" placeholder="写跟帖" v-model="content" @click="showTextarea" >
    </div>
    <span class="iconfont iconpinglun-" > <i>132</i> </span>
    <span class="iconfont iconshoucang " :class="{'is_star': post.has_star}" @click="star(post.id)" ></span>
    <span class="iconfont iconfenxiang " ></span>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      post: {
        user: {},
        content: ''
      },
      commentList: [],
      isShowTextarea: false,
      content: '',
      nickname: '',
      parentId: ''
    }
  },
  created () {
    // console.log(this.$route.params)
    this.getPost()
    this.getCommentList()
    this.$bus.$on('reply', this.Onreply)
  },
  destroyed () {
    this.$bus.$off('reply', this.Onreply)
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
    },
    async getCommentList () {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
      }
    },
    video (input) {
      const div = document.createElement('div')
      div.innerHTML = input
      return div.innerText
    },
    isLogin () {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({
          name: 'login',
          params: {
            back: true
          }
        })
        return true
      } else {
        return false
      }
    },
    // 关注用户
    async follows (id) {
      if (this.isLogin()) return this.$toast('请先登录')
      const res = await this.$axios(`/user_follows/${id}`)
      console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getPost()
      } else {
        this.$toast.fail(message)
      }
    },
    // 取消关注用户
    async unfollow (id) {
      console.log('取消关注')
      if (this.isLogin()) return this.$toast('请先登录')
      const res = await this.$axios(`/user_unfollow/${id}`)
      console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getPost()
      } else {
        this.$toast.fail(message)
      }
    },
    // 点赞文章
    async like (id) {
      console.log('点赞文章')
      if (this.isLogin()) return this.$toast('请先登录')
      const res = await this.$axios(`/post_like/${id}`)
      console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getPost()
      } else {
        this.$toast.fail(message)
      }
    },
    async star (id) {
      console.log('收藏文章')
      if (this.isLogin()) return this.$toast('请先登录')
      const res = await this.$axios(`/post_star/${id}`)
      console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getPost()
      } else {
        this.$toast.fail(message)
      }
    },
    async showTextarea () {
      this.isShowTextarea = true
      await this.$nextTick()
      console.log(this.$refs.textarea)
      this.$refs.textarea.focus()
    },
    async postComment (id) {
      console.log('发表评论')
      if (this.isLogin()) return this.$toast('请先登录')
      const res = await this.$axios.post(`/post_comment/${id}`, {
        content: this.content,
        parent_id: this.parentId
      })
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.content = ''
        this.nickname = ''
        this.parentId = ''
        this.isShowTextarea = false
        this.getCommentList()
      } else {
        this.$toast.success(message)
      }
    },
    async reply (nickname, id) {
      console.log(nickname, id)
      this.nickname = nickname
      this.parentId = id
      this.showTextarea()
    },
    Onreply (nickname, id) {
      console.log(nickname, id)
      this.nickname = nickname
      this.parentId = id
      this.showTextarea()
    }
  }
}
</script>

<style lang="less" scoped >
.footer_input .iconfont.is_star{
  color: red;
}
.commment_list{
  margin-top: 20px;
  padding-top: 20px;
  border-top: 5px solid #eee;
  h3{
    font-size: 20px;
    font-weight: normal;
    text-align: center;
  }
}
.footer_textarea{
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px 8px ;
  height: 100px;
  display: flex;
  background-color: #fff;
  align-items: flex-end;
  justify-content: space-around;
  .write_back{
    flex: 1;
    height: 100%;
    textarea {
      width: 100%;
      height: 100%;
      font-size: 14px;
      padding: 10px 18px ;
      border-radius: 15px;
      background-color: #eee;
      border: none;
      resize: none;
    }
  }
  .write_back_btn{
    width: 80px;
    margin-left: 10px;
    width: 100px;
  }
}
.footer_input{
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px 8px ;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: #fff;
  .write_back{
    width: 200px;
    input {
      width: 100%;
      height: 30px;
      font-size: 14px;
      padding-left: 20px;
      border-radius: 30px;
      outline: none;
      border: none;
      color: #000;
      background-color: #eee;
    }
  }
  .iconfont {
    color: #999;
    font-size: 24px;
  }
  .iconpinglun-{
    position: relative;
    i{
      position: absolute;
      font-style:normal;
      height: 12px;
      border-radius: 12px;
      top: -2px;
      right: -10px;
      line-height: 12px;
      padding: 0 5px;
      background-color: red;
      color: #fff;
      font-size: 10px;
    }
  }
}
.like .btnGood.is_like{
  background-color: red;
  border: 0 none;
  span{
    color: #fff;
  }
}
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
  .btnfollow,.follow{
    width: 80px;
    border-radius: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #ccc;
    font-size: 14px;
  }
  .follow{
    background-color: #f00;
    border: none;
    color: #fff;
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
  padding: 16px 20px;
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
  justify-content: space-evenly;
  .btnGood,.wechat{
    width: 80px;
    height: 30px;
    border: 1px solid #ccc;
    color: #666;
    border-radius: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
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
.video{
  padding: 16px 20px;
  font-size: 16px;
  color: #666;
  video{
  width: 100%;
  }
}
.postdetail{
  padding-bottom: 50px;
}
</style>
