<template>
  <div>
    <div class="user-body">
      <!--用户页面背景颜色-->
      <div class="user-bg">
          <img v-show="logout" @click="outClick" class="logout" src="../../assets/tth-user/out.png"/>
      </div>
      <!--用户页面头像部分-->
      <div class="user-head">
        <div @click="userHead">
          <div class="user-tth-head">
            <img  src="../../assets/tth-user/tth-user.png" alt="">
          </div>
          <!--头像下面登陆注册文字-->
          <span v-if="users.length === 0" class="user-login">登陆/注册</span>
          <span v-else="" class="user-login-name" >{{users.Name}}</span>
          <!--余额-->
          <p class="user-balance">
            <!--<i v-if="users !== ''" class="iconfont icon-yanjing yanjing"></i>-->
            <i @click="iconsClick($event)" v-if="users.length !== 0" class="iconfont icon-yanjing yanjing"></i>
            <span @click="balanceClick">
                 余额：<strong>{{air}}</strong>
              <!--<strong v-else="">{{users.Balance}}</strong>-->
            元
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="right iconfont icon-arrow-right"></i>
            </span>
          </p>
        </div>
        <!--充值提款-->
        <div class="user-card">
          <div class="card" @click="cardClick">
              <i class="iconfont icon-chongzhi chongzhi"></i>
              <p>&nbsp;充值</p>
          </div>
          <div class="shuxian"></div>
          <div class="money" @click="moneyClick">
            <i class="iconfont icon-tikuan tikuan"></i>
            <p>&nbsp;提款</p>
          </div>
        </div>
      </div>
      <!--个人信息详情部分-->
      <div class="user-particulars">
        <!--购彩记录-->
        <div class="record" @click="recordClick">
          <i class="zhuanhuan iconfont icon-icozhuanhuan"></i>
          <span>购彩记录</span>
          <i class="arrow-right iconfont icon-arrow-right"></i>
        </div>
        <!--追号记录-->
        <div class="chase" @click="chaseClick">
          <i class="jilu iconfont icon-jilu"></i>
          <span>追号记录</span>
          <i class="arrow-right iconfont icon-arrow-right"></i>
        </div>
        <!--我的红包-->
        <div class="red-packet" @click="redPacket">
          <i class="hongbao iconfont icon-hongbao"></i>
          <span>我的红包</span>
          <i class="arrow-right iconfont icon-arrow-right"></i>
        </div>
        <!--我的跟单-->
        <div class="my-documentary" @click="myDocumentary">
          <i class="gendanwang iconfont icon-gendanwang"></i>
          <span>我的跟单</span>
          <i class="arrow-right iconfont icon-arrow-right"></i>
        </div>
        <!--关于我们-->
        <div class="my-about" @click="aboutClick">
          <i class="iconfont icon-guanyu guanyu"></i>
          <span>关于我们</span>
          <i class="arrow-right iconfont icon-arrow-right"></i>
        </div>
      </div>
    </div>
    <YkrFooter></YkrFooter>
  </div>
