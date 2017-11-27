<template>
  <div class="soccer_wrap">
    <!--main-->
    <div class="soccer_main" v-show="isMainShow">
      <!--头-->
      <BuyHeader :MethodsArr="MethodsArr" :MoreArr="MoreArr" @changeSelectBall="changeSelectBall"
                 @instructionShow="isInstructionShow"></BuyHeader>
      <!--混合过关-->
      <div class="soccer_hunheguoguan" v-if="changeBall == 0">
        <!--每周比赛-->
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
            <div class="games" v-for="(game,index) in wk.Item" :key="index">
              <div class="games_left">
                <span>{{game.LeagueName}}</span>
                <span>{{game.WkName}}<b> {{game.MNo}}</b></span>
                <span>{{game.EndTime}} 截止</span>
              </div>
              <div class="games_right">
                <!--比赛队伍-->
                <span class="right_title">
                  <b>让球</b>
                  <span>{{game.HTeam}}<strong>vs</strong>{{game.VTeam}}</span>
                </span>
                <!--表格-->
                <table>
                  <tr>
                    <td class="burangqiu">0</td>
                    <td class="sheng_top">
                      <p>
                        <span>主胜 {{game.SPSPF.split(",")[0]}}</span>
                        <span>平 {{game.SPSPF.split(",")[1]}}</span>
                        <span>客胜 {{game.SPSPF.split(",")[2]}}</span>
                      </p>
                    </td>
                    <!--点击更多玩法时 传递：接口相关编号、队伍名-->
                    <td class="morePlay" rowspan="2" @click="morePlay(game.IssueNo, game.HTeam, game.VTeam)"><span>更多<br>玩法</span></td>
                  </tr>
                  <tr>
                    <td class="rangqiu" :class="{rangqiuBlue:parseInt(game.SPRQS.split(',')[3]) < 0}">
                      {{game.SPRQS.split(",")[3]}}
                    </td>
                    <td class="sheng_top">
                      <p>
                        <span>主胜 {{game.SPRQS.split(",")[0]}}</span>
                        <span>平 {{game.SPRQS.split(",")[1]}}</span>
                        <span>客胜 {{game.SPRQS.split(",")[2]}}</span>
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--胜平负-->
      <div class="soccer_shengpingfu" v-if="changeBall == 1">
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
              <div class="games_left">
                <span>{{game.LeagueName}}</span>
                <span>{{game.WkName}}<b> {{game.MNo}}</b></span>
                <span>{{game.EndTime}} 截止</span>
              </div>
              <div class="games_right">
                <!--比赛队伍-->
                <span class="right_title">
                  <span>{{game.HTeam}}<strong>vs</strong>{{game.VTeam}}</span>
                </span>
                <!--表格-->
                <table>
                  <tr>
                    <td class="sheng_top">
                      <p>
                        <span class="sheng_top_block">
                          <span>主胜</span>
                          <span>{{game.SPSPF.split(",")[0]}}</span>
                        </span>
                        <span class="sheng_top_block">
                          <span>平</span>
                          <span> {{game.SPSPF.split(",")[1]}}</span>
                        </span>
                        <span class="sheng_top_block">
                          <span>客胜</span>
                          <span>{{game.SPSPF.split(",")[2]}}</span>
                        </span>
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--让球平负-->
      <div class="soccer_shengpingfu" v-if="changeBall == 2">
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
              <div class="games_left">
                <span>{{game.LeagueName}}</span>
                <span>{{game.WkName}}<b> {{game.MNo}}</b></span>
                <span>{{game.EndTime}} 截止</span>
              </div>
              <div class="games_right">
                <!--比赛队伍-->
                <span class="right_title">
                  <span>{{game.HTeam}}<strong>vs</strong>{{game.VTeam}}</span>
                </span>
                <!--表格-->
                <table>
                  <tr>
                    <td class="sheng_top">
                      <p>
                        <span class="sheng_top_block">
                          <span>主胜</span>
                          <span>{{game.SPRQS.split(",")[0]}}</span>
                        </span>
                        <span class="sheng_top_block">
                          <span>平</span>
                          <span> {{game.SPRQS.split(",")[1]}}</span>
                        </span>
                        <span class="sheng_top_block">
                          <span>客胜</span>
                          <span>{{game.SPRQS.split(",")[2]}}</span>
                        </span>
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--总进球-->
      <div class="soccer_zongjinqiu" v-if="changeBall == 3">
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
                  <span>{{game.HTeam}}<strong>vs</strong>{{game.VTeam}}</span>
                </span>
                <!--表格-->
                <table>
                  <tr>
                    <td class="gameInfoSpan" v-if="index < 4" v-for="(gameInfo,index) in game.SPJQS.split(',')"
                        :key="index">
                      <span><b>{{index}}</b>{{gameInfo}}</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="gameInfoSpan" v-if="index >= 4" v-for="(gameInfo,index) in game.SPJQS.split(',')"
                        :key="index">
                      <span><b>{{index}}<span v-if="index === 7">+</span></b>{{gameInfo}}</span>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--比分-->
      <div class="soccer_bifen" v-if="changeBall == 4">
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
                  <span>{{game.HTeam}}<strong>vs</strong>{{game.VTeam}}</span>
                </span>
                <!--投注区-->
                <div @click="morePlay(game.IssueNo, game.HTeam, game.VTeam)"><span>点击展开比分投注区</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--半全场-->
      <div class="soccer_bifen" v-if="changeBall == 5">
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
                  <span>{{game.HTeam}}<strong>vs</strong>{{game.VTeam}}</span>
                </span>
                <!--投注区-->
                <div @click="morePlay(game.IssueNo, game.HTeam, game.VTeam)"><span>点击展开半全场</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BuyFooterSport :isShowCount="false"></BuyFooterSport>
    </div>
    <!--隐藏：玩法说明-->
    <BuyInstruction v-show="isInsShow" :thisPage="44" :thisTitle="'竞彩足球玩法说明'"
                    @instructionClose="isInstructionShow"></BuyInstruction>
    <!--隐藏：更多玩法 根据index更改数据 根据isShowMorePlay控制显示-->
    <mt-popup class="morePlays" v-model="isShowMorePlay" position="bottom">
      <div class="morePlay">
        <!--队伍-->
        <h5 class="morePlay_title">
          {{Hteam}}
          <span>VS</span>
          {{Vteam}}
        </h5>
        <!--玩法:根据头部index切换更多玩法显示内容-->
        <div class="morePlay_select">
          <!--1混合-->
          <div v-show="changeBall === 0" class="morePlay_hunhe">
            <!--左-->
            <div class="hunhe_left">
              <span class="hunhe_left_top">0</span>
              <span class="hunhe_left_bottom" :class="{'hunhe_left_bottom_add': rqArr[3] === '-1'}">{{rqArr[3]}}</span>
            </div>
            <!--右-->
            <div class="hunhe_right">
              <span><b>主胜</b> <b>{{brqArr[0]}}</b></span>
              <span><b>平</b> <b>{{brqArr[1]}}</b></span>
              <span><b>客胜</b> <b>{{brqArr[2]}}</b></span>
              <span><b>主胜</b> <b>{{rqArr[0]}}</b></span>
              <span><b>平</b> <b>{{rqArr[1]}}</b></span>
              <span><b>客胜</b> <b>{{rqArr[2]}}</b></span>
            </div>
          </div>
          <!--2总进球-->
          <div v-show="changeBall === 0" class="morePlay_zongjinqiu">
            <!--左-->
            <div class="zongjinqiu_left">
              <span>总进球</span>
            </div>
            <!--右-->
            <div class="zongjinqiu_right">
              <span v-for="(a,index) in zjqArr" :key="index"><b>{{index}}<em v-if="index === 7">+</em></b> <b>{{a}}</b></span>
            </div>
          </div>
          <!--3半全场-->
          <div v-show="changeBall === 0 || changeBall === 5" class="morePlay_banquanchang">
            <!--左-->
            <div class="banquanchang_left">
              <span>半全场</span>
            </div>
            <!--右-->
            <div class="banquanchang_right">
              <span v-for="(a,index) in bqcArr"><b>{{bqcItems[index]}}</b> <b>{{a}}</b></span>
            </div>
          </div>
          <!--4比分-->
          <div v-show="changeBall === 0" class="morePlay_bifen">
            <!--左-->
            <div class="bifen_left">
              <span>比分</span>
            </div>
            <!--右-->
            <div class="bifen_right">
              <span v-for="(b,index) in bfArr" :key="index"
                    :class="{doubleW:index === 12 || index === 30, treW:index === 17}">
                <b>{{bifenItems[index]}}</b>
                <b>{{b}}</b>
              </span>
            </div>
          </div>
          <!--5比分拆分版-->
          <div v-show="changeBall === 4" class="morePlay_bifen_zhusheng">
            <!--左-->
            <div class="bifen_left">
              <span>主胜</span>
            </div>
            <!--右-->
            <div class="bifen_right">
              <span v-if="index <= 12" v-for="(b,index) in bfArr" :key="index"
                    :class="{doubleW:index === 12}">
                <b>{{bifenItems[index]}}</b>
                <b>{{b}}</b>
              </span>
            </div>
          </div>
          <div v-show="changeBall === 4" class="morePlay_bifen_ping">
            <!--左-->
            <div class="bifen_left">
              <span>平</span>
            </div>
            <!--右-->
            <div class="bifen_right">
              <span v-if="index > 12 && index <= 17" v-for="(b,index) in bfArr" :key="index"
                    :class="{treW:index === 17}">
                <b>{{bifenItems[index]}}</b>
                <b>{{b}}</b>
              </span>
            </div>
          </div>
          <div v-show="changeBall === 4" class="morePlay_bifen_kesheng">
            <!--左-->
            <div class="bifen_left">
              <span>客胜</span>
            </div>
            <!--右-->
            <div class="bifen_right">
              <span v-if="index > 17" v-for="(b,index) in bfArr" :key="index"
                    :class="{doubleW:index === 30}">
                <b>{{bifenItems[index]}}</b>
                <b>{{b}}</b>
              </span>
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
  </div>
