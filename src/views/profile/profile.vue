<template>
  <div class="page">
    <NavBar :headerInfo="head" rightEnable="true" :rightClick = "rightClick"></NavBar>
    <v-content className="page-content page-background">
      <SelfCard></SelfCard>
      <Linklist :propList="profileList" style="margin: 5px 0;"></Linklist>
    </v-content>
</div>
</template>

<script>
  import VContent from '../../components/Content';
  import SelfCard from '../../components/SelfCard';
  import Linklist from '../../components/Linklist';
  import NavBar from '../../components/NavBar';
  import {showMore} from '../../utils/tools';

  export default {
    created:function(){
      this.userId = this.$route.query.id || null;
      this.$store.dispatch('getPersonCard',{id : this.userId});
      this.$store.dispatch('getMore');
    },
    data() {
      return {
        userId : ''
      }
    },
    computed:{
      profileList() {
        let originList = this.$store.state.moduleProfile.profileList;
        for(let item in originList){
          if(item === 'attendance_summary'){
            originList[item].path = '/home/esshrdetail4';
          }else{
            originList[item].path = '/home/esshrdetail1';
          }
          originList[item].query = {
            id:this.userId,
            groupId:item,
            title:originList[item].title
          }
          if(originList[item].permission_code > 3 || (originList[item].permission_code === 3 && (originList[item].group_no === undefined || originList[item].group_no > 0))){
            originList[item].edit = true;
          }
          if(originList[item].group_no !== undefined && originList[item].group_no !== null){
            originList[item].note = originList[item].group_no;
            originList[item].noteColor = 'wheat';
            originList[item].noteShape = 'square';
          }
        }
        return originList;
      },
      head(){
        return {
          backShow:true,
          rightShow: (this.$store.state.moduleProfile.more.hasMore) && (this.userId === null),
          rightIcon:'more',
          iconColor:'gray',
          show:true,
          title: this.userId ? this.$t('starProfile') : this.$t('myStarProfile')
        }
      }
    },
    methods : {
      rightClick(){
        showMore()
      }
    },
    components: {
      VContent,
      SelfCard,
      Linklist,
      NavBar
    },

    locales: {
      zh: {
        'myStarProfile' : '我的人事档案',
        'starProfile' : '人事档案',
        'loading' : '数据加载中...',
      },

      en: {
        'myStarProfile' : 'Information',
        'starProfile' : 'Information',
        'loading' : 'loading...',
      }
    }
  }
</script>

<style>
</style>
