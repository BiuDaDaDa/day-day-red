<template>
  <div class="basketball_wrap">
    <!--主要内容-->
    <div class="basketball_main" v-show="isMainShow">
      <!--头-->
      <BuyHeader :MethodsArr="MethodsArr" :MoreArr="MoreArr" @changeSelectBall="changeSelectBall"
                 @instructionShow="isInstructionShow"></BuyHeader>
      <!--1混合过关-->
      <div class="basketball_hunheguoguan" v-if="changeBall == 0">
        <!--每周比赛-->
        <div class="basketball_weekGame" v-for="(wk,index) in weekGameArr" :key="index">
          <!--比赛折叠条-->
          <div class="weekGame_banner" @click="clickBanner(index)">
            <div class="banner_left">
              <span>{{wk.WkName}}</span>
              <span>{{wk.Data}}</span>
              <span>共有{{wk.MatchCount}}场比赛可投</span>
            </div>
            <i class="iconfont icon-jiantou2 " :class="{'icon-jiantou2-change':  isChangeIcon === index}"></i>
          </div>
          <!--比赛-->
          <div class="weekGame_games" v-show="isShowGames === index">
            <!--每个比赛-->
            <div class="games" v-for="(game,index) in wk.Item" :key="index">
              <div class="games_left">
                <span>{{game.LeagueName}}</span>
                <span>{{game.WkName}}<b> {{game.MNo}}</b></span>
                <span>{{game.EndTime}} 截止</span>
              </div>
              <div class="games_right">
                <!--比赛队伍-->
                <span class="right_title">
                  <span>{{game.VTeam}}<b>(客)</b><strong>vs</strong><b>(主)</b>{{game.HTeam}}</span>
              </span>
                <!--表格-->
                <table>
                  <!--胜负-->
                  <tr>
                    <td class="table_left">胜负</td>
                    <td class="table_center">
                      <p v-if="game.SPSF === ''">
                        <span>未开售</span>
                        <span>未开售</span>
                      </p>
                      <p v-if="game.SPSF != ''">
                        <span><b>客胜</b><b>{{game.SPSF.split(',')[0]}}</b></span>
                        <span><b>主胜</b><b>{{game.SPSF.split(',')[1]}}</b></span>
                      </p>
                    </td>
                    <!--点击更多玩法时 传递：接口相关编号、队伍名-->
                    <td class="morePlay" rowspan="3" @click="morePlay(game.IssueNo, game.HTeam, game.VTeam)">
                      <span>更多<br>玩法</span></td>
                  </tr>
                  <!--让分-->
                  <tr>
                    <td class="table_left table_left_two">让分</td>
                    <td class="table_center">
                      <p>
                        <span><b>客胜</b><b>{{game.SPRFSF.split(',')[0]}}</b></span>
                        <span><b>主胜 <strong
                          :class="{fenRed: game.SPRFSF.split(',')[2] > 0}">({{game.SPRFSF.split(',')[2]}})</strong></b><b>{{game.SPRFSF.split(',')[1]}}</b></span>
                      </p>
                    </td>
                  </tr>
                  <!--大小分-->
                  <tr>
                    <td class="table_left table_left_three">胜负</td>
                    <td class="table_center">
                      <p>
                        <span><b>大于{{parseInt(game.SPDXF.split(',')[2])}}分</b><b>{{game.SPDXF.split(',')[0]}}</b></span>
                        <span><b>小于{{parseInt(game.SPDXF.split(',')[2])}}分</b><b>{{game.SPDXF.split(',')[1]}}</b></span>
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--2胜负-->
      <div class="basketball_shengpingfu" v-if="changeBall == 1">
        <div class="basketball_weekGame" v-for="(wk,index) in weekGameArr" :key="index">
          <!--比赛折叠条-->
          <div class="weekGame_banner" @click="clickBanner(index)">
            <div class="banner_left">
              <span>{{wk.WkName}}</span>
              <span>{{wk.Data}}</span>
              <span>共有{{wk.MatchCount}}场比赛可投</span>
            </div>
            <i class="iconfont icon-jiantou2 " :class="{'icon-jiantou2-change':  isChangeIcon === index}"></i>
          </div>
          <!--比赛-->
          <div class="weekGame_games" v-show="isShowGames === index">
            <!--每个比赛-->
            <div class="games" v-for="game in wk.Item">
              <div class="games_left">
                <span>{{game.LeagueName}}</span>
                <span>{{game.WkName}}<b> {{game.MNo}}</b></span>
                <span>{{game.EndTime}} 截止</span>
              </div>
              <div class="games_right">
                <!--比赛队伍-->
                <span class="right_title">
                  <span>{{game.VTeam}}<b>(客)</b><strong>vs</strong><b>(主)</b>{{game.HTeam}}</span>
              </span>
                <!--表格-->
                <table>
                  <!--胜负-->
                  <tr>
                    <td class="table_center">
                      <p v-if="game.SPSF === ''">
                        <span>未开售</span>
                        <span>未开售</span>
                      </p>
                      <p v-if="game.SPSF != ''">
                        <span><b>客胜</b><b>{{game.SPSF.split(',')[0]}}</b></span>
                        <span><b>主胜</b><b>{{game.SPSF.split(',')[1]}}</b></span>
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--3让分胜负-->
      <div class="basketball_shengpingfu" v-if="changeBall == 2">
        <div class="basketball_weekGame" v-for="(wk,index) in weekGameArr" :key="index">
          <!--比赛折叠条-->
          <div class="weekGame_banner" @click="clickBanner(index)">
            <div class="banner_left">
              <span>{{wk.WkName}}</span>
              <span>{{wk.Data}}</span>
              <span>共有{{wk.MatchCount}}场比赛可投</span>
            </div>
            <i class="iconfont icon-jiantou2 " :class="{'icon-jiantou2-change':  isChangeIcon === index}"></i>
          </div>
          <!--比赛-->
          <div class="weekGame_games" v-show="isShowGames === index">
            <!--每个比赛-->
            <div class="games" v-for="game in wk.Item">
              <div class="games_left">
                <span>{{game.LeagueName}}</span>
                <span>{{game.WkName}}<b> {{game.MNo}}</b></span>
                <span>{{game.EndTime}} 截止</span>
              </div>
              <div class="games_right">
                <!--比赛队伍-->
                <span class="right_title">
                  <span>{{game.VTeam}}<b>(客)</b><strong>vs</strong><b>(主)</b>{{game.HTeam}}</span>
                  <strong class="title_Num"
                          :class="{title_Num_red:game.SPRFSF.split(',')[2] > 0}">{{game.SPRFSF.split(',')[2]}}</strong>
              </span>
                <!--表格-->
                <table>
                  <!--胜负-->
                  <tr>
                    <td class="table_center">
                      <p v-if="game.SPRFSF === ''">
                        <span>未开售</span>
                        <span>未开售</span>
                      </p>
                      <p v-if="game.SPRFSF != ''">
                        <span><b>客胜</b><b>{{game.SPRFSF.split(',')[0]}}</b></span>
                        <span><b>主胜</b><b>{{game.SPRFSF.split(',')[1]}}</b></span>
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--4胜分差-->
      <div class="basketball_fencha" v-if="changeBall == 3">
        <div class="soccer_weekGame" v-for="(wk,index) in weekGameArr" :key="index">
          <!--比赛折叠条-->
          <div class="weekGame_banner" @click="clickBanner(index)">
            <div class="banner_left">
              <span>{{wk.WkName}}</span>
              <span>{{wk.Data}}</span>
              <span>共有{{wk.MatchCount}}场比赛可投</span>
            </div>
            <i class="iconfont icon-jiantou2 " :class="{'icon-jiantou2-change':  isChangeIcon === index}"></i>
          </div>
          <!--比赛-->
          <div class="weekGame_games" v-show="isShowGames === index">
            <!--每个比赛-->
            <div class="games" v-for="game in wk.Item">
              <img src="../../../assets/tth-home/dan.png"/>
              <div class="games_left">
                <span>{{game.LeagueName}}</span>
                <span>{{game.WkName}}<b> {{game.MNo}}</b></span>
                <span>{{game.EndTime}} 截止</span>
              </div>
              <div class="games_right">
                <!--比赛队伍-->
                <span class="right_title">
                  <span>{{game.VTeam}}<strong>vs</strong>{{game.HTeam}}</span>
                </span>
                <!--投注区-->
                <div @click="morePlay(game.IssueNo, game.HTeam, game.VTeam)"><span>请选择投注内容</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--5大小分-->
      <div class="basketball_shengpingfu" v-if="changeBall == 4">
        <div class="basketball_weekGame" v-for="(wk,index) in weekGameArr" :key="index">
          <!--比赛折叠条-->
          <div class="weekGame_banner" @click="clickBanner(index)">
            <div class="banner_left">
              <span>{{wk.WkName}}</span>
              <span>{{wk.Data}}</span>
              <span>共有{{wk.MatchCount}}场比赛可投</span>
            </div>
            <i class="iconfont icon-jiantou2 " :class="{'icon-jiantou2-change':  isChangeIcon === index}"></i>
          </div>
          <!--比赛-->
          <div class="weekGame_games" v-show="isShowGames === index">
            <!--每个比赛-->
            <div class="games" v-for="game in wk.Item">
              <div class="games_left">
                <span>{{game.LeagueName}}</span>
                <span>{{game.WkName}}<b> {{game.MNo}}</b></span>
                <span>{{game.EndTime}} 截止</span>
              </div>
              <div class="games_right">
                <!--比赛队伍-->
                <span class="right_title">
                  <span>{{game.VTeam}}<b>(客)</b><strong>vs</strong><b>(主)</b>{{game.HTeam}}</span>
              </span>
                <!--表格-->
                <table>
                  <!--胜负-->
                  <tr>
                    <td class="table_center">
                      <p v-if="game.SPRFSF === ''">
                        <span>未开售</span>
                        <span>未开售</span>
                      </p>
                      <p v-if="game.SPRFSF != ''">
                        <span><b>大于{{parseFloat(game.SPDXF.split(',')[2])}}分</b><b>{{game.SPDXF.split(',')[0]}}</b></span>
                        <span><b>小于{{parseFloat(game.SPDXF.split(',')[2])}}分</b><b>{{game.SPDXF.split(',')[0]}}</b></span>
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BuyFooterSport :isShowCount="false"></BuyFooterSport>
    </div>

    <!--隐藏：更多玩法 根据index更改数据 根据isShowMorePlay控制显示-->
    <mt-popup class="morePlays" v-model="isShowMorePlay" position="bottom">
      <div class="morePlay">
        <!--队伍-->
        <h5 class="morePlay_title">
          {{Vteam}}(客)
          <span>VS</span>
          {{Hteam}}(主)
        </h5>
        <!--玩法:根据头部index切换更多玩法显示内容-->
        <div class="morePlay_select">
          <!--1胜负-->
          <div v-show="changeBall === 0" class="morePlay_shengfu">
            <!--左-->
            <div class="shengfu_left">
              <span class="shengfu_left_top">胜负</span>
            </div>
            <!--右-->
            <div class="shengfu_right">
              <span><b>客胜</b> <b>{{sfArr[0]}}</b></span>
              <span><b>主胜</b> <b>{{sfArr[1]}}</b></span>
            </div>
          </div>
          <!--2让分胜负-->
          <div v-show="changeBall === 0" class="morePlay_rangfen">
            <!--左-->
            <div class="rangfen_left">
              <span class="rangfen_left_top">让分胜负</span>
            </div>
            <!--右-->
            <div class="rangfen_right">
              <div>
                <span><b>客胜</b> <b>{{rfsfArr[0]}}</b></span>
                <span><b>主胜</b> <b>{{rfsfArr[1]}}</b></span>
              </div>
              <p class="right_bottom">让分胜负(主队<b>{{rfsfArr[2]}}</b>)</p>
            </div>
          </div>
          <!--3让分胜负-->
          <div v-show="changeBall === 0" class="morePlay_yushezongfen">
            <!--左-->
            <div class="yushezongfen_left">
              <span class="yushezongfen_left_top">让分胜负</span>
            </div>
            <!--右-->
            <div class="yushezongfen_right">
              <div>
                <span><b>大于{{parseFloat(yszfArr[2])}}分</b> <b>{{yszfArr[0]}}</b></span>
                <span><b>小于{{parseFloat(yszfArr[2])}}分</b> <b>{{yszfArr[1]}}</b></span>
              </div>
              <p class="right_bottom">预设总分(<b>{{parseFloat(yszfArr[2])}}</b>)</p>
            </div>
          </div>
          <!--4胜分差 客-->
          <div v-show="changeBall === 0 || changeBall === 3" class="morePlay_shengfencha">
            <!--左-->
            <div class="shengfencha_left">
              <span class="shengfencha_left_top">胜分差</span>
            </div>
            <!--右-->
            <div class="shengfencha_right">
              <div>
                <span v-if="index <= 2 " v-for="(a,index) in sfcArr" :key="index"><b>{{shengfenchaArr[index]}}</b><b>{{a}}</b></span>
              </div>
              <div>
                <span v-if="index <= 5 && index >2 " v-for="(a,index) in sfcArr" :key="index"><b>{{shengfenchaArr[index]}}</b><b>{{a}}</b></span>
              </div>
              <p class="right_bottom">{{Vteam}}(客胜)</p>
            </div>
          </div>
          <!--5胜分差 主-->
          <div v-show="changeBall === 0 || changeBall === 3" class="morePlay_shengfencha">
            <!--左-->
            <div class="shengfencha_left fenchaBlue">
              <span class="shengfencha_left_top ">胜分差</span>
            </div>
            <!--右-->
            <div class="shengfencha_right">
              <div>
                <span v-if="index >= 6 && index < 9" v-for="(a,index) in sfcArr" :key="index"><b>{{shengfenchaArr[index]}}</b><b>{{a}}</b></span>
              </div>
              <div>
                <span v-if="index >= 9 " v-for="(a,index) in sfcArr" :key="index"><b>{{shengfenchaArr[index]}}</b><b>{{a}}</b></span>
              </div>
              <p class="right_bottom">{{Hteam}}(主胜)</p>
            </div>
          </div>
        </div>
        <!--取消/确定-->
        <div class="morePlay_action">
          <div @click="isShowMorePlay = false">取消</div>
          <div>确定</div>
        </div>
      </div>
    </mt-popup>

    <!--隐藏：玩法说明-->
    <BuyInstruction v-show="isInsShow" :thisPage="44" :thisTitle="'竞彩蓝球玩法说明'"
                    @instructionClose="isInstructionShow"></BuyInstruction>
  </div>
