<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <v-content className="page-content page-background">
      <div class="mobileframe">
        <div class="wx-group">
          <ul class="wx-settings">
            <li class="wx-item">
              <SelectorItem ref="otType" :title="$t('ot-type-title')" :nullable="!nullable" :avaliableArray="otType" fieldCode="otType" :placeholder="$t('input-ot-type')" :changeAction="changeAction"></SelectorItem>
            </li>
            <li class="wx-item">
              <TextareaItem ref="otReson" :title="$t('overtime-reason')" :nullable="nullable" :dataPlaceholder="$t('input-more')" length="300"></TextareaItem>
            </li>
            <li class="wx-item">
              <DateSelectorItem ref="otDate" :title="$t('overtime-date')" :nullable="!nullable" fieldCode="otDate" :defaultValue="otDate" format="YYYY-MM-dd"></DateSelectorItem>
            </li>
            <li class="wx-item">
              <DateSelectorItem ref="otStartTime" :title="$t('startTime')" :nullable="!nullable" fieldCode="otStartTime" :defaultValue="otTime.start" format="hh:mm">
                {{$t('nextDay')}}
                <CheckBox ref="startNext" :checkState = 'startNext'></CheckBox>
              </DateSelectorItem>
            </li>
            <li class="wx-item">
              <DateSelectorItem ref="otEndTime" :title="$t('endTime')" :nullable="!nullable" fieldCode="otEndTime" :defaultValue="otTime.end" format="hh:mm">
                {{$t('nextDay')}}
                <CheckBox ref="endNext" :checkState = 'endNext'></CheckBox>
              </DateSelectorItem>
            </li>
            <li class="wx-item">
              <SelectorItem ref="otConvertType" :title="$t('ot-convert-type-title')" :nullable="!nullable" :avaliableArray="convertTypeArray" fieldCode="otConvertType" :placeholder="$t('input-ot-convert-type')" :defaultValue="defaultConvertType"></SelectorItem>
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
  import CheckBox from '../../components/CheckBox';
  import { mapGetters } from 'vuex';
  import NavBar from '../../components/NavBar';
  import _ from 'lodash';
  import {convertTimeValue} from '../../utils/tools';

  export default {
    created:function(){
      this.$store.dispatch('getOTTypes');
    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title:this.$t('overtime-apply')
        },
        btn : {
          text : this.$t('commitButton'),
          clx : 'weui_btn bg-red'
        },
        nullable : true,
        startNext : 0,
        endNext : 0,
        seletedOtTime : {},
        convertTypeArray : [],
        defaultConvertType : null
      }
    },
    methods : {
      doSubmit(){
        let otTypePicker = this.$refs.otType.picker;
        let otConvertPicker = this.$refs.otConvertType.picker;
        let otReson = this.$refs.otReson.dataValue || '';
        let otDate = this.$refs.otDate.inputVal.val();

        let convertype = null ;
        if(otConvertPicker !== undefined && otConvertPicker !== null){
          convertype = otConvertPicker.value[0];
          if(otConvertPicker.cols !== undefined && otConvertPicker.cols !== null && otConvertPicker.cols.length > 0){
            convertype = otConvertPicker.cols[0].value;
          }
        }

        let otStartTime = this.$refs.otStartTime.inputVal.val();
        let otEndTime = this.$refs.otEndTime.inputVal.val();
        let isNextS = this.$refs.startNext.checked ? 1: 0;
        let isNextE = this.$refs.endNext.checked ? 1 : 0;

        if(this.isPickerNull(otTypePicker)){
          f7.alert('',this.$t('input-ot-type'));
          return;
        }else if(otDate.trim() === ''){
          f7.alert('',this.$t('ot-dateNotNull'));
          return;
        }else if(otStartTime.trim() === ''){
          f7.alert('',this.$t('ot-start-timeNotNull'));
          return;
        }else if(otEndTime.trim() === ''){
          f7.alert('',this.$t('ot-end-timeNotNull'));
          return;
        }else if((!this.compareTime(otDate,otStartTime, otEndTime) && isNextS === isNextE) || isNextS > isNextE){
          f7.alert('',this.$t('startBEnd'));
          return;
        }else{
          this.$store.dispatch('commitOTApply',{
            args : {
              ot_code: otTypePicker.cols[0].value,
              ot_date: otDate,
              begin_time: otStartTime,
              next_day_start: isNextS,
              end_time: otEndTime,
              next_day_end: isNextE,
              convert_type : convertype,
              remark: otReson
            }
          }).then((response)=>{
            if(response.body.status === 1){
              let me = this;
              if (response.body.data.status === 'OK') {
                f7.alert('',me.$t('ot-succeed') + response.body.data.ot_hours + me.$t('ot-hour'), function() {
                  me.$router.back();
                });
              } else {
                f7.alert('',response.body.data.msg);
              }
            }else{
              f7.alert('',response.body.message);
            }
          });
        }
      },
      compareTime(date,begin, end) {
        let new_begin = date + ' ' + begin;
        let new_end = date + ' ' + end;
        let d1 = new Date(new_begin.replace(/\-/g, '\/'));
        let d2 = new Date(new_end.replace(/\-/g, '\/'));

        if (new_begin && new_end && d1 < d2) {
          return true;
        }else{
          return false;
        }
      },
      isPickerNull(picker){
        if(picker.cols.length === 0 || (picker.cols.length > 0 && picker.cols[0].value === null || picker.cols[0].value === '')){
          return true;
        }else{
          return false;
        }
      },
      convertTimeValue(value){
        return (value < 10) ? ('0'+value) : value;
      },
      changeAction(ot_code){
        let me = this;
        let convert = _.find(me.otType,{
          'ot_code' : ot_code
        }).convert_type;
        convert.forEach((item)=>{
          item.value = item.code;
          item.display = item.text;
        });

        me.convertTypeArray = convert;
        me.defaultConvertType = convert[0].value;
      }
    },
    computed:{
      otDate(){
        let now = new Date();
        let date = now.getFullYear() + '-' + convertTimeValue(now.getMonth()+1) + '-' + convertTimeValue(now.getDate());
        return date;
      },

      ...mapGetters(['otTime','otType']),

    },
    components: {
      VContent,
      TextareaItem,
      SubmitBtn,
      SelectorItem,
      DateSelectorItem,
      CheckBox,
      NavBar
    },

    locales: {
      zh: {
        'overtime-reason' : '加班原因',
        'overtime-date' : '加班日期',
        'nextDay' : '次日',
        'overtime-apply' : '加班申请',
        'ot-type-title' : '加班类型',
        'ot-convert-type-title' : '结转类型',
        'input-ot-type' : '选择您的加班类型',
        'input-ot-convert-type' : '选择加班结转类型',
        'ot-dateNotNull' : '加班日期不能为空',
        'ot-start-timeNotNull' : '加班开始时间不能为空',
        'ot-end-timeNotNull' : '加班结束时间不能为空',
        'ot-succeed' : '成功申请加班',
        'ot-hour' : '小时',
        'no-overtime-type-choice-text' : '您没有可选的加班类型',
        'startTime' : '开始时间',
        'endTime' : '结束时间',
        'commitButton' : '提交',
        'startBEnd' : '开始时间应该早于结束时间',
        'loading' : '数据加载中...',
        'submitting':'提交申请中...',
        'input-more' : '请输入...'
      },

      en: {
        'overtime-reason' : 'Reason',
        'overtime-date' : 'Date',
        'nextDay' : 'Next Day',
        'overtime-apply' : 'Overtime Apply',
        'ot-type-title' : 'Overtime Type',
        'ot-convert-type-title' : 'Convert Type',
        'input-ot-type' : 'Please choose your overtime type',
        'input-ot-convert-type' : 'Please choose overtime convert type',
        'ot-dateNotNull' : 'Overtime date cannot be null',
        'ot-start-timeNotNull' : 'Overtime start time cannot be null',
        'ot-end-timeNotNull' : 'Overtime end time cannot be null',
        'ot-succeed' : 'Succeed applying overtime for ',
        'ot-hour' : ' hour',
        'no-overtime-type-choice-text' : 'No OT type to choose',
        'startTime' : 'Start Time',
        'endTime' : 'End Time',
        'commitButton' : 'Submit',
        'startBEnd' : 'Start time should before end time.',
        'loading' : 'loading...',
        'submitting':'Submitting Apply...',
        'input-more' : 'Please input...'
      }
    }
  }
</script>

<style>
</style>
