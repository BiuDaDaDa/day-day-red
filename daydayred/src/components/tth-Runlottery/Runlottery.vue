<template>
      <div class="runlottery">
            <div class="rl-nav">
                <div class="rl-nav-title">
                    <p>开奖公告</p>
                </div>
            </div>
            <div class="rl-detail">
                <ul>
                  <li class="double" @click="dndetail">
                    <p>
                      <span>{{double['LotteryName']}}</span>
                      <span>第{{double['IssueName']}}期 {{dlTimeStr[1]}}-{{dlTimeStr[2]}} {{shijian1}}</span>
                    </p>
                    <div class="double-number">
                      <div v-for="evstr in str11">
                        <p>{{evstr}}</p>
                      </div>
                      <div id="special-number">
                        <p>{{str1[1]}}</p>
                      </div>
                      <i class="iconfont icon-arrow-right"></i>
                    </div>
                  </li>
                  <li class="happy" @click="hndetail">
                    <p>
                      <span>{{happy['LotteryName']}}</span>
                      <span>第{{happy['IssueName']}}期 {{hpTimeStr[1]}}-{{hpTimeStr[2]}} {{shijian2}}</span>
                    </p>
                    <div class="happy-number">
                      <div v-for="evstr in str21">
                        <p>{{evstr}}</p>
                      </div>
                      <div v-for="lt in str22" id="special-double">
                          <p>{{lt}}</p>
                      </div>
                      <i class="iconfont icon-arrow-right"></i>
                    </div>
                  </li>
                  <li class="football" @click="fcdetail">
                    <p>
                      <span>{{football['LotteryName']}}</span>
                      <span>第{{football['IssueName']}}期 {{ftTimeStr[1]}}-{{ftTimeStr[2]}} {{shijian3}}</span>
                    </p>
                    <div>
                      <span>{{football['HTeam']}} {{football['Rz']}} {{football['VTeam']}}</span>
                      <i class="iconfont icon-arrow-right"></i>
                    </div>
                  </li>
                  <li class="basketball" @click="bkdetail">
                    <p>
                      <span>{{basketball['LotteryName']}}</span>
                      <span>第{{basketball['IssueName']}}期 {{btTimeStr[1]}}-{{btTimeStr[2]}} {{shijian4}}</span>
                    </p>
                    <div>
                      <span>{{basketball['HTeam']}} {{basketball['Rz']}} {{basketball['VTeam']}}</span>
                      <i class="iconfont icon-arrow-right"></i>
                    </div>
                  </li>
                  <li class="fucai3D" @click="fc3detail">
                    <p>
                      <span>{{welfare['LotteryName']}}</span>
                      <span>第{{welfare['IssueName']}}期 {{fcTimeStr[1]}}-{{fcTimeStr[2]}} {{shijian5}}</span>
                    </p>
                    <div class="fucai3D-number">
                      <div v-for="evstr in str51">
                        <p>{{evstr}}</p>
                      </div>
                      <i class="iconfont icon-arrow-right"></i>
                    </div>
                  </li>
                  <li class="line-3" @click="lidetail">
                    <p>
                      <span>{{rank['LotteryName']}}</span>
                      <span>第{{rank['IssueName']}}期 {{rkTimeStr[1]}}-{{rkTimeStr[2]}} {{shijian6}}</span>
                    </p>
                    <div class="line-3-number">
                      <div v-for="evstr in str61">
                        <p>{{evstr}}</p>
                      </div>
                      <i class="iconfont icon-arrow-right"></i>
                    </div>
                  </li>
                  <li class="jiangxi" @click="jxdetail">
                    <p>
                      <span>{{choose11['LotteryName']}}</span>
                      <span>第{{choose11['IssueName']}}期 {{jxTimeStr[1]}}-{{jxTimeStr[2]}} {{shijian7}}</span>
                    </p>
                    <div class="jiangxi-number">
                      <div v-for="evstr in str71">
                        <p>{{evstr}}</p>
                      </div>
                      <i class="iconfont icon-arrow-right"></i>
                    </div>
                  </li>
                </ul>
            </div>
      </div>
</template>

