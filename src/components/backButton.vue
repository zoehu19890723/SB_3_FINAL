<template>
  <a href="#" class="link">
    <i class="icon icon-back"></i>
    <span>返回</span>
  </a>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data(){
      return {
      }
    },
    computed:{
      ...mapGetters(['head'])
  },
  }
</script>

<style scoped>


</style>
