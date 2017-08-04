<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <v-content className="page-content page-background">
      <div class="mobileframe">
        <div class="wx-group">
          <ul class="wx-settings">
            <li class="wx-item">
              <SelectorItem ref="punchType" :title="$t('punch-type')" :nullable="!nullable" :avaliableArray="punchType" fieldCode="punchType" :placeholder="$t('choose-punch-type')" :defaultValue="defaultPunchType" :changeAction="changePunchType" :closeAction="changeTempPunch"></SelectorItem>
            </li>
            <li class="wx-item">
              <DateSelectorItem ref="workDay" :title="$t('workDay')" :nullable="!nullable" fieldCode="workDay" :placeholder="$t('date')" format="YYYY-MM-dd" :defaultValue="defaultWorkDay" :closeAction="changeTempPunch">
              </DateSelectorItem>
            </li>
            <li class="wx-item disable">
              <TextItem ref="workType" :title="$t('workType')" :nullable="!nullable" :defaultV="defaultWorkType" :dataPlaceholder = "$t('workType')"></TextItem>
            </li>
            <li :class="['wx-item',disableItem?'disable':'']">
              <DateSelectorItem ref="punchDate" :title="$t('punchDate')" :nullable="!nullable" fieldCode="punchDate" :placeholder="$t('date')" format="YYYY-MM-dd" :defaultValue="defaultPunchDate">
              </DateSelectorItem>
            </li>
            <li :class="['wx-item',disableItem?'disable':'']">
              <DateSelectorItem ref="punchTime" :title="$t('punchTime')" :nullable="!nullable" fieldCode="punchTime" :placeholder="$t('punchTime')" format="hh:mm" :defaultValue="defaultPunchTime">
              </DateSelectorItem>
            </li>
            <CheckboxItem :class="[disableItem?'disable':'']" :text="flagText" ref="outinFlag" :title="$t('outinFlag')" :nullable="!nullable" :checkState="defaultOutinFlag" :changeAction="changeFlag"></CheckboxItem>
            <li class="wx-item">
              <ImageItem ref="imagePhoto" :title="$t('attachment-picture')" :nullable="nullable" :photo="punchPhoto" dest="punchApply"></ImageItem>
            </li>
            <li class="wx-item">
              <TextareaItem ref="punchReson" :title="$t('punch-reason')" :nullable="nullable" :defaultV="punchReason" :dataPlaceholder="$t('input-more')" length="300"></TextareaItem>
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
  import DateSelectorItem from '../../components/DateSelectorItem';
  import ImageItem from '../../components/ImageItem';
  import { mapGetters } from 'vuex';
  import NavBar from '../../components/NavBar';
  import {convertTimeValue} from '../../utils/tools';
  import CheckboxItem from '../../components/CheckboxItem';
  import TextItem from '../../components/TextItem';

  export default {
    created:function(){
      let clean = this.$route.query.clean;
      let id = this.$route.query.id;
      if(clean){
        this.$store.dispatch('getPunchType');
        if(id){
          this.$store.commit('clearTempNoteItems');
          this.$store.dispatch('getRecordDetail',{id:id});
        }else{
          this.$store.commit('clearTempPunchApplyItems');
        }
      }
    },
    beforeDestroy : function(){
      let punchTypePicker = this.$refs.punchType.picker;
      let workDay = this.$refs.workDay.inputVal.val() || '';
      let punchDate = this.$refs.punchDate.inputVal.val() || '';
      let workType = this.punchData.workType;
      let punchTime = this.$refs.punchTime.dataValue;
      let outinFlag =  this.$refs.outinFlag.checked ? 1 : 0;
      let punchReson = this.$refs.punchReson.dataValue || '';
      let imageSrc = this.punchPhoto;
      let punchType = null;

      if(!this.isPickerNull(punchTypePicker,this.$refs.punchType)){
        punchType =  (punchTypePicker.cols.length > 0 ) ? punchTypePicker.cols[0].value : punchTypePicker.value[0];
      }

      this.$store.commit('setTempPunchItems',{
        punchType : punchType,
        workDay : workDay,
        punchDate : punchDate,
        workType : workType,
        punchTime : punchTime,
        signinFlag : outinFlag,
        reason : punchReson,
        photo : imageSrc
      })
    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title: this.$t('punch-apply')
        },
        btn : {
          text : this.$t('commitButton'),
          clx : 'weui_btn bg-red'
        },
        nullable : true,
        disableItem : true,
        siginState : null,
        punchData : {},
      }
    },
    methods : {
      doSubmit(){
        let punchTypePicker = this.$refs.punchType.picker;
        let workDay = this.$refs.workDay.inputVal.val() || '';
        let punchDate = this.$refs.punchDate.inputVal.val() || '';
        let workType = this.punchData.workType || this.$store.state.moduleAttend.tempPunchItems.workType;
        let punchTime = this.$refs.punchTime.dataValue;
        let outinFlag =  this.$refs.outinFlag.checked ? 1 : 0;
        let punchReson = this.$refs.punchReson.dataValue || '';
        let imageSrc = this.punchPhoto;
        let punchType = null;

        if(!this.isPickerNull(punchTypePicker,this.$refs.punchType)){
          punchType =  (punchTypePicker.cols.length > 0 ) ? punchTypePicker.cols[0].value : punchTypePicker.value[0];
        }else{
          f7.alert('',this.$t('enterPunchType'));
          return;
        }
        if(workDay === null || workDay === ''){
          f7.alert('',this.$t('enterWorkDay'));
          return;
        }

        if(punchDate === null || punchDate === ''){
          f7.alert('',this.$t('enterPunchDate'));
          return;
        }

        if(workType === null || workType === ''){
          f7.alert('',this.$t('enterWorkType'));
          return;
        }

        if(punchTime === null || punchTime === ''){
          f7.alert('',this.$t('enterPunchTime'));
          return;
        }

        this.$store.dispatch('applyPunch',{
          args : {
              punch_code : punchType,
              punch_date : punchDate,
              work_type : workType.code,
              punch_time : punchTime,
              signFlag : outinFlag,
              attenchment : imageSrc || '',
              reason : punchReson,
              work_day : workDay
          }
        }).then((response)=>{
            if(response.body.status === 1){
              let me = this;
              if (response.body.data.status === 'OK') {
                f7.alert('',me.$t('punchSuc'), function() {
                  me.$router.back();
                });
              } else {
                f7.alert('',response.body.data.message);
              }
            }else{
              f7.alert('',response.body.message);
            }
          })
      },

      isPickerNull(picker,type){
        if((type.dataValue === '' || picker.value.length === 0 ) && (picker.cols.length === 0 || (picker.cols.length > 0 && picker.cols[0].value === null || picker.cols[0].value === ''))){
          return true;
        }else{
          return false;
        }
      },
      isNumber(str){
        let reg = /^\+?[1-9][0-9]*$/;
        if(!reg.test(str)){
          return false;
        }else{
          return true;
        }
      },
      changePunchType(type){
        if(parseInt(type) === 3){
          this.disableItem = false;
        }else{
          this.disableItem = true;
        }
      },
      changeTempPunch(){
        let punchTypePicker = this.$refs.punchType.picker;
        let punchType = null;
        let workDay = this.$refs.workDay.inputVal.val() || null;

        if(!this.isPickerNull(punchTypePicker,this.$refs.punchType)){
          punchType =  (punchTypePicker.cols.length > 0 ) ? punchTypePicker.cols[0].value : punchTypePicker.value[0];
        }

        if(!punchType || !workDay){
          return;
        }else{
          this.$store.dispatch('getPunchData',{
            type : punchType,
            date : workDay
          }).then((res) =>{
            this.punchData = res;
          })
        }
      },
      changeFlag(state){
        this.siginState = parseInt(state);
      }
    },
    computed:{
      ...mapGetters(['punchType']),

      defaultPunchType(){//默认类型
        let defaultType = this.$store.state.moduleAttend.tempPunchItems.punchType;
        if(parseInt(defaultType) === 3){
          this.disableItem = false;
        }else{
          this.disableItem = true;
        }

        if(defaultType){
          return defaultType.toString();
        }else{
          return undefined;
        }

      },
      defaultPunchDate(){
        if(this.punchData && this.punchData.punchDate){
          return this.punchData.punchDate;
        }else{
          let defaultDate = this.$store.state.moduleAttend.tempPunchItems.punchDate;
          if(defaultDate){
            return defaultDate;
          }else{
            let date = new Date();
            return date.getFullYear()+ '-'+convertTimeValue(date.getMonth()+1) +'-'+convertTimeValue(date.getDate());
          }
        }
      },
      defaultWorkType(){
        if(this.punchData && this.punchData.workType){
          return this.punchData.workType.name;
        }else{
          let defaultType = this.$store.state.moduleAttend.tempPunchItems.workType;
          if(defaultType){
            return defaultType.name;
          }else{
            return null;
          }
        }
      },
      defaultPunchTime(){
        if(this.punchData && this.punchData.punchTime){
          return this.punchData.punchTime;
        }else{
          let defaultTime = this.$store.state.moduleAttend.tempPunchItems.punchTime;
          if(defaultTime){
            return defaultTime;
          }else{
            let date = new Date();
            return convertTimeValue(date.getHours())+ ':'+convertTimeValue(date.getMinutes());
          }
        }
      },
      defaultOutinFlag(){
        if(this.punchData && this.punchData.signFlag){
          return this.punchData.signFlag;
        }else{
          let flag = this.$store.state.moduleAttend.tempPunchItems.signinFlag;
          return flag;
        }
      },
      punchPhoto(){
        let photo = this.$store.state.moduleAttend.tempPunchItems.photo;
        return photo;
      },
      punchReason(){
        let reason = this.$store.state.moduleAttend.tempPunchItems.reason;
        return reason;
      },
      flagText(){
        if(this.siginState !== null){
          return (this.siginState === 0) ? this.$t('in') : this.$t('out');
        }else{
          if((this.defaultOutinFlag && this.defaultOutinFlag === 0 )|| (this.punchData.signFlag === 0)){
            return this.$t('in');
          }else if((this.defaultOutinFlag && this.defaultOutinFlag === 1 )|| (this.punchData.signFlag === 1)){
            return this.$t('out');
          }else{
            return '';
          }
        }
      },

      defaultWorkDay(){
        let workday = this.$store.state.moduleAttend.tempPunchItems.workDay;
        if(workday){
          return workday;
        }else{
          let date = new Date();
          return date.getFullYear()+ '-'+convertTimeValue(date.getMonth()+1) +'-'+convertTimeValue(date.getDate());
        }
      }
    },
    components: {
      VContent,
      TextareaItem,
      SubmitBtn,
      SelectorItem,
      DateSelectorItem,
      ImageItem,
      NavBar,
      CheckboxItem,
      TextItem
    },

    locales: {
      zh: {
        'punch-apply' : '补打卡申请',
        'punch-type' : '补打卡类型',
        'punch-reason' : '原因',
        'attachment-picture' : '附件图片',
        'punchDate' : '打卡日期',
        'workType' : '日班次类型',
        'punchTime' : '打卡时间',
        'outinFlag' : '进出标志',
        'commitButton' : '提交',
        'input-more' : '请输入',
        'choose-punch-type' : '选择您的补打卡类型',
        'no-type-choose' : '您没有可选补打卡类型 ',
        'enterPunchType' : '请填写补打卡类型',
        'enterPunchDate' : '打卡日期不能为空',
        'enterWorkType' : '日班次类型不能为空',
        'enterPunchTime' : '打卡时间不能为空',
        'punchSuc' : '成功提交补打卡申请',
        'loading' : '数据加载中...',
        'submitting':'提交申请中...',
        'date' : '日期',
        'input-more' : '请输入...',
        'in' :'进',
        'out' :'出',
        'workDay' : '工作日',
        'enterWorkDay' : '工作日不能为空'
      },

      en: {
        'punch-apply' : 'Punch Apply',
        'punch-type' : 'Punch Type',
        'punch-reason' : 'Reason',
        'attachment-picture' : 'Attachment',
        'punchDate' : 'Punch Date',
        'workType' : 'Day shift Type',
        'outinFlag' : 'Signin Status',
        'punchTime' : 'Punch Time',
        'commitButton' : 'Submit',
        'input-more' : 'Please enter',
        'choose-punch-type' : 'Choose punch type.',
        'no-type-choose' : 'No leave type to choose',
        'enterPunchType' : 'Please enter punch type',
        'enterPunchDate' : 'Punch date cannot be null',
        'enterWorkType' : 'Work type cannot be null',
        'enterPunchTime' : 'Punch time cannot be null',
        'punchSuc' : 'Succeed apply for punch ',
        'loading' : 'loading...',
        'submitting':'Submitting Apply...',
        'day' : ' days',
        'date' : 'Date',
        'input-more' : 'Please input...',
        'in' :'in',
        'out' :'out',
        'workDay' : 'Work Day',
        'enterWorkDay' : 'Work day cannot be null'
      },
    }
  }
</script>

<style scoped>
li.disable{
  opacity: 0.6;
  pointer-events: none;
}
</style>
