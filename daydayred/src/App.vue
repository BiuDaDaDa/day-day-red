<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
    <button @click="fetchHomeData">获取</button>
  </div>
</template>
<script>
export default {
  name: 'app',
  methods: {
    fetchHomeData () {
      this.$request({
        url: '/api/news/banner',
        type: 'get',
        headers: {},
        params: {},
        success: function (res) {
          console.log(res)
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
