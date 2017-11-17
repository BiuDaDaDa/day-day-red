<template>
  <div class="logon-body">
    <!--欢迎注册-->
    <div class="Welcome-logon-body">
      <i class="iconfont icon-jiantou jiantouZ" @click="gobackClick"></i>
      <span class="welcome-logon">欢迎注册</span>
    </div>
    <!--请输入手机号-->
    <div class="login-phone-body">
      <div class="login-phone">
        <i class="iconfont icon-shouji shouji"></i>
        <div id="phone-text">
          <mt-field  label="" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
        </div>
        <!--<input @input="phoneinput" type="text" v-model="phoneValue" placeholder="请输入手机号" class="phone-text">-->
      </div>
      <!--请输入短信验证码-->
      <div class="login-sms">
        <i class="iconfont icon-weibiaoti9 weibiaoti"></i>
        <div class="sms-text">
          <mt-field label="" v-model="captcha" placeholder="请输入验证码">
            <span class="send-yzm">发送验证码</span>
          </mt-field>
        </div>
        <!--<input @input="smsinput" type="text" v-model="smsValue" placeholder="请输入验证码" class="sms-text">-->
        <!--<i v-show="guanbiisSms" @click="smsClick" class="iconfont icon-guanbi guanbisms"></i>-->
      </div>
      <!--请输入密码-->
      <div class="logon-password">
        <i class="iconfont icon-mima mima"></i>
        <div class="sms-text">
          <mt-field label="" placeholder="6~16位密码" type="password" v-model="password"></mt-field>
        </div>
      </div>
      <!--登陆-->
      <button class="login-login">立即注册</button>
      <!--注册-->
      <p class="celerity-logon">注册即代表我已满18周岁并同意《用户服务协议》</p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Logon',
    data () {
      return {}
    },
    methods: {
      // 点击右箭头的返回事件
      gobackClick () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../common/css/style.less";

  .logon-body {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .Welcome-logon-body {
    width: 100%;
    height: 12vmin;
    background-color: @color-text-red;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .jiantouZ {
    line-height: 12vmin;
    color: white;
    font-size: 16px;
    font-weight: bold;
    margin-left: 5%;
  }

  .welcome-logon {
    line-height: 10vmin;
    color: #F2F2F2;
    font-size: 22px;
    margin-left: 30%;
  }

  .login-user-dl {
    width: 50%;
    height: 10vmin;
    text-align: center;
    line-height: 10vmin;
    color: @color-text-red;
  }

  .login-user-yzm {
    line-height: 10vmin;
    height: 10vmin;
    width: 50%;
    text-align: center;
    background-color: @color-text-red;
    color: #F2F2F2;
  }

  .login-phone-body {
    width: 90vmin;
    position: absolute;
    left: 10%;
    top: 20vmin;
  }

  .login-phone {
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
  .login-sms {
    margin-top: 5%;
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

  .shouji {
    margin-left: 18px;
    font-size: 30px;
    color: @color-text-red;
  }

  .guanbi {
    margin-left: 12%;
    font-size: 25px;
    color: #CCCCCC;
  }
  .guanbisms{
    font-size: 25px;
    color: #CCCCCC;
  }

  .weibiaoti {
    margin-left: 18px;
    font-size: 30px;
    color: @color-text-red;
  }
  .mima {
    margin-left: 20px;
    font-size: 25px;
    color: @color-text-red;
  }
  #phone-text {
    width: 60vmin;
    height: 12vmin;
  }
  .sms-text {
    width: 65vmin;
    height: 12vmin;
  }
  .send-yzm {
    color: @color-text-red;
    font-size: 16px;
  }
  .login-login {
    margin-top: 25px;
    width: 80vmin;
    height: 10vmin;
    background-color: @color-text-red;
    border: none;
    outline: none;
    color: @color-background-white;
    font-size: 20px;
    border-radius: 5px;
  }
  .celerity-logon {
    width: 75vmin;
    text-align: center;
    color: @color-text-gray;
    font-size: 12px;
    margin: 6% 2%;
  }
  .logon-password {
    margin-top: 5%;
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

</style>
