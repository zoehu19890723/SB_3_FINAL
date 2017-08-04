<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <v-content className="page-content page-background">
      <SelfCard></SelfCard>
      <Linklist :propList="profileList_group"></Linklist>
      <SubmitBtn :btnText="btn.text" :submitAction="gotoProveApply" :clx="btn.clx" class="SubmitBtn"></SubmitBtn>
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
      this.$store.dispatch('getProveSummary');
    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title: this.$t('myProve')
        },
        btn : {
          text : this.$t('prove-apply'),
          clx : 'weui_btn bg-red'
        }
      }
    },
    computed : {
      profileList_group(){
        let group = [
          {
            title : this.$t('prove-info-show'),
            path : '/home/prove1'
          },{
            title : this.$t('prove-approve'),
            path : '/home/prove3'
          }
        ];
        let notApprovedNumber = this.$store.state.moduleApply.proveSummary ? this.$store.state.moduleApply.proveSummary.notApprovedNumber : 0;
        let toApproveNumber = this.$store.state.moduleApply.proveSummary ? this.$store.state.moduleApply.proveSummary.toApproveNumber : 0;

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
      gotoProveApply(){
        this.$router.push('/home/prove2');
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
        'myProve' : '证明申请',
        'prove-apply' : '证明申请',
        'prove-info-show' : '申请信息查看',
        'prove-approve' : '证明申请审批',
      },

      en: {
        'myProve' : 'Prove Application',
        'prove-apply' : 'Prove Apply',
        'prove-info-show' : 'Prove Application Info',
        'prove-approve' : 'Prove Application Approve',
      }
    }
  }
</script>

<style>
</style>
