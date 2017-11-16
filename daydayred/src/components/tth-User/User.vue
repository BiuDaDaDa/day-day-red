<template>
  <div>
    <div class="user-body">
      <div class="user-bg"></div>
    </div>
  </div>
</template>
<script>
    export default {
      name: 'User'
    }
</script>
<style scoped lang="less">
 @import "../../common/css/style.less";
 .user-body{
   width: 100%;
   height: 100%;
 }
  .user-bg{
    width: 100%;
    height: 29.33333vmin;
    background-color: @color-red;
  }
</style>
