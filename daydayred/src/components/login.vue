<template>
  <div>
    <!--登陆注册容器-->
    <div class="login-wrap">
      <!--账号登陆-->
      <div class="login-user">
        <p :class="loginUser" @click="accountClicked()">
          账号登陆
        </p>
        <p :class="loginYzm" @click="yzmClicked()">
          验证码登陆
        </p>
      </div>
      <!--请输入手机号-->
      <div class="login-phone-body">
        <div class="login-phone">
          <i class="iconfont icon-denglu phone-dl"></i>
          <div id="phone-text">
            <mt-field  label="" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
          </div>
        </div>
      <!--请输入短信验证码-->
        <div class="login-sms">
          <i v-show="weibiaoti" class="iconfont icon-weibiaoti9 weibiaoti"></i>
          <i v-show="mima" class="iconfont icon-mima mima"></i>
          <div id ="sms-text" v-show="smsisShow">
            <mt-field  label="" v-model="captcha" placeholder="请输入短信验证码">
              <span v-show="sendYzm" class="send-yzm">发送验证码</span>
            </mt-field>
          </div>
          <div class="sms-text" v-show="passwordShow">
            <mt-field label=""  placeholder="请输入6到16位密码" type="password" v-model="password"></mt-field>
          </div>
        </div>
        <!--登陆-->
        <button class="login-login">登&nbsp;&nbsp;录</button>
        <!--注册-->
        <p class="celerity-logon" @click="celerityClicked">快速注册</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Login',
    data () {
      return {
        loginUser: 'login-user-dl',
        loginYzm: 'login-user-yzm',
        sendYzm: true,
        smsisShow: true,
        passwordShow: false,
        weibiaoti: true,
        mima: false
      }
    },
    methods: {
      // 点击账号登陆事件
      accountClicked () {
        if (this.loginUser === 'login-user-dl') {
          this.loginUser = 'login-user-yzm'
          this.loginYzm = 'login-user-dl'
          this.sendYzm = false
          this.smsisShow = false
          this.passwordShow = true
          this.weibiaoti = false
          this.mima = true
        }
      },
      // 点击验证码登录
      yzmClicked () {
        if (this.loginUser === 'login-user-yzm') {
          this.loginUser = 'login-user-dl'
          this.loginYzm = 'login-user-yzm'
          this.sendYzm = true
          this.smsisShow = true
          this.passwordShow = false
          this.weibiaoti = true
          this.mima = false
        }
      },
      // 点击快速注册事件
      celerityClicked () {
        this.$router.push({path: '/logon'})
      }
    }
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
    left: 20%;
    top: 10vmin;
    display: flex;
    background-color: #fff;
    border: 1px solid @color-text-red;
    border-radius: 1.06667vmin;
    overflow: hidden;
    min-height: 8vmin;
    opacity: 1;
    text-align: center;
  }
  .login-user-dl{
    width: 50%;
    height: 10vmin;
    text-align: center;
    line-height: 10vmin;
    color: @color-text-red;
  }
  .login-user-yzm{
    line-height: 10vmin;
    height: 10vmin;
    width: 50%;
    text-align: center;
    background-color: @color-text-red;
    color: #F2F2F2;
  }
  .login-phone-body{
    width: 90vmin;
    position: absolute;
    left: 10%;
    top:35vmin;
  }
  .login-phone{
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    line-height: 10vmin;
    overflow: hidden;
    width: 90%;
    height: 13vmin;
    box-sizing: border-box;
    border: 2px solid rgb(204, 204, 204);
    border-radius: 10px;
  }
  #phone-text {
    width: 80vmin;
    height: 12vmin;
  }
  #sms-text{
    width: 65vmin;
    height: 12vmin;
  }
  .sms-text{
    width: 80vmin;
    height: 12vmin;
  }
  .login-sms{
    margin-top: 30px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    line-height: 11vmin;
    overflow: hidden;
    width: 90%;
    height: 13vmin;
    box-sizing: border-box;
    border: 2px solid rgb(204, 204, 204);
    border-radius: 10px;
  }
  .phone-dl{
    margin-left: 20px;
    font-size: 24px;
    color: @color-text-red;
  }
  .weibiaoti{
    margin-left: 16px;
    font-size: 30px;
    color: @color-text-red;
  }
  .mima{
    margin-left: 16px;
    font-size: 30px;
    color: @color-text-red;
  }
  .send-yzm{
    color: @color-text-red;
    font-size: 17px;
  }
  .login-login{
    margin-top: 25px;
    width: 80vmin;
    height: 10vmin;
    background-color: @color-text-red;
    border: none;
    color: @color-background-white;
    font-size: 20px;
    border-radius: 5px;
  }
  .celerity-logon{
    margin-top: 25px;
    width: 80vmin;
    text-align: center;
    color: @color-text-red;
    font-size: 14px;
  }

</style>
