<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <v-content className="page-content page-background">
      <Linklist :propList="profileList_group"></Linklist>
    </v-content>
  </div>
</template>

<script>
  import VContent from '../../components/Content';
  import Linklist from '../../components/Linklist';
  import NavBar from '../../components/NavBar';

  export default {
    created:function(){
      this.$store.dispatch('getMyImgProfileList');
    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title: this.$t('myimg')
        }
      }},
    computed : {
      profileList_group(){
        let profilelist =  this.$store.state.moduleReview.imgList;
        profilelist.forEach(
          (item)=>{
            if(item.group_id === 'shenfenzheng'){
              item.title = this.$t('idcard');
            }
          });
        return profilelist;
      }
    },
    components: {
      VContent,
      Linklist,
      NavBar
    },

    locales: {
      zh: {
        'myimg' : '资料上传',
        'idcard' : '身份证'
      },

      en: {
        'myimg' : 'Profile Upload',
        'idcard' : 'ID Card'
      }
    }
  }
</script>

<style>
</style>
