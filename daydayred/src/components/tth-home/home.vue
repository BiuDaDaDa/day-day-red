<template>
  <!--主页-->
<div class="home_wrap">
  <!--头部-->
  <div class="home_nameBar">
    <span>天天红彩票</span>
    <i class="iconfont icon-liwu" @click="toActivities"></i>
  </div>
  <!--轮播图-->
  <div class="home_swiper">
    <div class="home_swiper_bgred"></div>
    <div class="home_swiper_main">
      <mt-swipe :auto="3000">
        <mt-swipe-item v-for="(bannerImg,index) in bannerArr" :key="index"><a @click="toActivitiesDetail(index)"><img :src="bannerImg.cover" alt=""></a></mt-swipe-item>
      </mt-swipe>
    </div>
  </div>
  <!--快捷投注-->
  <div class="home_shortcut">
    <div class="home_shortcut_top">
      <div class="home_shortcut_top_left">
        <img src="../../assets/tth-home/touzhu.png" height="39" width="222"/>
        <span>{{shortcutArr.LotteryName}}{{shortcutArr.Name}}</span>
      </div>
      <strong class="home_shortcut_">{{shortcutArr.BuyEndTime}}</strong>
    </div>
    <div class="home_shortcut_center">
      <!--随机选球-->
      <div class="home_shortcut_center_nums">
        <!--红球-->
        <div v-for="red in randomRedArr" class="home_shortcut_center_nums_balls">
          <strong>{{red}}</strong>
        </div>
        <!--蓝球-->
        <div v-for="blue in randomBlueArr" class="home_shortcut_center_nums_balls_blue">
          <strong>{{blue}}</strong>
        </div>
      </div>
      <i class="iconfont icon-shuaxin" @click="getRandomNum"></i>
    </div>
    <div class="home_shortcut_bottom">
      <span>{{shortcutArr.Title}}</span>
      <div class="home_shortcut_bottom_right">
        <label>
          <input type="checkbox">
          追加
        </label>
        <input class="shortcut_buyNow" type="button" value="立即购买">
      </div>
    </div>
  </div>
  <!--彩票分类-->
  <div class="home_item">
    <div class="home_item_btn" v-for="(itemInfo,index) in itemArr" :key="index" @click="toBuyLottery(index)">
        <div class="home_item_btn_contain">
          <img :src="itemInfo.IconUrl" height="142" width="142"/>
          <div class="home_item_btn_contain_text">
            <strong>{{itemInfo.LotteryName}}</strong>
            <!--不同样式的字体-->
            <!--<div class="home_item_btn_contain_text_small">-->
              <div :class="'itemStyle'+itemInfo.StyleTag">
                <span class="text_triangle"></span>
                <span class="text_small">{{itemInfo.Title}}</span>
              </div>
            <!--</div>-->
          </div>
        </div>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        bannerArr: [],
        shortcutArr: [],
        itemArr: [],
//        随机到的数组
        randomRedArr: [],
        randomBlueArr: [],
//        随机最大值和最小值
        randomRedMax: 0,
        randomMin: 1,
        randomBlueMax: 0,
