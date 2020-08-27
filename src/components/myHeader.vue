<template>
  <header>
    <div class="back">
      <span class="iconfont iconjiantou2"></span>
    </div>
    <div class="title"><slot></slot></div>
    <div class="extra"></div>
  </header>
</template>

<script>
export default {}
</script>

<style lang="less" >
header {
  display: flex;
  height: 50px;
  border-bottom: 1px solid #333;
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