<script>
    import axios from 'axios'
    export default {
      name: '',
      data () {
        return {
          message: {},
          // 双色球
          str11: [],
          str1: {},
          double: {},
          dlTimeStr: [],
          shijian1: '',
          // 大乐透
          str22: [],
          str21: [],
          str2: {},
          happy: {},
          hpTimeStr: {},
          shijian2: '',
          // 足球竞猜
          football: {},
          ftTimeStr: {},
          shijian3: '',
          // 篮球
          basketball: {},
          btTimeStr: {},
          shijian4: '',
          // 福彩3D
          welfare: {},
          str51: [],
          fcTimeStr: {},
          shijian5: '',
          //  排列3
          str61: [],
          rank: {},
          rkTimeStr: {},
          shijian6: '',
          // 江西
          choose11: {},
          str71: [],
          jxTimeStr: {},
          shijian7: ''
        }
      },
      mounted () {
        let that = this
        axios.get('api/data/Handler.ashx?action=600&params={}')
          .then(function (response) {
 //           console.log(response.data)
            that.message = response.data.data
 //           console.log(that.message)
            that.double = response.data.data[0]
            that.result = that.double['Rz']
            that.dlTime = that.double['EndTime']
            that.str1 = that.result.split('+')
            that.str11 = that.str1[0].split(' ')
            that.dlTimeStr = that.dlTime.split('/')
            that.try1 = new Date(that.dlTimeStr[0], that.dlTimeStr[1], that.dlTimeStr[2]).getDay()
            that.shijian1 = '周' + '五六日一二三四'.charAt(that.try1)
             // 大乐透
            that.happy = response.data.data[1]
            that.result = that.happy['Rz']
            that.str2 = that.result.split('+')
            that.str21 = that.str2[0].split(' ')
            that.str22 = that.str2[1].split(' ')
            that.hpTime = that.happy['EndTime']
            that.hpTimeStr = that.hpTime.split('/')
            that.try2 = new Date(that.hpTimeStr[0], that.hpTimeStr[1], that.hpTimeStr[2]).getDay()
            that.shijian2 = '周' + '五六日一二三四'.charAt(that.try2)
            // 足球
            that.football = response.data.data[2]
            that.ftTime = that.football['EndTime']
            that.ftTimeStr = that.ftTime.split('/')
            that.try3 = new Date(that.ftTimeStr[0], that.ftTimeStr[1], that.ftTimeStr[2]).getDay()
            // that.try = new Date(2017, 11, 17).getDay()
            that.shijian3 = '周' + '五六日一二三四'.charAt(that.try3)
            // 篮球
            that.basketball = response.data.data[3]
            that.btTime = that.basketball['EndTime']
            that.btTimeStr = that.btTime.split('/')
            that.try4 = new Date(that.btTimeStr[0], that.btTimeStr[1], that.btTimeStr[2]).getDay()
            that.shijian4 = '周' + '五六日一二三四'.charAt(that.try4)
            // 福彩3D
            that.welfare = response.data.data[4]
            that.str5 = that.welfare['Rz']
            that.str51 = that.str5.split(',')
            that.fcTime = that.welfare['EndTime']
            that.fcTimeStr = that.fcTime.split('/')
            that.try5 = new Date(that.btTimeStr[0], that.fcTimeStr[1], that.fcTimeStr[2]).getDay()
            that.shijian5 = '周' + '五六日一二三四'.charAt(that.try5)
            // 排列3
            that.rank = response.data.data[5]
            that.str6 = that.rank['Rz']
            that.str61 = that.str6.split(',')
            that.rkTime = that.rank['EndTime']
            that.rkTimeStr = that.rkTime.split('/')
            that.try6 = new Date(that.btTimeStr[0], that.rkTimeStr[1], that.rkTimeStr[2]).getDay()
            that.shijian6 = '周' + '五六日一二三四'.charAt(that.try6)
            // 江西
            that.choose11 = response.data.data[6]
            that.str7 = that.choose11['Rz']
            that.str71 = that.str7.split(',')
            that.jxTime = that.choose11['EndTime']
            that.jxTimeStr = that.jxTime.split('/')
            that.try7 = new Date(that.btTimeStr[0], that.jxTimeStr[1], that.jxTimeStr[2]).getDay()
            that.shijian7 = '周' + '五六日一二三四'.charAt(that.try7)
          })
      },
      methods: {
        dndetail () {
          this.$router.push({path: '/balllist'})
        },
        hndetail () {
          this.$router.push({path: '/biglt'})
        },
        fc3detail () {
          this.$router.push({path: '/fc3d'})
        },
        lidetail () {
          this.$router.push({path: '/line3'})
        },
        jxdetail () {
          this.$router.push({path: '/choose11in5'})
        },
        fcdetail () {
          this.$router.push({path: '/rlfootball'})
        },
        bkdetail () {
          this.$router.push({path: '/rlbasketball'})
        }
      }
    }
