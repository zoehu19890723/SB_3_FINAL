<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <v-content className="page-content page-background">
      <SelfCard></SelfCard>
      <Linklist :propList="profileList_group"></Linklist>
      <SubmitBtn :btnText="btn.text" :submitAction="gotoGeneralApply" :clx="btn.clx" class="SubmitBtn"></SubmitBtn>
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
      this.$store.dispatch('getGeneralSummary');
    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title: this.$t('myGeneral')
        },
        btn : {
          text : this.$t('general-apply'),
          clx : 'weui_btn bg-red'
        }
      }
    },
    computed : {
      profileList_group(){
        let group = [
          {
            title : this.$t('general-info-show'),
            path : '/home/general1'
          },{
            title : this.$t('general-approve'),
            path : '/home/general3'
          }
        ];
        let notApprovedNumber = this.$store.state.moduleApply.generalSummary ? this.$store.state.moduleApply.generalSummary.notApprovedNumber : 0;
        let toApproveNumber = this.$store.state.moduleApply.generalSummary ? this.$store.state.moduleApply.generalSummary.toApproveNumber : 0;

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
    methods:{
      gotoGeneralApply(){
        this.$router.push('/home/general2');
      },

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
        'myGeneral' : '通用申请',
        'general-apply' : '通用申请',
        'general-info-show' : '通用信息查看',
        'general-approve' : '通用申请审批',
      },

      en: {
        'myGeneral' : 'General Application',
        'general-apply' : 'General Apply',
        'general-info-show' : 'General Application Info',
        'general-approve' : 'General Application Approve',
      }
    }
  }
</script>

<style>
</style>