</template>

<script>
  import BuyHeader from '../tth-buy/buy-header'
  import BuyInstruction from '../tth-buy/buy-instruction.vue'
  import BuyFooterSport from '../tth-buy/buy-footer-sport.vue'
  import {Indicator} from 'mint-ui'
  export default {
    name: 'Soccer',
    components: {
      BuyHeader,
      BuyInstruction,
      BuyFooterSport
    },
    data () {
      return {
        Vteam: '',
        Hteam: '',
        clickIndex: '',
        morePlayArr: [],
        bfArr: [],
        zjqArr: [],
        brqArr: [],
        rqArr: [],
        bqcArr: [],
        bifenItems: ['1:0', '2:0', '2:1', '3:0', '3:1', '3:2', '4:0', '4:1', '4:2', '5:0', '5:1', '5:2', '胜其他', '0:0', '1:1', '2:2', '3:3', '平其他', '0:1', '0:2', '1:2', '0:3', '1:3', '2:3', '0:4', '1:4', '2:4', '0:5', '1:5', '2:5', '负其他'],
        bqcItems: ['胜胜', '胜平', '胜负', '平胜', '平平', '平负', '负胜', '负平', '负负'],
        // 混合玩法-更多玩法
        isShowMorePlay: false,
        changeBall: 0,
        isChangeIcon: 0,
        isShowGames: 0,
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
//            console.log(res.data.data)
            Indicator.close()
          },
          failed: function (err) {
            console.log('未找到竞彩足球数据:' + err)
          }
        })
      },
      // 获取更多玩法数据
      fecthMorePlayData () {
        this.$request({
          type: 'get',
          url: '/api/data/Handler.ashx?action=405&params={%22IssueNo%22:' + this.clickIndex + '}',
          success: function (res) {
            this.morePlayArr = res.data.data
            this.bfArr = this.morePlayArr.SPCBF.split(',')
            this.zjqArr = this.morePlayArr.SPJQS.split(',')
            this.rqArr = this.morePlayArr.SPRQS.split(',')
            this.brqArr = this.morePlayArr.SPSPF.split(',')
            this.bqcArr = this.morePlayArr.SPBQC.split(',')
          },
          failed: function (err) {
            console.log('未找到竞彩足球更多玩法数据:' + err)
          }
        })
      },
      // 不同玩法对应投注
      changeSelectBall (index) {
        this.changeBall = index
      },
      // 玩法介绍显示
      isInstructionShow () {
        this.isMainShow = !this.isMainShow
        this.isInsShow = !this.isInsShow
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
      Indicator.open('加载中...')
      this.fecthSoccerData()
    }
  }
