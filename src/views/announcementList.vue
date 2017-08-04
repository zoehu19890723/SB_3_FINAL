<template>
  <div class="page">
    <NavBar :headerInfo="header"></NavBar>
    <v-content className="page-content">
      <div class="wx-group media-list list-block" style="margin: 12px 0px 12px 0px;">
        <div class="list-group">
          <ul class="wx-contacts">
            <li v-for="item in items" class="wx-item" style="height:80px;margin-left:8px"  @click="openPage(item.link)">
              <span class="wx-icon" style="width:90px ;height:60px;border-radius: 2px;overflow:hidden">
                  <img :src="item.img" style="width: 90px;height: 60px;"/>
              </span>
              <div class="wx-name" style="font-weight:bold">{{item.subtitle}}</div>
              <div class="wx-pos" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;font-size:12px">
                {{item.text}}
              </div>
            </li>
          </ul>
        </div></div>
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
      var self = this;
      this.$store.dispatch('getAnnouncementList',{id:this.$route.query.id,title:this.$route.query.title}).then(
          function () {
            self.items = self.$store.state.moduleAnnouncement.announcementList[self.$route.query.id]
          }
      )
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
          title:this.$route.query.title,
        },
        items:this.$store.state.moduleAnnouncement.announcementList[this.$route.query.id]
      }
    },
    computed: {
//      items() {
//        return this.$store.state.moduleAnnouncement.announcementList[this.$route.query.id];
//      }
    },
    methods:{
      openPage(link){
        // if(localStorage.getItem('EP_browser')==="android"){
        //   var ref = cordova.InAppBrowser.open(link+'?token='+localStorage.getItem('EP_token'), '_blank', 'location=yes,toolbar=yes');
        // }else{
        //   var ref = cordova.InAppBrowser.open(link+'?token='+localStorage.getItem('EP_token'), '_blank', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption='+this.$t('button'));
        // }
        // ref.show()
        let path = '/announcement/announcementList/iframePage';
        openLink(link,this.$route.query.title,path);
      },
      routerBack(href){
        this.$router.back();
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
  .wx-pos-annouce{
    height: 100% !important;
    overflow: hidden;
    text-overflow:ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
</style>
