<template>
  <div class="page">
    <NavBar :headerInfo="head" :rightClick="savePhoto" :rightEnable ="rightEnable"></NavBar>
    <v-content className=="page-content page-background">
      <section class="holder">
        <div>
          <div class="picture-holder" id="picture-holder" style="text-align:center">
            <img :src="photo" width="200" height="200" v-if="hasPhoto"/>
            <img src="../../static/img/default.jpg" width="120" height="120" v-else/>
          </div>
        </div>
        <SubmitBtn :btnText="takebtn.text" :submitAction="photograph" :clx="takebtn.clx" v-if="!isWeixin"></SubmitBtn>
        <SubmitBtn :btnText="chosebtn.text" :submitAction="accesstoPhone" :clx="chosebtn.clx" v-if="!isWeixin"></SubmitBtn>
      </section>
    </v-content>
  </div>
</template>

<script>
  import SubmitBtn from '../components/SubmitBtn';
  import NavBar from '../components/NavBar';
  import VContent from '../components/Content';
  import {APP_ENV_NOW} from '../config';
  export default {
   created:function(){
      this.from = this.$route.query.from;
      this.photo = this.$route.query.photo;
    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:true,
          rightInfo:this.$t('save'),
          show:true,
          title: this.$t('updateImg'),
        },
        takebtn :{
          text : this.$t('takePhoto'),
          clx : 'weui_btn bg-red',
        },
        chosebtn :{
          text : this.$t('fromPictures'),
          clx : 'weui_btn bg-red',
        },
        photo : null,
        from : null,
        rightEnable : false
      }
    },
    computed : {
      hasPhoto(){
        if(this.photo !== null && this.photo !== ''){
          return true;
        }else{
          return false;
        }
      },
      isWeixin(){
        return localStorage.getItem('EP_browser') === 'weixin';
      }
    },
    methods : {
      savePhoto(){
        let me = this;
        if (me.photo === "") {
          f7.alert('',me.$t('noImg'));
        }else {
          f7.alert('',me.$t('uploadSuccess'),function(){
            let phoneSRC = me.photo;
            switch(me.from){
              case 'selfCard' : {
                me.$store.commit('setSelfCardPhoto',phoneSRC);
                break;
              }
              case 'leaveApply' : {
                me.$store.commit('setTempLeaveApplyPic',phoneSRC);
                break;
              }
              case 'proveApply' : {
                me.$store.commit('setTempProvePic',phoneSRC);
                break;
              }
              case 'generalApply' : {
                me.$store.commit('setTempGeneralPic',phoneSRC);
                break;
              }
              case 'punchApply' : {
                me.$store.commit('setTempPunchPic',phoneSRC);
                break;
              }
            }
            me.$router.back();
          })
        }
      },
      onPhotoUrlSuccess(data){
        let me = this;
        if (data === "") {
          f7.alert('',me.$t('noImg'));
        }else {
          let imageUrl = data.lastIndexOf('?') > 0 ? data.substring(0, data.lastIndexOf('?')) : data
          let serviceURL = encodeURI(APP_ENV_NOW.WS + '/system/EFile/photoUpload/');
          let options = new FileUploadOptions();
          options.fileKey = "photo";
          options.fileName = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
          options.mimeType = "image/jpeg";

          let ft = new FileTransfer();
          // 上传回调
          me.$store.commit('setMask',{show:true,text:me.$t('loading')});
          ft.upload(imageUrl, serviceURL, function(data) {
            me.$store.commit('hideMask');
            let phoneSRC = APP_ENV_NOW.WSIMG + JSON.parse(data.response).result.filePath;
            me.photo = phoneSRC;
            me.rightEnable = true;
          }, function() {
            f7.alert('',me.$t('getPicFailed'));
          }, options);
        }
      },
      onUrlFail(){
        let me = this;
        f7.alert('',me.$t('getPicFailed'));
      },
      photograph(){
        let me = this;
        navigator.camera.getPicture(
          me.onPhotoUrlSuccess,
          me.onUrlFail, {
            quality: 100,
            allowEdit: false,
            destinationType: Camera.DestinationType.FILE_URI,
            targetWidth: 150,
            targetHeight: 150,
            correctOrientation: true
          });
      },
      accesstoPhone(){
        let me = this;
        navigator.camera.getPicture(
          me.onPhotoUrlSuccess,
          me.onUrlFail, {
              quality: 100,
              destinationType: Camera.DestinationType.FILE_URI,
              sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
              allowEdit: false,
              targetWidth: 150,
              targetHeight: 150,
              mediaType: Camera.MediaType.PICTURE
          })
      }
    },
    components: {
      SubmitBtn,
      NavBar,
      VContent
    },

    locales: {
      zh: {
        'save' : '保存',
        'updateImg' : '修改图片',
        'takePhoto' : '拍照',
        'fromPictures' : '从手机中获取',
        'noImg' : '没有可上传的图片',
        'uploadSuccess' : '上传图片成功',
        'uploadFailed' : '上传图片失败',
        'getPicFailed' : '获取图片失败',
        'loading' : '数据加载中...'
      },

      en: {
        'save' : 'Save',
        'updateImg' : 'Change Picture',
        'takePhoto' : 'Take Photo',
        'fromPictures' : 'Get From Album',
        'noImg' : 'No image to upload',
        'uploadSuccess' : 'Upload photo success',
        'uploadFailed' : 'Upload photo failed',
        'getPicFailed' : 'Failed to get photo ',
        'loading' : 'Loading...'
      },
    }
  }
</script>
<style>
  .popup{
    position: fixed;
  }
  .popup-overlay.modal-overlay-visible{
    visibility: hidden;
  }
</style>
