<template>
  <div id="app">
    <router-view/>
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
  #app{
  }

</style>
