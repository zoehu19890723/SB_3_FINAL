<template>
  <div class="page">
    <NavBar :headerInfo="head" rightEnable="true" :rightClick = "rightClick"></NavBar>
    <v-content className="page-content">
      <div :class="['summary-card',monthArray.length !== 0?'':'hiddenModule']">
        <div class="monthCard city-card">
          <span>{{$t('city')}}{{currentCity|| $t('unknow')}}</span>
        </div>
        <div class="monthCard month-card">
          <div style="color: black;">
            <span>{{$t('payDate')}}</span>
            <span>{{currentMonth}}</span>
          </div>
          <span>
            <i id="mySalary-calender" class="icon WeStar_iconfont">&#xe621</i>
          </span>
        </div>
        
      </div>
      <NoDataCard v-if="salaryData=== undefined || salaryData === null || salaryData.length === 0"></NoDataCard>
      <div v-else>
        <GroupInfoCard :salaryData="salaryData"></GroupInfoCard>
        <div class="noteCard" >
          <div class="note-title">{{$t('note')}}</div>
          <div class="note-content">{{currentNote || $t('no')}}</div>
        </div>
      </div>
    </v-content>
  </div>
</template>

<script>
  import VContent from '../../components/Content';
  import NavBar from '../../components/NavBar';
  import NoDataCard from '../../components/NoDataCard';
  import GroupInfoCard from '../../components/GroupInfoCard';
  import {showMore} from '../../utils/tools';

  export default {
    created:function(){
      this.$store.dispatch('getMore');
    },
    mounted:function(){
      let me = this;
      me.$store.dispatch('getInsuranceMonth').then(
        (result) =>{
          if(result.length>0){
            me.monthArray = result;
            me.currentMonth = result[0];
            me.initPicker(result[0]);
            me.$store.dispatch('getInsuranceData',{month : result[0]}).then(
              (result) =>{
                me.salaryData = result.detail;
                me.currentCity = result.city;
                me.currentNote = result.note;
              })
          }
      });
    },
    data() {
      return {
        salaryData:[],
        monthArray:[],
        currentMonth : '',
        currentCity : '',
        currentNote : ''
      }
    },
    computed:{
      head(){
        return {
          backShow:true,
          rightShow: this.$store.state.moduleProfile.more.hasMore,
          rightIcon:'more',
          iconColor:'gray',
          show:true,
          title: this.$t('myInsurance')
        }
      }
    },
    methods:{
      rightClick(){
        showMore()
      },
      initPicker() {
        let me = this;
        let myPicker = f7.picker({
            input: '#mySalary-calender',
            toolbarTemplate: '<div class="toolbar">' +
                '<div class="toolbar-inner">' +
                '<div class="left">' +
                '<a href="#" class="link toolbar-randomize-link"></a>' +
                '</div>' +
                '<div class="right">' +
                '<a href="#" class="link close-picker" id="mySalary-picker-month-sure">'+me.$t('sure')+'</a>' +
                '</div>' +
                '</div>' +
                '</div>',
            value: [me.currentMonth],
            cols: [{
                displayValues: (() => {
                  return me.monthArray;
                })(),
                values: (() => {
                    return me.monthArray;
                })()
            }],
            onClose: function() {
              if (myPicker.value[0] !== me.salaryData.date) {
                me.currentMonth = myPicker.value[0];
                me.$store.dispatch('getInsuranceData',{
                  month : myPicker.value[0]
                }).then(
                  (result)=>{
                    me.salaryData = result.detail;
                    me.currentCity = result.city;
                    me.currentNote = result.note;
                });
              }
            }
        });
      }
    },
    components: {
      VContent,
      NavBar,
      NoDataCard,
      GroupInfoCard
    },

    locales: {
      zh: {
        'payDate' : '缴费月份 : ',
        'myInsurance' : '我的社保',
        'sure' : '确认',
        'loading' : '数据加载中...',
        'city' : '社保缴费地 : ' ,
        'note' : '备注',
        'unknow' : '未知',
        'no' : '无'
      },

      en: {
        'payDate' : 'Payment Month : ',
        'myInsurance' : 'Insurance',
        'sure' : 'Sure',
        'loading' : 'loading...',
        'city' : 'Payment City : ' ,
        'note' : 'Note',
        'unknow' : 'unknow',
        'no' : 'No note'
      }
    }
  }
</script>

<style scoped>
.hiddenModule{
  visibility: hidden;
  height: 0px;
}
.groupTitleSpec{
  color: black;
  font-weight: bold;
}
.monthCard{
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  padding: 8px 16px;
}
.groupCard{
  margin-bottom: 16px;
  background: white;
  padding: 8px 16px;
}
.groupCardTitle{
  font-size: 18px;
  padding: 8px 0px;
  color: black;
  border-bottom: 1px solid #dedede;
}
.groupItem{
  display: flex;
  justify-content: space-between;
  padding: 16px 20px;
}
.noteCard{
  color: black;
  padding: 8px 16px;
  background: white;
  margin-bottom: 8px;
}
.note-title{
  font-size: 16px;
  color: #333333;
  font-weight: bold;
  border-bottom: 1px solid #dedede;
  line-height: 38px;
}
.note-content{
  color: #999999;
  word-wrap: break-word;
  line-height: 38px;
  margin-left: 16px;
}
.summary-card{
  background-color: white;
    margin-bottom: 16px;
}
.city-card{
  color: #333333;
  border-bottom: #dedede 1px solid;
}
.month-card{
  padding: 3px 16px;
  color: #333333;
}
</style>