//        随机次数
        randomRedTimes: 0
      }
    },
    methods: {
      // 轮播图
      fecthBannerData () {
        this.$request({
          type: 'get',
          url: '/api/news/banner',
          success: function (res) {
            this.bannerArr = res.data.data.newses
//            console.log(this.bannerArr[0].cover)
          },
          failed: function (err) {
            console.log('未找到轮播图数据:' + err)
          }
        })
      },
      // 快捷投注随机球数
      getRandomNum () {
        // 红球随机
        this.randomRedArr = []
        for (let red = 0; red < this.randomRedTimes; red++) {
          let randRedNum = Math.floor(Math.random() * (this.randomRedMax + 1 - this.randomMin) + this.randomMin)
          if (randRedNum < 10) {
            randRedNum = '0' + randRedNum
          } else {
            randRedNum = randRedNum.toString()
          }
          // 查重
          if (this.randomRedArr.indexOf(randRedNum) === -1) {
            // 放入arr
            this.randomRedArr.push(randRedNum)
          } else {
            red--
          }
        }
//        console.log(this.randomRedArr)
        // 蓝球随机
        this.randomBlueArr = []
        for (let blue = 0; blue < (7 - this.randomRedTimes); blue++) {
          let randBlueNum = Math.floor(Math.random() * (this.randomBlueMax + 1 - this.randomMin) + this.randomMin)
          if (randBlueNum < 10) {
            randBlueNum = '0' + randBlueNum
          } else {
            randBlueNum = randBlueNum.toString()
          }
          if (this.randomBlueArr.indexOf(randBlueNum) === -1) {
            // 放入arr
            this.randomBlueArr.push(randBlueNum)
          } else {
            blue--
            console.log('重复')
          }
        }
//        console.log(this.randomBlueArr)
      },
      // 快捷投注
      fecthShortcutData () {
        this.$request({
          type: 'get',
          url: '/api/data/Handler.ashx?action=105&params={}',
          success: function (res) {
            this.shortcutArr = res.data.data.Number
            let thisDate = new Date()
            let thisWeek = parseInt(thisDate.getDay())
//            console.log(thisWeek)
            if (thisWeek === 1 || thisWeek === 3 || thisWeek === 5) {
              // 当为大乐透时
              this.randomRedTimes = 5
              this.randomRedMax = 35
              this.randomBlueMax = 12
            } else if (thisWeek === 2 || thisWeek === 4 || thisWeek === 6) {
              // 当为双色球时
              this.randomRedTimes = 6
              this.randomRedMax = 33
              this.randomBlueMax = 16
            }
            this.getRandomNum()
          },
          failed: function (err) {
            console.log('未找到快捷投注数据:' + err)
          }
        })
      },
      // 彩票分类
      fecthItemData () {
        this.$request({
          type: 'get',
          url: '/api/data/Handler.ashx?action=104&params={}',
          success: function (res) {
            this.itemArr = res.data.data
//            console.log('itemStyle' + this.itemArr[0].StyleTag)
          },
          failed: function (err) {
            console.log('未找到快捷投注数据:' + err)
          }
        })
      },
      // 转活动页面
      toActivities () {
        this.$router.push({ path: '/activities' })
      },
      // 转购买页面
      toBuyLottery (index) {
        if (index === 5) {
          this.$router.push({ path: '/rank3' })
        } else if (index === 4) {
          this.$router.push({ path: '/fucai3d' })
        } else if (index === 3) {
          this.$router.push({ path: '/superLotto' })
        } else if (index === 1) {
          this.$router.push({ path: '/doubleColorBall' })
        } else if (index === 0) {
          this.$router.push({ path: '/soccer' })
        }
      },
      // 转活动子页面
      toActivitiesDetail (index) {
        if (index === 0) {
          this.$router.push({ path: '/crazyFree' })
        } else if (index === 1) {
          this.$router.push({ path: '/extraReward' })
        } else if (index === 2) {
          this.$router.push({ path: '/doubleExtraReward' })
        } else if (index === 3) {
          this.$router.push({ path: '/recharge' })
        } else if (index === 4) {
          this.$router.push({ path: '/invitation' })
        }
      }
    },
    mounted () {
      // 获取轮播图数据
      this.fecthBannerData()
      // 获取快捷投注数据
      this.fecthShortcutData()
      // 获取彩票分类数据
      this.fecthItemData()
//      this.getRandomNum()
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/css/style.less";
  .home_wrap{
    width: 100%;
    background-color: @color-background-gray;
    /*头部*/
    .home_nameBar{
      position: relative;
      width: 100%;
      height:12vmin;
      background-color: @color-red;
      display: flex;
      align-items: center;
      justify-content: center;
      span{
        color: white;
        font-size:4.8vmin;
      }
      .icon-liwu{
        position:absolute;
        right: 34px;
        /*top:45%;*/
        font-size: 21px;
        color: Rgb(253, 253, 129);
      }
    }
    /*轮播图*/
    .home_swiper{
      width: 100%;
      .home_swiper_bgred{
        width: 100%;
        height: 8vmin;
        background-color: @color-red;
      }
      .home_swiper_main{
        /*position: relative;*/
        /*top: -8vmin;*/
        margin: 0 auto;
        margin-top: -8vmin;
        width: 96vmin;
        height: 152px;
        border-radius:2.66667vmin;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    /*快捷投注*/
    .home_shortcut{
      width: 96vmin;
      margin: 0 auto;
      margin-top: 2.66667vmin;
      box-sizing: border-box;
      padding: 2.66667vmin 3.46667vmin 2.13333vmin 4vmin;
      background: #fff;
      .home_shortcut_top{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .home_shortcut_top_left{
          display: flex;
          align-items: center;
          img{
            width: 18.8vmin;
            height:auto;
            margin-right: 3.2vmin;
          }
          span{
            color: @color-text-black;
            font-size: 3.2vmin;
          }
        }
        strong{
          color: @color-text-gray;
          font-size: 3.2vmin;
        }
      }
      .home_shortcut_center{
        width: 100%;
        margin: 5.33333vmin 0 4vmin;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        /*双色球随机*/
        .home_shortcut_center_nums{
          display: flex;
          align-items: center;
            font-size: 1.86667vmin;
          .home_shortcut_center_nums_balls{
            margin-right: 2.26667vmin;
            width: 7.8vmin;
            height: 7.8vmin;
            border:1px solid @color-text-red;
            border-radius: 50%;
            background-color: @color-red-l;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            strong{
              font-size:4.5vmin ;
              font-weight: 700;
              color: @color-red;
            }
          }
          .home_shortcut_center_nums_balls_blue{
            .home_shortcut_center_nums_balls;
            background-color: @color-blue-l;
            border:1px solid @color-blue;
            strong{
              color: @color-blue;
            }
          }
        }
        .icon-shuaxin{
          font-size: 30px;
          color: @color-text-gray;
          margin-left: 15px;
          transform: rotate(30deg);
        }
      }
      .home_shortcut_bottom{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span{
          color: @color-text-gray;
          font-size:3.73333vmin ;
        }
        .home_shortcut_bottom_right{
          display: flex;
          align-items: center;
          label{
            display: flex;
            align-items: center;
            color: @color-text-gray;
            margin-right: 4vmin;
            input{
              height: 4.53333vmin;
              width: 4.26667vmin;
              margin-right: .66667vmin;
            }
          }
          .shortcut_buyNow{
            border: none;
            width: 26.66667vmin;
            height: 7.46667vmin;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
            color: #fff;
            background: @color-red;
            font-size: 3.46667vmin;
            display: block;
            text-align: center;
          }
        }
      }
    }
    /*彩票分类*/
    .home_item{
      width: 100%;
      margin-top: 5.33333vmin;
      display: flex;
      flex-wrap: wrap;
      background-color: @color-background-white;
      .home_item_btn{
        box-sizing: border-box;
        display: flex;
        align-items: center;
        width: 50%;
        height: 21.33333vmin;
        padding: 2.66667vmin 0;
        border-bottom: 1px solid #e6e6e6;
        .home_item_btn_contain{
          margin-left:3.2vmin ;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          border-right:1px solid #e6e6e6 ;
          img{
            width: 11.86667vmin;
            height: 11.86667vmin;
          }
          .home_item_btn_contain_text{
            line-height: 1.5;
            strong{
              padding-left: 2.66667vmin;
              font-size:4.26667vmin ;
              font-weight: 400;
              flood-color: @color-text-black;
            }
            div{
              display: flex;
              align-items: center;
              overflow: hidden;
              font-size: 3.46667vmin;
              .text_small{
                margin-left:3.2vmin ;
              }
            }
            /*字体样式*/
            .itemStyle0{
              color: @color-text-gray;
            }
            .itemStyle1{
              color: @color-text-red;
            }
            .itemStyle2{
                position: relative;
                /*left: -5px;*/
                margin-left:-5px ;
                .text_small{
                  position: relative;
                  z-index: 11;
                  font-size: 3.2vmin;
                  color: #FFFFFF;
                  background-color: @color-red;
                  padding: 0 2.66667vmin;
                  border-radius: 13.33333vmin;
                  /*margin-left: -.66667vmin;*/
                  padding-left: 10px;
                  height: 100%;
                }
                .text_triangle{
                  z-index: 10;
                  position: absolute;
                  left: 12px;
                  top: -8px;
                  width: 16px;
                  height: 16px;
                  background-color: @color-red;
                  transform: rotate(45deg);
                }
              }
          }
        }
      }
    }
  }
</style>
