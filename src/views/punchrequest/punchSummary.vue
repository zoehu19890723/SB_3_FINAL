<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <v-content className="page-content">
      <MonthNav :currentMonth="currentMonth" :monthAction="changeMonth" :maxMonth="maxMonth" :minMonth="minMonth"></MonthNav>
      <NoDataCard style="margin-top:16px" v-if="!hasData"></NoDataCard>
      <div class="headTitle" v-if="hasData">
        <span>{{$t('abnormalDate')}}</span>
        <span>{{$t('abnormalDes')}}</span>
      </div>
      <div class="dataPanel" v-if="hasData">
        <div class="month-item" v-for="(item,index) in monthdata" @click="clickRecord(item)">
          <div class="main-data">
            <span>{{item.date}}</span>
            <span>{{item.des}}</span>
          </div>
          <div class="sub-data">
            <span v-if="item.startTime || item.endTime">
              <span class="font-strong">{{$t('time')}}:</span>
              {{item.startTime}}
              <span v-if="item.startTime && item.endTime">-</span>
              {{item.endTime}}
            </span>
            <span v-else></span>
            <span>
              <span class="font-strong">{{$t('abnormalType')}} :</span>
              {{item.type}}
            </span>
          </div>
        </div>
      </div>
    </v-content>
  </div>
</template>

<script>
  import VContent from '../../components/Content';
  import NavBar from '../../components/NavBar';
  import NoDataCard from '../../components/NoDataCard';
  import MonthNav from '../../components/MonthNav';
  import {convertTimeValue} from '../../utils/tools';

  export default {
    created:function(){
      let me = this;
      me.$store.dispatch('getAttendMonth').then((res)=>{
        if(res.body.status === 1){
            me.minMonth = res.body.data.startMonth;
            me.maxMonth = (new Date()).getFullYear()+'-'+convertTimeValue((new Date()).getMonth()+1);
            if(me.currentMonth){
              me.$store.dispatch('getPunchList',{month : me.currentMonth}).then((response)=>{
                if(response.body.status === 1){
                  me.$store.commit('setAbnormalCurrentMonth',me.currentMonth);
                  me.monthdata = response.body.data;
                }else{
                  f7.alert('',response.body.message);
                }
              })
          }else{
            f7.alert('',res.body.message);
          }
        
        }
        
      })
    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title: this.$t('myAttendance'),
          backHref : '/home/navMore'
        },
        monthdata:[],
        currentMonth : this.$store.state.moduleAttend.abnormalCurrentMonth || (new Date()).getFullYear()+'-'+convertTimeValue((new Date()).getMonth()+1),
        maxMonth : '',
        minMonth : '',
      }
    },
    computed : {
    },
    methods:{

      changeMonth(month){
        let me = this;
        me.$store.dispatch('getPunchList',{month : month}).then((response)=>{
          if(response.body.status === 1){
            me.$store.commit('setAbnormalCurrentMonth',month);
            me.monthdata = response.body.data;
          }else{
            f7.alert('',response.body.message);
          }
        })
      },
      clickRecord(item){
        let me = this;
        let buttons = [
          {
              text: me.$t('applyPunch'),
              onClick: () => {
                me.gotoApplyPunch(item)
              },
          },{
              text: me.$t('applyLeave'),
              onClick: () => {
                me.gotoLeave(item)
              }
          },{
              text: me.$t('applyOT'),
              onClick: () => {
                me.gotoApplyOT(item)
              }
          }];
        f7.actions(buttons);
      },

      gotoApplyPunch(item){
        this.$router.push({
          path : '/home/punchrequest/punch3',
          query : {
            id : item.id
          }
        })
      },

      gotoLeave(item){
        this.$router.push({
          path : '/home/leave3',
          query : {
            id : item.id
          }
        })
      },

      gotoApplyOT(item){
        this.$router.push({
          path : '/home/overtime2',
          query : {
            id : item.id
          }
        })
      }
    },
    computed:{
      hasData(){
        if(this.monthdata && this.monthdata.length > 0){
          return true;
        }else{
          return false;
        }
      }
    },
    components: {
      VContent,
      NavBar,
      NoDataCard,
      MonthNav
    },

    locales: {
      zh: {
        'myAttendance' : '考勤异常',
        'applyPunch' : '补打卡申请',
        'applyLeave' : '休假申请',
        'applyOT' : '加班申请',
        'abnormalDate' : '异常日期',
        'abnormalDes' : '异常描述',
        'time' : '时间',
        'abnormalType' : '异常类型',
        'no' : '无'
      },

      en: {
        'myAttendance' : 'My Records',
        'applyPunch' : 'Apply Punch',
        'applyLeave' : 'Apply Leave',
        'applyOT' : 'Apply Overtime',
        'abnormalDate' : 'Abnormal Date',
        'abnormalDes' : 'Abnormal Descripition',
        'time' : 'Time',
        'abnormalType' : 'Abnormal Type',
        'no' : 'No Time'
      }
    }
  }
</script>

<style scoped>
.monthNav{
  width: 100%;
  height: 44px;
  display: flex;
  align-items : center;
  background-color: rgb(247,247,247);
  justify-content: space-between;
}
.monthNav .month{
  color: rgb(0,122,255);
}
.headTitle{
  height: 36px;
  align-items : center;
  display: flex;
  padding:0px 8px;
  text-align: center;
  justify-content: space-between;
  margin: 0px 12px;
}
.month-item{
  background-color: white;
  margin-bottom:8px;
  padding: 4px 4px 12px 4px;
}
.main-data{
  align-items : center;
  display: flex;
  border-bottom: 1px solid #cecece;
  color: #333;
  padding: 8px 4px;
  text-align: center;
  justify-content: space-between;
  margin: 0px 12px;
}
.sub-data{
  align-items : center;
  display: flex;
  justify-content: space-between;
  padding: 4px 16px 0px 16px;
  font-size: 14px;
}
.sub-data .font-strong{
  color: #333
}
.dataPanel{
  height: calc(100% - 177px);
  position: absolute;
  width: 100%;
  overflow: auto;
}
</style>
