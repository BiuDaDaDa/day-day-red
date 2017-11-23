<template>
  <!--大乐透-->
  <div class="doubleColorBall_wrap">
    <!--main-->
    <div class="doubleColorBall_main" v-show="isMainShow">
      <!--头-->
      <BuyHeader :MethodsArr="MethodsArr" :MoreArr="MoreArr" @changeSelectBall="changeSelectBall" @instructionShow="isInstructionShow"></BuyHeader>
      <!--选球-->
      <div class="doubleColorBall_content">
        <!--截止日期-->
        <div class="doubleColorBall_time">
          <strong class="doubleColorBall_time_left">{{MoreTimeArr.Name}} {{MoreTimeArr.BuyEndTime}}</strong>
          <span class="doubleColorBall_time_right" @click="isShowRecent = true">近期开奖</span>
        </div>
        <!--普通投注-->
        <div class="doubleColorBall_normal" v-show="changeBall == 0">
          <!--规则6/1-->
          <div class="doubleColorBall_normal_rule">
            <span>至少选择<b>6</b>个红球 <b class="blueB">1</b>个蓝球</span>
            <div><i class="iconfont icon-yaoyiyao"></i>机选</div>
          </div>
          <SelectMoreBall :maxNum="33" :isRedColor="true"></SelectMoreBall>
          <p class="line"></p>
          <SelectMoreBall :maxNum="16" :isRedColor="false"></SelectMoreBall>
        </div>
        <!--胆拖投注-->
        <div class="doubleColorBall_dantuo" v-show="changeBall == 1">
          <div class="doubleColorBall_dantuo_rule">
            <span>胆码区-红球,我认为必出的号码,选<b>1-5</b>个</span>
          </div>
          <SelectMoreBall :maxNum="33" :isRedColor="true"></SelectMoreBall>
          <p class="line"></p>
          <div class="doubleColorBall_dantuo_rule">
            <span>拖码区-红球,我认为必出的号码,至少<b>2</b>个</span>
          </div>
          <SelectMoreBall :maxNum="33" :isRedColor="true"></SelectMoreBall>
          <p class="line"></p>
          <div class="doubleColorBall_dantuo_rule">
            <span>拖码区-篮球,至少选择<b class="dantuoBlue">1</b>个</span>
          </div>
          <SelectMoreBall :maxNum="16" :isRedColor="false"></SelectMoreBall>
        </div>
      </div>
      <!--尾-->
      <BuyFooter></BuyFooter>
      <!--隐藏：最近开奖-->
      <mt-popup v-model="isShowRecent" position="bottom" class="recentAward">
        <!--分割符号-->
        <BuyRecentAward :recentArr="recentArr" :isHaveBlue="true"></BuyRecentAward>
      </mt-popup>
    </div>
    <!--隐藏：玩法说明-->
    <BuyInstruction v-show="isInsShow" :thisPage="38" :thisTitle="'玩法说明'" @instructionClose="isInstructionShow"></BuyInstruction>
  </div>
</template>

<script>
  import BuyFooter from '../tth-buy/buy-footer'
  import BuyHeader from '../tth-buy/buy-header'
  import BuyRecentAward from '../tth-buy/buy-recentAward.vue'
  import BuyInstruction from '../tth-buy/buy-instruction.vue'
  import SelectMoreBall from '../tth-buy/buy-selectMoreBall.vue'
  export default {
    name: 'SuperLotto',
    components: {
      BuyFooter,
      BuyHeader,
      BuyRecentAward,
      BuyInstruction,
      SelectMoreBall
    },
    data () {
      return {
        changeBall: 0,
        isMainShow: true,
        isInsShow: false,
        recentArr: [],
        isShowRecent: false,
        MoreTimeArr: [],
        MethodsArr: ['双色球普通投注', '双色球胆拖投注'],
        MoreArr: [
          {
            'moreName': '近期开奖',
            'moreIndex': 'kaijiang'
          },
          {
            'moreName': '显示遗漏',
            'moreIndex': 'yilou'
          },
          {
            'moreName': '走势图表',
            'moreIndex': 'zoushi'
          },
          {
            'moreName': '玩法说明',
            'moreIndex': 'shuoming'
          }
        ]
      }
    },
    methods: {
      fecthDoubleColorBallData () {
        this.$request({
          type: 'get',
          url: '/api/Data/Handler.ashx?action=201&params={%22LotteryID%22:%224%22}',
          success: function (res) {
            this.MoreTimeArr = res.data.data
//            console.log(res.data.data)
          },
          failed: function (err) {
            console.log('未找到双色球数据:' + err)
          }
        })
      },
      fecthDoubleColorBallRecentData () {
        this.$request({
          type: 'get',
          url: '/api/Data/Handler.ashx?action=602&params={%22LotteryID%22:%223%22}',
          success: function (res) {
            this.recentArr = res.data.data
//            console.log(res.data.data)
          },
          failed: function (err) {
            console.log('未找到双色球最近开奖数据:' + err)
          }
        })
      },
      changeSelectBall (index) {
        this.changeBall = index
        console.log(index)
      },
      // 玩法介绍显示
      isInstructionShow () {
        this.isMainShow = !this.isMainShow
        this.isInsShow = !this.isInsShow
      }
    },
    mounted () {
      this.fecthDoubleColorBallData()
      this.fecthDoubleColorBallRecentData()
    }
  }
</script>

<style scoped lang="less">
  @import "../../../common/css/style.less";
  .doubleColorBall_wrap{
    width: 100%;
    height: 667px;
    position: relative;
    background-color: @color-background-gray;
    .doubleColorBall_content{
      height: 100%;
      width: 100%;
      background-color: #FFFFFF;
      padding-bottom: 16.33333vmin;
      /*时间*/
      .doubleColorBall_time {
        background-color: @color-background-gray;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 8.8vmin;
        box-sizing: border-box;
        padding: 0 2.66667vmin;
        margin-top: 12vmin;
        font-size: 3.2vmin;
        .doubleColorBall_time_left {
          color: @color-text-black;
          font-weight: bolder;
        }
        .doubleColorBall_time_right {
          color: #6b8dff;
        }
      }
      /*普通*/
      .doubleColorBall_normal{
        width: 100%;
        .doubleColorBall_normal_rule{
          box-sizing: border-box;
          font-size: 3.2vmin;
          width: 100%;
          height: 8vmin;
          padding: 0 3.2vmin;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: white;
          color: @color-text-gray;
          span{
            b{
              color: @color-red;
            }
            .blueB{
              color: @color-blue;
            }
          }
          div{
            display: flex;
            align-items: center;
            justify-content: center;
            i{
              margin-right: 1vmin;
              font-size: 7vmin;
              transform: rotate(45deg);
            }
          }
        }
      }
      /*胆拖*/
      .doubleColorBall_dantuo{
        width: 100%;
        .doubleColorBall_dantuo_rule{
          font-size: 3.2vmin;
          width: 100%;
          height: 8vmin;
          padding: 0 3.2vmin;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          span{
            color: @color-text-gray;
            b{
              color: @color-red;
            }
            .dantuoBlue{
              color: @color-blue
            }
          }
        }
      }
      /*分割线*/
      .line{
        width: 100%;
        height: .66667vmin;
        /*display: block;*/
        background: #e6e6e6;
        border-top: 2.66667vmin solid white;
        border-bottom: 2.66667vmin solid white;
      }
    }
  }
</style>