</template>
<script>
  import {MessageBox} from 'mint-ui'
  import {fetch} from '@/common/js/localStorage'
  import {getJsCookie, removeJsCookie} from '@/common/js/util'
  import YkrFooter from '../../components/Footer.vue'
  let users = fetch()
  console.log(users)
  export default {
    name: 'User',
    components: {
      YkrFooter
    },
    data () {
      return {
        users: users,
        air: '--',
        logout: false,
        index: null
      }
    },
    methods: {
      // 点击关于页面
      aboutClick () {
        this.$router.push({path: '/about'})
      },
      // 点击提现
      moneyClick () {
        MessageBox({
          title: '提示',
          message: '提现功能请在app里使用！是否立即下载',
          showCancelButton: true,
          confirmButtonClass: 'mint-msgbox-confirm'
        })
        MessageBox.confirm('提现功能请在app里使用！是否立即下载').then(action => {
          this.$router.push({path: '/download'})
        }).catch(function (err) {
          console.log(err)
        })
      },
      // 点击切换小眼睛
      iconsClick (event) {
        if (event.target.className === 'iconfont icon-yanjing yanjing') {
          event.target.className = 'iconfont icon-icons64x6416 icons'
          this.air = this.users.Balance
        } else {
          event.target.className = 'iconfont icon-yanjing yanjing'
          this.air = '--'
        }
      },
      // 点击充值
      cardClick () {
        if (getJsCookie('CP_UserIDGuid') === null) {
          this.$router.push({path: '/login'})
        } else {
          this.$router.push({path: '/userRecharge'})
        }
      },
      // 点击购彩记录
      recordClick () {
        if (getJsCookie('CP_UserIDGuid') === null) {
          this.$router.push({path: '/login'})
        } else {
          this.$router.push({path: '/userRecord'})
        }
      },
      // 点击追号记录
      chaseClick () {
        if (getJsCookie('CP_UserIDGuid') === null) {
          this.$router.push({path: '/login'})
        } else {
          this.$router.push({path: '/userChase'})
        }
      },
      // 点击登陆头像的事件
      userHead () {
        if (getJsCookie('CP_UserIDGuid') === null) {
          this.$router.push({path: '/login'})
        }
      },
      // 点击我的红包
      redPacket () {
        if (getJsCookie('CP_UserIDGuid') === null) {
          this.$router.push({path: '/login'})
        } else {
          this.$router.push({path: '/userRedPacket'})
        }
      },
      // 点击我的跟单
      myDocumentary () {
        if (getJsCookie('CP_UserIDGuid') === null) {
          this.$router.push({path: '/login'})
        } else {
          this.$router.push({path: '/userDocumentary'})
        }
      },
      // 点击余额跳转用户明细
      balanceClick () {
        if (getJsCookie('CP_UserIDGuid') !== null) {
          this.$router.push({path: '/UserDetail'})
        }
      },
      // 点击退出登陆
      outClick () {
        MessageBox.confirm('确定要退出么？').then(action => {
          removeJsCookie('CP_UserIDGuid')
          localStorage.removeItem('datas')
          window.location.reload()
        }).catch(function (err) {
          console.log(err)
        })
      },
      getCookie () {
        if (getJsCookie('CP_UserIDGuid') !== null) {
          this.logout = true
        }
      }
    },
    mounted () {
      this.getCookie()
      if (getJsCookie('CP_UserIDGuid') === null) {
        console.log('未登陆')
      } else {
        console.log('已登陆')
      }
    }
  }
