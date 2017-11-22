<template>
  <!--排列3-->
  <div class="fucai3d_wrap">
    <div class="fucai3d_main" v-show="isMainShow">
      <BuyHeader :MethodsArr="MethodsArr" :MoreArr="MoreArr" @changeSelectBall="changeSelectBall" @instructionShow="isInstructionShow"></BuyHeader>
      <!--主体部分-->
      <div class="fucai3d_content">
        <!--时间-->
        <div class="fucai3d_time">
          <span class="fucai3d_time_left">{{MoreTimeArr.Name}} {{MoreTimeArr.BuyEndTime}}</span>
          <span class="fucai3d_time_right" @click="isShowRecent = true">近期开奖</span>
        </div>
        <!--选号-->
        <div class="fucai3d_select">
          <!--规则-->
          <div class="fucai3d_rule">
            <span>{{ruleArr[changeBall].rule}}<b>{{ruleArr[changeBall].ruleMoney}}</b>元</span>
          </div>
          <!--选球-->
          <!--直选-->
          <div v-if="changeBall == 0">
            <Select9ball :numText="'百位'"></Select9ball>
            <Select9ball :numText="'十位'"></Select9ball>
            <Select9ball :numText="'个位'"></Select9ball>
          </div>
          <!--排列3-->
          <Select9ball v-if="changeBall == 1" :numText="'选号'"></Select9ball>
          <!--排列6-->
          <Select9ball v-if="changeBall == 2" :numText="'选号'"></Select9ball>
        </div>
      </div>
      <BuyFooter></BuyFooter>
      <!--隐藏部分-->
      <mt-popup v-model="isShowRecent" position="bottom" class="recentAward">
        <!--分割符号-->
        <BuyRecentAward :recentArr="recentArr" :isHaveBlue="false"></BuyRecentAward>
      </mt-popup>
    </div>
    <!--玩法说明-->
    <BuyInstruction v-show="isInsShow" :thisPage="40" :thisTitle="'福彩3D玩法说明'" @instructionClose="isInstructionShow"></BuyInstruction>
  </div>
</template>

<script>
  import BuyFooter from '../tth-buy/buy-footer'
  import BuyHeader from '../tth-buy/buy-header'
  import BuyRecentAward from '../tth-buy/buy-recentAward.vue'
  import Select9ball from '../tth-buy/buy-select9ball.vue'
  import BuyInstruction from '../tth-buy/buy-instruction.vue'
  export default {
    name: 'introduction-fucai3d',
    components: {
      BuyFooter,
      BuyHeader,
      BuyRecentAward,
      Select9ball,
      BuyInstruction
    },
    data () {
      return {
        isMainShow: true,
        isInsShow: false,
        MethodsArr: ['直选', '组选三', '组选六'],
        MoreArr: [
          {
            'moreName': '近期开奖',
            'moreIndex': 'kaijiang'
          },
          {
            'moreName': '走势图表',
            'moreIndex': 'zoushi'
          },
          {
            'moreName': '玩法说明',
            'moreIndex': 'shuoming'
          }
        ],
        MoreTimeArr: [],
        recentArr: [],
        isShowRecent: false,
        recentSpliceArr: [],
        changeBall: 0,
        // 放不同菜单内容
        ruleArr: [
          {
            rule: '每位至少选择1个号,按位猜对号码即中',
            ruleMoney: '1040'
          },
          {
            rule: '至少选择2个号码,猜对开奖号(顺序不限)',
            ruleMoney: '346'
          },
          {
            rule: '至少选择3个号码,猜对开奖号(顺序不限)',
            ruleMoney: '173'
          }
        ]
      }
    },
    methods: {
      // 获取福彩3d数据
      fecthFucai3dData () {
        this.$request({
          type: 'get',
          url: '/api/Data/Handler.ashx?action=201&params={%22LotteryID%22:%225%22}',
          success: function (res) {
            this.MoreTimeArr = res.data.data
//            console.log(res.data)
          },
          failed: function (err) {
            console.log('未找到福彩3D数据:' + err)
          }
        })
      },
      // 获取最近开奖数据
      fecthFucai3dRecentData () {
        this.$request({
          type: 'get',
          url: '/api/Data/Handler.ashx?action=602&params={%22LotteryID%22:%225%22}',
          success: function (res) {
            this.recentArr = res.data.data
//            console.log(res.data.data)
          },
          failed: function (err) {
            console.log('未找到福彩3D最近开奖数据:' + err)
          }
        })
      },
      // 获取玩法介绍数据
      fecthInstructionData () {
        this.$request({
          type: 'get',
          url: '/api/Data/Handler.ashx?action=602&params={%22LotteryID%22:%226%22}',
          success: function (res) {
            this.recentArr = res.data.data
//            console.log(res.data.data)
          },
          failed: function (err) {
            console.log('未找到福彩3D玩法说明数据:' + err)
          }
        })
      },
      // 近期开奖数据分析
      spliceRecentNum () {
        for (let i = 0; i < this.recentArr.length; i++) {
          this.recentSpliceArr.push(this.recentArr[i].WinNumber)
        }
      },
      // 不同玩法对应球
      changeSelectBall (index) {
        this.changeBall = index
      },
      // 玩法介绍显示
      isInstructionShow () {
        this.isMainShow = !this.isMainShow
        this.isInsShow = !this.isInsShow
      }
    },
    mounted () {
      this.fecthFucai3dData()
      this.fecthFucai3dRecentData()
      this.spliceRecentNum()
    }
  }
</script>

<style scoped lang="less">
  @import "../../../common/css/style.less";

  .fucai3d_wrap {
    width: 100%;
    height: 667px;
    position: relative;
    background-color: @color-background-gray;
    .fucai3d_main{
      width: 100%;
      /*主体内容*/
      .fucai3d_content {
        width: 100%;
        /*时间*/
        .fucai3d_time {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 7.73333vmin;
          box-sizing: border-box;
          padding: 0 2.66667vmin;
          margin-top: 11.73333vmin;
          font-size: 3.2vmin;
          border-bottom: 1px solid rgb(230, 230, 230);
          .fucai3d_time_left {
            color: @color-text-black
          }
          .fucai3d_time_right {
            color: #6b8dff;
          }
        }
        /*选择*/
        .fucai3d_select {
          width: 100%;
          /*规则*/
          .fucai3d_rule {
            width: 100%;
            height: 10.66667vmin;
            color: @color-text-gray;
            padding-left: 3.2vmin;
            background: #fff;
            font-size: 3.2vmin;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            span {
              b {
                color: @color-red;
              }
            }
          }
        }
      }
      /*隐藏*/
      .recentAward {
        width: 100%;
      }
    }
  }
</style>
