<template>
  <div class="shoppingCar_wrap">
    <div class="header_wrap">
      <div class="header_back" @click="back">
        <i class="iconfont icon-jiantou"></i>
      </div>
      <h3>{{name}}</h3>
    </div>
    <div class="shoppingCar_content">
      <div class="shoppingCar_add">
        <div class="add_once">+机选1注</div>
        <div class="add_back" @click="back">+继续选号</div>
      </div>
      <div class="shoppingCar_added">
        <div class="added_selected" v-for="arr in finalArr">
          <div class="selected_left">
            <i class="iconfont icon-quxian"></i>
            <div class="selected_text">
              <div class="selected_num">
                <span v-for="a in arr[0][0]"><b>{{a}}</b></span>|<span v-for="b in arr[0][1]"><b>{{b}}</b></span>|<span v-for="c in arr[0][2]"><b>{{c}}</b></span>
              </div>
              <div class="selected_count">
                {{arr[1]}} {{arr[2]}}注 {{arr[3]}}元
              </div>
            </div>
          </div>
          <i class="iconfont icon-arrow-right" @click="back"></i>
        </div>
        <div class="added_rule">
          <div class="rule_left">
            <i class="iconfont icon-quxian"></i>
            <span>购买即同意《委托投注协议》</span>
          </div>
         <i class="iconfont icon-lajixiang"></i>
        </div>
      </div>
    </div>
    <div class="shoppingCar_footer">
      <div class="footer_top">
        <span>连续买 <input ref="qi" type="tel" v-model="valueQi"> 期</span>
        <span>投 <input ref="bei" type="tel" v-model="valueBei"> 倍</span>
      </div>
      <div class="footer_bottom">
        <div class="bottom_left">
          共 <b>{{countZhus}}</b>注 <b>{{countZhuSC}}</b>元
        </div>
        <div class="bottom_right">
          <span>立即投注</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'shoppingCar',
    props: ['thisArr', 'name'],
    data () {
      return {
        valueQi: 1,
        valueBei: 1,
        selectedArr: []
      }
    },
    methods: {
      back () {
        this.$emit('closeShoppingCar')
      }
    },
    computed: {
      finalArr: function () {
        this.selectedArr.unshift(this.thisArr)
        return this.selectedArr
      },
      countZhus: function () {
        let countZhuCount = 0
        for (let i = 0; i < this.finalArr.length; i++) {
          countZhuCount += this.finalArr[i][2]
        }
        return countZhuCount
      },
      countZhuSC: function () {
        console.log(this.countZhus)
        return this.countZhus * this.valueQi * this.valueBei * 2
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../common/css/style.less";

  .shoppingCar_wrap {
    position: relative;
    width: 100%;
    .header_wrap {
      width: 100%;
      height: 12vmin;
      color: @color-background-white;
      background-color: @color-red;
      display: flex;
      align-items: center;
      position: relative;
      /*justify-content: center;*/
      h3 {
        margin: 0 auto;
        font-size: 1.8em;
        display: inline-block;
        font-weight: bold;
      }
      .header_back {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 126px;
        display: flex;
        align-items: center;
        padding-left: 5vmin;
        .icon-jiantou {
          font-size: 3.8vmin;
        }
      }
    }
    .shoppingCar_content {
      width: 100%;
      .shoppingCar_add {
        margin-bottom: 2.26667vmin;
        font-size: 3.73333vmin;
        padding: 0 3.33333vmin;
        display: flex;
        align-items: center;
        justify-content: space-between;
        div{
          width: 48%;
          background-color: white;
          height:11.46667vmin;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #666;
        }
      }
      .shoppingCar_added{
        box-sizing: border-box;
        margin: 0 3.2vmin;
        .added_rule{
          box-sizing: border-box;
          font-size:3.46667vmin;
          height:12.53333vmin;
          width: 100%;
          background-color: white;
          color: #999;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 4.4vmin;
          .rule_left{
            display: flex;
            align-items: center;
            span{
              padding-left: 1.6vmin;
            }
          }
          i{
            color: #999;
            font-size: 6vmin;
          }
        }
        .added_selected{
          background-color: white;
          padding: 2.66667vmin;
          box-sizing: border-box;
          border-bottom: 1px solid #e6e6e6;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .selected_left {
            display: flex;
            align-items: center;
            justify-content: center;
            i{
              font-size:5.86667vmin;
              color: rgb(205, 205, 205);
              margin:0 4vmin;
            }
            .selected_text{
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              .selected_num{
                color: @color-red;
                font-size: 5.33333vmin;
                margin-bottom: 1.8vmin;
                span{
                  b{
                    margin-right: 2vmin;
                  }
                  b:last-child{
                    margin-right: 0;
                  }
                }
              }
              .selected_count{
                font-size: 3.46667vmin;
                color: #999;
              }
            }
          }
          .icon-arrow-right{
            margin:0 2vmin;
            font-size:4.86667vmin;
            color: rgb(205, 205, 205);
          }
        }
      }
    }
    .shoppingCar_footer{
      width: 100%;
      position: fixed;
      bottom: 0;
      left:0;
      color: #8f9090;
      background-color: white;
      .footer_top{
        padding: 0 3.2vmin;
        height:13.06667vmin;
        border-top:1px solid #e6e6e6;
        border-bottom:1px solid #e6e6e6;
        font-size: 3.73333vmin;
        color: #8f9090;
        display: flex;
        align-items: center;
        justify-content: space-between;
        input{
          text-align: center;
          width: 18.66667vmin;
          height: 7.46667vmin;
          box-sizing: border-box;
          border-radius: .8vmin;
          border: .26667vmin solid #bababa;
          margin: 0 2.13333vmin;
        }
      }
      .footer_bottom{
        box-sizing: border-box;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 13.33333vmin;
        padding-left: 2.66667vmin;
        .bottom_left{
          color: @color-text-black;
          font-size: 4vmin;
          b{
            color: @color-red;
          }
        }
        .bottom_right{
          /*border: none;*/
          text-align: center;
          background: @color-red;
          color: #FFFFFF;
          font-size: 4.8vmin;
          width: 28.53333vmin;
          border-radius:4px ;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }

</style>
