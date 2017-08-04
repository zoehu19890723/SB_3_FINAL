<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <v-content className="page-content page-background">
      <div class="mobileframe">
        <div class="wx-group">
          <ul class="wx-settings">
            <li class="wx-item">
              <SelectorItem ref="generalType" :title="$t('general-type')" :nullable="!nullable" :avaliableArray="generalType" fieldCode="generalType" :placeholder="$t('choose-general-type')" :defaultValue="defaultGeneralType"></SelectorItem>
            </li>
            <li class="wx-item">
              <TextareaItem ref="generalReason" :title="$t('general-reason')" :nullable="nullable" :defaultV="generalReason" :dataPlaceholder="$t('input-more')" rows="10" length="300"></TextareaItem>
            </li>
            <li class="wx-item">
              <ImageItem ref="imagePhoto" :title="$t('attachment-picture')" :nullable="nullable" :photo="generalPhoto" dest="generalApply"></ImageItem>
            </li>
          </ul>
        </div>
        <SubmitBtn :btnText="btn.text" :submitAction="doSubmit" :clx="btn.clx"></SubmitBtn>
      </div>
    </v-content>
  </div>
</template>

<script>
  import VContent from '../../components/Content';
  import TextareaItem from '../../components/TextareaItem';
  import SubmitBtn from '../../components/SubmitBtn';
  import SelectorItem from '../../components/SelectorItem';
  import ImageItem from '../../components/ImageItem';
  import { mapGetters } from 'vuex';
  import NavBar from '../../components/NavBar';

  export default {
    created:function(){
      let from = this.$route.query.from || null;
      if(from === undefined || from === null ){
        this.$store.commit('clearTempGeneralItems');
        this.$store.dispatch('getGeneralTypes');
      }
    },
    beforeDestroy : function(){
      let generalTypePicker = this.$refs.generalType.picker;
      let generalReason = this.$refs.generalReason.dataValue || '';
      let generalType = undefined;
      let imageSrc = this.generalItemPhoto;

       if(!this.isPickerNull(generalTypePicker,this.$refs.generalType)){
        generalType =  (generalTypePicker.cols.length > 0 ) ? generalTypePicker.cols[0].value : generalTypePicker.value[0];
      }

      this.$store.commit('setTempGeneralItems',{
        type : generalType,
        reason : generalReason,
        photo : imageSrc,
      })
    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title: this.$t('general-apply')
        },
        btn : {
          text : this.$t('commitButton'),
          clx : 'weui_btn bg-red'
        },
        nullable : true
      }
    },
    methods : {
      doSubmit(){
        let generalTypePicker = this.$refs.generalType.picker;
        let generalReason = this.$refs.generalReason.dataValue || '';
        let imageSrc = this.generalPhoto || '';//TODO
        let general_code = null;

        if(this.isPickerNull(generalTypePicker,this.$refs.generalType)){
          f7.alert('',this.$t('enterGeneralType'));
          return;
        }else{
          general_code = (generalTypePicker.cols.length > 0 ) ? generalTypePicker.cols[0].value : generalTypePicker.value[0];
          this.$store.dispatch('commitGeneralApply',{
            args : {
              general_code: general_code,
              remark: generalReason,
              attachment: imageSrc
            }
          }).then((response)=>{
              if(response.body.status === 1){
                if(parseInt(response.body.data.status) === 1){
                  let me = this;
                  f7.alert('',this.$t('generalSuc'), function() {
                    me.$router.back();
                  });
                }else{
                  f7.alert('',response.body.data.message);
                }
              }else{
                f7.alert('',response.body.message);
              }
            },(error)=>{
              f7.alert(error);
            });
          }
      },

      isPickerNull(picker,type){
        if((type.dataValue === '' || picker.value.length === 0 ) && (picker.cols.length === 0 || (picker.cols.length > 0 && picker.cols[0].value === null || picker.cols[0].value === ''))){
          return true;
        }else{
          return false;
        }
      }
    },
    computed:{
      ...mapGetters(['generalType']),

      generalPhoto(){//默认附件
        return this.$store.state.moduleApply.tempGeneralItems.photo;
      },
      generalReason(){//默认休假原因
        return this.$store.state.moduleApply.tempGeneralItems.reason;
      },
      defaultGeneralType(){//默认休假类型
        return this.$store.state.moduleApply.tempGeneralItems.type;
      }
    },
    components: {
      VContent,
      TextareaItem,
      SubmitBtn,
      SelectorItem,
      ImageItem,
      NavBar,
    },

    locales: {
      zh: {
        'general-apply' : '通用申请',
        'general-type' : '申请类型',
        'general-reason' : '申请原因',
        'attachment-picture' : '附件图片',
        'commitButton' : '提交',
        'input-more' : '请输入...',
        'choose-general-type' : '选择您的申请类型',
        'no-type-choose' : '您没有可选申请类型 ',
        'enterGeneralType' : '请填写申请类型',
        'generalSuc' : '成功提交通用申请',
        'loading' : '数据加载中...'
      },
      en: {
        'general-apply' : 'General Apply',
        'general-type' : 'Apply Type',
        'general-reason' : 'Reason',
        'attachment-picture' : 'Attatchment',
        'commitButton' : 'Submit',
        'choose-general-type' : 'Choose apply type.',
        'no-type-choose' : 'No apply type to choose',
        'enterGeneralType' : 'Please enter apply type',
        'generalSuc' : 'Succeed apply for general ',
        'loading' : 'loading...',
        'input-more' : 'Please input...'
      },
    }
  }
</script>

<style>
</style>