</script>

<style scoped lang="less">

  @import "../../common/css/style";
  .rl-nav{
        width:100%;
        height: 12vmin;
        background-color: @color-red;
      }
  .rl-nav-title{
        width:30.6%;
        height:100%;
        margin:0 auto;
      }
  .rl-nav-title p{
    text-align: center;
    font-size: 5.5vmin;
    font-weight: 700;
    color: white;
    line-height: 12vmin;
  }
  /*列表样式*/
  .rl-detail li{
    height: 22.66667vmin;
    box-sizing: border-box;
    padding: 4vmin 3.2vmin 2.66667vmin;
    border-bottom: 1px solid #e6e6e6;
  }
  /*第一个p标签*/
  .rl-detail li span:first-child{
    font-size: 4vmin;
    margin-right: 2.13333vmin;
  }
  .rl-detail li span:nth-child(2){
    font-size: 3.46667vmin;
    color: #999;
    font-weight: 400;
    float: right;
    padding-right: 5.33333vmin;
  }
  .rl-detail p:first-child{
    margin-bottom: 3.06667vmin;
  }
  /*第二个p标签*/
  .rl-result{
    height: 8.8vmin;
  }
  .double-number>div,.happy-number>div,.fucai3D-number div,.line-3-number div,.jiangxi-number div{
    display: inline-block;
    width: 8.26667vmin;
    height: 8.26667vmin;
    line-height: 8.26667vmin;
    border-radius: 50%;
    background: #ff5f5f;
    text-align: center;
    margin-right: 1.6vmin;
    color: white;
  }
  .double-number>div p,.happy-number>div p,
  .fucai3D-number div p,.line-3-number div p,.jiangxi-number div p{
    font-weight: bolder;
    font-size: 4vmin;
    font-family: -apple-system,BlinkMacSystemFont,PingFang SC,Helvetica
    Neue,STHeiti,Microsoft Yahei,Tahoma,Simsun,sans-serif;
  }
  /*双色球*/
  #special-number{
    background-color:#6b8dff;
    margin-left: -1.6vmin;
  }
  /*超级大乐透*/
  .happy-number>div:nth-child(6){
    background-color:#6b8dff;
    margin-left: -1.6vmin;
  }
  #special-double{
    background-color:#6b8dff;
  }
  .happy-number>div p{
    font-size: 4vmin;
    font-weight: 700;
  }
  /*篮球 足球*/
  .football div{
    background-image: url("../../assets/tth-runlottery/download.png");
    background-repeat: no-repeat;
    background-size: contain;
  }
  .basketball div{
    background-image: url("../../assets/tth-runlottery/download-1.png");
    background-repeat: no-repeat;
    background-size: contain;
  }
  .football div,.basketball div{
    height: 8.8vmin;
  }
  .football div span,.basketball div span{
    color: #fff;
    text-align: center;
    line-height: 1;
    display: block;
    max-width: 60vmin;
    padding-left: 8vmin;
    padding-top: 3.46667vmin;
    font-weight: 300;
    width: 54.4vmin;
    font-size: 3.73333vmin;
    margin-left: 2.93333vmin;
  }
  /*箭头*/
  i{
    float: right;
    margin-top: 8px;
    color:@color-text-gray;
    width: 5.86667vmin;
    height: 5.86667vmin;
  }
  .football i,.basketball i{
    margin-top: -18px;
  }
</style>

