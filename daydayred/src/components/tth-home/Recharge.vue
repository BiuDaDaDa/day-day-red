<template>
<div class="recharge_wrap">
  <homeHeader :headerTitle="'充值送88'"> </homeHeader>
</div>
</template>

<script>
  import homeHeader from '../tth-home/home-header.vue'
  export default {
    name: 'Recharge',
    components: {
      homeHeader
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/css/style.less";
</style>