</template>

<script>
  import BuyHeader from '../tth-buy/buy-header'
  import BuyInstruction from '../tth-buy/buy-instruction.vue'
  import BuyFooterSport from '../tth-buy/buy-footer-sport.vue'

  export default {
    name: 'Basketball',
    components: {
      BuyHeader,
      BuyInstruction,
      BuyFooterSport
    },
    data () {
      return {
        sfcArr: [],
        yszfArr: [],
        rfsfArr: [],
        sfArr: [],
        morePlayArr: [],
        Vteam: '',
        Hteam: '',
        clickIndex: '',
        // 混合玩法-更多玩法
        isShowMorePlay: false,
        isChangeIcon: 0,
        isShowGames: 0,
        weekGameArr: [],
        isMainShow: true,
        isInsShow: false,
        changeBall: 0,
        MethodsArr: ['混合过关', '胜负', '让分胜负', '胜分差', '大小分'],
        MoreArr: [
          {
            'moreName': '开奖详情',
            'moreIndex': 'kaijiang'
          },
          {
            'moreName': '玩法说明',
            'moreIndex': 'shuoming'
          }
        ],
        shengfenchaArr: ['1-5', '6-10', '11-15', '16-20', '21-25', '26分+', '1-5', '6-10', '11-15', '16-20', '21-25', '26分+']
      }
    },
    methods: {
      // 获取竞彩蓝球数据
      fecthBasketballData () {
        this.$request({
          type: 'get',
          url: '/api/data/Handler.ashx?action=410&params={}',
          success: function (res) {
            this.weekGameArr = res.data.data
//            console.log(res.data.data)
          },
          failed: function (err) {
            console.log('未找到竞彩蓝球数据:' + err)
          }
        })
      },
      // 获取竞彩蓝球数据
      fecthMorePlayData () {
        this.$request({
          type: 'get',
          url: '/api/data/Handler.ashx?action=415&params={%22IssueNo%22:' + this.clickIndex + '}',
          success: function (res) {
            this.morePlayArr = res.data.data
            this.sfArr = this.morePlayArr.SPSF.split(',')
            this.rfsfArr = this.morePlayArr.SPRFSF.split(',')
            this.yszfArr = this.morePlayArr.SPDXF.split(',')
            this.sfcArr = this.morePlayArr.SPSFC.split(',')
          },
          failed: function (err) {
            console.log('未找到竞彩蓝球更多玩法数据:' + err)
          }
        })
      },
      // 玩法介绍显示
      isInstructionShow () {
        this.isMainShow = !this.isMainShow
        this.isInsShow = !this.isInsShow
      },
      // 不同玩法对应投注
      changeSelectBall (index) {
        this.changeBall = index
      },
      // 点击折叠条
      clickBanner (index) {
        if (this.isShowGames === index) {
          this.isShowGames = index + 'a'
          this.isChangeIcon = index + 'a'
        } else {
          this.isShowGames = index
          this.isChangeIcon = index
        }
      },
      // 点击打开更多玩法
      morePlay (index, hteam, vteam) {
        // 控制更多玩法显示
        this.isShowMorePlay = true
        // 切换更多玩法数据
        this.clickIndex = index
        this.Vteam = vteam
        this.Hteam = hteam
      }
    },
    watch: {
      clickIndex: function () {
        this.fecthMorePlayData()
      }
    },
    mounted () {
      this.fecthBasketballData()
    }
  }
