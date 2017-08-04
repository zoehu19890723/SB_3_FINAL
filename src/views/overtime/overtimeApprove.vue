<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <v-content className="page-content page-background">
      <TabItem :initalIndex="initalIndexNew">
         <div class="content-block" slot="tab1">
            <applyInfoCard v-for="itemN in notApproveList" :item="itemN" :permissionCode="3" v-if="hasNotApproveList"></applyInfoCard>
            <NoDataCard v-if="!hasNotApproveList"></NoDataCard>
         </div>
         <div class="content-block" slot="tab2">
            <applyInfoCard  v-for="itemA in approvedList" :item="itemA" :permissionCode="4"  v-if="hasApproveList"></applyInfoCard>
            <NoDataCard v-if="!hasApproveList"></NoDataCard>
         </div>
      </TabItem>
    </v-content>
  </div>
</template>

<script>
  import VContent from '../../components/Content';
  import TabItem from '../../components/TabItem';
  import applyInfoCard from '../../components/applyInfoCard';
  import NoDataCard from '../../components/NoDataCard';
  import _ from 'lodash';
  import {dealImage} from '../../utils/tools';
  import NavBar from '../../components/NavBar';

  export default {
    created:function(){
      let me = this;
      me.$store.dispatch('getMyOTApprove').then(
        (response) =>{
          if(response.body.status === 1){
            me.notApproveList = dealImage(response.body.data.notApproved);
            me.approvedList = dealImage(response.body.data.approved);
         }else{
          f7.alert('',response.body.message);
         }
      });
    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title:this.$t('my-overtime-approve')
        },

        notApproveList : [],
        approvedList : [],
        initalIndex : 0
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm =>{
        if(from.query.fromTab){
          vm.initalIndex = from.query.fromTab;
        }
      });
    },
    computed : {
      hasNotApproveList(){
        return this.notApproveList.length > 0 ? true : false
      },
      hasApproveList(){
        return this.approvedList.length > 0 ? true : false
      },
      initalIndexNew(){
        return this.initalIndex;
      }
    },
    components: {
      VContent,
      TabItem,
      applyInfoCard,
      NoDataCard,
      NavBar
    },

    locales: {
      zh: {
        'my-overtime-approve' : '我要审批的加班',
        'loading' : '数据加载中...'
      },

      en: {
        'my-overtime-approve' : 'Overtime to approve',
        'loading' : 'Loading...'
      }
    }
  }
</script>

<style>
</style>
