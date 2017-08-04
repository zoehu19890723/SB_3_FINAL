<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <v-content className="page-content page-background" style="background: transparent;">
      <InfoDetailCard :detailData="detailData"></InfoDetailCard> 
      <Toolbar v-if="parseInt(permissionCode) === 1" :placeholder="$t('cancel-reason')" :btnArray="[cancelApply]"></Toolbar>
      <Toolbar v-if="parseInt(permissionCode) === 3" :placeholder="$t('approval-remark')" :btnArray="[refuseApply,agreeApply]"></Toolbar>
    </v-content>
  </div>
</template>

<script>
  import VContent from '../../components/Content';
  import InfoDetailCard from '../../components/InfoDetailCard';
  import Toolbar from '../../components/Toolbar';
  import {dealImage} from '../../utils/tools';
  import NavBar from '../../components/NavBar';
  export default {
    created:function(){
      let me = this;
      let applyId = me.$route.query.id || null;
      me.permissionCode = me.$route.query.permissionCode;
      me.$store.dispatch('getLeaveDetailInfo',{id : applyId}).then(
        (response)=>{
          if(response.body.status === 1){
            let data = response.body;
            if (data.data.applyPerson !== undefined) {
              data.data.applyPerson = dealImage([data.data.applyPerson], true)[0];
              if (data.data.approvePerson !== undefined && data.data.approvePerson.length !== 0) {
                let last_person_arr = data.data.approvePerson[data.data.approvePerson.length - 1].data;
                last_person_arr.forEach((item) => {
                  let status = parseInt(item.status.step_status);
                  if (status === 1) {
                      me.generalId = item.id;
                      return;
                  }
                })
                data.data.approvePerson.forEach((item) =>{
                  item.data = dealImage(item.data,true);
                })
              }
            }
            me.detailData = data.data;
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
          title: this.$t('real-leave')
        },
        detailData : {},
        permissionCode : 1,
        generalId : null,
      }
    },
    methods : {
      cancelApply(res){
        let me = this;
        let applyId = me.$route.query.id;
        let reson = res || me.$t('cancel-apply');
        me.$store.dispatch('cancelLeaveApply',{id : applyId,reson : reson}).then(
          (response) =>{
            if(response.body.status === 1){
              if(response.body.data.status == 1){
                f7.alert('',me.$t('leave-cancel-apply'),()=>{
                  me.$router.back();
                })
              }else{
                f7.alert('',response.body.data.message);
              }
            }else{
              f7.alert("",response.body.message);
            }
          }
        )
      },
      refuseApply(res){
        this.approveApply(1,res);
      },
      agreeApply(res){
        this.approveApply(0,res);
      },

      approveApply(code,res){
        let me = this;
        let reson = res || (code === 0 ? me.$t('approve-apply'):me.$t('refuse-apply'));
        me.$store.dispatch('approveLeaveApply',{
          id : me.generalId,
          reson : reson,
          code : code
        }).then(
        (response)=>{
          if(response.body.status === 1){
            if(response.body.data.status == 1){
                f7.alert('',me.$t('approvalSuc'),()=>{
                  me.$router.back();
                })
              }else{
                f7.alert('',response.body.data.message);
              }
          }else{
            f7.alert("",response.body.message);
          }
        })
      },
    },
    components: {
      VContent,
      InfoDetailCard,
      Toolbar,
      NavBar
    },

    locales: {
      zh: {
        'cancel-reason' : '撤销原因...',
        'approval-remark' : '审批备注...',
        'cancel-apply' : '撤销申请',
        'refuse-apply' : '拒绝',
        'approve-apply' : '同意',
        'leave-cancel-apply' : '休假撤销成功',
        'real-leave' : '休假详情',
        'approvalSuc' : '审批成功',
        'loading' : '数据加载中...',
        'canceling' : '撤销中...',
        'submitting':'提交中...'
      },

      en: {
        'cancel-reason' : 'Cancel Reason...',
        'cancel-apply' : 'Withdrawn application...',
        'approval-remark' : 'Approval Notes',
        'refuse-apply' : 'Refuse',
        'approve-apply' : 'Agree',
        'leave-cancel-apply' : 'Cancel leave succeed',
        'real-leave' : 'Leave Detail',
        'approvalSuc' : 'Approve successfully.',
        'loading' : 'Loading...',
        'canceling' : 'Canceling...',
        'submitting':'Submitting...'
      }
    }
  }
</script>

<style>
  .applyCard textarea{
    background-color: white;
  }
</style>
