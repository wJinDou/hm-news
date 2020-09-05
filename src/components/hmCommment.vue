<template>
<div class="_commment" >
    <div class="title">
      <div class="left">
        <img :src="$base + comment.user.head_img" alt="">
      </div>
      <div class="user">
        <div class="nickname"> {{comment.user.nickname}} </div>
        <div class="time"> {{comment.create_date | fromNow}} </div>
      </div>
      <div class="writeBack">
        回复
      </div>
    </div>
    <div class="content">
      <hm-floor :comment="comment.parent" v-if="comment.parent" ></hm-floor>
      <div class="content_txt">
        {{comment.content}}
      </div>
    </div>
</div>
</template>

<script>
export default {
  props: {
    comment: Object
  }
}
</script>

<style lang="less" scoped >
.content{
  margin-top: 10px;
  font-size: 14px;
  .content_txt{
    word-wrap:break-word;
    word-break:break-all;
    margin-top: 10px;
  }
}
.title{
  display: flex;
  align-items: center;
  .user{
    line-height: 20px;
    .nickname{
      font-size: 14px;
      color: #333;
    }
    .time{
      font-size: 12px;
      color: #666;
    }
  }
  .left{
    margin-right: 10px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .user{
    flex: 1;
  }
  .writeBack{
    font-size: 14px;
    color: #666;
  }
}
._commment{
  padding: 20px 18px;
  border-bottom: 1px solid #eee;
}
</style>
