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
      this.$store.dispatch('getLeaveSummary');
    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title: this.$t('myLeave')
        },
        btn : {
          text : this.$t('leave-apply'),
          clx : 'weui_btn bg-red'
        }

      }
    },
    computed : {
      profileList_group1(){
        let group1 = [
          {
            title : this.$t('leave-quota-show'),
            path : '/home/leave1',
          },{
            title : this.$t('leave-info-show'),
            path : '/home/leave2',
          }
        ];
        let restDays = this.$store.state.moduleApply.leaveSummary? this.$store.state.moduleApply.leaveSummary.restDays : 0;
        let notApprovedNumber = this.$store.state.moduleApply.leaveSummary ? this.$store.state.moduleApply.leaveSummary.notApprovedNumber : 0;

        if(restDays !== undefined && restDays !== null && parseInt(restDays)>0 ){
          group1[0].note = restDays + this.$t('days');
        }
        if(notApprovedNumber !== undefined && notApprovedNumber !== null && parseInt(notApprovedNumber)>0 ){
          group1[1].note = notApprovedNumber;
          group1[1].noteColor = 'red';
        }
        return group1;
      },
      profileList_group2(){
        let group2 = [
          {
            title : this.$t('leave-approve'),
            path : '/home/leave4',
          }
        ];
        let toApproveNumber = this.$store.state.moduleApply.leaveSummary ? this.$store.state.moduleApply.leaveSummary.toApproveNumber : 0;
        if(toApproveNumber !== undefined && toApproveNumber !== null && parseInt(toApproveNumber)>0 ){
          group2[0].note = toApproveNumber;
          group2[0].noteColor = 'red';
        }
        return group2;
      }
    },
    methods : {
      gotoLeaveApply(){
        this.$router.push('/home/leave3');
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
        'myLeave' : '我的休假',
        'leave-apply' : '申请休假',
        'leave-quota-show' : '休假配额查看',
        'leave-info-show' : '休假信息查看',
        'leave-approve' : '休假审批',
        'loading' : '数据加载中...',
        'days' : '天'
      },

      en: {
        'myLeave' : 'Leave',
        'leave-apply' : 'Apply Leave',
        'leave-quota-show' : 'Vacation Quota',
        'leave-info-show' : 'Vacation Info',
        'leave-approve' : 'Leave Approve',
        'loading' : 'loading...',
        'days' : ' days'
      }
    }
  }
</script>

<style>
</style>
