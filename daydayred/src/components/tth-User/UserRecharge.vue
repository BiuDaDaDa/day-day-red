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
            <h5>支付方式</h5>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {fetch} from '@/common/js/localStorage'
  let users = fetch()
  console.log(users)
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
        rest: '自定义金额'
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
    color: #6A6A6A;
    width: 100%;
    height: 180vmin;
    background-color: #F2F2F2;
  }

  .recharge-text {
    display: flex;
    align-items: center;
    width: 100%;
    height: 12vmin;
    line-height: 12vmin;
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
    width: 96%;
    margin: 10px auto;
    height: 300px;
  }
  .account-num-body li {
    position: relative;
    overflow: visible;
    width: 90px;
    height: 30px;
    border: 1px solid #999;
    line-height: 30px;
    text-align: center;
    display: inline-block;
    margin: 9px 13px;
    border-radius: 2px;
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


</style>
