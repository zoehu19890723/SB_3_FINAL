<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <v-content className="page-with-headOnly page-background" style="background: transparent;">
      <InfoDetailCard :detailData="detailData"></InfoDetailCard> 
      <Toolbar v-if="parseInt(permissionCode) === 3"  :placeholder="$t('approve-note')" :btnArray="[refuseApply,agreeApply]"></Toolbar>
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
      let applyId = this.$route.query.id || null;
      this.permissionCode = this.$route.query.permissionCode;
      me.$store.dispatch('getTransferDetailInfo',{id : applyId}).then(
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
                        this.generalId = item.id;
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
          title:this.$t('transfer-detail')
        },
        detailData : {},
        permissionCode : 1,
        generalId : ''
      }
    },
    methods : {
      refuseApply(res){
        this.approveApply(1,res);
      },
      agreeApply(res){
        this.approveApply(0,res);
      },

      approveApply(code,res){
        let me = this;
        let reson = res || (code === 0 ? me.$t('approve-apply'):me.$t('refuse-apply'));
        me.$store.dispatch('approveTransferApply',{
          id : me.generalId,
          reson : reson,
          code : code
        }).then(
        (response)=>{
          if(response.body.status === 1){
            f7.alert("",me.$t('refuse-apply'),function(){
              me.$router.back();
            });
          }else{
            f7.alert("",response.body.message);
          }
        })
      }
    },
    components: {
      VContent,
      InfoDetailCard,
      Toolbar,
      NavBar
    },

    locales: {
      zh: {
        'transfer-detail' : '异动详情',
        'approve-note' : '审批备注',
        'refuse-apply' : '拒绝',
        'approve-apply' : '同意',
        'approvalSuc' : '审批成功',
        'loading' : '数据加载中...',
        'approving' : '提交审批中...'
      },

      en: {
        'transfer-detail' : 'Personnel Change Detail',
        'approve-note' : 'Approval Notes',
        'refuse-apply' : 'Refuse',
        'approve-apply' : 'Agree',
        'approvalSuc' : 'Approve successfully.',
        'loading' : 'Loading...',
        'approving' : 'Approving...'
      }
    }
  }
</script>

<style>
  .applyCard textarea{
    background-color: white;
  }
</style>
