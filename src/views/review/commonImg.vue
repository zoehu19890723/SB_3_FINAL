<template>
  <div class="page">
    <NavBar :headerInfo="head" :rightEnable="rightEnable" :rightClick="changeStatus"></NavBar>
    <v-content className="page-content page-background">
    <div :class="['imgPanel',selectStatus?'marginBt':'']">
      <div class="specPhoto">
        <ImageCard v-for="(item,index) in imgArray" :imgPath="item.path" :imgArray="imgArray" :currentIndex="index" :selectStatus="selectStatus" :groupId="group_id" :groupName="group_name" :permission="item.permission"></ImageCard>
        <ImageCard v-if="!selectStatus" :groupId="group_id" :groupName="group_name"></ImageCard>
      </div>
      <SubmitBtn :btnText="btn.text" :disable="disableSubmit" :submitAction="doSubmit" :clx="btn.clx" v-if="!selectStatus"></SubmitBtn>
    </div>
      <Bar style="position:fixed" v-if="selectStatus">
        <i class="f7-icons"></i>
        <i class="f7-icons"></i>
        <i :class="['f7-icons','trashBtn',showDelete?'active':'']" @click="sureTodeleteImg">trash</i>
      </Bar>
    </v-content>
  </div>
</template>

<script>
  import VContent from '../../components/Content';
  import Linklist from '../../components/Linklist';
  import NavBar from '../../components/NavBar';
  import ImageCard from '../../components/ImageCard';
  import Bar from '../../components/Bar';
  import SubmitBtn from '../../components/SubmitBtn';
  import _ from 'lodash';

  export default {
    created:function(){
      this.$store.commit('clearCheckedImg');
      this.$store.commit('clearUploadImg');
      this.$store.commit('clearSpecGroupImgList');
      let groupId = this.$route.query.group_id;
      this.$store.dispatch('getMyProfileImgById',{group_id : groupId});
    },
    data() {
      return {
        selectStatus : false,
        btn : {
          text : this.$t('commitButton'),
          clx : 'weui_btn bg-red'
        },
        group_id :  this.$route.query.group_id,
        group_name : this.$route.query.title
      }},
    computed : {
      imgArray(){
        let speclist = this.$store.state.moduleReview.specGroupImgList;
        let uploadList = this.$store.state.moduleReview.uploadImgList;
        let changeFlag = true;
        if(this.$route.query.group_id.indexOf('hukouben') > -1 || this.$route.query.group_id.indexOf('PayrollCard') > -1 || this.$route.query.group_id.indexOf('Passport') > -1){
            changeFlag =false;
        }
        speclist.forEach((item)=>{
          if(_.findIndex(uploadList,{path : item.path}) < 0 && !changeFlag){
            item.permission = 0;
          }else{
            item.permission = 2;
          }
        })
        return speclist;
      },
      head(){
        if(this.imgArray.length === 0){
          return {
            backShow:true,
            rightShow:false,
            rightInfo:'',
            show:true,
            title: this.$route.query.title
          }
        }else if(this.selectStatus === false){
          return {
            backShow:true,
            rightShow:true,
            rightInfo:this.$t('choose'),
            show:true,
            title: this.$route.query.title
          }
        }else{
          return {
            backShow:true,
            rightShow:true,
            rightInfo:this.$t('cancel'),
            show:true,
            title: this.$route.query.title
          }
        }
      },
      rightEnable(){
        if(this.imgArray.length === 0){
          return false;
        }else{
          return true;
        }
      },
      showDelete(){
        let array = this.$store.state.moduleReview.selectedImgList;
        if(array.length > 0){
          return true;
        }else{
          return false;
        }
      },
      disableSubmit(){
        let array = this.$store.state.moduleReview.uploadImgList;
        if(array.length > 0){
          return false;
        }else{
          return true;
        }
      }
    },
    methods:{
      changeStatus(){
        this.selectStatus = !this.selectStatus;
      },
      sureTodeleteImg(){
        let buttons = [
          {
              text: this.$t('sureToDelete'),
              color : 'red',
              onClick: this.deleteImg,
          },{
              text: this.$t('cancel'),
          }];
        f7.actions(buttons);
      },
      doSubmit(){
        let me = this;
        let submitArray = me.$store.state.moduleReview.uploadImgList;
        me.$store.dispatch('uploadImg',{array : submitArray}).then(
        (res)=>{
          if(res){
            me.$router.back();
          }else{

          }
        });
      },
      deleteImg(){
        let selectArray = this.$store.state.moduleReview.selectedImgList;
        if(selectArray.length === 0){
          f7.alert('','没有选中元素');
          return;
        }else{
          let me = this;
          me.$store.dispatch('deleteImg',
            {
              array : selectArray,
              group_id : me.$route.query.group_id
          }).then(
            (res)=>{
              if(res){
                me.$store.dispatch('deleteSelectImg',{array : selectArray});
                me.changeStatus();
              }else{

              }
            });
        }
      }
    },
    components: {
      VContent,
      Linklist,
      NavBar,
      ImageCard,
      Bar,
      SubmitBtn
    },

    locales: {
      zh: {
        'myimg' : '资料上传',
        'sureToDelete' : '确认删除',
        'cancel' : '取消',
        'choose' : '选择',
        'commitButton' : '提交',
      },

      en: {
        'myimg' : 'Profile Upload',
        'sureToDelete' : 'Sure To Delete',
        'cancel' : 'Cancel',
        'choose' : 'Choose',
        'commitButton' : 'Submit',
      }
    }
  }
</script>

<style scoped>
  .specPhoto{
    display: flex;
    flex-wrap: wrap;
  }
  .imgPanel{
    margin-top: 30px;
  }
  .imgPanel.marginBt{
    margin-bottom: 60px;
  }
  .trashBtn{
    pointer-events : none;
  }
  .trashBtn.active{
    color: rgb(0,122,255);
    pointer-events : auto;
  }
</style>
