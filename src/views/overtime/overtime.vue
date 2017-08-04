<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <v-content className="page-content page-background">
      <SelfCard></SelfCard>
      <Linklist :propList="profileList_group"></Linklist>
      <SubmitBtn :btnText="btn.text" :submitAction="gotoOTApply" :clx="btn.clx" class="SubmitBtn"></SubmitBtn>
    </v-content>
  </div>
</template>

<script>
  import VContent from '../../components/Content';
  import SelfCard from '../../components/SelfCard';
  import Linklist from '../../components/Linklist';
  import NavBar from '../../components/NavBar';
  import SubmitBtn from '../../components/SubmitBtn';

  export default {
    created:function(){
      let personCard = this.$store.state.moduleProfile.personCard;
      this.$store.dispatch('getPersonCard',{id : null});
      this.$store.dispatch('getOTSummary');
    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title: this.$t('myOverTime')
        },
        btn : {
          text : this.$t('overtime-apply-text'),
          clx : 'weui_btn bg-red'
        }
      }
    },
    computed : {
      profileList_group(){
        let group = [
          {
            title : this.$t('overtime-info-text'),
            path : '/home/overtime1',
          },{
            title : this.$t('overtime-approve-text'),
            path : '/home/overtime3',
          }
        ];
        let notApprovedNumber = this.$store.state.moduleApply.otSummary ? this.$store.state.moduleApply.otSummary.notApprovedNumber : 0;
        let toApproveNumber = this.$store.state.moduleApply.otSummary ? this.$store.state.moduleApply.otSummary.toApproveNumber : 0;

        if(notApprovedNumber !== undefined && notApprovedNumber !== null && parseInt(notApprovedNumber)>0 ){
          group[0].note = notApprovedNumber;
          group[0].noteColor = 'red';
        }
        if(toApproveNumber !== undefined && toApproveNumber !== null && parseInt(toApproveNumber)>0 ){
          group[1].note = toApproveNumber;
          group[1].noteColor = 'red';
        }
        return group;
      }
    },
    methods : {
      gotoOTApply(){
        this.$router.push('/home/overtime2');
      }
    },
    components: {
      VContent,
      SelfCard,
      Linklist,
      NavBar,
      SubmitBtn
    },

    locales: {
      zh: {
        'myOverTime' : '我的加班',
        'overtime-info-text' : '加班信息查看',
        'overtime-apply-text' : '申请加班',
        'overtime-approve-text' : '加班审批',
        'loading' : '数据加载中...',
      },

      en: {
        'myOverTime' : 'OverTime',
        'overtime-info-text' : 'Overtime Info',
        'overtime-apply-text' : 'Apply Overtime',
        'overtime-approve-text' : 'Overtime Approve',
        'loading' : 'loading...',
      }
    }
  }
</script>

<style>
</style>
