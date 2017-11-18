<template>
<div class="recharge_wrap">
  <homeHeader :headerTitle="'充值送88'"></homeHeader>
  <img src="../../assets/tth-home/recharge1.png" height="810" width="750"/>
  <img src="../../assets/tth-home/recharge2.png" height="121" width="750"/>
  <!--活动规则-->
  <div class="recharge_rule">
    <img src="../../assets/tth-home/recharge3.png" height="569" width="750"/>
    <div class="recharge_rule_text">
      <strong>活动规则:</strong>
      <span>1、充值20元及以上送88元红包</span>
      <span>2、每人皆可享有一次机会</span>
      <span>3、20元充值本金即刻生效到账，88元分期到账，可在购彩时抵现使用</span>
      <span>4、此活动最终解释权归本应用所有</span>
      <a @click="changeIsShowPop">红包明细></a>
    </div>
  </div>
  <!--红包明细-->
  <div class="recharge_Pop" v-show="isShowPop" @click="changeIsShowPop">
    <img src="../../assets/tth-home/rechargePOP.png" height="588" width="750"/>
  </div>
</div>
</template>

<script>
  import homeHeader from '../tth-home/home-header.vue'
  export default {
    name: 'Recharge',
    components: {
      homeHeader
    },
    data () {
      return {
        isShowPop: false
      }
    },
    methods: {
      changeIsShowPop () {
        this.isShowPop = !this.isShowPop
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/css/style.less";
  .recharge_wrap{
    position: relative;
    width: 100%;
    img{
      display: block;
      width: 100%;
      height:auto;
    }
    /*活动规则*/
    .recharge_rule{
      position: relative;
      .recharge_rule_text{
        position: absolute;
        left: 50%;
        top:0;
        width: 82.66667vmin;
        font-size: 3.2vmin;
        background: rgba(0,0,0,.5);
        color: #fff;
        border-radius: 1.06667vmin;
        box-sizing: border-box;
        padding: 2.66667vmin 4vmin;
        margin-top: 6vmin;
        margin-left: -41.33333vmin;
        strong{
          display: block;
          font-weight: 400;
          margin-bottom: 4.8vmin;
        }
        span{
          display: block;
          margin-bottom: 1.7vmin;
          line-height: 4.93333vmin;
        }
        a{
          display: block;
          margin: 0 auto;
          color: white;
          text-decoration: underline;
          text-align: center;
        }
      }
    }
    /*弹出明细*/
    .recharge_Pop{
      width: 100%;
      height: 100%;
      position: fixed;
      background-color: rgba(0,0,0,.6);
      top:0;
      left:0;
      img{
        position: absolute;
        top: 20%;
      }
    }
  }
</style>
