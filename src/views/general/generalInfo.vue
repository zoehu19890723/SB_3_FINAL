<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <v-content className="page-content page-background">
      <TabItem :initalIndex="initalIndexNew">
         <div class="content-block" slot="tab1">
            <applyInfoCard v-for="itemN in notApproveList" :item="itemN" :permissionCode="1" v-if="hasNotApproveList"></applyInfoCard>
            <NoDataCard v-if="!hasNotApproveList"></NoDataCard>
         </div>
         <div class="content-block" slot="tab2">
            <applyInfoCard v-for="itemA in approvedList" :item="itemA" :permissionCode="2" v-if="hasApproveList"></applyInfoCard>
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
      me.$store.dispatch('getGeneralInfo').then(
        (response) =>{
          if(response.body.status === 1){
            let userCard = me.$store.state.moduleProfile.personCard;
            let result = response.body.data
            let tempArr = result.notApproved || [];
            tempArr.forEach((item, index) => {
                _.extend(item, {
                    userInfo: {
                      image: userCard.photo,
                      name: userCard.name
                    }
                });
            });
            me.notApproveList = tempArr;
            result.approved.forEach((item)=>{
              if(item.userInfo){
                item.userInfo.name = userCard.name;
              }
            });
            me.approvedList = dealImage(result.approved);
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
          title: this.$t('my-leave-apply')
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
        'my-leave-apply' : '我发起的通用申请',
        'loading' : '数据加载中...'
      },

      en: {
        'my-leave-apply' : 'My General Apply',
        'loading' : 'Loading...'
      }
    }
  }
</script>

<style>
</style>
