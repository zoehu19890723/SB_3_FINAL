<template>
  <div class="page">
    <NavBar :headerInfo="header"></NavBar>
    <v-content className="page-content">
      <div class="wx-group media-list list-block" style="margin: 12px 0px 12px 0px;">
        <div class="list-group">
          <ul class="wx-contacts">
            <li  v-for="itemInfo in items" class="wx-item" style="height:80px;margin-left:8px"   @click="openPage(itemInfo.link,itemInfo.subtitle)">
              <!--<router-link :to="{path:itemInfo.iframePath,query: {redirect:itemInfo.link,title:itemInfo.subtitle}}" style="width:100%">-->
                <span class="wx-icon" style="width:90px ;height:60px;border-radius: 2px;overflow:hidden">
                    <img :src="itemInfo.img" style = "width:90px ;height:60px;">
                </span>
                <div class="wx-name">{{itemInfo.subtitle}}</div>
                <div class="wx-pos" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;font-size:12px">
                  <span style="margin-right:8px">{{itemInfo.text}}</span>
                </div>
              <!--</router-link>-->
            </li>
          </ul>
        </div>
      </div>
    </v-content>
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
      if(this.$route.query.id=="newToShare"){
        this.$store.dispatch('getNewToShare',{number:100})
      }else{
        this.$store.dispatch('getDynamicCategoryList',{id:this.$route.query.id})
      }
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
          title:this.$route.query.title
        },
      }
    },
    computed: {
      items() {
        if(this.$route.query.id=="newToShare"){
          return this.$store.state.moduleDynamic.newToShare;
        }else{
          return this.$store.state.moduleDynamic.dynamicCategoryList;
        }
      }
    },
    methods:{
      routerBack(href){
        this.$router.back();
      },
      openPage(link,title){
        // if(localStorage.getItem('EP_browser')==="android"){
        //   var ref = cordova.InAppBrowser.open(link+'?token='+localStorage.getItem('EP_token'), '_blank', 'location=yes,toolbar=yes');
        // }else{
        //   var ref = cordova.InAppBrowser.open(link+'?token='+localStorage.getItem('EP_token'), '_blank', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption='+this.$t('button'));
        // }
        // ref.show()
        let path = '/dynamic/dynamicList/iframePage';
        openLink(link,title,path);
      }
    },
    locales: {
      en: {
        title:'New Employee',
        backInfo:'Back',
        button:'Close'
      },

      zh: {
        title:'新进员工',
        backInfo:'返回',
        button:'关闭'
      }
    },
    components: {
      VContent,
      NavBar,
      DMediaList
    }
  }

</script>

<style>
  .item-media-img {
    width: 50px;
    height: 50px;
  }
  .employee-card{
    margin-left: 8px;
    min-height: 85px;
    display: flex;
    align-items: center;
  }
  .cut-img{
    border-radius: 50%;
    overflow: hidden;
  }
  .wx-pos{
    color:#7d7d7d
  }
</style>
