<template>
  <div v-show="maskIsShow">
    <div @click="maskA" class="mask"></div>
    <div class="mask-ul">
      <div @click="maskClick(index)" v-for="(value, index) in maskArr" :key="index" :class="value.className">{{value.text}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Mask',
    data () {
      return {
        maskArr: [
          {className: 'am-action-sheet-button-list-item', text: '当天'},
          {className: 'am-action-sheet-button-list-item', text: '最近一周'},
          {className: 'am-action-sheet-button-list-item', text: '最近一月'},
          {className: 'am-action-sheet-button-list-item', text: '最近三月'},
          {className: 'cancel', text: '取消'}
        ],
        index: null,
        maskIsShow: true
      }
    },
    methods: {
      // 点击历史发送接口事件
      maskClick (index) {
        this.index = index
        let text = this.maskArr[index].text
        this.$emit('maskClicked', text)
      },
      // 点击蒙版消失事件
      maskA () {
        this.maskIsShow = !this.maskIsShow
      }
    }
  }
</script>
<style scoped lang="less">
  @import "../../common/css/style.less";
  .mask {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .mask-ul{
    color: #333;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 255px;
    background-color: #E7E7ED;
  }
  .am-action-sheet-button-list-item {
    font-size: 4.8vmin;
    padding: 0;
    margin: 0;
    position: relative;
    height: 13.33333vmin;
    line-height: 13.33333vmin;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    background-color: #FFFFFF;
    text-align: center;
  }
  .cancel{
    margin-top: 5px;
    width: 100%;
    height: 13.33333vmin;
    line-height: 13.33333vmin;
    background-color: #FFFFFF;
    text-align: center;
    font-size: 18px;
  }
</style>
