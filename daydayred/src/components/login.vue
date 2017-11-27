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
            <mt-field :attr="{ maxlength: 13 }" label="" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
          </div>
        </div>
        <!--请输入短信验证码-->
        <div class="login-sms">
          <i v-show="weibiaoti" class="iconfont icon-weibiaoti9 weibiaoti"></i>
          <i v-show="mima" class="iconfont icon-mima mima"></i>
          <div id="sms-text" v-show="smsisShow">
            <mt-field  :attr="{ maxlength: 6 }" label="" v-model="captcha" placeholder="请输入短信验证码">
              <span @click="sendClick"  v-show="sendYzm" class="send-yzm">发送验证码</span>
            </mt-field>
          </div>
          <div class="sms-text" v-show="passwordShow">
            <mt-field label="" :attr="{ maxlength: 16, minlength:6 }" placeholder="请输入6到16位密码" type="password"
                      v-model="password"></mt-field>
          </div>
        </div>
        <!--登陆-->
        <mt-button class="login-login" @click.native="loginClick" type="default">登&nbsp;&nbsp;录</mt-button>
        <!--注册-->
        <p class="celerity-logon" @click="celerityClicked">快速注册</p>
      </div>
    </div>
  </div>
</template>
<script>
  /* eslint-disable no-trailing-spaces */
  import {Toast} from 'mint-ui'
  import isPhone from '@/common/js/isPhone'
  import sendCode from '@/common/js/sendCode'
