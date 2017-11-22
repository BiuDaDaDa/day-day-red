<template>
  <div>
    <!--关于我们头部-->
    <div class="about-head">
      <i @click="jiantouClick" class="iconfont icon-jiantou jiantou"></i>
      <span>关于我们</span>
    </div>
    <!--内容-->
    <div class="about-main">
      <p>&nbsp;&nbsp;彩道科技目前专注于体育大数据及体育彩票、福利彩票的代售业务；以经营连锁彩票店为核心业务；线上通过“天天红彩票App”为彩民提供彩票开奖查询、体育赛事比分查询、足球分析预测等全方面的服务；线下成立竞彩直营店，以湖南为根据地逐步发展到全国，目前已在全国开设12家彩票直营店。</p>
      <p>&nbsp;&nbsp;天天红App作为彩道科技首款产品，秉承“为彩民创造价值”的理念，希望为彩民用户提供全方位的体育大数据及彩票信息服务。为此，彩道科技特地加盟由“北京博博科技有限公司”组织发起的“博博竞彩联盟”，并成为博博科技公司的全国战略合作伙伴；未来，天天红App的所有用户以及彩道科技旗下的所有竞彩店的客户，都将获得“博博竞彩联盟”提供的竞彩专家推荐分析服务，并可以查看3000名欧洲分析师历史分析数据。</p>
      <p>&nbsp;&nbsp;彩道科技自2016年创立至今，一直追求为客户提供“走心”的服务，并以此为前提不断完善产品功能、赛事分析预测模型；目前产品的安全性、稳定性、专业性在国内已居于领先水平。未来，彩道科技还将不断突破自我，为中国体育产业和彩票事业的健康良性发展做出贡献。</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'About',
    methods: {
      jiantouClick () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/css/style.less";

  .about-head {
    width: 100%;
    height: 12vmin;
    background-color: @color-red;
    line-height: 12vmin;
  }

  .about-head .jiantou {
    text-align: left;
    margin-left: 15px;
    color: @color-background-white;
    font-weight: 700;
  }

  .about-head span {
    margin-left: 30%;
    font-size: 22px;
    color: @color-background-white;
  }
  .about-main{
    position: fixed;
    height: 100%;
    padding: 4vmin;
    background-color: #fff;
  }
  .about-main p{
    margin: 10px 0;
    line-height: 20px;
    font-size: 3.73333vmin;
  }
</style>
