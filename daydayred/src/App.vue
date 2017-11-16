<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    fetchHomeData () {
      this.$request({
        url: '',
        type: 'get',
        headers: {},
        params: {},
        success: function () {
        },
        failed: function () {
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  @color:red;
  @import '../node_modules/marx-css/css/marx.min.css';

</style>