//  import guid from '@/common/js/guid'
  import {getJsCookie} from '@/common/js/util'
  import TrimJs from '@/common/js/trimJs'
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
        mima: false,
        phone: '',
        captcha: '',
        password: '',
        cookieValue: '',
        guid: ''
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
      },
      // 点击登陆判断是否有账号和短信验证码
      loginClick () {
        if (this.loginUser === 'login-user-dl') {
          // 验证码登陆
          let phone = TrimJs(this.phone, 'g')
          let myUrl = `"Mobile":"${phone}","ValidCode":"${this.captcha}","RandomGuid":"${this.guid}"`
          let myOtherUrl = encodeURI(myUrl)
          if (this.phone.length <= 0 || this.captcha.length <= 0) {
            Toast({
              message: '获取验证码后手机号不能修改或者已经过时！',
              position: 'middle',
              iconClass: 'iconfont icon-guanbi1',
              duration: 5000
            })
            return false
          } else {
            isPhone(phone)
          }
          this.$request({
            type: 'get',
            url: '/api/user/Handler.ashx?action=702&params={' + myOtherUrl + '}',
            success: function (res) {
              console.log(res)
              let Guid = res.data.data.Guid
              let myUrl = `"UserIDGuid":"${Guid}"`
              let myOtherUrl = encodeURI(myUrl)
              if (res.status === 200) {
                console.log(123)
                Toast({
                  message: '登陆成功',
                  position: 'middle',
                  iconClass: 'iconfont icon-dui',
                  duration: 800
                })
                this.$request({
                  type: 'get',
                  url: '/api/user/Handler.ashx?action=801&params={' + myOtherUrl + '}',
                  success: function (res) {
                    console.log(res)
                    if (res.status === 200) {
                      this.cookieValue = getJsCookie('CP_UserIDGuid')
                      if (this.cookieValue === Guid) {
                        // 获取用户数据以字符串形式保存在localStorage中
                        let data = JSON.stringify(res.data.data)
                        window.localStorage.setItem('datas', data)
                        this.$router.push({path: '/user'})
                        window.location.reload()
                      } else {
                        window.localStorage.removeItem('datas')
                      }
                    }
                  },
                  failed: function (err) {
                    console.log(err)
                  }
                })
              }
            },
            failed: function (err) {
              console.log('验证码登陆' + err)
            }
          })
        } else {
          let phone = TrimJs(this.phone, 'g')
          let myUrl = `"UserName":"${phone}","Password":"${this.password}"`
          let myOtherUrl = encodeURI(myUrl)
          // 密码登陆
          if (this.phone.length <= 0) {
            isPhone(phone)
          } else {
            isPhone(phone)
          }
          this.$request({
            type: 'get',
            url: '/api/user/Handler.ashx?action=701&params={' + myOtherUrl + '}',
            success: function (res) {
              let Guid = res.data.data.Guid
              let myUrl = `"UserIDGuid":"${Guid}"`
              let myOtherUrl = encodeURI(myUrl)
              console.log(res)
              if (res.status === 200) {
                Toast({
                  message: '登陆成功',
                  position: 'middle',
                  iconClass: 'iconfont icon-dui',
                  duration: 800
                })
                this.$request({
                  type: 'get',
                  url: '/api/user/Handler.ashx?action=801&params={' + myOtherUrl + '}',
                  success: function (res) {
                    if (res.status === 200) {
                      this.cookieValue = getJsCookie('CP_UserIDGuid')
                      if (this.cookieValue === Guid) {
                        // 获取用户数据以字符串形式保存在localStorage中
                        let data = JSON.stringify(res.data.data)
                        window.localStorage.setItem('datas', data)
//                        switch (this.index) {
//                          case 0:
//                            this.$router.push({path: '/home'})
//                            break
//                          case 1:
//                            this.$router.push({path: '/runlottery'})
//                            break
//                          case 2:
//                            this.$router.push({path: '/documentary'})
//                            break
//                          case 3:
//                            this.$router.push({path: '/score'})
//                            break
//                          case 4:
//                            this.$router.push({path: '/user'})
//                            break
//                        }
                        this.$router.push({path: '/user'})
                        window.location.reload()
                      } else {
                        window.localStorage.removeItem('datas')
                      }
                    }
                  },
                  failed: function (err) {
                    console.log(err)
                  }
                })
              }
            },
            failed: function (err) {
              console.log('未找到的密码' + err)
            }
          })
          console.log('密码登陆')
        }
      },
      // 点击发送验证按钮
      sendClick (event) {
        let phone = TrimJs(this.phone, 'g')
        let myUrl = `"Mobile":"${phone}","TypeID":"4"`
        let myOtherUrl = encodeURI(myUrl)
        if (this.phone.length <= 0) {
          isPhone(phone)
        } else {
          isPhone(phone)
        }
        this.$request({
          type: 'get',
          url: '/api/user/Handler.ashx?action=704&params={' + myOtherUrl + '}',
          success: function (res) {
            this.guid = res.data.data
            let msg = res.data.msg
            sendCode(msg, event)
          },
          failed: function (err) {
            console.log('未找到的验证码数据是' + err)
          }
        })
      }
    },
    watch: {
      // 通过watch来设置空格
      phone (newValue, oldValue) {
        if (newValue.length > oldValue.length) { // 文本框中输入
          if (newValue.length === 3 || newValue.length === 8) {
            this.phone = this.phone + ' '
          }
        } else { // 文本框中删除
          if (newValue.length === 9 || newValue.length === 4) {
            this.phone = this.phone.trim()
          }
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../common/css/style.less";
  .login-wrap {
    width: 100%;
    height: 180vmin;
    background-color: white;
    position: relative;
  }

  .login-user {
    width: 58.66667vmin;
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
  .login-user p{
    font-size: 4vmin;
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
    top: 35vmin;
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

  #phone-text {
    width: 80vmin;
    height: 12vmin;
  }

  #sms-text {
    width: 65vmin;
    height: 12vmin;
  }

  .sms-text {
    width: 80vmin;
    height: 12vmin;
  }

  .login-sms {
    margin-top: 20px;
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

  .phone-dl {
    margin-left: 5vmin;
    font-size: 6vmin;
    color: @color-text-red;
  }

  .weibiaoti {
    margin-left: 4vmin;
    font-size: 8vmin;
    color: @color-text-red;
  }

  .mima {
    margin-left: 5vmin;
    font-size: 6vmin;
    color: @color-text-red;
  }

  .send-yzm {
    line-height: 12vmin;
    color: @color-text-red;
    font-size: 4.8vmin;
  }

  .login-login {
    margin-top: 5vmin;
    width: 80vmin;
    height: 10vmin;
    background-color: @color-text-red;
    border: none;
    color: @color-background-white;
    font-size:5vmin;
    border-radius: 5px;
  }

  .celerity-logon {
    margin-top: 5vmin;
    width: 80vmin;
    text-align: center;
    color: @color-text-red;
    font-size: 4vmin;
  }

</style>
