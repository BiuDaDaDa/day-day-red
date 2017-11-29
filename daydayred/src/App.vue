<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {
    name: 'app',
    methods: {
      way () {
        let windowHref = window.location.href
        if (windowHref === 'http://localhost:8080/') {
          this.$router.push({path: '/home'})
        }
//        console.log(window.location.href)
      }
    },
    mounted () {
      this.way()
    }
  }
</script>
<style scoped lang="less">

</style>
