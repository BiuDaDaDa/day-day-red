<template>
  <div>
    <!--充值页面容器-->
    <div class="recharge-body">
      <!--充值-->
      <div class="recharge-text">
        <i @click="goBackCLick" class="iconfont icon-jiantou jiantou"></i>
        <span>充值</span>
      </div>
      <!--账户内容部分的容器-->
      <div class="account-body">
        <!--账户余额部分-->
        <ul class="account-ul">
          <li>
            <span>账户</span>
            <strong>{{users.Name}}</strong>
          </li>
          <li>
            <span>账户余额</span>
            <strong class="balance">{{users.Balance}}元</strong>
          </li>
        </ul>
        <!--充值金额部分-->
        <div class="recharge-amount clear_float">
          <!--充值-->
          <div class="recharge-amount-body clear_float">
            <h6>充值金额</h6>
            <span @click="jumpClick">
               <strong>充值20元及以上送88元</strong>
               <i class="iconfont icon-arrow-right arrow"></i>
             </span>
          </div>
          <!--充值数量-->
         <ul class="account-num-body">
           <li @click="rechargeNum(index)" v-for="(value,index) in recharge" :key="index" :class="value.className">
             <span>{{value.text}}</span>
             <div v-if="index === 5" class="rest">
               <input  type="text" :placeholder="rest">
             </div>
           </li>
         </ul>
        </div>
        <!--支付方式支付宝还是微信-->
        <div class="payment-body">
          <div class="payment-one">
            <h5>支付方式&nbsp;&nbsp;&nbsp;<span>支付完成后点击左上角app名返回</span></h5>
          </div>
          <div class="payment-two">
            <div class="payment-alipay">
                <img src="../../assets/tth-user/20170601184552.png"/>
                <span>支付宝</span>
              <i @click="paymentClick" :class="checked"></i>
            </div>
            <div class="payment-WeChat">
                <img src="../../assets/tth-user/20170601184553.png"/>
                <span>微信</span>
                <p>快捷方便，极速到账</p>
              <i @click="wechatClick" :class="checkedon"></i>
            </div>
          </div>
        </div>
        <!--底部充值-->
        <div class="footer-payment">
          <p>
            <b>充值金额不可提现只能用于购彩，中奖后奖金可以提现。</b>
            <span>充值</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {fetch} from '@/common/js/localStorage'
  let users = fetch()
  export default {
    name: 'UserRecharge',
    data () {
      return {
        users: users,
        recharge: [
          { className: 'active check', text: '20元' },
          { className: '', text: '50元' },
          { className: '', text: '100元' },
          { className: '', text: '500元' },
          { className: '', text: '1000元' },
          { className: '', text: '' }
        ],
        rest: '自定义金额',
        checked: 'iconfont icon-checkedon checkdon-one',
        checkedon: 'iconfont icon-checkedon checkdon-two'
      }
    },
    methods: {
      // 点击金额事件
      rechargeNum (index) {
        for (let i = 0; i < this.recharge.length; i++) {
          this.recharge[i].className = ''
          if (index === 5) {
            this.recharge[0].className = ''
            this.recharge[1].className = ''
            this.recharge[2].className = ''
            this.recharge[3].className = ''
            this.recharge[4].className = ''
            this.rest = ''
            this.recharge[5].className = 'active'
            return false
          } else {
            this.rest = '自定义金额'
            this.recharge[i].className = ''
            this.recharge[index].className = 'active check'
          }
        }
      },
      // 点击箭头返回上一页
      goBackCLick () {
        this.$router.go(-1)
      },
      // 点击跳转到充值优惠
      jumpClick () {
        this.$router.push({path: '/recharge'})
      },
      // 点击支付宝的点击事件
      paymentClick () {
        if (this.checkedon === 'iconfont icon-checkedon checkdon-one') {
          this.checked = 'iconfont icon-checkedon checkdon-one'
          this.checkedon = 'iconfont icon-checkedon checkdon-two'
        } else {
          this.checked = 'iconfont icon-checkedon checkdon-one'
        }
      },
      // 点击微信的点击事件
      wechatClick () {
        if (this.checked === 'iconfont icon-checkedon checkdon-one') {
          this.checkedon = 'iconfont icon-checkedon checkdon-one'
          this.checked = 'iconfont icon-checkedon checkdon-two'
        } else {
          this.checkedon = 'iconfont icon-checkedon checkdon-one'
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/css/style.less";
  /*清除浮动必须加到父级元素上*/
  .clear_float::after{
    content: "";
    display: table;
    clear: both;
  }
  .recharge-amount ul .active {
     border: 1px solid @color-text-red;
  }
  .check::after{
    content: " ";
    position: absolute;
    right: 0;
    bottom: 0;
    width: 4.8vmin;
    height: 4.8vmin;
    background: url('../../assets/tth-user/20170609133129.png') no-repeat 50%;
    background-size: cover;
  }
  .recharge-body {
    color: #404040;
    width: 100%;
    height: 180vmin;
    background-color: #F2F2F2;
  }

  .recharge-text {
    display: flex;
    align-items: center;
    width: 100%;
    height: 14vmin;
    line-height: 14vmin;
    background-color: @color-text-red;
  }

  .jiantou {
    font-size: 15px;
    font-weight: 700;
    color: @color-background-white;
    margin-left: 5%;
  }

  .recharge-text span {
    font-size: 23px;
    color: @color-background-white;
    margin-left: 35%;
  }

  .account-body {
    width: 100%;
    height: 474px;
  }

  .account-ul {
    margin-top: 3%;
    width: 100%;
    height: 110px;
    background-color: @color-background-white;
  }

  .account-ul li {
    width: 90%;
    height: 14.66667vmin;
    line-height: 14.66667vmin;
    font-size: 4.26667vmin;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    border-bottom: 1px solid #e6e6e6;
    margin: 0 auto;
  }

  .account-ul li span {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
  }

  .balance {
    color: @color-text-red;
  }

  .recharge-amount {
    width: 100%;
    height: 155px;
    background-color: @color-background-white;
  }
  .recharge-amount-body {
    padding-top: 3%;
    width: 90%;
    height: 15px;
    margin: 15px auto;
  }
  .recharge-amount-body h6 {
    font-size: 14px;
    float: left;
  }
  .recharge-amount-body span{
     float: right;
    font-size: 15px;
    color: @color-text-red;
  }
  .arrow {
    color: @color-text-gray;
    font-size: 15px;
  }
  .account-num-body {
    width: 100%;
    margin: 10px 5%;
    height: 300px;
  }
  .account-num-body li {
    position: relative;
    width: 25.66667vmin;
    height: 8.53333vmin;
    box-sizing: border-box;
    line-height: 8.53333vmin;
    border: 1px solid #999;
    border-radius: .53333vmin;
    float: left;
    margin: 5.33333vmin 6.66667vmin 0 0;
    text-align: center;
    font-size: 4.26667vmin;
    overflow: hidden;
  }
  .rest{
    position: relative;
    border-color: #ff5f5f;
    overflow: visible;
  }
  .rest input{
    outline: none;
    font-size: 4.26667vmin;
    display: inline-block;
    border: none;
    text-align: center;
    width: 99%;
    color: #ff5f5f;
  }
  .payment-body{
    margin-top: 3%;
    width: 100%;
    height: 180px;
    background-color: @color-background-white;
  }
  .payment-one{
    padding-top: 15px;
    width: 90%;
    height: 15px;
    margin: 0 auto;
  }
  .payment-two {
    width: 90%;
    margin: 25px auto;
  }
  .payment-alipay{
    height: 50px;
    width: 95%;
    display: flex;
    border-bottom: 1px solid #EEEEEE;
  }
  .checkdon-one{
    color: @color-text-red;
    position: absolute;
    right: 9%;
    font-size: 25px;
    line-height: 30px;
  }
  .checkdon-two{
    color: #DDDDDD;
    position: absolute;
    right: 9%;
    line-height: 30px;
    font-size: 25px;
  }
  .payment-WeChat{
    display: flex;
    margin-top: 15px;
    height: 50px;
    width: 95%;
  }
  .payment-WeChat p{
    margin-left: -36px;
    margin-top: 25px;
    font-size: 14px;
    color: @color-text-gray;
  }
  .payment-WeChat span{
    margin-left: 20px;
    font-size: 18px;
    font-weight: 700;
  }

  .payment-WeChat img{
    width: 40px;
    height: 40px;
  }
  .payment-alipay img{
    width: 40px;
    height: 40px;
  }
  .payment-alipay span{
    display: inline-block;
    width: 100px;
    margin-left: 5%;
    font-size: 18px;
    font-weight: 700;
  }
  .payment-one h5{
    font-weight: 700;
  }
  .payment-one h5 span{
    color: #CFCFCF;
    font-size: 12px;
    font-weight: 700;
  }
  .footer-payment{
    position: fixed;
    margin-top: 7.2vmin;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
  }
  .footer-payment b{
    height: 8.53333vmin;
    line-height: 8.53333vmin;
    background: #fff9c3;
    font-size: 3.2vmin;
    color: #fbb52f;
    display: block;
    padding: 0 3.2vmin;
    font-weight: 400;
  }
  .footer-payment span {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    background: #ff5f5f;
    text-align: center;
    margin: 0 auto;
    height: 11.73333vmin;
    line-height: 11.73333vmin;
    color: #fff;
    font-size: 4.8vmin;
  }

</style>
