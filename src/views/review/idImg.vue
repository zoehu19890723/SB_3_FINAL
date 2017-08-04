<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <v-content className="page-content page-background">
      <div class="specPhoto">
        <ImageCard :ref="item.ref" v-for="item in imgArray" :imgText = "item.text" :permission="item.permission" :groupId="item.ref" :imgPath="item.path" :groupName = "item.text" :imgArray = "imgArray"></ImageCard>
      </div>
      <SubmitBtn :btnText="btn.text" :submitAction="doSubmit" :clx="btn.clx" :disable="disableSubmit"></SubmitBtn>
    </v-content>
  </div>
</template>

<script>
  import VContent from '../../components/Content';
  import Linklist from '../../components/Linklist';
  import NavBar from '../../components/NavBar';
  import ImageCard from '../../components/ImageCard';
  import SubmitBtn from '../../components/SubmitBtn';

  export default {
    created:function(){
      let me = this;
      this.$store.commit('clearUploadImg');
      this.$store.commit('clearSpecGroupImgList');
      this.$store.commit('clearIdImgList');

      this.$store.dispatch('getMyProfileImgById',{group_id : 'shenfenzheng'});
      this.$store.dispatch('getMyProfileImgById',{group_id : 'shenfenzheng_back'});
    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title: this.$t('idImg')
        },
        btn : {
          text : this.$t('commitButton'),
          clx : 'weui_btn bg-red'
        },
      }
    },
    computed : {
      imgArray(){
        let array = this.$store.state.moduleReview.specGroupImgList;
        array.forEach((item)=>{
          if(item.text === undefined){
            item.text = this.$t(item.ref);
            if(item.path){
              item.permission = 0;
            }else{
              item.permission = 1;
            }
          }
        })
        return array;
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
    methods :{
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
      }
    },
    components: {
      VContent,
      Linklist,
      NavBar,
      ImageCard,
      SubmitBtn
    },

    locales: {
      zh: {
        'idImg' : '身份证上传',
        'commitButton' : '提交',
        'shenfenzheng' : '身份证正面',
        'shenfenzheng_back' : '身份证反面',
      },

      en: {
        'idImg' : 'ID Card Upload',
        'commitButton' : 'Submit',
        'shenfenzheng' : 'shenfenzheng_front',
        'shenfenzheng_back' : 'shenfenzheng_back',
      }
    }
  }
</script>

<style scoped>
  .specPhoto{
    display: flex;
    flex-direction: column;
    height: 70%;
    justify-content: space-around;
    align-items: center;
  }
</style>
