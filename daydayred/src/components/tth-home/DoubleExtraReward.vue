<template>
  <!--双色球加奖-->
<div class="doubleExtraReward_wrap">
  <homeHeader :headerTitle="'双色球加奖'"></homeHeader>
  <img src="../../assets/tth-home/doubleExtraReward.png"/>
</div>
</template>

<script>
  import homeHeader from '../tth-home/home-header.vue'
  export default {
    name: 'DoubleExtraReward',
    components: {
      homeHeader
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/css/style.less";
  .doubleExtraReward_wrap{
   width: 100%;
    img{
      display: block;
      width: 100%;
   }
}
</style>
