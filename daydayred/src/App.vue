<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {
    name: 'app',
    mounted () {
      this.$router.push({path: '/home'})
    }
  }
</script>
<style scoped lang="less">

</style>
