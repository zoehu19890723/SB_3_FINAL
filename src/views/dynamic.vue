<template>
  <div class="page">
  <NavBar :headerInfo="header"></NavBar>
  <v-content className="page-content">
     <MList :propItems="setDynamicCategory"/>
    <div class="wx-group media-list list-block" style="margin: 12px 0px 12px 0px;">
      <div class="list-group">
        <ul class="wx-contacts">
          <li class="wx-item" style="padding: 2px 8px;">
            <div class="wx-name" style="height: 36px; display: flex;align-items: center;justify-content: space-between;">
              <img :src="titleImg" v-if="titleImg" style="width: 70px;margin: 0 10px 0 0;">
              <span style="font-size: 20px;color: black">{{$t('title[0]')}}</span>
              <span>
              <router-link :to="{path:'/dynamic/dynamicList',query: {id:'newToShare',title:$t('title[0]')}}"><i class="icon iconfont">&#xe677;</i>
              </router-link>
            </span>
            </div>
          </li>

            <li  v-for="itemInfo in setNewToShare" class="wx-item" style="height:80px;margin-left:8px"  @click="openPage(itemInfo.link,itemInfo.subtitle)">
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
  import MediaList from '../components/MediaList';
  import DDynamicMediaList from '../components/Demo-dynamic-list';
  import {assetsPublicPath} from '../config';
  import MList from '../components/Multi-List';
  import {openLink} from '../utils/tools';
  export default {

    created:function(){
      this.getDynamicList()
    },

    methods: {
      getDynamicList(){
        var self = this;
        this.$store.dispatch('getDynamicCategory');
        this.$store.dispatch('getNewToShare',{number:2})

      },
      openPage(link,title){
        // if(localStorage.getItem('EP_browser')==="android"){
        //   var ref = cordova.InAppBrowser.open(link+'?token='+localStorage.getItem('EP_token'), '_blank', 'location=yes,toolbar=yes');
        // }else{
        //   var ref = cordova.InAppBrowser.open(link+'?token='+localStorage.getItem('EP_token'), '_blank', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption='+this.$t('button'));
        // }
        // ref.show();
        let path = '/dynamic/dynamicList/iframePage';
        openLink(link,title,path);
      }
    },

    data() {
      return {
        header:{
          backShow:false,
          rightShow:false,
          rightInfo:'',
          show:true,
          title:this.$t('header[0].title')
        },
        baseImgUrl:assetsPublicPath,
        items:this.$store.state.moduleDynamic.allDynamic,
        fusionPath: "static/img/fusion.png",
        meetingPath: "static/img/meetCDP.png",
      }},
    computed: {
      setDynamicCategory() {
        return this.$store.state.moduleDynamic.dynamicCategory;
      },
      setNewToShare() {
        return this.$store.state.moduleDynamic.newToShare.slice(0,2);
      },
      setEnterpriseNews() {
        return this.$store.state.moduleDynamic.enterpriseNews;
      },
      setJournalOfEnterprise() {
        return this.$store.state.moduleDynamic.journalOfEnterprise;
      }
    },

    components: {
      VContent,
      NavBar,
      MediaList,
      DDynamicMediaList,
      MList
    },

    /**
    * @description 多语言
    */
    locales: {
      en: {
        title: ['Sharing','News', 'Magazines'],
        header:[{
          title: 'News'
        }],
        button:'Close'
      },

      zh: {
        title: ['新鲜事分享','企业新闻', '企业内刊'],
        header: [{
          title: '动态'
        }],
        button:'关闭'
      },
    },
  }

</script>

<style>
</style>
