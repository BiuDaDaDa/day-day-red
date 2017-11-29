<template>
<!--最近开奖内容-->
  <div class="rencentAward_wrap">
    <h6>近期开奖</h6>
    <ul>
      <li v-for="(recent, index) in recentArr" :key="index">
        <!--期号-->
        <span><span class="rencentAward_point"></span>{{recent.Name}}期</span>
        <!--中奖号码-->
        <!--没有蓝球-->
        <p v-if="!isHaveBlue">
          <b class="rencentAward_red" v-for="a in recent.WinNumber.split(',')">{{a}}</b>
        </p>
        <!--有蓝球-->
        <p v-if="isHaveBlue">
          <!--红-->
          <b class="rencentAward_red" v-for="r in redArr[index]">{{r}}</b>
          <!--蓝-->
          <b class="rencentAward_blue" v-for="b in blueArr[index]">{{b}}</b>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'BuyRecentAward',
    // 获取了数据、分割符、
    props: ['recentArr', 'isHaveBlue'],
    data () {
      return {
        redArr: [],
        blueArr: []
      }
    },
    watch: {
      recentArr: function () {
        this.switchArr()
      }
    },
    methods: {
      switchArr () {
        // 拆分数据
        if (this.isHaveBlue) {
          for (let i = 0; i < this.recentArr.length; i++) {
            let redStr = ''
            let blueStr = ''
            redStr = (this.recentArr[i].WinNumber.split('+', 1))[0]
            blueStr = (this.recentArr[i].WinNumber.split('+'))[1]
            this.redArr.push(redStr.split(' '))
            this.blueArr.push(blueStr.split(' '))
          }
//          console.log(this.redArr)
//          console.log(this.blueArr)
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../common/css/style.less";
  .rencentAward_wrap{
    height: 333.5px;
    width: 100%;
    font-size: 3.46667vmin;
    padding: 3.2vmin;
    overflow: scroll;
    box-sizing: border-box;
    h6{
      padding-bottom: 6px;
      text-indent: 1.06667vmin;
      font-size: 0.67em;
      font-weight: bold;
    }
    ul{
      margin-left: 5px;
      list-style: none;
      /*每一条数据*/
      li{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 7.2vmin;
        /*左*/
        span{
          width: 34.66667vmin;
          color: @color-text-black;
          .rencentAward_point{
            display: inline-block;
            margin-right: 1.86667vmin;
            width: 1.06667vmin;
            height: 1.06667vmin;
            border-radius: 50%;
            /*display: inline-block;*/
            background: @color-red;
            margin-bottom: .8vmin;
          }
        }
        /*右*/
        p{
          width:56.66667vmin;;
          border-bottom: 1px solid #e6e6e6;
          line-height: 1.5;
          b{
            display: inline-block;
            width: 5.86667vmin;
            text-align: center;
          }
          .rencentAward_red{
            color: @color-red;
          }
          .rencentAward_blue{
            color: @color-blue;
            margin-left: 2.66667vmin;
          }
        }
      }
    }
  }
</style>
