<template>
  <div class="Rlbasketball">
    <div class="bl-nav">
      <div class="bl-nav-left">
        <i class="iconfont icon-jiantou" id="turnback" @click="backRl"></i>
      </div>
      <div class="bl-nav-title">
        <h3>竞彩篮球开奖</h3>
      </div>
      <div class="bl-nav-right">
      </div>
    </div>
    <header>
      <span @click="backDay">
        <i class="iconfont icon-jiantou"></i>
        <b>上一期</b>
      </span>
      <div @click="chooseTime">
        <span>{{Today[0]}}-{{Today[1]}}-{{Today[2]}} {{WeekDay}}({{ssq.length}})场</span>
        <i class="iconfont icon-jiantou2"></i>
      </div>
      <span @click="goDay">
        <b>下一期</b>
        <i class="iconfont icon-jiantou-copy-copy"></i>
      </span>
    </header>
    <ul>
      <li v-for="(item, index) in ssq"
          @click="toggle(index)">
        <p>{{WeekDay}} {{item['MNO']}} {{item['LeagueName']}} {{MatchTime[index][0]}}:{{MatchTime[index][1]}}</p>
        <div>
          <i class="iconfont icon-jiantou2" id="down" ref="turnover"></i>
          <span id="HomeT">{{item['VTeam']}}</span>
          <div id="allRz">
            <p id="Rz">{{item['Rz']}}</p>
          </div>
          <span id="ValueT">{{item['HTeam']}}</span>
        </div>
          <table ref="allresult" v-show="index == i">
            <tr>
              <td>比分</td>
              <td>让分胜负</td>
              <td>大小分</td>
              <td>胜分差</td>
            </tr>
            <tr>
              <td>{{item['Rz']}}</td>
              <td>({{item['Rf']}}){{RfResult[index]}}</td>
              <td>({{item['DXF']}}){{BigorSmall[index]}}</td>
              <td>主{{isHomeWin[index]}}</td>
            </tr>
          </table>
      </li>
    </ul>
    <div class="ftMask" v-if="isShowMask" @click="backList">
    </div>
    <div class="mask-body" v-if="isShowtimer">
      <div class="mask-head">
        <div class="cancel" @click="cancelValue">取消</div>
        <div class="timerTitle">选择期次</div>
        <div class="confirm" @click="confirmValue">确定</div>
      </div>
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </div>
  </div>
