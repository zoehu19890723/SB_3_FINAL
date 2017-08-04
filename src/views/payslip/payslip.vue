<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <v-content className="page-content">
      <div :class="['summary-card',monthArray.length !== 0?'':'hiddenModule']">
        <div class="monthCard month-card">
          <div style="color: black;">
            <span>{{$t('payDate')}}</span>
            <span>{{salaryData.date}}</span>
          </div>
          <span>
            <i id="mySalary-calender" class="icon WeStar_iconfont">&#xe621</i>
          </span>
        </div>
      </div>
      <NoDataCard v-if="salaryData.monthData === undefined || salaryData.monthData === null || salaryData.monthData.length === 0"></NoDataCard>
      <div v-else>
        <div class="groupCard" v-for="item in salaryData.monthData" >
          <div class="groupCardTitle">
            <span>{{item.groupTitle}}</span>
          </div>
          <div class="groupItem" v-for="it in item.groupData">
            <span>{{it.title}}</span>
            <span>{{it.value}}</span>
          </div>
        </div>
        <div class="noteCard">
          <div class="note-title">{{$t('note-self')}}</div>
          <div class="note-content">{{salaryData.note_personal || $t('no')}}</div>
        </div>
        <div class="noteCard">
          <div class="note-title">{{$t('note-company')}}</div>
          <div class="note-content">{{salaryData.note_company || $t('no')}}</div>
        </div>
      </div>
    </v-content>
  </div>
</template>

<script>
  import VContent from '../../components/Content';
  import NavBar from '../../components/NavBar';
  import NoDataCard from '../../components/NoDataCard';

  export default {
    created:function(){
    },
    mounted:function(){
      let me = this;
      me.$store.dispatch('getMyPayList').then(
        (result) =>{
          if(result.status === true){
            me.salaryData = result.data;
            me.monthArray = result.monthArray;
            if(me.salaryData !== undefined && me.salaryData.date !== undefined && me.monthArray !== undefined && me.monthArray.length !== 0){
              me.initPicker();
            }
          }
      });
    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title: this.$t('myStarSalary')
        },
        salaryData:{},
        monthArray:[],
      }
    },
    methods:{
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
            value: [me.salaryData.date],
            cols: [{
                displayValues: (() => {
                  let arr = [];
                  me.monthArray.forEach((value) =>{
                    let tempIndex = value.lastIndexOf('-');
                    let result = value.substring(0, tempIndex);
                    arr.push(result);
                  });
                  return arr;
                })(),
                values: (() => {
                    return me.monthArray;
                })()
            }],
            onClose: function() {
              if (myPicker.value[0] !== me.salaryData.date) {
                me.$store.dispatch('setNewDate',{
                  newDate : myPicker.value[0]
                }).then(
                  (result)=>{
                    me.salaryData = result;
                });
              }
            }
        });
      }
    },
    components: {
      VContent,
      NavBar,
      NoDataCard
    },

    locales: {
      zh: {
        'payDate' : '发薪日 : ',
        'myStarSalary' : '我的工资单',
        'sure' : '确认',
        'loading' : '数据加载中...',
        'note-self' : '备注-个人',
        'note-company' : '备注-公司',
        'unknow' : '未知',
        'no' : '无'
      },

      en: {
        'payDate' : 'Pay Date : ',
        'myStarSalary' : 'Payslip',
        'sure' : 'Sure',
        'loading' : 'loading...',
        'note-self' : 'Personal Note',
        'note-company' : 'Company Note',
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
.monthCard{
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  padding: 8px 16px;
}
.groupTitleSpec{
  color: black;
  font-weight: bold;
}
.groupCard{
    margin-bottom: 16px;
    background: white;
    padding: 8px 16px;
  }
  .groupCardTitle{
    font-size: 16px;
    padding: 8px 0px;
    color: #333333;
    font-weight: bold;
    border-bottom: 1px solid #dedede;
  }
  .groupSubitem{
    display: flex;
    justify-content: space-between;
    line-height: 38px;
    color: #999999;
  }
  .groupSubTitle{
    color: #333333;
    border-bottom: 1px solid #dedede;
    font-size: 16px;
    line-height: 38px;
  }
  .groupItem{
    margin-left: 16px;
    display: flex;
    justify-content: space-between;
    line-height: 38px;
    color: #999999;
  }
  .groupSubitem:nth-last-of-type(n+2){
    border-bottom: 1px solid #dedede;
  }
  .groupItem:nth-last-of-type(n+2){
    border-bottom: 1px solid #dedede;
  }
  .summary-card{
    background-color: white;
    margin-bottom: 16px;
  }
  .month-card{
    padding: 3px 16px;
    color: #333333;
  }
  .noteCard{
    color: black;
    padding: 8px 16px;
    background: white;
    margin-bottom: 16px;
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
</style>