</script>
<style scoped lang="less">
  @import "../../common/css/style.less";
  .yanjing {
    font-size: 8vmin;
    color: @color-text-gray;
  }
  .icons{
    color: @color-text-gray;
    font-size: 8vmin;
  }
  .user-body {
    position: relative;
    width: 100%;
    height: 180vmin;
    background-color: @color-background-gray;
  }
  .user-bg {
    position: relative;
    width: 100%;
    height: 29.33333vmin;
    background-color: @color-red;
  }
  .logout{
    width: 7vmin;
    height: 7vmin;
    position: absolute;
    right: 3%;
    top: 4vmin;
  }
  .user-head {
    position: relative;
    margin: -14.66667vmin auto;
    width: 96.26667vmin;
    height: 55.2vmin;
    background: #fff;
    border-radius: 2.4vmin;
    box-shadow: 1px 0.26667vmin 1.33333vmin #666;
  }

  .user-tth-head {
    width: 19.46667vmin;
    height: 19.46667vmin;
    position: absolute;
    left: 50%;
    top: 5%;
    transform: translate3D(-50%, -50%, 0);
  }

  .user-tth-head img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    box-sizing: border-box;
    border: 0.4vmin solid #ca0000;
  }

  .user-login {
    position: absolute;
    left: 41%;
    top: 27%;
    color: #ff9a9a;
    font-size: 4vmin;
  }
  .user-login-name{
    position: absolute;
    left: 38%;
    top: 27%;
    color: #ff9a9a;
    font-size: 4vmin;
  }

  .user-balance {
    font-size: 4vmin;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    position: absolute;
    left: 33%;
    top: 40%;
  }

  .user-balance strong {
    font-style: normal;
    color: #ff5f5f;
    font-weight: 900;
  }

  .right {
    color: @color-text-gray;
  }

  .user-card {
    width: 60vmin;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    position: absolute;
    left: 20%;
    top: 63%;
  }

  .chongzhi, .tikuan {
    font-size: 10vmin;
    color: @color-red;
  }

  .card {
    font-size: 4vmin;
    position: absolute;
    left: 0;
  }

  .card p {
    margin-top: 5px;
  }

  .money p {
    font-size: 4vmin;
    margin-top: 3px;
  }

  .money {
    position: absolute;
    right: 0;
  }

  .shuxian {
    width: 1px;
    height: 15vmin;
    background-color: rgb(230, 230, 230);
  }

  .user-particulars {
    position: relative;
    margin: 20vmin auto;
    width: 96.26667vmin;
    height: 35%;
    background-color: #fff;
    border-top: 1px solid #eee;
    box-shadow: 1px 0.26667vmin 1.33333vmin #666;
  }

  .record {
    width:90%;
    height: 8vmin;
    border-bottom: 1px solid #e6e6e6;
    position: absolute;
    top: 5%;
    left: 5%;
  }
  .chase {
    width:90%;
    height: 8vmin;
    border-bottom: 1px solid #e6e6e6;
    position: absolute;
    top: 25%;
    left: 5%;
  }

  .red-packet {
    height: 8vmin;
    border-bottom: 1px solid #e6e6e6;
    width:90%;
    position: absolute;
    top: 45%;
    left: 5%;
  }

  .my-documentary {
    height: 8vmin;
    border-bottom: 1px solid #e6e6e6;
    width:90%;
    position: absolute;
    top: 65%;
    left: 5%;
  }
  .my-about {
    width:90%;
    position: absolute;
    top: 84%;
    left: 5%;
  }
  .my-about span {
    font-size: 5vmin;
    font-weight: 400;
    margin-left: 10vmin;
  }

  .my-documentary span {
    font-size: 5vmin;
    font-weight: 400;
    margin-left: 10vmin;
  }

  .red-packet span {
    font-size: 5vmin;
    font-weight: 400;
    margin-left: 10vmin;
  }

  .record span {
    font-size: 5vmin;
    font-weight: 400;
    margin-left: 10vmin;
  }

  .chase span {
    font-size: 5vmin;
    font-weight: 400;
    margin-left: 10vmin;
  }

  .zhuanhuan {
    position: absolute;
    left: 0;
    top: -5px;
    color: @color-text-red;
    font-size: 7vmin;
  }

  .jilu {
    position: absolute;
    left: 0;
    top: -5px;
    color: @color-text-red;
    font-size: 6.8vmin;
  }

  .hongbao {
    position: absolute;
    left: -4px;
    top: -6px;
    color: @color-text-red;
    font-size: 8.6vmin;
  }

  .gendanwang {
    position: absolute;
    left: 0;
    top: -4px;
    color: @color-text-red;
    font-size: 6vmin;
  }
  .guanyu{
    position: absolute;
    left: 0;
    top: -4px;
    color: @color-text-red;
    font-size: 6.8vmin;
  }

  .arrow-right {
   float: right;
    font-size:5.2vmin;
    color: @color-text-gray;
  }

  .hengxian {
    position: absolute;
    left: 10%;
    top: 30px;
    height: 1px;
    width: 90%;
    background-color: #e6e6e6;
  }
</style>
