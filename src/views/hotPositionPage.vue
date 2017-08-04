<template>
  <div class="page">
    <NavBar :headerInfo="header"></NavBar>
    <scroller style="margin-top: 44px" :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller">
      <!--<v-content className="page-content">-->
      <ul class="wx-contacts" style="margin-top: 10px">
      <li class="wx-item postion-detail" v-for="item in jobs" style="margin-left:8px">

        <a href="#" @click="openPage(item.link,item.iframeTitle,'./hotPositionPage/iframePage')" style="width:100%">
            <span class="wx-icon" style="width:42px ;height:42px;">
              <img :src="item.img" style = "width:42px ;height:42px;">
          </span>
          <div class="wx-name">{{item.subtitle}}</div>
          <div class="wx-pos" style="font-size:12px">
            <span style="margin-right:8px;color:#7d7d7d;">{{item.text[0]}}</span>
            <span style="color:green;margin-right:8px">{{item.text[1]}}</span>
            <span style="color:#7d7d7d">{{item.text[2]}}</span>
          </div>
        </a>

        <!--<router-link :to="{path:'./hotPositionPage/iframePage',query: {redirect:item.link,title:item.iframeTitle,from:'?from=demo'}}" style="width:100%">-->
          <!--<span class="wx-icon" style="width:42px ;height:42px;">-->
              <!--<img :src="item.img" style = "width:42px ;height:42px;">-->
          <!--</span>-->
          <!--<div class="wx-name">{{item.subtitle}}</div>-->
          <!--<div class="wx-pos" style="font-size:12px">-->
            <!--<span style="margin-right:8px;color:#7d7d7d;">{{item.text[0]}}</span>-->
            <!--<span style="color:green;margin-right:8px">{{item.text[1]}}</span>-->
            <!--<span style="color:#7d7d7d">{{item.text[2]}}</span>-->
          <!--</div>-->
        <!--</router-link>-->

      </li>
      </ul>
      <!--</v-content>-->
    </scroller>


  </div>
</template>

<script>
  import VContent from '../components/Content';
  import NavBar from '../components/NavBar';
  import DMediaList from '../components/Demo-mediaList';
  import {openLink} from '../utils/tools';
  export default {
    beforeCreate:function(){
    },
    created:function(){

    },
    mounted() {
      setTimeout(() => {
        this.$refs.my_scroller.resize()
      })
    },
    props:{

    },
    data:function(){
      return {
        header:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title:this.$t('title')
        }
      }
    },
    computed: {
      jobs() {
        return this.$store.state.moduleHome.jobs;
      }
    },
    mounted() {

      setTimeout(() => {
        this.$refs.my_scroller.resize();
      })
    },
    methods:{
      routerBack:function(href){
          this.$router.back();
      },
      openPage(link,title,path){
        openLink(link,title,path);
      },
      refresh() {
        var self = this;
        self.$store.dispatch('getJobs').then(
            function(){
              setTimeout(() => {
                if (self.$refs.my_scroller)
                  self.$refs.my_scroller.finishPullToRefresh();
              }, 500)

                }
        );
      },
      infinite() {

      }
    },
    locales: {
      en: {
        title:'Hot Jobs',
        backInfo:'Back'
      },

      zh: {
        title:'热门职位',
        backInfo:'返回'
      }
    },
    components: {
      VContent,
      NavBar,
      DMediaList,

    }
  }

</script>

<style>
  .loading-layer
  {
    visibility: hidden;
  }
  .pull-to-refresh-layer .spinner-holder .text{
    visibility: hidden;
  }
</style>
