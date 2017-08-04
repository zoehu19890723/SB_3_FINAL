<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <v-content className="page-content page-background">
      <div class="mobileframe">
        <div class="wx-group">
          <ul class="wx-settings">
            <li class="wx-item">
              <SelectorItem ref="proveType" :title="$t('prove-type')" :nullable="!nullable" :avaliableArray="proveType" fieldCode="proveType" :placeholder="$t('choose-prove-type')" :defaultValue="defaultProveType"></SelectorItem>
            </li>
            <li class="wx-item">
              <TextareaItem ref="proveReason" :title="$t('prove-reason')" :nullable="nullable" :defaultV="proveReason" :dataPlaceholder="$t('input-more')" rows="10" length="300"></TextareaItem>
            </li>
            <li class="wx-item">
              <ImageItem ref="imagePhoto" :title="$t('attachment-picture')" :nullable="nullable" :photo="provePhoto" dest="proveApply"></ImageItem>
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
        this.$store.dispatch('getProveTypes');
        this.$store.commit('clearTempProveItems');
      }
    },
    beforeDestroy : function(){
      let proveTypePicker = this.$refs.proveType.picker;
      let proveReason = this.$refs.proveReason.dataValue || '';
      let proveType = undefined;
      let imageSrc = this.proveItemPhoto;

       if(!this.isPickerNull(proveTypePicker,this.$refs.proveType)){
        proveType =  (proveTypePicker.cols.length > 0 ) ? proveTypePicker.cols[0].value : proveTypePicker.value[0];
      }

      this.$store.commit('setTempProveItems',{
        type : proveType,
        reason : proveReason,
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
          title: this.$t('prove-apply')
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
        let proveTypePicker = this.$refs.proveType.picker;
        let proveReason = this.$refs.proveReason.dataValue || '';
        let imageSrc = this.provePhoto || '';//TODO
        let prove_code = null;

        if(this.isPickerNull(proveTypePicker,this.$refs.proveType)){
          f7.alert('',this.$t('enterProveType'));
          return;
        }else{
          prove_code = (proveTypePicker.cols.length > 0 ) ? proveTypePicker.cols[0].value : proveTypePicker.value[0];
          this.$store.dispatch('commitProveApply',{
            args : {
              prove_code: prove_code,
              remark: proveReason,
              attachment: imageSrc
            }
          }).then((response)=>{
              if(response.body.status === 1){
                if(parseInt(response.body.data.status) === 1){
                  let me = this;
                  f7.alert('',this.$t('proveSuc'), function() {
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
      ...mapGetters(['proveType']),

      provePhoto(){//默认附件
        return this.$store.state.moduleApply.tempProveItems.photo;
      },
      proveReason(){//默认休假原因
        return this.$store.state.moduleApply.tempProveItems.reason;
      },
      defaultProveType(){//默认休假类型
        return this.$store.state.moduleApply.tempProveItems.type;
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
        'prove-apply' : '证明申请',
        'prove-type' : '证明类型',
        'prove-reason' : '申请原因',
        'attachment-picture' : '附件图片',
        'commitButton' : '提交',
        'input-more' : '请输入...',
        'choose-prove-type' : '选择您的证明类型',
        'no-type-choose' : '您没有可选证明类型 ',
        'enterProveType' : '请填写证明类型',
        'proveSuc' : '成功提交证明申请',
        'loading' : '数据加载中...'
      },
      en: {
        'prove-apply' : 'Prove Apply',
        'prove-type' : 'Prove Type',
        'prove-reason' : 'Reason',
        'attachment-picture' : 'Attatchment',
        'commitButton' : 'Submit',
        'choose-prove-type' : 'Choose prove type.',
        'no-type-choose' : 'No prove type to choose',
        'enterProveType' : 'Please enter prove type',
        'proveSuc' : 'Succeed apply for prove ',
        'loading' : 'loading...',
        'input-more' : 'Please input...'
      },
    }
  }
</script>

<style>
</style>
