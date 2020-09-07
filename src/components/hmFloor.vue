<template>
<div>
  <!-- 子传父传父传父传父传父…………的方法 -->
  <!-- <hm-floor @reply="reply" :comment="comment.parent" :count="count-1" v-if="comment.parent" ></hm-floor> -->
  <hm-floor  :comment="comment.parent" :count="count-1" v-if="comment.parent" ></hm-floor>
  <div class="hm-floor" >
      <div class="header">
        <div class="user">{{count}}. {{comment.user.nickname}}</div>
        <div class="time">{{comment.create_date | fromNow}}</div>
        <!-- 子传父传父传父传父传父…………的方法 -->
        <!-- <div class="wirte_back" @click="reply(comment.user.nickname, comment.id)" >回复</div> -->
        <!-- bus的方法 -->
        <div class="wirte_back" @click="reply(comment.user.nickname, comment.id)" >回复</div>
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
    count: Number,
    comment: Object
  },
  created () {
    console.log(this.comment)
  },
  methods: {
    reply (nickname, id) {
      this.$bus.$emit('reply', nickname, id)
    }
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
