<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <v-content className="page-content page-background">
      <div class="mobileframe">
        <div class="wx-group">
          <ul class="wx-settings">
            <li class="wx-item">
              <SelectorItem ref="leaveType" :title="$t('leave-type')" :nullable="!nullable" :avaliableArray="vacationType" fieldCode="leaveType" :placeholder="$t('choose-leave-type')" :defaultValue="defaultLeaveType" :changeAction="changeLeaveType"></SelectorItem>
            </li>
            <!-- 省份选项（婚假，产假，陪产假） -->
            <li class="wx-item" v-if="hasProvince">
              <SelectorItem ref="province" :title="$t('province')" :nullable="!nullable" :avaliableArray="provinceArray" fieldCode="province" :placeholder="$t('province')" :defaultValue="defaultProvince"></SelectorItem>
            </li>
            <!-- 亲属选项（丧假） -->
            <li class="wx-item" v-if="hasRelationship">
              <SelectorItem ref="relation" :title="$t('relationType')" :nullable="!nullable" :avaliableArray="relationshipArray" fieldCode="relation" :placeholder="$t('relationType')" :defaultValue="defaultRelation"></SelectorItem>
            </li>
            <!-- 登记日期选项（婚假） ，是否再婚-->
            <li class="wx-item" v-if="hasMarriageDate">
              <DateSelectorItem ref="marriageDate" :title="$t('marriageDate')" :nullable="!nullable" fieldCode="marrageDate" :placeholder="$t('date')" format="YYYY-MM-dd" :defaultValue="defaultMarriageDate">
                {{$t('remarriage')}}
                <CheckBox ref="remarriage" :checkState = 'defaultRemarriageState'></CheckBox>
              </DateSelectorItem>
            </li>
            <!-- 产假选项（产假） -->
            <li class="wx-item" v-if="hasMaternityType">
              <SelectorItem ref="maternityType" :title="$t('maternityType')" :nullable="!nullable" :avaliableArray="maternityTypeArray" fieldCode="maternityType" :placeholder="$t('maternityType')" :changeAction="changeMaternityType" :defaultValue="defaultMaternityType"></SelectorItem>
            </li>
            <!-- 正产产假相关选项（产假） -->
            <CheckboxItem ref="dystocia" v-if="isCommonMaternity === 1" :title="$t('dystocia')" :nullable="!nullable" :checkState="defaultDystocia"></CheckboxItem>
            <CheckboxItem ref="multipleBirths" v-if="isCommonMaternity === 1" :title="$t('multipleBirths')" :nullable="!nullable" :checkState="defaultMultipleBirths" :changeAction="changeBirthCount"></CheckboxItem>
            <li class="wx-item" v-if="showMultipleBirths">
              <SelectorItem ref="birthCount" :title="$t('birthCount')" :nullable="!nullable" :avaliableArray="birthCountArray" fieldCode="birthCount" :placeholder="$t('birthCount')" :defaultValue="defaultBirthCount"></SelectorItem>
            </li>
            <CheckboxItem ref="lateChildbirth" v-if="isCommonMaternity === 1" :title="$t('lateChildbirth')" :nullable="!nullable" :checkState="defaultLateChildbirth"></CheckboxItem>
            <!-- 流产相关选项（产假） -->
            <TextItem ref="gestationDay" v-if="isCommonMaternity === 2" :title="$t('gestationDay')" :nullable="!nullable" :dataPlaceholder="$t('gestationDay')" :defaultV="defaultGestationDay"></TextItem>
            <!-- 公共选项 -->
            <li class="wx-item">
              <TextareaItem ref="leaveReson" :title="$t('leave-reason')" :nullable="nullable" :defaultV="leaveItemReason" :dataPlaceholder="$t('input-more')" length="300"></TextareaItem>
            </li>
            <li class="wx-item">
              <ImageItem ref="imagePhoto" :title="$t('attachment-picture')" :nullable="nullable" :photo="leaveItemPhoto"></ImageItem>
            </li>
            <li class="wx-item">
              <DateSelectorItem ref="leaveStartTime" :title="$t('startTime')" :nullable="!nullable" fieldCode="leaveStartTime" :defaultValue="defaultStart"></DateSelectorItem>
            </li>
            <li class="wx-item">
              <DateSelectorItem ref="leaveEndTime" :title="$t('endTime')" :nullable="!nullable" fieldCode="leaveEndTime" :defaultValue="defaultEnd"></DateSelectorItem>
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
  import CheckBox from '../../components/CheckBox';
  import CheckboxItem from '../../components/CheckboxItem';
  import TextItem from '../../components/TextItem';

  export default {
    created:function(){
      let from = this.$route.query.from || null;
      if(from === undefined || from === null ){
        this.$store.dispatch('getLeaveTypes');
        this.$store.commit('clearTempLeaveApplyItems');
      }
    },
    beforeDestroy : function(){
      let leaveTypePicker = this.$refs.leaveType.picker;
      let leaveReson = this.$refs.leaveReson.dataValue || '';
      let leaveStartTime = this.$refs.leaveStartTime.inputVal.val();
      let leaveEndTime = this.$refs.leaveEndTime.inputVal.val();
      let leaveType = undefined;
      let imageSrc = this.leaveItemPhoto;
      let additionalField = {}

      if(!this.isPickerNull(leaveTypePicker,this.$refs.leaveType)){
        leaveType =  (leaveTypePicker.cols.length > 0 ) ? leaveTypePicker.cols[0].value : leaveTypePicker.value[0];
      }

      if(leaveType === 'FuneralLeave'){//丧假
        let relationPicker = this.$refs.relation.picker;
        let relationValue = (relationPicker.cols.length > 0 ) ? relationPicker.cols[0].value : relationPicker.value[0];
        additionalField.relationShip = this.isPickerNull(relationPicker,this.$refs.relation) ? undefined : parseInt(relationValue);
      }
      if(leaveType === 'MarriageLeave' || leaveType === 'MaternityLeave' || leaveType === 'AccompanyMaternityLe'){
        //省份
        let provincePicker = this.$refs.province.picker;
        let provinceValue = (provincePicker.cols.length > 0 ) ? provincePicker.cols[0].value : provincePicker.value[0];
        additionalField.province = this.isPickerNull(provincePicker,this.$refs.province) ? undefined : provinceValue;

        if(leaveType === 'MarriageLeave'){//婚假
          additionalField.marriageDate = this.$refs.marriageDate.inputVal.val();
          additionalField.remarriage = this.$refs.remarriage.checked ? 1 : 0;
        }

        if(leaveType === 'MaternityLeave'){//产假
          let maternityTypePicker = this.$refs.maternityType.picker;
          let maternityTypeValue = (maternityTypePicker.cols.length > 0 ) ? maternityTypePicker.cols[0].value : maternityTypePicker.value[0];
          additionalField.maternityType = this.isPickerNull(maternityTypePicker,this.$refs.maternityType) ? undefined : parseInt(maternityTypeValue);
          if(parseInt(additionalField.maternityType) === 1){//流产
            additionalField.gestationDay = this.$refs.gestationDay.dataValue;
          }
          if(parseInt(additionalField.maternityType) === 0){
            additionalField.dystocia = this.$refs.dystocia.checked ? 1 : 0;
            additionalField.multipleBirths = this.$refs.multipleBirths.checked ? 1 : 0;
            additionalField.lateChildbirth = this.$refs.lateChildbirth.checked ? 1 : 0;

            if(additionalField.multipleBirths === 1){
              let birthCountPicker = this.$refs.birthCount.picker;
              let birthCount = (birthCountPicker.cols.length > 0 ) ? birthCountPicker.cols[0].value : birthCountPicker.value[0];
              additionalField.birthCount = this.isPickerNull(birthCountPicker,this.$refs.birthCount) ? undefined : parseInt(birthCount);
            }
          }
        }
      }

      this.$store.commit('setTempLeaveApplyItems',{
        leaveType : leaveType,
        leaveReson : leaveReson,
        leaveStartTime : leaveStartTime,
        leaveEndTime : leaveEndTime,
        photo : imageSrc,
        additionalField : additionalField
      })
    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title: this.$t('leave-apply')
        },
        btn : {
          text : this.$t('commitButton'),
          clx : 'weui_btn bg-red'
        },
        nullable : true,
        selectedLeaveType : '',
        relationshipArray : [{
          value : 0,
          display : this.$t('linealRelatives')
        },{
          value : 1,
          display : this.$t('NonLinealRelatives')
        }],
        maternityTypeArray :[{
          value : 0,
          display : this.$t('normalBirth')
        },{
          value : 1,
          display : this.$t('abortion')
        }],
        isMultipleBirths : 0,
        maternityType : '',
        birthCountArray:[{
          value : 2,
          display : 2
        },{
          value : 3,
          display : 3
        },{
          value : 4,
          display : 4
        },{
          value : 5,
          display : 5
        },{
          value : 6,
          display : 6
        },{
          value : 7,
          display : 7
        },{
          value : 8,
          display : 8
        },{
          value : 9,
          display : 9
        }],
      }
    },
    methods : {
      doSubmit(){
        let leaveTypePicker = this.$refs.leaveType.picker;
        let leaveReson = this.$refs.leaveReson.dataValue || '';
        let imageSrc = this.leaveItemPhoto || '';//TODO
        let leaveStartTime = this.$refs.leaveStartTime.inputVal.val();
        let leaveEndTime = this.$refs.leaveEndTime.inputVal.val();
        let leave_code = null;
        let otherAttrs = {};

        if(this.isPickerNull(leaveTypePicker,this.$refs.leaveType)){
          f7.alert('',this.$t('enterLeaveType'));
          return;
        }else{
          leave_code = (leaveTypePicker.cols.length > 0 ) ? leaveTypePicker.cols[0].value : leaveTypePicker.value[0];
          if(leave_code === 'FuneralLeave'){//丧假
            let relationPicker = this.$refs.relation.picker;
            if(this.isPickerNull(relationPicker,this.$refs.relation)){
              f7.alert('',this.$t('enterRelationShip'));
              return;
            }else{
              let relationValue = (relationPicker.cols.length > 0 ) ? relationPicker.cols[0].value : relationPicker.value[0];
              otherAttrs.funeral_leave_relative_type = parseInt(relationValue);
            }
          }
          if(leave_code === 'MarriageLeave' || leave_code === 'MaternityLeave' || leave_code === 'AccompanyMaternityLe'){
            //省份
            let provincePicker = this.$refs.province.picker;
            if(this.isPickerNull(provincePicker,this.$refs.province)){
              f7.alert('',this.$t('enterProvince'));
              return;
            }else{
              let provinceValue = (provincePicker.cols.length > 0 ) ? provincePicker.cols[0].value : provincePicker.value[0];
              otherAttrs.province = provinceValue;

              if(leave_code === 'MarriageLeave'){//婚假
                otherAttrs.marriage_date = this.$refs.marriageDate.inputVal.val();
                otherAttrs.is_re_marriage = this.$refs.remarriage.checked ? 1 : 0;
              }

              if(leave_code === 'MaternityLeave'){//产假
                let maternityTypePicker = this.$refs.maternityType.picker;
                if(this.isPickerNull(maternityTypePicker,this.$refs.maternityType)){
                  f7.alert('',this.$t('enterMaternityType'));
                  return;
                }else{
                  let maternityTypeValue = (maternityTypePicker.cols.length > 0 ) ? maternityTypePicker.cols[0].value : maternityTypePicker.value[0];
                  otherAttrs.birth_type = parseInt(maternityTypeValue);

                  if(parseInt(maternityTypeValue) === 1){//流产
                    let dates = this.$refs.gestationDay.dataValue;
                    if(dates === undefined || dates === null || dates === ''){
                      f7.alert('',this.$t('enterGestationDay'));
                      return;
                    }else if(!this.isNumber(dates)){
                      f7.alert('',this.$t('enterCorrectGestationDay'));
                      return;
                    }else{
                      otherAttrs.gestation_days = parseInt(this.$refs.gestationDay.dataValue);
                    }
                  }

                  if(parseInt(maternityTypeValue) === 0){
                    otherAttrs.is_dystocia = this.$refs.dystocia.checked ? 1 : 0;
                    otherAttrs.is_multi_birth = this.$refs.multipleBirths.checked ? 1 : 0;
                    otherAttrs.is_late_childbirth = this.$refs.lateChildbirth.checked ? 1 : 0;

                    if(otherAttrs.is_multi_birth === 1){
                      let birthCountPicker = this.$refs.birthCount.picker;
                      let birthCount = (birthCountPicker.cols.length > 0 ) ? birthCountPicker.cols[0].value : birthCountPicker.value[0];
                      otherAttrs.birth_count = parseInt(birthCount);
                    }
                  }
                }
              }
            }
          }
        }
        //common module check
        if(leaveStartTime.trim() === ''){
          f7.alert('',this.$t('timeStartNotNull'));
          return;
        }else if(leaveEndTime.trim() === ''){
          f7.alert('',this.$t('timeEndNotNull'));
          return;
        }else{
          if(!this.compareTime(leaveStartTime, leaveEndTime)){
            f7.alert('',this.$t('startBEnd'));
            return;
          }else{
            this.$store.dispatch('commitLeaveApply',{
              args : {
                leave_code: leave_code,
                begin_date: leaveStartTime.split(/\s+/)[0],
                begin_time: leaveStartTime.split(/\s+/)[1],
                end_date: leaveEndTime.split(/\s+/)[0],
                end_time: leaveEndTime.split(/\s+/)[1],
                attachment: imageSrc,
                remark: leaveReson,
                otherAttrs : otherAttrs
              }
            }).then((response)=>{
              if(response.body.status === 1){
                let me = this;
                if (response.body.data.status === 'OK') {
                  let leaveDays = response.body.data.leave_days ;
                  f7.alert('',this.$t('leaveSuc') + leaveDays + this.$t('day'), function() {
                    me.$router.back();
                  });
                } else {
                  f7.alert('',response.body.data.msg);
                }
              }else{
                f7.alert('',response.body.message);
              }
            },(error)=>{
              f7.alert(error);
            });
          }
        }
      },

      compareTime(startTime, endTime) {
        let new_begin = startTime;
        let new_end = endTime;
        let d1 = new Date(new_begin.replace(/\-/g, '\/'));
        let d2 = new Date(new_end.replace(/\-/g, '\/'));

        if (new_begin && new_end && d1 < d2) {
          return true;
        }else{
          return false;
        }
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
      changeLeaveType(type){
        this.selectedLeaveType = type;
      },
      changeMaternityType(type){
        this.maternityType = type;
      },
      changeBirthCount(flag){
        this.isMultipleBirths = flag;
      }
    },
    computed:{
      ...mapGetters(['vacationType','provinceArray']),
      leaveItemPhoto(){//默认附件
        return this.$store.state.moduleApply.tempLeaveApplyItems.photo;
      },
      leaveItemReason(){//默认休假原因
        return this.$store.state.moduleApply.tempLeaveApplyItems.leaveReson;
      },
      defaultLeaveType(){//默认休假类型
        let defaultType = this.$store.state.moduleApply.tempLeaveApplyItems.leaveType;
        this.selectedLeaveType = defaultType;
        return defaultType;
      },
      defaultStart(){//默认休假开始时间
        let defaultTime = this.$store.state.moduleApply.attendanceTime;
        let tempStartTime = this.$store.state.moduleApply.tempLeaveApplyItems.leaveStartTime;

        if(tempStartTime === undefined || tempStartTime === null){
          return defaultTime.start;
        }else{
          return tempStartTime;
        }
      },
      defaultEnd(){//默认休假结束时间
        let defaultTime = this.$store.state.moduleApply.attendanceTime;
        let tempEndTime = this.$store.state.moduleApply.tempLeaveApplyItems.leaveEndTime;
        if(tempEndTime === undefined || tempEndTime === null){
          return defaultTime.end;
        }else{
          return tempEndTime;
        }
      },
      defaultProvince(){//默认省份
        let additionalField = this.$store.state.moduleApply.tempLeaveApplyItems.additionalField;
        if(additionalField === undefined || additionalField === null){
          return undefined;
        }else{
          return additionalField.province;
        }
      },
      defaultMarriageDate(){//默认结婚登记日期
        let additionalField = this.$store.state.moduleApply.tempLeaveApplyItems.additionalField;
        if(additionalField !== undefined && additionalField !== null && additionalField.marriageDate !== undefined && additionalField.marriageDate !== null && additionalField.marriageDate !== '' ){
          return additionalField.marriageDate;
        }else{
          let now = new Date();
          let date = now.getFullYear() + '-' + convertTimeValue(now.getMonth()+1) + '-' + convertTimeValue(now.getDate());
          return date;
        }
      },
      defaultRemarriageState(){//默认是否再婚
        let additionalField = this.$store.state.moduleApply.tempLeaveApplyItems.additionalField;
        if(additionalField !== undefined && additionalField !== null && additionalField.remarriage !== undefined && additionalField.remarriage !== null){
          return additionalField.remarriage;
        }else{
          return 0;
        }
      },
      defaultRelation(){//默认亲属类型
        let additionalField = this.$store.state.moduleApply.tempLeaveApplyItems.additionalField;
        if(additionalField !== undefined && additionalField !== null && additionalField.relationShip !== undefined && additionalField.relationShip !== null){
          return additionalField.relationShip;
        }else{
          return undefined;
        }
      },
      defaultMaternityType(){//默认产假类型
        let additionalField = this.$store.state.moduleApply.tempLeaveApplyItems.additionalField;
        if(additionalField !== undefined && additionalField !== null && additionalField.maternityType !== undefined && additionalField.maternityType !== null){
          let type = additionalField.maternityType;
          this.maternityType = type;
          return type;
        }else{
          this.maternityType = undefined;
          return undefined;
        }
      },
      defaultDystocia(){//默认是否难产
        let additionalField = this.$store.state.moduleApply.tempLeaveApplyItems.additionalField;
        if(additionalField !== undefined && additionalField !== null && additionalField.dystocia !== undefined && additionalField.dystocia !== null){
          return additionalField.dystocia;
        }else{
          return 0;
        }
      },
      defaultMultipleBirths(){//默认是否多胞胎
        let additionalField = this.$store.state.moduleApply.tempLeaveApplyItems.additionalField;
        if(additionalField !== undefined && additionalField !== null && additionalField.multipleBirths !== undefined && additionalField.multipleBirths !== null){
          this.isMultipleBirths = additionalField.multipleBirths;
          return additionalField.multipleBirths;
        }else{
          this.isMultipleBirths = 0;
          return 0;
        }
      },
      defaultBirthCount(){//默认胎儿数目
        let additionalField = this.$store.state.moduleApply.tempLeaveApplyItems.additionalField;
        if(additionalField !== undefined && additionalField !== null && additionalField.birthCount !== undefined && additionalField.birthCount !== null){
          return additionalField.birthCount;
        }else{
          return 2;
        }
      },
      defaultLateChildbirth(){//默认是否晚育
        let additionalField = this.$store.state.moduleApply.tempLeaveApplyItems.additionalField;
        if(additionalField !== undefined && additionalField !== null && additionalField.lateChildbirth !== undefined && additionalField.lateChildbirth !== null){
          return additionalField.lateChildbirth;
        }else{
          return 0;
        }
      },
      defaultGestationDay(){//默认妊娠天数
        let additionalField = this.$store.state.moduleApply.tempLeaveApplyItems.additionalField;
        if(additionalField !== undefined && additionalField !== null && additionalField.gestationDay !== undefined && additionalField.gestationDay !== null){
          return additionalField.gestationDay;
        }else{
          return undefined;
        }
      },
      hasProvince(){//是否显示省份
        if(this.selectedLeaveType === 'MarriageLeave' || this.selectedLeaveType === 'MaternityLeave' || this.selectedLeaveType === 'AccompanyMaternityLe'){
           return true;
        }else{
          return false;
        }
      },

      hasRelationship(){//是否显示亲属类型
        if(this.selectedLeaveType === 'FuneralLeave'){
          return true;
        }else{
          return false;
        }
      },
      hasMarriageDate(){//是否显示结婚登记日期
        if(this.selectedLeaveType === 'MarriageLeave'){
          return true;
        }else{
          return false;
        }
      },

      hasMaternityType(){//是否显示产假类型
        if(this.selectedLeaveType === 'MaternityLeave'){
          return true;
        }else{
          return false;
        }
      },
      isCommonMaternity(){//是不是正常生产
        if(this.selectedLeaveType === 'MaternityLeave' && parseInt(this.maternityType) === 0){
          return 1;
        }else if(this.selectedLeaveType === 'MaternityLeave' && parseInt(this.maternityType) === 1){
          return 2;
        }else{
          return 0;
        }
      },
      showMultipleBirths(){//是不是显示多胞胎数目
        if(this.selectedLeaveType === 'MaternityLeave' && parseInt(this.maternityType) === 0 && parseInt(this.isMultipleBirths) === 1){
          return true;
        }else{
          return false;
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
      CheckBox,
      CheckboxItem,
      TextItem
    },

    locales: {
      zh: {
        'leave-apply' : '休假申请',
        'leave-type' : '休假类型',
        'leave-reason' : '休假原因',
        'attachment-picture' : '附件图片',
        'startTime' : '开始时间',
        'endTime' : '结束时间',
        'commitButton' : '提交',
        'input-more' : '请输入',
        'choose-leave-type' : '选择您的休假类型',
        'no-type-choose' : '您没有可选休假类型 ',
        'enterLeaveType' : '请填写休假类型',
        'timeStartNotNull' : '休假开始时间不能为空',
        'timeEndNotNull' : '休假开始时间不能为空',
        'startBEnd' : '开始时间应该早于结束时间',
        'leaveSuc' : '成功申请休假',
        'loading' : '数据加载中...',
        'submitting':'提交申请中...',
        'day' : '天',
        'province' : '省份',
        'relationType' : '亲属类型',
        'linealRelatives':'直系亲属',
        'NonLinealRelatives':'非直系亲属',
        'marriageDate' : '结婚登记日期',
        'date' : '日期',
        'remarriage' : '再婚',
        'maternityType' : '产假类型',
        'dystocia' : '难产',
        'multipleBirths' : '多胞胎',
        'lateChildbirth' : '晚育',
        'normalBirth' : '正常生产',
        'abortion' : '流产',
        'birthCount' :'胎儿数目',
        'gestationDay' : '妊娠天数',
        'enterRelationShip' : '请选择亲属类型',
        'enterProvince' : '请选择省份',
        'enterMaternityType' : '请选择产假类型',
        'enterGestationDay' : '请填写妊娠天数',
        'enterCorrectGestationDay' : '妊娠天数请填写正确的数字',
        'input-more' : '请输入...'
      },

      en: {
        'leave-apply' : 'Leave Apply',
        'leave-type' : 'Leave Type',
        'leave-reason' : 'Reason',
        'attachment-picture' : 'Attatchment',
        'startTime' : 'Start Time',
        'endTime' : 'End Time',
        'commitButton' : 'Submit',
        'input-more' : 'Please enter',
        'choose-leave-type' : 'Choose leave type.',
        'no-type-choose' : 'No leave type to choose',
        'enterLeaveType' : 'Please enter leave type',
        'timeStartNotNull' : 'Start time cannot be null',
        'timeEndNotNull' : 'End time cannot be null',
        'startBEnd' : 'Start time should before end time.',
        'leaveSuc' : 'Succeed apply for leave ',
        'loading' : 'loading...',
        'submitting':'Submitting Apply...',
        'day' : ' days',
        'province' : 'Province',
        'relationType' : 'Relation Type',
        'linealRelatives':'lineal relatives',
        'NonLinealRelatives':'Non lineal relatives',
        'marriageDate' : 'Registered Date',
        'date' : 'Date',
        'remarriage' : 'Remarriage',
        'maternityType' : 'Maternity Type',
        'dystocia' : 'Dystocia',
        'multipleBirths' : 'Multiple Births',
        'lateChildbirth' : 'Late Childbirth',
        'normalBirth' : 'Normal Birth',
        'abortion' : 'Abortion',
        'birthCount' :'Birth Count',
        'gestationDay' : 'Gestation Days',
        'enterRelationShip' : 'Please choose relationship type',
        'enterProvince' : 'Please choose province',
        'enterMaternityType' : 'Please choose maternity type',
        'enterGestationDay' : 'Please input gestation dates',
        'enterCorrectGestationDay' : 'Please input correct format gestation dates',
        'input-more' : 'Please input...'
      },
    }
  }
</script>

<style>
</style>
