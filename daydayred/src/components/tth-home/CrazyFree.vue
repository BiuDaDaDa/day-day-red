<template>
  <!--疯狂竞猜-->
<div class="crazyFree_wrap">
  <!--计算-->
  <div class="crazyFree_recommend">
    <!--推荐比赛-->
    <div class="crazyFree_recommend_block">
      <span>暂未推荐比赛</span>
    </div>
    <!--投注按钮-->
    <div class="crazyFree_recommend_btn">
      <input type="button" :value="btn_Num+'元'" v-for="(btn_Num,index) in btnArr" @click="btn_select(index)">
      <input class="recommend_btn_yellow" type="tel" :value="buyNum"
             placeholder="自定义">
    </div>
    <!--投注状态-->
    <div class="crazyFree_recommend_buyBtn">
      <div>
        <span class="crazyFree_buyBtn_top">暂未推荐</span>
        <span class="crazyFree_buyBtn_bottom">投注<b>{{buyCount}}</b>元，预测奖金<b>--</b>元</span>
      </div>
    </div>
  </div>
  <!--图片-->
  <img class="crazyFree_bgImg" src="../../assets/tth-home/active_crazy_bg.png"/>
  <img class="crazyFree_redBag" src="../../assets/tth-home/active_crazy_bag.png" height="166" width="150"/>
</div>
</template>

<script>
  export default {
    name: 'CrazyFree',
    data () {
      return {
        btnArr: ['10', '20', '50'],
//        自定义
        buyNum: '',
//        投注总数
        buyCount: 0
      }
    },
    methods: {
      btn_select (index) {
        this.buyCount = this.btnArr[index]
        console.log(index)
        console.log(this.buyCount)
      }
    },
    computed: {
      value: function () {
        this.buyCount = this.buyNum
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/css/style.less";

  .crazyFree_wrap{
    width: 100%;
    position: relative;
    /*图片*/
    .crazyFree_bgImg{
      width: 100%;
    }
    .crazyFree_redBag{
      position: fixed;
      width: 20vmin;
      height: 22.13333vmin;
      bottom: 0;
      right: 0;
    }
    /*内容*/
    .crazyFree_recommend{
      width: 100%;
      position: absolute;
      top: 60.8vmin;
      left: 0;
      /*推荐比赛*/
      .crazyFree_recommend_block{
        color: #333;
        margin:0 auto;
        width: 87.46667vmin;
        height: 57.73333vmin;
        background-color: #fda100;
        border-radius: .73333vmin;
        box-shadow: 0 0.4vmin 0.53333vmin rgba(0,0,0,.3);
        display: flex;
        align-items: center;
        justify-content: center;
        span{
          color: #FFFFFF;
        }
      }
      /*投注按钮*/
      .crazyFree_recommend_btn{
        width: 87.46667vmin;
        margin: 7.06667vmin auto 7.06667vmin;
        display: flex;
        align-items: center;
        justify-content: space-around;
        input{
          font-size: 3.73333vmin;
          width: 17.6vmin;
          height: 8.26667vmin;
          display: inline-block;
          text-align: center;
          color: @color-text-gray;
          /*line-height: 8.26667vmin;*/
          border-radius: .8vmin;
          box-shadow: 0 0.4vmin 0.53333vmin rgba(0,0,0,.3);
          background: @color-background-white;
          overflow: hidden;
        }
        .recommend_btn_yellow{
          background: #fda100;
        }
      }
      /*投注状态*/
      .crazyFree_recommend_buyBtn{
        margin:0 auto;
        background-color: rgb(187, 187, 187);
        color: white;
        height: 25.06667vmin;
        border-radius: .8vmin;
        width: 87.73333vmin;
        display: flex;
        justify-content: center;
        align-items: center;
        /*文字*/
        div{
          text-align: center;
          .crazyFree_buyBtn_top{
            display: block;
            font-size:6.66667vmin;
            margin-bottom: 10px;
          }
          .crazyFree_buyBtn_bottom{
            b{
              color: #ffd100;
            }
          }
        }
      }
    }
  }
</style>
