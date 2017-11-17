<template>
  <div id="documengtary_wrap">
    <!-- title:彩帝跟单 -->
    <div id="documengtary_title">
      <h3>彩帝跟单</h3>
    </div>
    <!-- join:申请加入 -->
    <div id="documengtary_join">
      <img src="../../assets/tth-documentary/20171012095335.png" alt="">
    </div>
    <!-- ranking:彩帝排行 -->
    <div id="documengtary_ranking_wrap">
      <!-- title -->
      <h6>
        <span>彩帝排行</span>
        <i class="iconfont icon-arrow-right "></i>
      </h6>
    </div>
    <!-- recommend:彩帝推荐 -->
    <div id="documengtary_recommend_wrap">
      <div id="documengtary_recommend_title">
        <div>彩帝推荐</div>
      </div>
    </div>

    <div>weqweqweqwe</div>

    <!-- 背景图片 -->
    <img id="documengtary_bgimg" src="../../assets/tth-documentary/20170622203327.png" alt="">
    <!-- 暂无彩帝数据 -->
    <div id="documengtary_no">暂无彩帝数据</div>
  </div>
</template>

<script>
  export default {
    name: 'Documentary',
    data: {
    },
    methods: {
      fecthHomeData () {
        this.$request({
          type: 'get',
          url: '',
          headers: {},
          params: {},
          success: function () {
          },
          failed: function () {}
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/css/style.less";

  #documengtary_wrap{
    width: 100%;
    height: 100%;
    background-color: @color-background-gray;
  }
  /* 彩帝跟单 */
  #documengtary_title{
    height: 12vmin;
    background-color: #ff5f5f;
    color: #fff;
    font-size: 4.8vmin;
  }
  h3{
    font-size: 1.17em;
    font-weight: bold;
    text-align: center;
    line-height: 12vmin;
  }
  /* 申请加入 */
  #documengtary_join{
    width: 100%;
    margin-bottom: 2.66667vmin;
  }
  #documengtary_join img{
    width: 100%;
  }
  /* 彩帝排行 */
  #documengtary_ranking_wrap{
    width: 100%;
    background: @color-background-white;
    padding: 4vmin 3.2vmin;
    margin-bottom: 2.66667vmin;
    box-sizing: border-box;
  }
  /* title */
  #documengtary_ranking_wrap h6{
    display: flex;
    line-height: 1;
    height: 4.26667vmin;
    font-size: 4.26667vmin;
    border-left: .8vmin solid #ff5f5f;
    padding-left: 1.6vmin;
    margin-bottom: 4vmin;
  }
  #documengtary_ranking_wrap h6 span{
    width: 85vmin;
    font-weight: bold;
    color: @color-text-black;
  }
  .icon-arrow-right{
    color: #CFCFCF;
    font-size: 4vmin;
    margin-top: .2vmin;
  }
  /* 彩帝推荐 */
  #documengtary_recommend_wrap{
    width: 100%;
    box-sizing: border-box;
  }
  /* title */
  #documengtary_recommend_title{
    width: 100%;
    padding-left: 2.6vmin;
    background-color: @color-background-white;
    border: 1px solid white;
  }
  #documengtary_recommend_title div{
    border-left: .8vmin solid #ff5f5f;
    padding-left: 1.6vmin;
    font-weight: bold;
    color: @color-text-black;
    margin-top: 4vmin;
    font-size: 4.26667vmin;
    margin-bottom: 1vmin;
  }
  /* 背景图 */
  #documengtary_bgimg{
    width: 100%;
    display: block;
    margin: 34.66667vmin 0 13.33333vmin;
  }
  /* 暂无彩帝数据 */
  #documengtary_no{
    width: 100%;
    text-align: center;
    font-size: 4.26667vmin;
    color: @color-text-black;
  }
</style>