</script>

<style scoped lang="less">
  @import "../../../common/css/style.less";

  .basketball_wrap {
    width: 100%;
    height: 169vmin;
    background-color: #f7f9fa;
    /*主内容*/
    .basketball_main {
      background-color: #f7f9fa;
      width: 100%;
      padding-top: 11.73333vmin;
      /*混合*/
      .basketball_hunheguoguan {
        width: 100%;
        .basketball_weekGame {
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
            border-bottom: 1px solid #eee;
            .banner_left {
              span {
                margin-left: 3.46667vmin;
                font-size: 3.46667vmin;
              }
            }
            i {
              font-size: 5.26667vmin;
              color: #c7c7c7;
            }
            .icon-jiantou2-change {
              transform: rotate(180deg);
            }
          }
          /*比赛*/
          .weekGame_games {
            width: 100%;
            border-bottom: 1px solid #e6e6e6;
            .games {
              box-sizing: border-box;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              height: 48.66667vmin;
              margin: 0 2.66667vmin;
              border-bottom: 1px solid #e6e6e6;
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
                span {
                  text-overflow: ellipsis;
                  display: block;
                  margin-bottom: 1.8vmin;
                  white-space: nowrap;
                }
              }
              .games_right {
                /*height: 100%;*/
                box-sizing: border-box;
                .right_title {
                  /*box-sizing: border-box;*/
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  span {
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
                    b {
                      font-size: 3.2vmin;
                      color: @color-text-gray;
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
                    .table_left {
                      border: none;
                      height: 11.73333vmin;
                      width: 3.73333vmin;
                      font-size: 2.93333vmin;
                      text-align: center;
                      background: #34ccc3;
                      vertical-align: middle;
                      color: white;
                    }
                    .table_left_two {
                      background-color: #fbb52f;
                    }
                    .table_left_three {
                      background-color: #36a8f8;
                    }
                    .table_center {
                      height: 11.73333vmin;
                      box-sizing: border-box;
                      border: 1px solid #e6e6e6;
                      text-align: center;
                      p {
                        display: flex;
                        align-items: center;
                        height: 100%;
                        box-sizing: border-box;
                        /*text-align: center;*/
                        span {
                          width: 31.5vmin;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          flex-direction: column;
                          height: 100%;
                          border-right: 1px solid #e6e6e6;
                          strong {
                            color: @color-blue;
                          }
                          .fenRed {
                            color: @color-red;
                          }
                          b:first-child {
                            margin-bottom: 1.5vmin;
                          }
                        }
                        span:last-child {
                          border: none;
                        }
                      }
                    }
                    .morePlay {
                      width: 10.66667vmin;
                      font-size: 3.46667vmin;
                      text-align: center;
                      border: 1px solid #e6e6e6;
                      color: @color-text-gray;
                      vertical-align: middle;
                      line-height: 1.5;
                    }
                  }
                }
              }
            }
            .games:last-child {
              border: none;
            }
          }
        }
        .basketball_weekGame:last-child {
          margin-bottom: 13.33333vmin;
        }
      }
      /*胜负\让分胜负\大小分*/
      .basketball_shengpingfu {
        background-color: #f7f9fa;
        width: 100%;
        .basketball_weekGame {
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
            border-bottom: 1px solid #eee;
            .banner_left {
              span {
                margin-left: 3.46667vmin;
                font-size: 3.46667vmin;
              }
            }
            i {
              font-size: 5.26667vmin;
              color: #c7c7c7;
              /*transform: rotate(180deg);*/
            }
            .icon-jiantou2-change {
              transform: rotate(180deg);
            }
          }
          /*比赛*/
          .weekGame_games {
            width: 100%;
            .games {
              padding: 3.2vmin 0;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              height: 25.33333vmin;
              margin: 0 2.66667vmin;
              border-bottom: 1px solid #e6e6e6;
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
                span {
                  text-overflow: ellipsis;
                  display: block;
                  margin-bottom: 1.8vmin;
                  white-space: nowrap;
                }
              }
              .games_right {
                /*height: 100%;*/
                box-sizing: border-box;
                .right_title {
                  /*box-sizing: border-box;*/
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  position: relative;
                  span {
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
                    b {
                      font-size: 3.2vmin;
                      color: #999;
                    }
                  }
                  .title_Num {
                    font-size: 3.73333vmin;
                    position: absolute;
                    top: 0;
                    right: 0;
                    margin-right: 1.33333vmin;
                    color: @color-blue;
                  }
                  .title_Num_red {
                    color: @color-red;
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
                    .table_center {
                      height: 11.73333vmin;
                      box-sizing: border-box;
                      border: 1px solid #e6e6e6;
                      text-align: center;
                      p {
                        display: flex;
                        align-items: center;
                        height: 100%;
                        box-sizing: border-box;
                        /*text-align: center;*/
                        span {
                          width: 38vmin;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          flex-direction: column;
                          height: 100%;
                          border-right: 1px solid #e6e6e6;
                          strong {
                            color: @color-blue;
                          }
                          b:first-child {
                            font-size: 3.73333vmin;
                            margin-bottom: 1.1vmin;
                          }
                          b:last-child {
                            color: #666
                          }
                        }
                        span:last-child {
                          border: none;
                        }
                      }
                    }
                  }
                }
              }
            }
            .games:last-child {
              border: none;
            }
          }
        }
        .basketball_weekGame:last-child {
          margin-bottom: 13.33333vmin;
        }
      }
      /*胜分差*/
      .basketball_fencha {
        background-color: #f7f9fa;
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
            border-bottom: 1px solid #eee;
            .banner_left {
              span {
                margin-left: 3.46667vmin;
                font-size: 3.46667vmin;
              }
            }
            i {
              font-size: 5.26667vmin;
              color: #c7c7c7;
              /*transform: rotate(180deg);*/
            }
            .icon-jiantou2-change {
              transform: rotate(180deg);
            }
          }
          /*比赛*/
          .weekGame_games {
            width: 100%;
            .games {
              height: 24.26667vmin;
              position: relative;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              margin: 0 2.66667vmin;
              border-bottom: 1px solid #e6e6e6;
              img {
                position: absolute;
                top: 0;
                left: -11px;
                width: 5.06667vmin;
                height: 3.2vmin;
              }
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
                span {
                  text-overflow: ellipsis;
                  display: block;
                  margin-bottom: 1.8vmin;
                  white-space: nowrap;
                }
              }
              .games_right {
                width: 100vmin;
                box-sizing: border-box;
                .right_title {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  position: relative;
                  span {
                    margin-bottom: 3.66667vmin;
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
                div {
                  box-sizing: border-box;
                  padding: 3.2vmin 0;
                  height: 9.6vmin;
                  width: 100%;
                  border: .26667vmin solid #e6e6e6;
                  background: #fff;
                  color: #666;
                  font-size: 3.46667vmin;
                  border-radius: 4px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
              }
            }
            .games:last-child {
              border: none;
            }
          }
        }
        .soccer_weekGame:last-child {
          margin-bottom: 13.33333vmin;
        }
      }
    }
    /*更多玩法*/
    .morePlays {
      width: 100%;
      .morePlay {
        background-color: @color-background-gray;
        width: 100%;
        /*头部*/
        h5 {
          font-weight: bold;
          font-size: 4.26667vmin;
          width: 100%;
          height: 9.33333vmin;
          background: #fff;
          margin-bottom: 2.13333vmin;
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            margin: 0 14.66667vmin;
            font-weight: bold;
          }
        }
        /*选择*/
        .morePlay_select {
          margin: 0 2.93333vmin;
          font-size: 1.86667vmin;
          /*胜负*/
          .morePlay_shengfu {
            width: 100%;
            font-size: 3.46667vmin;
            color: @color-text-black;
            display: flex;
            align-items: center;
            margin-bottom: 2.3vmin;
            /*左*/
            .shengfu_left {
              background-color: #36a8f8;
              width: 6.9vmin;
              height: 11.73333vmin;
              display: flex;
              justify-content: center;
              text-align: center;
              font-size: 1.86667vmin;
              span {
                writing-mode: vertical-rl;
                color: white;
              }
            }
            /*右*/
            .shengfu_right {
              border-top: 1px solid #e6e6e6;
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              span {
                background-color: white;
                height: 11.73333vmin;
                width: 43.33333vmin;
                border-right: 1px solid #e6e6e6;
                border-bottom: 1px solid #e6e6e6;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                b:last-child {
                  color: #666;
                }
                b:first-child {
                  margin-bottom: 1.2vmin;
                }
              }
            }
          }
          /*让分胜负*/
          .morePlay_rangfen {
            width: 100%;
            font-size: 3.46667vmin;
            color: @color-text-black;
            display: flex;
            align-items: center;
            margin-bottom: 2.3vmin;
            box-sizing: border-box;
            /*左*/
            .rangfen_left {
              background-color: #34ccc3;
              width: 6.9vmin;
              height: 19.6vmin;
              display: flex;
              justify-content: center;
              text-align: center;
              font-size: 1.86667vmin;
              span {
                writing-mode: vertical-rl;
                color: white;
              }
            }
            /*右*/
            .rangfen_right {
              border-top: 1px solid #e6e6e6;
              display: flex;
              align-items: center;
              flex-direction: column;
              /*justify-content: center;*/
              flex-wrap: wrap;
              div{
                display: flex;
                align-items: center;
                span {
                  background-color: white;
                  height: 11.73333vmin;
                  width: 43.33333vmin;
                  border-right: 1px solid #e6e6e6;
                  border-bottom: 1px solid #e6e6e6;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-direction: column;
                  b:last-child {
                    color: #666;
                  }
                  b:first-child {
                    margin-bottom: 1.2vmin;
                  }
                }
              }
              p{
                width: 43.33333vmin*2;
                display: flex;
                align-items: center;
                justify-content: center;
                border-right: 1px solid #e6e6e6;
                border-bottom: 1px solid #e6e6e6;
                background-color: #f7f9fa;
                color: #666;
                height: 7.73333vmin;
                b{
                  color:@color-red;
                }
              }
            }
          }
          /*预设总分*/
          .morePlay_yushezongfen {
            width: 100%;
            font-size: 3.46667vmin;
            color: @color-text-black;
            display: flex;
            align-items: center;
            margin-bottom: 2.3vmin;
            box-sizing: border-box;
            /*左*/
            .yushezongfen_left {
              background-color: #6b8dff;
              width: 6.9vmin;
              height: 19.6vmin;
              display: flex;
              justify-content: center;
              text-align: center;
              font-size: 1.86667vmin;
              span {
                writing-mode: vertical-rl;
                color: white;
              }
            }
            /*右*/
            .yushezongfen_right {
              border-top: 1px solid #e6e6e6;
              display: flex;
              align-items: center;
              flex-direction: column;
              flex-wrap: wrap;
              div{
                display: flex;
                align-items: center;
                span {
                  background-color: white;
                  height: 11.73333vmin;
                  width: 43.33333vmin;
                  border-right: 1px solid #e6e6e6;
                  border-bottom: 1px solid #e6e6e6;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-direction: column;
                  b:last-child {
                    color: #666;
                  }
                  b:first-child {
                    margin-bottom: 1.2vmin;
                  }
                }
              }
              p{
                width: 43.33333vmin*2;
                display: flex;
                align-items: center;
                justify-content: center;
                border-right: 1px solid #e6e6e6;
                border-bottom: 1px solid #e6e6e6;
                background-color: #f7f9fa;
                color: #666;
                height: 7.73333vmin;
                b{
                  color:@color-red;
                }
              }
            }
          }
          /*胜分差1*/
          .morePlay_shengfencha {
            width: 100%;
            font-size: 3.46667vmin;
            color: @color-text-black;
            display: flex;
            align-items: center;
            margin-bottom: 2.3vmin;
            box-sizing: border-box;
            /*左*/
            .shengfencha_left {
              background-color: #fbb52f;
              width: 6.9vmin;
              height: 31.2vmin;
              display: flex;
              justify-content: center;
              text-align: center;
              font-size: 1.86667vmin;
              span {
                writing-mode: vertical-rl;
                color: white;
              }
            }
            .fenchaBlue{
              background-color: #36a8f8;
            }
            /*右*/
            .shengfencha_right {
              border-top: 1px solid #e6e6e6;
              display: flex;
              align-items: center;
              flex-direction: column;
              flex-wrap: wrap;
              div{
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                span {
                  background-color: white;
                  height: 11.73333vmin;
                  width: 28.8vmin;
                  border-right: 1px solid #e6e6e6;
                  border-bottom: 1px solid #e6e6e6;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-direction: column;
                  b:last-child {
                    color: #666;
                  }
                  b:first-child {
                    margin-bottom: 1.2vmin;
                  }
                }
              }
              p{
                width: 43.33333vmin*2;
                display: flex;
                align-items: center;
                justify-content: center;
                border-right: 1px solid #e6e6e6;
                border-bottom: 1px solid #e6e6e6;
                background-color: #f7f9fa;
                color: #666;
                height: 7.73333vmin;
              }
            }
          }
        }
        /*取消/确定*/
        .morePlay_action {
          width: 100%;
          font-size: 4.26667vmin;
          display: flex;
          div {
            width: 50%;
            height: 11.73333vmin;
            border-radius: 1.1vmin;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          div:first-child {
            background: #ccc;
            color: @color-text-black;
          }
          div:last-child {
            background-color: @color-red;
            color: white;
          }
        }
      }
    }
  }
</style>
