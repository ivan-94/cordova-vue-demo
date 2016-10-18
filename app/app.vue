<template lang="jade">
  .app
    router-view
</template>

<script>
  import store from './vuex/store'
  export default {
    //将store 注入根组件
    store,
    //应用加载完成
    created () {
    },
  }
</script>

<style lang="scss">
  // import global style
  @import "main";
</style>