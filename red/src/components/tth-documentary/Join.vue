<template>
<div id="documentary_join_wrap">
  <img src="../../assets/tth-documentary/poster.png">
  <a href="JavaScript:">
    申请成为彩帝
  </a>
</div>
</template>

<script>
  export default {
    name: 'Join'
  }
</script>

<style scoped lang="less">
  @import "../../common/css/style.less";
  #documentary_join_wrap img{
    width: 100%;
  }
  #documentary_join_wrap a{
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    box-sizing: border-box;
    background: #ff5f5f;
    display: block;
    height: 11.73333vmin;
    line-height: 11.73333vmin;
    text-align: center;
    color: #fff;
    font-size: 4.8vmin;
  }


</style>