</script>

<style scoped lang="less">
  @import "../../../common/css/style.less";
  .soccer_wrap {
    width: 100%;
    height: 169vmin;
    background-color: #f7f9fa;
    .soccer_main {
      background-color: #f7f9fa;
      width: 100%;
      padding-top: 11.73333vmin;
      /*混合过关*/
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
              box-sizing: border-box;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              height: 30.66667vmin;
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
                    margin-left: 7.66667vmin;
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
                      vertical-align: middle
                    }
                    .rangqiu {
                      color: white;
                      border: none;
                      width: 3.73333vmin;
                      font-size: 2.93333vmin;
                      text-align: center;
                      background: @color-red;
                      height: 9.6vmin;
                      vertical-align: middle
                    }
                    .rangqiuBlue {
                      background: @color-blue;
                    }
                    .sheng_top {
                      height: 9.6vmin;
                      box-sizing: border-box;
                      border: 1px solid #e6e6e6;
                      font-size: 3.46667vmin;
                      text-align: center;
                      p {
                        display: flex;
                        align-items: center;
                        height: 100%;
                        box-sizing: border-box;
                        /*text-align: center;*/
                        span {
                          width: 20.5vmin;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          height: 100%;
                          border-right: 1px solid #e6e6e6;
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
        .soccer_weekGame:last-child {
          margin-bottom: 13.33333vmin;
        }
      }
      /*胜平负\让球胜平负*/
      .soccer_shengpingfu {
        background-color: white;
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
                    margin-left: 7.66667vmin;
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
                    .sheng_top {
                      height: 11.73333vmin;
                      box-sizing: border-box;
                      border: 1px solid #e6e6e6;
                      font-size: 3.73333vmin;
                      text-align: center;
                      p {
                        display: flex;
                        align-items: center;
                        height: 100%;
                        box-sizing: border-box;
                        /*text-align: center;*/
                        .sheng_top_block {
                          width: 25.3vmin;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          height: 100%;
                          border-right: 1px solid #e6e6e6;
                          flex-direction: column;
                          span {
                            margin-bottom: .66667vmin;
                          }
                          span:last-child{
                            color: #666;
                          }
                        }
                        .sheng_top_block:last-child {
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
        .soccer_weekGame:last-child {
          margin-bottom: 13.33333vmin;
        }
      }
      /*总进球*/
      .soccer_zongjinqiu {
        background-color: white;
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
              padding: 1.2vmin 0;
              position: relative;
              /*box-sizing: border-box;*/
              display: flex;
              align-items: center;
              justify-content: flex-start;
              height: 25.33333vmin;
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
                box-sizing: border-box;
                .right_title {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  position: relative;
                  span {
                    /*margin-left: 7.66667vmin;*/
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
                    border: 1px solid #e6e6e6;
                    background-color: white;
                    td {
                      color: #666;
                      width: 20.73333vmin;
                      height: 7.73333vmin;
                      box-sizing: border-box;
                      font-size: 3.2vmin;
                      text-align: center;
                      border-right: 1px solid #e6e6e6;
                      vertical-align: middle;
                      span {
                        font-weight: 400;
                        b {
                          margin-right: 2vmin;
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
        .soccer_weekGame:last-child {
          margin-bottom: 13.33333vmin;
        }
      }
      /*比分*/
      .soccer_bifen {
        background-color: white;
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
                    /*margin-left: 7.66667vmin;*/
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
      .weekGame_games{
        border-bottom: 1px solid #e6e6e6;
      }
    }
    /*更多玩法*/
    .morePlays {
      /*height: 500px;*/
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
          /*混合*/
          .morePlay_hunhe {
            /*height: 18.13333vmin;*/
            width: 100%;
            font-size: 3.46667vmin;
            color: @color-text-black;
            display: flex;
            align-items: center;
            margin-bottom: 2.3vmin;
            /*左*/
            .hunhe_left {
              span {
                width: 6.9vmin;
                height: 18.13333vmin/2;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .hunhe_left_top {
                background-color: rgb(224, 224, 224);
              }
              .hunhe_left_bottom {
                background-color: @color-red;
                color: white;
              }
              .hunhe_left_bottom_add {
                background-color: @color-blue;
              }
            }
            /*右*/
            .hunhe_right {
              border-top: 1px solid #e6e6e6;
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              span {
                background-color: white;
                height: 8.9vmin;
                width: 28.8vmin;
                border-right: 1px solid #e6e6e6;
                border-bottom: 1px solid #e6e6e6;
                display: flex;
                align-items: center;
                justify-content: center;
                b:last-child{
                  color: #666;
                }
                b:first-child {
                  margin-right: 7vmin;
                }
              }
            }
          }
          /*总进球*/
          .morePlay_zongjinqiu {
            margin-bottom: 2.3vmin;
            /*height: 18.13333vmin;*/
            width: 100%;
            font-size: 3.46667vmin;
            color: @color-text-black;
            display: flex;
            align-items: center;
            /*左*/
            .zongjinqiu_left {
              height: 18.13333vmin;
              background-color: #34ccc3;
              span {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                writing-mode: vertical-rl;
                letter-spacing: .53333vmin;
                font-size: 3.2vmin;
                width: 6.9vmin;
                color: white;
              }
            }
            .zongjinqiu_right {
              border-top: 1px solid #e6e6e6;
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              span {
                background-color: white;
                height: 18.13333vmin/2;
                width: 21.5vmin;
                border-right: 1px solid #e6e6e6;
                border-bottom: 1px solid #e6e6e6;
                display: flex;
                align-items: center;
                justify-content: center;
                b{
                  width:21.5vmin/2;
                  display: flex;
                  justify-content: center;
                  em{
                    font-style: normal;
                  }
                }
                b:last-child{
                  color: #666;
                }
              }
            }
          }
          /*半全场*/
          .morePlay_banquanchang {
            margin-bottom: 2.13333vmin;
            /*height: 18.13333vmin;*/
            width: 100%;
            font-size: 3.46667vmin;
            color: @color-text-black;
            display: flex;
            align-items: center;
            /*左*/
            .banquanchang_left {
              height: 27.06667vmin;
              background-color: #36a8f8;
              span {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                writing-mode: vertical-rl;
                letter-spacing: .53333vmin;
                font-size: 3.2vmin;
                width: 6.9vmin;
                color: white;
              }
            }
            .banquanchang_right {
              border-top: 1px solid #e6e6e6;
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              span {
                background-color: white;
                height: 8.8vmin;
                width: 28.82vmin;
                border-right: 1px solid #e6e6e6;
                border-bottom: 1px solid #e6e6e6;
                display: flex;
                align-items: center;
                justify-content: center;
                b{
                  width:28.82vmin/2;
                  display: flex;
                  justify-content: center;
                }
                b:last-child{
                  color: #666;
                }
              }
            }
          }
          /*比分*/
          .morePlay_bifen {
            margin-bottom: 2.13333vmin;
            /*height: 18.13333vmin;*/
            width: 100%;
            font-size: 3.46667vmin;
            color: @color-text-black;
            display: flex;
            align-items: center;
            /*左*/
            .bifen_left {
              height: 54.13333vmin;
              background-color: #fbb52f;
              span {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                writing-mode: vertical-rl;
                letter-spacing: .53333vmin;
                font-size: 3.2vmin;
                width: 6.9vmin;
                color: white;
              }
            }
            /*右*/
            .bifen_right {
              border-top: 1px solid #e6e6e6;
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              span {
                background-color: white;
                height: 10.5vmin;
                width: 12.2vmin;
                border-right: 1px solid #e6e6e6;
                border-bottom: 1px solid #e6e6e6;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                b:first-child {
                  margin-bottom: 1.6vmin;
                }
                b:last-child {
                  color: #666;
                }
              }
              .doubleW {
                width: 12.3vmin*2;
              }
              .treW {
                width: 37vmin;
              }
            }
          }
          /*比分-主胜*/
          .morePlay_bifen_zhusheng {
            margin-bottom: 2.13333vmin;
            /*height: 18.13333vmin;*/
            width: 100%;
            font-size: 3.46667vmin;
            color: @color-text-black;
            display: flex;
            align-items: center;
            /*左*/
            .bifen_left {
              height: 54.13333vmin/5*2;
              background-color: #fbb52f;
              span {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                writing-mode: vertical-rl;
                letter-spacing: .53333vmin;
                font-size: 3.2vmin;
                width: 6.9vmin;
                color: white;
              }
            }
            /*右*/
            .bifen_right {
              border-top: 1px solid #e6e6e6;
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              span {
                background-color: white;
                height: 10.5vmin;
                width: 12.2vmin;
                border-right: 1px solid #e6e6e6;
                border-bottom: 1px solid #e6e6e6;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                b:first-child {
                  margin-bottom: 1.6vmin;
                }
                b:last-child {
                  color: #666;
                }
              }
              .doubleW {
                width: 12.3vmin*2;
              }
              .treW {
                width: 37vmin;
              }
            }
          }
          /*比分-平*/
          .morePlay_bifen_ping {
            margin-bottom: 2.13333vmin;
            /*height: 18.13333vmin;*/
            width: 100%;
            font-size: 3.46667vmin;
            color: @color-text-black;
            display: flex;
            align-items: center;
            /*左*/
            .bifen_left {
              height: 54.13333vmin/5;
              background-color: @color-blue;
              span {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                writing-mode: vertical-rl;
                letter-spacing: .53333vmin;
                font-size: 3.2vmin;
                width: 6.9vmin;
                color: white;
              }
            }
            /*右*/
            .bifen_right {
              border-top: 1px solid #e6e6e6;
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              span {
                background-color: white;
                height: 10.5vmin;
                width: 12.2vmin;
                border-right: 1px solid #e6e6e6;
                border-bottom: 1px solid #e6e6e6;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                b:first-child {
                  margin-bottom: 1.6vmin;
                }
                b:last-child {
                  color: #666;
                }
              }
              .doubleW {
                width: 12.3vmin*2;
              }
              .treW {
                width: 37vmin;
              }
            }
          }
          /*比分-客胜*/
          .morePlay_bifen_kesheng {
            margin-bottom: 2.13333vmin;
            width: 100%;
            font-size: 3.46667vmin;
            color: @color-text-black;
            display: flex;
            align-items: center;
            /*左*/
            .bifen_left {
              height: 54.13333vmin/5*2;
              background-color: #34ccc3;
              span {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                writing-mode: vertical-rl;
                letter-spacing: .53333vmin;
                font-size: 3.2vmin;
                width: 6.9vmin;
                color: white;
              }
            }
            /*右*/
            .bifen_right {
              border-top: 1px solid #e6e6e6;
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              span {
                background-color: white;
                height: 10.5vmin;
                width: 12.2vmin;
                border-right: 1px solid #e6e6e6;
                border-bottom: 1px solid #e6e6e6;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                b:first-child {
                  margin-bottom: 1.6vmin;
                }
                b:last-child {
                  color: #666;
                }
              }
              .doubleW {
                width: 12.3vmin*2;
              }
              .treW {
                width: 37vmin;
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
