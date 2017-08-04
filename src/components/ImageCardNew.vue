<template>
  <div class="imgCard" >
    <div @click="openImage" v-if="showImg">
      <img :src="showImgPath" class="imgClass" />
      <div class="mask" v-if="selectStatus">
        <i class="f7-icons select">close_round_fill</i>
      </div>
    </div>
    <div class="select-img-card" @click="getImage" v-if="!showImg">
      <i class="f7-icons add">add</i>
    </div>
  </div>
</template>
 
<script>
  export default {
    name: 'ImageCardNew',
    props: {
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
      deleteId :{
        type : [String,Number],
        default : null
      }
    },
    data() {
      return{
        showImgPath : this.imgPath,
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
    },
    methods: {
      openImage(){
        if(this.selectStatus === false){
          let myPhotoBrowser = f7.photoBrowser({
            zoom: true,
            photos: this.imgArray,
            initialSlide : this.currentIndex,
            toolbar : false,
            swipeToClose : false,
            backLinkText : this.$t('close')
          });   
          myPhotoBrowser.open();
        }else{
          f7.confirm('',this.$t('deleteConfirm'),()=>{
            this.$store.commit('setMask',{show:true,text:this.$t('loading')});
            this.$store.dispatch('deleteDynamicImage',this.deleteId).then((res)=>{
              this.$store.commit('hideMask');
              if(!res){
                f7.alert('',this.$t('deleteFailed'));
              }
            });
          })
        }
      },
      
      getImage(){
        let buttons1 = [
          {
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

      onPhotoUrlSuccess(data){
        this.$store.commit('setMask',{show:true,text:this.$t('loading')});
        this.$store.dispatch('addDynamicImage',data).then((response)=>{
          this.$store.commit('hideMask');
          if(!response){
            f7.alert('',this.$t('uploadFailed'));
          }
        });
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
            destinationType: Camera.DestinationType.DATA_URL,
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
              destinationType: Camera.DestinationType.DATA_URL,
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
        'deleteConfirm' : '要删除这张照片吗？',
        'loading' : '加载中...',
        'deleteFailed' : '删除失败，请重试'
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
        'deleteConfirm' : 'Are you sure to delete this picture?',
        'loading' : 'Loading...',
        'deleteFailed' : 'Delete failed,please try again'
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
    font-size: 24px;
    color: red;
    margin-right: -8px;
    margin-top: -8px;
    background: white;
    height: 24px;
    border-radius: 50%;
  }
  .mask{
    position: absolute;
    z-index: 1;
    background: rgba(215,215,215,0.2);
    width: 90px;
    height: 120px;
    top: 0px;
    display: flex;
    justify-content: flex-end;
  }
  .imgClass{
    width: 90px;
    height: 120px;
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


