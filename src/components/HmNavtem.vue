<template>
  <div class="navtem" @click="linkTo" >
      <div class="title"> <slot name="title" ></slot> </div>
      <div class="conten"> <slot></slot> </div>
      <div class="arrow"> <span class="iconfont iconjiantou1" ></span> </div>
  </div>
</template>

<script>
export default {
  props: {
    to: String
  },
  methods: {
    linkTo () {
      if (this.to) {
        this.$router.push(this.to)
      }
    }
  }
}
</script>

<style lang="less" scoped >
.navtem{
    display: flex;
    align-items: center;
    padding: 10px 0;
    margin-left: 20px;
    padding-right: 20px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    .conten{
        flex: 1;
        text-align: right;
        font-size: 12px;
        color: #999;
    }
    .arrow{
        color: #999;
    }
}
</style>
