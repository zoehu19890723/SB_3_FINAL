<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <v-content className="page-content page-background">
      <SelfCard></SelfCard>
      <Linklist :propList="profileList_group1"></Linklist>
      <Linklist :propList="profileList_group2" style="margin-top:10px"></Linklist>
      <SubmitBtn :btnText="btn.text" :submitAction="gotoLeaveApply" :clx="btn.clx" class="SubmitBtn"></SubmitBtn>
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
      this.$store.dispatch('getPunchSummary');
    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title: this.$t('myLeave'),
          backHref : '/home/navMore'
        },
        btn : {
          text : this.$t('leave-apply'),
          clx : 'weui_btn bg-red'
        },
      }
    },
    computed : {
      profileList_group1(){
        let group1 = [
          {
            title : this.$t('leave-info-show'),
            path : '/home/punchrequest/punch1',
          }
        ];
        let notApprovedNumber = this.$store.state.moduleAttend.punchSummary ? this.$store.state.moduleAttend.punchSummary.notApprovedNumber : 0;

        if(notApprovedNumber !== undefined && notApprovedNumber !== null && parseInt(notApprovedNumber)>0 ){
          group1[0].note = notApprovedNumber;
          group1[0].noteColor = 'red';
        }
        return group1;
      },
      profileList_group2(){
        let group2 = [
          {
            title : this.$t('leave-approve'),
            path : '/home/punchrequest/punch2',
          }
        ];
        let toApproveNumber = this.$store.state.moduleAttend.punchSummary ? this.$store.state.moduleAttend.punchSummary.toApproveNumber : 0;
        if(toApproveNumber !== undefined && toApproveNumber !== null && parseInt(toApproveNumber)>0 ){
          group2[0].note = toApproveNumber;
          group2[0].noteColor = 'red';
        }
        return group2;
      }
    },
    methods : {
      gotoLeaveApply(){
        this.$router.push('/home/punchrequest/punch3');
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
        'myLeave' : '补打卡申请',
        'leave-apply' : '申请补打卡',
        'leave-info-show' : '补打卡信息查看',
        'leave-approve' : '补打卡审批',
        'apply' : '补打卡申请',
      },

      en: {
        'myLeave' : 'Leave',
        'leave-apply' : 'Apply Punch',
        'leave-info-show' : 'Punch Info',
        'leave-approve' : 'Punch Approve',
        'apply' : 'Punch Request'
      }
    }
  }
</script>

<style>
</style>
