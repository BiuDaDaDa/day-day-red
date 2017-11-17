<template>
      <div class="runlottery">
            <div class="rl-nav">
                <div class="rl-nav-title">
                    <p>开奖公告</p>
                </div>
            </div>
            <div class="rl-detail">
                <ul>
                  <li class="double">
                    <p>
                      <span>{{double['LotteryName']}}</span>
                      <span>第{{double['IssueName']}}期</span>
                    </p>
                    <div class="double-number">
                      <div v-for="evstr in str11">
                        <p>{{evstr}}</p>
                      </div>
                      <div>
                        {{str1[1]}}
                      </div>
                    </div>
                  </li>
                  <li class="happy">
                    <p>
                      <span>{{happy['LotteryName']}}</span>
                      <span>第{{happy['IssueName']}}期</span>
                    </p>
                    <div class="happy-number">
                      <div v-for="evstr in str21">
                        <p class="dda">{{evstr}}</p>
                      </div>
                      <div v-for="lt in str22">
                          <p>{{lt}}</p>
                      </div>
                    </div>
                  </li>
                  <li class="football">
                    <p>
                      <span>{{football['LotteryName']}}</span>
                      <span>第{{football['IssueName']}}期</span>
                    </p>
                    <div>
                      <p>{{football['HTeam']}} {{football['Rz']}} {{football['VTeam']}}</p>
                    </div>
                  </li>
                  <li class="basketball">
                    <p>
                      <span>{{basketball['LotteryName']}}</span>
                      <span>第{{basketball['IssueName']}}期</span>
                    </p>
                    <div>
                      <p>{{basketball['HTeam']}} {{basketball['Rz']}} {{basketball['VTeam']}}</p>
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
          // 大乐透
          str22: [],
          str21: [],
          str2: {},
          happy: {},
          // 足球竞猜
          football: {},
          // 篮球
          basketball: {}
        }
      },
      methods: {
      },
      mounted () {
        let that = this
        axios.get('api/data/Handler.ashx?action=600&params={}')
          .then(function (response) {
          //  console.log(response.data)
            that.message = response.data.data
            that.double = response.data.data[0]
            that.result = that.double['Rz']
            that.str1 = that.result.split('+')
            that.str11 = that.str1[0].split(' ')
            // 大乐透
            that.happy = response.data.data[1]
            that.result = that.double['Rz']
            that.str2 = that.result.split('+')
            that.str21 = that.str2[0].split(' ')
            that.str22 = that.str2[1].split(' ')
            // 足球
            that.football = response.data.data[2]
            // 篮球
            that.basketball = response.data.data[3]
          })
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
    font-size: 21px;
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
  .double-number>div,.happy-number>div{
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
/*超级大乐透*/
  .double-number>div:last-child{
    background-color:#6b8dff;
  }
  .happy-number>div:last-child,.happy->div:nth-child(6){
    background-color:#6b8dff;
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
  .football div p,.basketball div p{
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
</style>

