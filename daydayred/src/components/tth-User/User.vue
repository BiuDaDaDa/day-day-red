<template>
  <div>
    <div class="user-body">
      <!--用户页面背景颜色-->
      <div class="user-bg"></div>
      <!--用户页面头像部分-->
      <div>
        <div>

        </div>
      </div>
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
