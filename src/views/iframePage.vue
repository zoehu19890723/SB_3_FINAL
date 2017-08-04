<template>
  <div class="page">
    <NavBar :headerInfo="header"></NavBar>
    <v-content className="page-content">
      <iframe :src="baseURL" style="border: none;width:100%; height:100%;" id="iframe"></iframe>
    </v-content>
  </div>
</template>

<script>
  import VContent from '../components/Content';
  import NavBar from '../components/NavBar';
  import {assetsPublicPath,API_ROOT} from '../config';
  import { signOut } from '../utils/authService';
  import $ from 'zepto';
  import Vue from 'vue';

  export default {
    beforeCreate:function(){
    },
    created:function(){
      console.log(this.$route.query);

    },
    props:{

    },
    data:function(){
      var baseURL = this.$route.query.redirect+'?token='+localStorage.getItem('EP_token');

      return {
        baseURL:baseURL,
        header:{
          backShow:true,
          backHref:this.$route.query.backHref || '',
          backInfo:'',
          rightShow: false,
          rightInfo: '',
          title:this.$route.query.title
        }
      }
    },
    methods:{
      routerBack(href,to){
        if(href&&href.length>1){
          if(to=='weStar'){
            $(window.parent.document).contents().find("#iframe")[0].contentWindow.westarRouteBack()
          }else{
            this.$router.push(href);
          }
        }else{
          this.$router.back();
        }
      }
    },
    locales: {
      en: {
        header:{
          backInfo: 'Back',
        },
      },

      zh: {
        header:{
          backInfo: '返回',
        },
    }
    },

    components: {
      VContent,
      NavBar
    }
  }

</script>

<style scoped>
  .navbar .navbar-inner .left{
    width: 18%;
  }
  .navbar .navbar-inner .right{
    width: 18%;
    display: flex;
    justify-content: flex-end;
  }

</style>
