<template>
  <!--购买彩票头部-->
  <div class="buyHeader_wrap">
    <!--返回-->
    <div class="buyHeader_back" @click="backHome">
      <i class="iconfont icon-jiantou"></i>
    </div>
    <!--玩法-->
    <div class="buyHeader_title" @click="showPop = true, showMask = true">
      <h3>{{MethodsNormalName}}</h3>
      <i class="iconfont icon-jiantou2"></i>
    </div>
    <!--更多-->
    <div class="buyHeader_more" @click="showMorePop = true, showMask = true">
      <i class="iconfont icon-sangedian"></i>
    </div>
    <!--玩法弹出-->
    <transition name="pop_fade">
      <div class="buyHeader_pop" v-if="showPop">
        <!--标题-->
        <div class="buyHeader_pop_title">
          <span>选择玩法</span>
        </div>
        <!--内容-->
        <div class="buyHeader_pop_table" >
          <div v-for="(mn,index) in MethodsName" :key="index" @click="changeTitle(index)">
            <span :class="{listActive:isActive === index}">{{mn}}</span>
          </div>
        </div>
      </div>
    </transition>
    <!--更多弹出-->
    <div class="buyHeader_morePop" v-if="showMorePop">
      <span class="buyHeader_morePop_point"></span>
      <div class="buyHeader_morePop_list" v-for="m in MoreArr" @click="toOtherPage(m.moreIndex)">
        <span>{{m.moreName}}</span>
      </div>
    </div>
    <!--蒙版弹出-->
    <transition name="mask_fade">
      <div class="buyHeader_mask" v-if="showMask" @click="closePop"></div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'BuyHeader',
    props: ['thisPage', 'MethodsArr', 'MoreArr'],
    data () {
      return {
        MethodsName: this.MethodsArr,
        MethodsNormalName: this.MethodsArr[0],
        showPop: false,
        showMorePop: false,
        showMask: false,
        isActive: 0
      }
    },
    methods: {
      // 关闭
      closePop () {
        this.showPop = false
        this.showMorePop = false
        this.showMask = false
      },
      // 点击玩法改变标题
      changeTitle (index) {
        this.isActive = index
        console.log(index)
        this.MethodsNormalName = this.MethodsName[index]
        this.showMask = false
        this.showPop = false
        this.$emit('changeSelectBall', index)
//        console.log(index)
      },
      // 点击去别的连接
      toOtherPage (index) {
        this.closePop()
        if (index === 'shuoming') {
          // 告诉父级打开玩法说明
          this.$emit('instructionShow')
        }
      },
      backHome () {
        this.$router.push({ path: '/' })
      }
    },
    mounted () {
    }
  }
</script>

<style scoped lang="less">
  @import "../../../common/css/style.less";

  .buyHeader_wrap {
    width: 100%;
    height: 12vmin;
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    background-color: @color-red;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
    /*返回*/
    .buyHeader_back {
      height: 100%;
      display: flex;
      align-items: center;
      padding-left: 5vmin;
      position: absolute;
      left: 0;
    }
    /*玩法*/
    .buyHeader_title {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      h3 {
        white-space: nowrap;
        font-size: 5.8vmin;
        font-weight: bold;
      }
      .icon-jiantou2 {
        padding: 0 0.5vmin;
      }

    }
    /*更多*/
    .buyHeader_more {
      height: 100%;
      display: flex;
      align-items: center;
      position: absolute;
      right: 0;
      .icon-sangedian {
        font-size: 6vmin;
        padding-right: 4.5vmin;
      }
    }
    /*----------------------弹出-----------------------*/
    /*蒙版*/
    .buyHeader_mask {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 60;
    }
    .mask_fade-enter-active, .mask_fade-leave-active {
      transition: opacity .5s
    }
    .mask_fade-enter, .mask_fade-leave-to {
      opacity: 0
    }
    /*玩法*/
    .buyHeader_pop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 100;
      /*弹出头部*/
      .buyHeader_pop_title {
        width: 100%;
        color: white;
        border-bottom: .26667vmin solid #ff5f5f;
        text-align: center;
        font-size: 4.26667vmin;
        background-color: @color-red;
        height: 8vmin;
        line-height: 8vmin;
      }
      /*弹出主体*/
      .buyHeader_pop_table {
        background-color: #FFFFFF;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        border-left: .26667vmin solid #ff5f5f;
        div {
          width: 33.3333%;
          height: 10.66667vmin;
          box-sizing: border-box;
          border-right: .26667vmin solid #ff5f5f;
          border-bottom: .26667vmin solid #ff5f5f;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #fff;
          font-size: 3.2vmin;
          span {
            color: @color-text-black;
          }
          /*点击变色*/
          .listActive{
            color: @color-red;
          }
        }
      }
    }
    .pop_fade-enter-active, .pop_fade-leave-active {
      transition: all 0.2s ease-in
    }
    .pop_fade-enter, .pop_fade-leave-to {
      top: -100px;
    }
    /*更多*/
    .buyHeader_morePop{
      position: fixed;
      top:12vmin;
      right: 1.5vmin;
      z-index: 100;
      background-color: white;
      padding: 0 2.66667vmin;
      box-sizing: border-box;
      border-radius: 4px;
      /*点*/
      .buyHeader_morePop_point{
        width: 1.86667vmin;
        height: 1.86667vmin;
        position: absolute;
        top: -.93333vmin;
        right: 2.66667vmin;
        transform: rotate(45deg);
        background-color: white;
      }
      /*列表*/
      .buyHeader_morePop_list{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 10.4vmin;
        padding:0 2.66667vmin;
        border-bottom:1px solid #eee;
        span{
          font-size: 4vmin;
          color: @color-text-black;
        }
      }
    }
  }
</style>
