<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <v-content className="page-content page-background">
      <SelfCard></SelfCard>
      <NoDataCard v-if="profileList.data === undefined || profileList.data.length === 0"></NoDataCard>
      <EditableList :propList="profileList" :groupID="groupID" :typeTitle="head.title" v-else></EditableList>
    </v-content>
  </div>
</template>

<script>
  import VContent from '../../components/Content';
  import SelfCard from '../../components/SelfCard';
  import EditableList from '../../components/EditableList';
  import NavBar from '../../components/NavBar';
  import NoDataCard from '../../components/NoDataCard';

  export default {
    created:function(){
      let id = this.$route.query.id || null;
      this.groupID = this.$route.query.groupId || null;
      this.head.title = this.$route.query.title || this.$t('myInfo');
      this.$store.dispatch('getProfileDetail',{id : id, groupID : this.groupID});
    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title:''
        },
         groupID : ''
      }
    },
    computed:{
      profileList() {
        return  this.$store.state.moduleProfile.profileDetailData;
      },
      title(){
        return this.$route.query.title || this.$t('myInfo');
      }
    },
    components: {
      VContent,
      SelfCard,
      EditableList,
      NavBar,
      NoDataCard
    },
    methods : {
    },

    locales: {
      zh: {
        'myInfo' : '我的信息',
        'loading' : '数据加载中...',
      },

      en: {
        'myInfo' : 'my information',
        'loading' : 'loading...',
      }
    }
  }
</script>

<style>
</style>
