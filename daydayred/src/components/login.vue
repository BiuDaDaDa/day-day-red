<template>
  <div>
    <!--登陆注册容器-->
    <div class="login-wrap">
      <!--账号登陆-->
      <div class="login-user">
        <p class="login-user-dl">
          账号登陆
        </p>
        <p class="login-user-yzm">
          验证码登陆
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Login'
  }
</script>

<style scoped lang="less">
  @import "../common/css/style.less";
  .login-wrap{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .login-user{
    width: 60%;
    position: absolute;
    left: 30%;
    top: 10vmin;
    display: flex;
    background-color: #fff;
    border-radius: 1.06667vmin;
    overflow: hidden;
    min-height: 8vmin;
    opacity: 1;
  }
</style>
