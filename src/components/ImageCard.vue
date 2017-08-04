<template>
  <div class="imgCard" >
    <div @click="openImage" v-if="showImg">
      <img :src="accessPath+showImgPath" class="imgClass" />
      <div class="mask" v-if="selectPointdImg">
        <i class="f7-icons select">check_round_fill</i>
      </div>
      <div class="forbiddenMask" v-if="permission < 2 && selectStatus">
        <i class="icon iconfont icon-forbidden"></i>
      </div>
    </div>
    <div class="select-img-card" @click="getImage" v-if="!showImg">
      <i class="f7-icons add">add</i>
    </div>
    <div v-if="imgText !== null" class="imgText">{{imgText}}</div>
  </div>
</template>
 
<script>
  import {APP_ENV_NOW} from '../config';
  import {getRandomNumber} from '../utils/tools';

  export default {
    name: 'ImageCard',
    props: {
      imgText:{
        type: String,
        default: null
      },
      imgPath : {
        type : String,
        default : null
      },
      imgArray : null,
      currentIndex : {
        type : Number,
        default : 0
      },
      selectStatus :{
        type: Boolean,
        default: false
      },
      permission :{//读写权限，0-只读，1-可改，2-可删
        type: Number,
        default: 1
      },
      groupId : {
        type : String,
        default : null
      },
      groupName : {
        type : String,
        default : null
      }
    },
    data() {
      return{
        select : false,
        showImgPath : this.imgPath,
        accessPath : APP_ENV_NOW.WSIMG
      }
    },
    computed:{
      showImg(){
        if(this.showImgPath !== undefined && this.showImgPath !== null &&  this.showImgPath !== ''){
          return true;
        }else{
          return false;
        }
      },
      selectPointdImg(){
        if(this.selectStatus === false){
          this.select = false;
        }
        if(this.select === true && this.selectStatus === true){
          return true;
        }else{
          return false;
        }
      }
    },
    methods: {
      openImage(){
        if(this.permission === 1 && this.selectStatus === false){//可改，非选中
          let buttons1 = [
          {
            text: this.$t('updateImg'),
            label: true
          },{
              text: this.$t('camera'),
              onClick: this.photograph,
          },{
              text: this.$t('photo'),
              onClick: this.accesstoPhone
          }];
          let buttons2 = [
            {
                text: this.$t('cancel'),
                color: 'red'
            }];
          let groups = [buttons1, buttons2];
          f7.actions(groups);
        }else if((this.permission === 0 || this.permission === 2) && this.selectStatus === false){//只读，可删未选中 
          let dataArray = [];
          this.imgArray.forEach(
            (item)=>{
              dataArray.push(this.accessPath + item.path);
            });
            let myPhotoBrowser = f7.photoBrowser({
              zoom: true,
              photos: dataArray,
              initialSlide : this.currentIndex,
              toolbar : false,
              swipeToClose : false,
              backLinkText : this.$t('close')
            });   
            myPhotoBrowser.open();
        }else if(this.permission === 2 && this.selectStatus === true){//可删，选中状况下
          this.select = !this.select;
          this.$store.commit('setCheckedImg',this.showImgPath);
        }else{//只读，只改，选中状况下
          //TODO nothing
        }
      },
      
      getImage(){
        let buttons1 = [
          {
            text : this.$t('addImg'),
            label: true
          },{
              text: this.$t('camera'),
              onClick: this.photograph,
          },{
              text: this.$t('photo'),
              onClick: this.accesstoPhone,
          }];
        let buttons2 = [
          {
              text: this.$t('cancel'),
              color: 'red'
          }];
        let groups = [buttons1, buttons2];
        f7.actions(groups);
      },

      savePhoto(imgUrl){
        let me = this;
        if (imgUrl === "") {
          f7.alert('',me.$t('noImg'));
        }else {
          let uploadPath = localStorage.getItem('westar_image_address') || '/system/EFile/photoUpload/';
          let serviceURL = encodeURI(APP_ENV_NOW.WS + uploadPath);
          let options = new FileUploadOptions();
          options.fileKey = "photo";
          options.fileName = imgUrl.substring(imgUrl.lastIndexOf('/') + 1,imgUrl.lastIndexOf('.'))+getRandomNumber()+imgUrl.substr(imgUrl.lastIndexOf('.'));
          options.mimeType = "image/jpeg";

          let ft = new FileTransfer();
          // 上传回调
          me.$store.commit('setMask',{show:true,text:me.$t('loading')});
          ft.upload(imgUrl, serviceURL, function(data) {
            me.$store.commit('hideMask');
            let phoneSRC = JSON.parse(data.response).result.filePath;
            let updateObj = {
              path : phoneSRC,
              groupid : me.groupId,
              group_name : me.groupName
            }
            if(me.groupId.indexOf('shenfenzheng')>-1){
              me.showImgPath = phoneSRC;
            }
            me.$store.commit('setUploadImg',updateObj);
          }, function() {
            f7.alert('',me.$t('uploadFailed'));
          }, options);
        }
      },
      onPhotoUrlSuccess(data){
        let src = data.lastIndexOf('?') > 0 ? data.substring(0, data.lastIndexOf('?')) : data;
        this.savePhoto(src);
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
            targetWidth: 600, 
            targetHeight: 800,
            correctOrientation: false
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
              targetWidth: 600,
              targetHeight: 800,
              mediaType: Camera.MediaType.PICTURE
          })
      }
    },
    components: {
    },
    locales: {
      zh: {
        'close' : '关闭',
        'camera' : '拍照',
        'photo' : '从手机相册选择',
        'cancel' : '取消',
        'addImg' : '添加照片',
        'updateImg' : '修改照片',
        'noImg' : '没有可上传的图片',
        'uploadSuccess' : '上传图片成功',
        'uploadFailed' : '上传图片失败',
        'getPicFailed' : '获取图片失败',
        'loading' : '数据加载中...',
        'shenfenzheng' : '身份证正面',
        'shenfenzheng_back' : '身份证反面',
      },

      en: {
        'close' : 'Close',
        'camera' : 'From Camera',
        'photo' : 'From Album',
        'cancel' : 'Cancel',
        'addImg' : 'Add Photo',
        'updateImg' : 'Update Photo',
        'noImg' : 'No image to upload',
        'uploadSuccess' : 'Upload photo success',
        'uploadFailed' : 'Upload photo failed',
        'getPicFailed' : 'Failed to get photo ',
        'loading' : 'Loading...',
        'shenfenzheng' : 'shenfenzheng_front',
        'shenfenzheng_back' : 'shenfenzheng_back',
      }
    }
  }
</script>

<style scoped>
  .imgCard{
    padding: 0px 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100px;
    height: auto;
    align-items: center;
    position: relative;
    margin-bottom: 20px;
  }
  .select-img-card{
    border: 2px dashed #cecece;
    width: 86px;
    height: 116px;
    align-items: center;
    display: flex;
    justify-content: center;
    margin-bottom: 5px;
  }
  .f7-icons.add{
    font-size: 48px;
  }
  .f7-icons.select{
    font-size: 16px;
    color : rgb(0,122,255);
  }
  .mask{
    position: absolute;
    z-index: 1;
    background: rgba(215,215,215,0.2);
    width: 90px;
    height: 120px;
    top: 0px;
    display: flex;
    align-items: flex-end;
  }
  .imgClass{
    width: 90px;
    height: 120px;
  }
  .imgText{
  }
  .forbiddenMask{
    position: absolute;
    z-index: 1;
    background: rgba(215,215,215,0.5);
    width: 90px;
    height: 120px;
    top: 0px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
  .forbiddenMask .icon{
    color : rgba(255, 0, 0, 0.6)!important;
  }
</style>
