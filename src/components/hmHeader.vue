<template>
  <div>
      <div class="box"></div>
    <header>
      <div @click="back" class="back">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="title"><slot></slot></div>
      <div class="extra"></div>
    </header>
  </div>
</template>

<script>
export default {
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped >
.box{
  height: 50px;
}
header {
  position: fixed;
  display: flex;
  top: 0;
  width: 100%;
  height: 50px;
  z-index: 666;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  line-height: 50px;
  text-align: center;
  .back,
  .extra {
    width: 50px;
  }
  .title {
    flex: 1;
    font-size: 18px;
    font-weight: bold;
  }
  .iconjiantou2{
      font-size: 16px;
  }
}
</style>