</template>
<script>
  import Test from './test'
  import { Toast, Indicator } from 'mint-ui'
  export default {
    name: 'rlfootball',
    data () {
      return {
        ssq: {},
        MatchTime: [],
        RfResult: [],
        BigorSmall: [],
        isHomeWin: [],
        Today: [],
        WeekDay: '',
        isShowInfo: true,
        number: 0,
        IssueName: '20171125',
        i: -1,
        // 下拉列表
        slots: [
          {
            flex: 1,
            values: ['20171114', '20171115', '20171116', '20171117', '20171118', '20171119'],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        // 蒙版
        isShowMask: false,
        // 时间选择器
        isShowtimer: false
      }
    },
    methods: {
      testData () {
        let that = this
        this.$request({
          type: 'get',
          url: 'api/data/Handler.ashx?action=607&params={' + 'IssueName' + ':' + this.IssueName + '}',
          headers: {},
          params: {},
          success: function (res) {
            this.ssq = res.data.data
            this.ssq.forEach(function (e, index) {
              // 判断让分主胜客胜
              that.RfResult[index] = Test.concede2(e['Rz'], e['Rf'])
              // 大球小球的胜负比较
              that.BigorSmall[index] = Test.BigorSmall(e['Rz'], e['DXF'])
              // 判断主胜客胜及分差
              that.isHomeWin[index] = Test.Fencha(e['Rz'])
              // 比赛具体时间
              that.MatchTime[index] = Test.cutMatchTime(e['MatchTime'])
            })
            // 当天比赛时间
            that.Today = Test.cutMatchTime2(this.ssq[0]['IssueName'])
            // 当天是星期几
            that.WeekDay = this.ssq[0]['WKName']
            // 第一个样式
            Indicator.close()
          },
          failed: function (err) {
            console.log(err)
          }
        })
      },
      backRl () {
        this.$router.push({path: '/runlottery'})
      },
      backDay () {
        // 点击上一期翻看前一天的记录
        if (this.IssueName < 20171116) {
          this.IssueName = 20171116
          Toast({
            message: '已到最前一期',
            duration: 1500
          })
        } else {
          this.IssueName--
          this.testData()
          Indicator.open('加载中...')
        }
      },
      goDay () {
        // 点击下一期翻看后一个记录
        if (this.IssueName > 20171124) {
          this.IssueName = 20171124
          Toast({
            message: '已到最后一期',
            duration: 1500
          })
        } else {
          this.IssueName++
          this.testData()
          Indicator.open('加载中...')
        }
      },
      toggle (index) {
        // 点击显示隐藏表格
        this.i = index
      },
      // 显示时间选择器
      chooseTime () {
        this.isShowMask = true
        this.isShowtimer = true
      },
      backList () {
        this.isShowMask = false
        this.isShowtimer = false
      },
      // 获取时间值
      onValuesChange (picker, values) {
        let value = values[0]
        if (value !== undefined) {
          this.value = value
        }
      },
      // 确定后关闭
      confirmValue () {
        this.isShowMask = false
        this.isShowtimer = false
        this.IssueName = this.value.toString()
        this.testData()
      },
      // 取消后关闭
      cancelValue () {
        this.isShowMask = false
        this.isShowtimer = false
      }
    },
    mounted () {
      this.testData()
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/css/style";
  .Rlbasketball{
    max-width: 607px;
    margin:0 auto;
  }
  /*头部*/
  .bl-nav {
    width: 100%;
    height: 12vmin;
    background-color: @color-red;
    display: flex;
    justify-content: space-between;
  }

  .bl-nav > div {
    display: inline-block;
  }

  .bl-nav-left {
    width: 29%;
    height: 100%;
    overflow: hidden;
    display: flex;
  }
  .bl-nav-left i{
    padding-left: 4vmin;
  }
  .bl-nav-title {
  //  width: 34.6%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
  }

  .bl-nav-title h3 {
    text-align: center;
    font-size: 5.5vmin;
    font-weight: 700;
    color: white;
    line-height: 12vmin;
  }
  .bl-nav-right {
    width: 29%;
    height: 100%;
    // background-color: blue;
  }
  /*返回键*/
  #turnback {
    width: 5.86667vmin;
    height: 5.86667vmin;
    color: @color-background-white;
    font-weight: bold;
    font-size: 3.8vmin;
    display: inline-block;
    margin-left: 10px;
    margin-top: 3.7vmin;
  }

  /*日期header*/
  header {
    font-size: 3.46667vmin;
    display: flex;
    height: 10.66667vmin;
    line-height: 10.66667vmin;
    vertical-align: middle;
    background: #fff;
    border-bottom: 1px solid #e6e6e6;
    color: @color-text-gray;
    justify-content: space-between;
  }

  header div {
    display: inline-block;
    color: @color-text-black;
  }

  /*li详情*/
  li {
    border-radius: .8vmin;
    background: #fff;
    padding: 3.33333vmin 4.8vmin;
    border-bottom: 1px solid #e6e6e6;
    font-family: -apple-system, BlinkMacSystemFont, PingFang SC,
    Helvetica Neue, STHeiti, Microsoft Yahei, Tahoma, Simsun, sans-serif;
  }

  li > p {
    color: #999;
    font-size: 3.46667vmin;
    margin-bottom: 4.53333vmin;
  }

  #HomeT, #ValueT {
    display: inline-block;
    width: 19.2vmin;
    white-space: nowrap;
    text-overflow: clip;
    overflow: hidden;
    vertical-align: middle;
    font-size: 4.8vmin;
  }

  #HomeT {
    text-align: right;
  }

  li > div {
    display: inline-block;
  }

  #allRz {
    display: inline-block;
    margin: 0 6vmin;
  }

  #Rz {
    text-align: center;
    font-size: 5.86667vmin;
    font-weight: 500;
    color: #ff5f5f;
    line-height: 1;
    display: block;
    margin-bottom: 1.33333vmin;
  }

  #hRz {
    font-weight: 400;
    font-size: 3.46667vmin;
    line-height: 1;
    color: @color-text-gray;
    display: block;
  }

  #down {
    vertical-align: middle;
    color: #6b8dff;
    margin-top: 1.33333vmin;
    display: inline-block;
    margin-right: 8.66667vmin;
  }

  /*.active table {*/
    /*display: block;*/
  /*}*/

  #up{
    transform:rotate(-180deg);
    vertical-align: middle;
    color: #6b8dff;
    margin-top: 1.33333vmin;
    display: inline-block;
    margin-right: 8.66667vmin;
  }
  /*图表*/
  td {
    width: 23.3333vmin;
    height: 6.4vmin;
    text-align: center;
    box-sizing: border-box;
    border: 1px solid #F2F2F2;
    font-size: 1.86667vmin;
    line-height: 1.5;
    font-family: -apple-system, BlinkMacSystemFont, PingFang SC,
    Helvetica Neue, STHeiti, Microsoft Yahei, Tahoma, Simsun, sans-serif;
  }

  table tr:first-child {
    color: @color-text-gray;
  }

  // 蒙版和弹窗
  .ftMask{
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height: 100%;
    background-color: black;
    opacity: 0.7;
  }
  .mask-body{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: white;
    z-index: 10;
  }
  .confirm, .cancel {
    color: #ff5f5f;
    font-size: 4.26667vmin;
    padding: 2.66667vmin 4vmin;
    height: 11.2vmin;
    box-sizing: border-box;
    display: inline-block;
    -webkit-box-align: center;
    justify-content: center;
    width: 20vmin;
  }

  .timerTitle {
    font-size: 4.26667vmin;
    color: #000;
    padding: 2.66667vmin 4vmin;
    width: 50vmin;
    display: inline-block;
    text-align: center;
  }
</style>

