<template>
  <div class="page">
    <NavBar :headerInfo="head" rightEnable="true"></NavBar>
    <v-content className="page-content page-background" v-html="content" style="padding : 44px 8px 8px 8px;background:white">
    </v-content>
</div>
</template>

<script>

  import VContent from '../components/Content';
  import NavBar from '../components/NavBar';
  export default {
    created:function(){
    },
    data() {
      return {
        content: this.$route.query.content,
        head:{
          backShow:true,
          rightShow:false,
          show:true,
          title: this.$route.query.title,
        },
      }
    },
    components: {
      VContent,
      NavBar
    },
    locales: {
      zh: {
        'docTitle' : '帮助文档',
      },

      en: {
        'docTitle' : 'Help',
      }
    }
  }
</script>
<style scoped>
</style>
