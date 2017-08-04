<template>
  <div class="page">
    <NavBar :headerInfo="head" :rightEnable="rightEnable" :rightClick="changeStatus"></NavBar>
    <v-content className="page-content page-background">
      <TextareaItem ref="textContent" dataPlaceholder="请输入..." :class="[selectStatus?'disableTxt':'']" style="padding: 8px 16px;" :rows="5"> </TextareaItem>
      <div class="specPhoto">
        <ImageCardNew v-for="(item,index) in imgArray" :imgPath="item.imgPath" :imgArray = "imgPathArray" :selectStatus="selectStatus" :currentIndex="index" :deleteId="item.delete_id"></ImageCardNew>
        <ImageCardNew v-if="!selectStatus"></ImageCardNew>
      </div>
      <SubmitBtn :btnText="btn.text" :submitAction="doSubmit" :clx="btn.clx" v-if="!disableSubmit"></SubmitBtn>
    </v-content>
  </div>
</template>


<script>
  import NavBar from '../../components/NavBar';
  import CardList from '../../components/CardList';
  import ImageCardNew from '../../components/ImageCardNew';
  import SubmitBtn from '../../components/SubmitBtn';
  import VContent from '../../components/Content';
  import TextareaItem from '../../components/TextareaItem';

  export default {
    created:function(){
     this.$store.commit('setDynamicTempImageList',[]);
    },
    data() {
      return {
        btn : {
          text : this.$t('commitButton'),
          clx : 'weui_btn bg-red'
        },
        selectStatus : false,
        rightEnable : true
      };
    },
    computed: {
      imgArray(){
        return this.$store.state.moduleMy.dynamicTempImage;
      },

      imgPathArray(){
        let array = this.$store.state.moduleMy.dynamicTempImage;
        let newArr = [];
        array.forEach((item)=>{
          newArr.push(item.imgPath);
        });
        return newArr;
      },

      head(){
        if(this.imgArray.length === 0 && !this.selectStatus){
          return {
            backShow:true,
            rightShow:false,
            rightInfo:'',
            show:true,
            title: this.$t('title')
          }
        }else if(!this.selectStatus && this.imgArray.length > 0){
          return {
            backShow:true,
            rightShow:true,
            rightInfo:this.$t('choose'),
            show:true,
            title: this.$t('title')
          }
        }else{
          return {
            backShow:true,
            rightShow:true,
            rightInfo:this.$t('cancel'),
            show:true,
            title: this.$t('title')
          }
        }
      },
      disableSubmit(){
        if(!this.selectStatus){
          return false;
        }else{
          return true;
        }
      }
    },
    components: {
      NavBar,
      ImageCardNew,
      SubmitBtn,
      VContent,
      TextareaItem
    },

    methods: {
      doSubmit(){
        let value = this.$refs.textContent.dataValue || '';
        let tempArr = [];
        this.$store.state.moduleMy.dynamicTempImage.forEach((item)=>{
          tempArr.push(item.update_id);
        });

        if(value === null || value.trim() === ''){
          f7.alert('',this.$t('notNUll'));
          return false;
        }

        this.$store.commit('setMask',{show:true,text:this.$t('loadingText')});
        this.$store.dispatch('saveDynamic',{
          text : value,
          mediaArr : tempArr
        }).then((res)=>{
          this.$store.commit('hideMask');
          if(!res.body || !res.body.id){
            f7.alert('',this.$t('publishFailed'));
          }else{
            this.$store.commit('initMyDynamic');
            f7.alert('',this.$t('publishSucceed'),()=>{
              this.$router.back();
            });
          }
        })
      },
      changeStatus(){
        this.selectStatus = !this.selectStatus;
      },
    },

    locales: {
      en: {
        title: 'Create Dynamic',
        commitButton : 'Publish',
        cancel : 'Cancel',
        choose : 'Choose',
        loadingText :'Loading...',
        notNUll : 'Content can\'t be null',
        publishSucceed : 'Publish Succeed!',
        publishFailed : 'Publish Failed!'
      },

      zh: {
        title: '发布动态',
        commitButton : '发布',
        cancel : '取消',
        choose : '选择',
        loadingText : '加载中...',
        notNUll : '动态内容不能为空',
        publishSucceed : '发布成功!',
        publishFailed : '发布动态失败!'
      },
    },

  };
</script>
<style scoped>
  .specPhoto{
    display: flex;
    flex-wrap: wrap;
  }
  .disableTxt{
    pointer-events: none;
    opacity: 0.5;
  }
</style>
