<template>
  <div class="soccer_wrap">
    <!--main-->
    <div class="soccer_main" v-show="isMainShow">
      <!--头-->
      <BuyHeader :MethodsArr="MethodsArr" :MoreArr="MoreArr" @changeSelectBall="changeSelectBall"
                 @instructionShow="isInstructionShow"></BuyHeader>
      <!--混合过关-->
      <div class="soccer_hunheguoguan">
        <div class="soccer_weekGame">
          <!--比赛折叠条-->
          <div class="weekGame_banner">
            <div class="banner_left">
              <span>{{}}</span>
              <span>{{}}</span>
              <span>共有{{}}场比赛可投</span>
            </div>
            <i class="iconfont icon-jiantou2"></i>
          </div>
          <div class="weekGame_games">
            <!--每个比赛-->
            <div class="games">
              <div class="games_left">
                <span>{{}}</span>
                <span>{{}}<b> {{}}</b></span>
                <span>{{}} 截止</span>
              </div>
              <div class="games_right">
                <!--比赛队伍-->
                <span class="right_title">
                  <b>让球</b>
                  <span>{{}}<strong>vs</strong>{{}}</span>
                </span>
                <!--表格-->
                <table>
                  <tr>
                    <td class="burangqiu">0</td>
                    <td class="sheng_top">
                      <p>
                        <span>主胜{{}}</span>
                        <span>平{{}}</span>
                        <span>客胜{{}}</span>
                      </p>
                    </td>
                    <td class="morePlay" rowspan="2"><span>更多<br>玩法</span></td>
                  </tr>
                  <tr>
                    <td class="burangqiu"></td>
                    <td class="sheng_top">
                      <p>
                        <span>主胜{{}}</span>
                        <span>平{{}}</span>
                        <span>客胜{{}}</span>
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--隐藏：玩法说明-->
    <BuyInstruction v-show="isInsShow" :thisPage="44" :thisTitle="'竞彩足球玩法说明'"
                    @instructionClose="isInstructionShow"></BuyInstruction>
  </div>
</template>

<script>
  import BuyHeader from '../tth-buy/buy-header'
  import BuyInstruction from '../tth-buy/buy-instruction.vue'

  export default {
    name: 'Soccer',
    components: {
      BuyHeader,
      BuyInstruction
    },
    data () {
      return {
        weekGameArr: [],
        isMainShow: true,
        isInsShow: false,
        MethodsArr: ['混合过关', '胜负平', '让球胜平负', '总进球', '比分', '半全场'],
        MoreArr: [
          {
            'moreName': '开奖详情',
            'moreIndex': 'kaijiang'
          },
          {
            'moreName': '玩法说明',
            'moreIndex': 'shuoming'
          }
        ]
      }
    },
    methods: {
      // 获取竞彩足球数据
      fecthSoccerData () {
        this.$request({
          type: 'get',
          url: '/api/data/Handler.ashx?action=401&params={}',
          success: function (res) {
            this.weekGameArr = res.data.data
            console.log(res.data)
          },
          failed: function (err) {
            console.log('未找到福彩3D数据:' + err)
          }
        })
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
      this.fecthSoccerData()
    }
  }
</script>

<style scoped lang="less">
  @import "../../../common/css/style.less";

  .soccer_wrap {
    width: 100%;
    .soccer_main {
      background-color: #f7f9fa;
      width: 100%;
      /*混合过关*/
      padding-top: 11.73333vmin;
      .soccer_hunheguoguan {
        width: 100%;
        .soccer_weekGame {
          width: 100%;
          /*比赛折叠条*/
          .weekGame_banner {
            width: 100%;
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 4vmin;
            height: 12.8vmin;
            box-sizing: border-box;
            .banner_left {
              span {
                margin-left: 3.46667vmin;
                font-size: 3.46667vmin;
              }
            }
            i {
              font-size: 5.26667vmin;
              color: #c7c7c7;
              transform: rotate(180deg);
            }
          }
          /*比赛*/
          .weekGame_games {
            width: 100%;
            .games {
              box-sizing: border-box;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              height: 30.66667vmin;
              margin: 0 2.66667vmin;
              /*box-sizing: border-box;*/
              .games_left {
                width: 15vmin;
                height: 100%;
                font-size: 2.93333vmin;
                font-weight: 400;
                margin-right: 2.4vmin;
                color: @color-text-black;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
              }
              .games_right {
                /*height: 100%;*/
                box-sizing: border-box;
                .right_title {
                  /*box-sizing: border-box;*/
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  position: relative;
                  b {
                    position: absolute;
                    left: 0;
                    top: -4vmin;
                    width: 3.73333vmin;
                    display: inline-block;
                    font-weight: 400;
                    font-size: 5.33333vmin;
                    -webkit-transform: scale(.5);
                    transform: scale(.5);
                    line-height: 1.2;
                  }
                  span {
                    margin-left: 6.66667vmin;
                    margin-bottom: 2.66667vmin;
                    font-size: 3.73333vmin;
                    display: inline-block;
                    font-weight: 700;
                    color: #5d5d5d;
                    white-space: nowrap;
                    strong {
                      margin: 0 4vmin;
                      font-weight: 400;
                    }
                  }
                }
                table {
                  width: 100%;
                  border: 1px solid #e6e6e6;
                  color: @color-text-black;
                  tr {
                    td {
                      /*vertical-align: middle;*/
                      font-size: 3.46667vmin;
                      background-color: white;
                    }
                    .burangqiu {
                      border: none;
                      width: 3.73333vmin;
                      font-size: 2.93333vmin;
                      text-align: center;
                      background: #e6e6e6;
                      height: 9.6vmin;
                      box-sizing: border-box;
                      vertical-align: middle
                    }
                    .sheng_top {
                      /*background: #fff;*/
                      height: 9.6vmin;
                      box-sizing: border-box;
                      border: 1px solid #e6e6e6;
                      font-size: 3.46667vmin;
                      text-align: center;
                      p {
                        height: 100%;
                        /*width: 261px;*/
                        span {
                          /*width: 33%;*/
                          display: inline-block;
                          height: 100%;
                          border-right: 1px solid #e6e6e6;
                          /*align-items: center;*/
                          /*justify-content: center;*/
                          vertical-align: middle;
                        }
                      }
                    }
                    .morePlay {
                      width: 10.66667vmin;
                      font-size: 3.46667vmin;
                      text-align: center;
                      border: 1px solid #e6e6e6;
                      span {
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
