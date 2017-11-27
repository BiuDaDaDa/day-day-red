<template>
  <!--排列3-->
  <div class="rank3_wrap">
    <div class="rank3_main" v-show="isMainShow">
      <BuyHeader :MethodsArr="MethodsArr" :MoreArr="MoreArr" @changeSelectBall="changeSelectBall" @instructionShow="isInstructionShow"></BuyHeader>
      <!--主体部分-->
      <div class="rank3_content">
        <!--时间-->
        <div class="rank3_time">
          <span class="rank3_time_left">{{MoreTimeArr.Name}} {{MoreTimeArr.BuyEndTime}}</span>
          <span class="rank3_time_right" @click="isShowRecent = true">近期开奖</span>
        </div>
        <!--选号-->
        <div class="rank3_select">
          <!--规则-->
          <div class="rank3_rule">
            <span>{{ruleArr[changeBall].rule}}<b>{{ruleArr[changeBall].ruleMoney}}</b>元</span>
          </div>
          <!--选球-->
          <div v-if="changeBall == 0">
            <Select9ball :numText="'百位'"></Select9ball>
            <Select9ball :numText="'十位'"></Select9ball>
            <Select9ball :numText="'个位'"></Select9ball>
          </div>
          <Select9ball v-if="changeBall == 1" :numText="'选号'"></Select9ball>
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
    <BuyInstruction v-show="isInsShow" :thisPage="41" :thisTitle="'排列3玩法说明'" @instructionClose="isInstructionShow"></BuyInstruction>
  </div>
</template>

<script>
  import BuyFooter from '../tth-buy/buy-footer'
  import BuyHeader from '../tth-buy/buy-header'
  import BuyRecentAward from '../tth-buy/buy-recentAward.vue'
  import Select9ball from '../tth-buy/buy-select9ball.vue'
  import BuyInstruction from '../tth-buy/buy-instruction.vue'
  import {Indicator} from 'mint-ui'

  export default {
    name: 'introduction-rank3',
    components: {
      BuyFooter,
      BuyHeader,
      BuyRecentAward,
      Select9ball,
      BuyInstruction
    },
    data () {
      return {
        // 显示主体
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
      fecthRank3Data () {
        this.$request({
          type: 'get',
          url: '/api/Data/Handler.ashx?action=201&params={%22LotteryID%22:%226%22}',
          success: function (res) {
            this.MoreTimeArr = res.data.data
//            console.log(res.data.data)
            Indicator.close()
          },
          failed: function (err) {
            console.log('未找到排列3数据:' + err)
          }
        })
      },
      fecthRank3RecentData () {
        this.$request({
          type: 'get',
          url: '/api/Data/Handler.ashx?action=602&params={%22LotteryID%22:%226%22}',
          success: function (res) {
            this.recentArr = res.data.data
//            console.log(res.data.data)
          },
          failed: function (err) {
            console.log('未找到排列3最近开奖数据:' + err)
          }
        })
      },
      fecthInstructionData () {
        this.$request({
          type: 'get',
          url: '/api/Data/Handler.ashx?action=602&params={%22LotteryID%22:%226%22}',
          success: function (res) {
            this.recentArr = res.data.data
//            console.log(res.data.data)
          },
          failed: function (err) {
            console.log('未找到排列3玩法说明数据:' + err)
          }
        })
      },
      // 近期开奖
//      spliceRecentNum () {
//        for (let i = 0; i < this.recentArr.length; i++) {
//          this.recentSpliceArr.push(this.recentArr[i].WinNumber)
//        }
//      },
      changeSelectBall (index) {
        this.changeBall = index
      },
      isInstructionShow () {
        this.isMainShow = !this.isMainShow
        this.isInsShow = !this.isInsShow
      }
    },
    mounted () {
      Indicator.open('加载中...')
      this.fecthRank3Data()
      this.fecthRank3RecentData()
    }
  }
</script>

<style scoped lang="less">
  @import "../../../common/css/style.less";

  .rank3_wrap {
    width: 100%;
    height: 667px;
    position: relative;
    background-color: @color-background-gray;
    /*主体内容*/
    .rank3_main{
      width: 100%;
    }
    .rank3_content {
      width: 100%;
      /*时间*/
      .rank3_time {
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
        .rank3_time_left {
          color: @color-text-black
        }
        .rank3_time_right {
          color: #6b8dff;
        }
      }
      /*选择*/
      .rank3_select {
        width: 100%;
        /*规则*/
        .rank3_rule {
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
</style>
