<template>
<!--玩法说明-->
  <div class="instruction_wrap">
    <!--头部-->
    <div class="instruction_header_wrap">
      <!--返回-->
      <div class="instruction_header_back" @click="instructionClose">
        <i class="iconfont icon-jiantou"></i>
      </div>
      <!--标题-->
      <h3>{{thisTitle}}</h3>
    </div>
    <div class="instruction_content">
      <div class="instruction_text" v-html="instructionArr.content">
        {{instructionArr.content}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'buyInstruction',
    props: ['thisPage', 'thisTitle'],
    data () {
      return {
        instructionArr: []
      }
    },
    methods: {
      fecthInstructionData () {
        this.$request({
          type: 'get',
          url: '/api/news/news/' + this.thisPage,
          success: function (res) {
            this.instructionArr = res.data.data
//            console.log(this.thisNum)
          },
          failed: function (err) {
            console.log('未找到玩法说明数据:' + err)
          }
        })
      },
      instructionClose () {
        this.$emit('instructionClose')
      }
    },
    mounted () {
      this.fecthInstructionData()
    }
  }
</script>

<style lang="less">
  @import "../../../common/css/style.less";
  .instruction_wrap{
    width: 100%;
    .instruction_header_wrap{
      width: 100%;
      height: 12vmin;
      color: @color-background-white;
      background-color: @color-red;
      display: flex;
      align-items: center;
      position: relative;
      /*justify-content: center;*/
      h3{
        margin: 0 auto;
        font-size: 1.4em;
        display: inline-block;
        font-weight: bold;
      }
      .instruction_header_back{
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 126px;
        display: flex;
        align-items: center;
        padding-left: 5vmin;
        .icon-jiantou{
          font-size: 3.8vmin;
        }
      }
    }
    .instruction_content{
      box-sizing: border-box;
      width: 100%;
      padding: 0 3.2vmin;
      line-height: 1.5;
      .instruction_text{
        font-size: 4.26667vmin;
        img{
          width:100%;
        }
      }
    }
  }
</style>
