<template>
  <div style="text-align:center;font-size:18px" v-if="showText">{{title}}</div>
</template>
<script>
  export default {
    props: {
      title : {
        type : String,
        default : '没有数据'
      },
    },
    computed:{
      showText(){
        return !this.$store.state.mask.show;
      }
    },
    locales: {
      zh: {
        'NoData' : '没有数据',
      },

      en: {
        'NoData' : 'No any data',
      }
    }
  }
</script>