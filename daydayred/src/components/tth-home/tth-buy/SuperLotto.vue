<template>
  <!--大乐透-->
<div class="superLotto_wrap">
  <BuyHeader :thisPage="'39'" :MethodsArr="MethodsArr" :MoreArr="MoreArr" @changeSelectBall="changeSelectBall"></BuyHeader>
  <!--主要内容-->
  <div class="superLotto_content">
    <!--截止日期-->
    <div class="superLotto_time">
      <strong class="superLotto_time_left">{{MoreTimeArr.Name}} {{MoreTimeArr.BuyEndTime}}</strong>
      <span class="superLotto_time_right" @click="isShowRecent = true">近期开奖</span>
    </div>
  </div>
  <BuyFooter></BuyFooter>
  <!--隐藏部分-->
  <mt-popup v-model="isShowRecent" position="bottom" class="recentAward">
    <!--分割符号-->
    <BuyRecentAward :recentArr="recentArr" :isHaveBlue="true"></BuyRecentAward>
  </mt-popup>
</div>
</template>

<script>
  import BuyFooter from '../tth-buy/buy-footer'
  import BuyHeader from '../tth-buy/buy-header'
  import BuyRecentAward from '../tth-buy/buy-recentAward.vue'
  export default {
    name: 'SuperLotto',
    components: {
      BuyFooter,
      BuyHeader,
      BuyRecentAward
    },
    data () {
      return {
        recentArr: [],
        isShowRecent: false,
        MoreTimeArr: [],
        MethodsArr: ['大乐透普通投注', '大乐透胆拖投注'],
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
      fecthSuperLottoData () {
        this.$request({
          type: 'get',
          url: '/api/Data/Handler.ashx?action=201&params={%22LotteryID%22:%224%22}',
          success: function (res) {
            this.MoreTimeArr = res.data.data
//            console.log(res.data.data)
          },
          failed: function (err) {
            console.log('未找到大乐透数据:' + err)
          }
        })
      },
      fecthSuperLottoRecentData () {
        this.$request({
          type: 'get',
          url: '/api/Data/Handler.ashx?action=602&params={%22LotteryID%22:%224%22}',
          success: function (res) {
            this.recentArr = res.data.data
//            console.log(res.data.data)
          },
          failed: function (err) {
            console.log('未找到排列3最近开奖数据:' + err)
          }
        })
      },
      changeSelectBall (index) {
        this.changeBall = index
      }
    },
    mounted () {
      this.fecthSuperLottoData()
      this.fecthSuperLottoRecentData()
    }
  }
</script>

<style scoped lang="less">
    @import "../../../common/css/style.less";
    .superLotto_wrap{
      width: 100%;
      height: 667px;
      position: relative;
      background-color: @color-background-gray;
      .superLotto_content{
        width: 100%;
        /*时间*/
        .superLotto_time {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 8.8vmin;
          box-sizing: border-box;
          padding: 0 2.66667vmin;
          margin-top: 12vmin;
          font-size: 3.2vmin;
          border-bottom: 1px solid rgb(230, 230, 230);
          .superLotto_time_left {
            color: @color-text-black;
            font-weight: bolder;
          }
          .superLotto_time_right {
            color: #6b8dff;
          }
        }
      }
    }
</style>
