<template>
<div class="extraReward_wrap">
  <homeHeader :headerTitle="'加奖10%'"></homeHeader>
  <img src="../../assets/tth-home/extraReward.png"/>
</div>
</template>

<script>
  import homeHeader from '../tth-home/home-header.vue'
  export default {
    name: 'ExtraReward',
    components: {
      homeHeader
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/css/style.less";
  .extraReward_wrap{
    width: 100%;
    img{
      width: 100%;
      display: block;
    }
  }
</style>
