<template>
  <div @click="$router.push(`/postdetail/${post.id}`)" >
        <div class="video_post" v-if="post.type===2" >
                <div class="title"> {{post.title}} </div>
                <div class="video">
                  <span class="iconfont iconshipin" ></span>
                  <img :src="$url(post.cover[0].url)" alt="">
                </div>
                <div class="user">
                      <p class="nickname" > {{post.user.nickname}} </p>
                      <p class="comment" > {{post.comment_length}} 跟帖 </p>
                </div>
        </div>
        <div class="oneImage" v-else-if="post.cover.length < 3 && post.cover.length > 0" >
                <div class="content">
                    <div class="title"> {{post.title}} </div>
                    <div class="user">
                      <p class="nickname" > {{post.user.nickname}} </p>
                      <p class="comment" > {{post.comment_length}} 跟帖 </p> </div>
                </div>
                <div class="img">
                  <img :src="$url(post.cover[0].url)" alt="">
                </div>
        </div>
        <div class="moreImage"  v-else-if="post.cover.length > 0" >
                <div class="title"> {{post.title}} </div>
                <div class="img">
                  <img :src="$url(post.cover[0].url)" alt="">
                  <img :src="$url(post.cover[1].url)" alt="">
                  <img :src="$url(post.cover[2].url)" alt="">
                </div>
                <div class="user">
                      <p class="nickname" > {{post.user.nickname}} </p>
                      <p class="comment" > {{post.comment_length}} 跟帖 </p>
                </div>
          </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  }
  // created () {
  //   console.log(333)
  // }
}
</script>

<style lang="less" scoped >
  .user{
      display: flex;
      padding-right: 20px;
      font-size: 13px;
      color: #666;
      .nickname{
        flex: 1;
      }
  }
  .oneImage{
      display: flex;
      padding: 16px;
      border-bottom: 1px solid #ccc;
      .content{
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .title{
              font-size: 16px;
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
  .moreImage{
      padding: 16px;
      border-bottom: 1px solid #ccc;
    .title{
      font-size: 16px;
    }
    .img{
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      img{
        object-fit:cover;
        width: 106px;
        height: 74px;
      }
    }
    .user {
      .nickname{
        flex: none;
      }
      .comment{
        margin-left: 20px;
      }
    }

  }
  .video_post{
      padding: 16px;
      border-bottom: 1px solid #ccc;
    .title{
      font-size: 16px;
    }
    .video{
      padding: 10px 0;
      position: relative;
      span {
        position: absolute;
        width: 46px;
        height: 46px;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: rgba(255, 255,255,.5);
        border-radius: 50%;
        text-align: center;
        line-height: 46px;
        font-size: 28px;
        color: #000;
      }
      img {
              width: 100%;
              height: 180px;
              object-fit: cover;
          }
      }
  }
</style>
