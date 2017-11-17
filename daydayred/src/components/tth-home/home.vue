<template>
<div class="home_wrap">
  <!--头部-->
  <div class="home_nameBar">
    <span>天天红彩票</span>
    <i class="iconfont icon-liwu"></i>
  </div>
  <!--轮播图-->
  <div class="home_swiper">
    <div class="home_swiper_bgred"></div>
    <div class="home_swiper_main">
      <mt-swipe :auto="2000">
        <mt-swipe-item><img src="../../assets/tth-home/slidePic1.png" height="276" width="722"/></mt-swipe-item>
        <mt-swipe-item><img src="../../assets/tth-home/slidePic2.png" height="276" width="722"/></mt-swipe-item>
        <mt-swipe-item><img src="../../assets/tth-home/slidePic3.png" height="276" width="722"/></mt-swipe-item>
        <mt-swipe-item><img src="../../assets/tth-home/slidePic4.png" height="276" width="723"/></mt-swipe-item>
        <mt-swipe-item><img src="../../assets/tth-home/slidePic5.png" height="413" width="1080"/></mt-swipe-item>
      </mt-swipe>
    </div>
  </div>
  <!--快捷投注-->
  <div class="home_shortcut">
    <div class="home_shortcut_top">
      <div class="home_shortcut_top_left">
        <img src="../../assets/tth-home/touzhu.png" height="39" width="222"/>
        <span>双色球第{{}}期</span>
      </div>
      <strong class="home_shortcut_">{{}}11-19 19:40截止</strong>
    </div>
    <div class="home_shortcut_center">
      <!--随机选球-->
      <div class="home_shortcut_center_nums">
        <!--红球-->
        <div v-for="n in 6" class="home_shortcut_center_nums_balls">
          <strong>01</strong>
        </div>
        <!--蓝球-->
        <div class="home_shortcut_center_nums_balls_blue">
          <strong>01</strong>
        </div>
      </div>
      <i class="iconfont icon-shuaxin"></i>
    </div>
    <div class="home_shortcut_bottom">
      <span>{{}}周二四日21：15开奖</span>
      <input type="button" value="立即购买">
    </div>
  </div>
  <!--彩票分类-->
  <div class="home_item">
    <div class="home_item_btn" v-for="m in 7">
        <div class="home_item_btn_contain">
          <img src="../../assets/tth-home/basketball.png" height="142" width="142"/>
          <div class="home_item_btn_contain_text">
            <strong>{{}}竞彩足球</strong>
            <div>
              <span class="triangle"></span>
              <span>疯狂暑假 加奖10%</span>
            </div>
          </div>
        </div>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: 'home'
  }
</script>

<style scoped lang="less">
  /*@import "../..//swipe/style.css";*/
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
        input{
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
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-right:1px solid #e6e6e6 ;
          img{
            /*margin-left: 3.2vmin;*/
            width: 11.86667vmin;
            height: 11.86667vmin;
            margin-right: 2.66667vmin;
          }
          .home_item_btn_contain_text{
            line-height: 1.5;
            strong{
              font-size:4.26667vmin ;
              font-weight: 400;
              flood-color: @color-text-black;
            }
            div{
              font-size: 3.46667vmin;
            }
          }
        }
      }
    }
  }

</style>
