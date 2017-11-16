<template>
  <div>
    <div class="user-body">
      <!--用户页面背景颜色-->
      <div class="user-bg"></div>
      <!--用户页面头像部分-->
      <div class="user-head">
        <div class="user-tth-head">
          <img src="../../assets/tth-user/tth-user.png" alt="">
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
   height: 178vmin;
   background-color:#F2F2F2;
 }
  .user-bg{
    width: 100%;
    height: 29.33333vmin;
    background-color: @color-red;
  }
  .user-head{
    position: relative;
    margin: -14.66667vmin auto;
    width: 96.26667vmin;
    height: 55.2vmin;
    background: #fff;
    border-radius: 2.4vmin;
    box-shadow: 1px 0.26667vmin 1.33333vmin #666;
  }
  .user-tth-head{
    width: 19.46667vmin;
    height: 19.46667vmin;
    position: absolute;
    left: 50%;
    transform: translate3D(-50%, -50%, 0);
  }
  .user-tth-head img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

</style>
