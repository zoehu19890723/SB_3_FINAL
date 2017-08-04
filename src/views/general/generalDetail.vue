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
  import {StarRating} from 'vue-rate-it';
  import SubmitBtn from '../../components/SubmitBtn';


  export default {
    created:function(){
      let me = this;
      let applyId = me.$route.query.id || null;
      me.permissionCode = me.$route.query.permissionCode;
      me.$store.dispatch('getGeneralDetailInfo',{id : applyId}).then(
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
            if(data.data.evaluate !== undefined && data.data.evaluate !== null){
              me.scoreObj = data.data.evaluate;
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
        btn : {
          text : this.$t('submit'),
          clx : 'weui_btn bg-red'
        },
      }
    },
    computed :{
    },
    methods : {
      cancelApply(res){
        let me = this;
        let applyId = me.$route.query.id;
        let reson = res || me.$t('cancel-apply');
        me.$store.dispatch('cancelGeneralApply',{id : applyId,reson : reson}).then(
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
        me.$store.dispatch('approveGeneralApply',{
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
      NavBar,
      StarRating,
      SubmitBtn
    },

    locales: {
      zh: {
        'cancel-reason' : '撤销原因...',
        'approval-remark' : '审批备注...',
        'cancel-apply' : '撤销申请',
        'refuse-apply' : '拒绝',
        'approve-apply' : '同意',
        'leave-cancel-apply' : '通用申请撤销成功',
        'real-leave' : '通用申请详情',
        'approvalSuc' : '审批成功',
        'loading' : '数据加载中...',
        'canceling' : '撤销中...',
        'submit':'提交',
        'rate' : '服务评价 : ',
        'rate-1' : '不满意',
        'rate-2' : '有待改善',
        'rate-3' : '基本满意',
        'rate-4' : '满意',
        'rate-5' : '非常满意',
        'succeedRate' : '评价成功!'
      },

      en: {
        'cancel-reason' : 'Cancel Reason...',
        'cancel-apply' : 'Withdrawn application...',
        'approval-remark' : 'Approval Notes',
        'refuse-apply' : 'Refuse',
        'approve-apply' : 'Agree',
        'leave-cancel-apply' : 'Cancel Apply succeed',
        'real-leave' : 'Apply Detail',
        'approvalSuc' : 'Approve successfully.',
        'loading' : 'Loading...',
        'canceling' : 'Canceling...',
        'submit':'Submit',
        'rate' : 'Service Evalution : ',
        'rate-1' : 'Not Good',
        'rate-2' : 'Need Improve',
        'rate-3' : 'Normal',
        'rate-4' : 'Good',
        'rate-5' : 'Very Good',
        'succeedRate' : 'Evalute Succeed!'
      }
    }
  }
</script>

<style>
  .applyCard textarea{
    background-color: white;
  }
  .summit-evalution{
    display: flex;
    align-items: center;
    margin: 0 16px;
    color: #212121;
    font-size: 12px;
    flex-wrap: wrap;
  }
  .evalute-card{
    border-top: 1px solid #cecece;
    padding: 8px 0px;
    position: absolute;
    width: 100%;
    bottom: 8px;
  }
</style>
