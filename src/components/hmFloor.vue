<template>
<div>
  <hm-floor :comment="comment.parent" v-if="comment.parent" ></hm-floor>
  <div class="hm-floor" >
      <div class="header">
        <div class="user">1. {{comment.user.nickname}}</div>
        <div class="time">{{comment.create_date | fromNow}}</div>
        <div class="wirte_back">回复</div>
      </div>
      <div class="content">
        {{comment.content}}
      </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'hm-floor',
  props: {
    comment: Object
  },
  created () {
    console.log(this.comment)
  }
}
</script>

<style lang="less" scoped>
.hm-floor{
  margin-top: -1px;
  padding: 10px 16px;
  border: 1px solid #ccc;
  line-height: 30px;
  .header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .user{
      font-size: 14px;
      color: #333;
    }
    .time {
      flex: 1;
      margin-left: 10px;
      font-size: 12px;
      color: #666;
    }
    .wirte_back{
      font-size: 12px;
      color: #666;
    }
  }
  .content{
    font-size: 13px;
  }
}

</style>
