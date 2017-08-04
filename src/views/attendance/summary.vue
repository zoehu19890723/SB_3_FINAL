<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <v-content className="page-content">
      <MonthNav :currentMonth="currentMonth" :monthAction="changeMonth" :maxMonth="maxMonth" :minMonth="minMonth"></MonthNav>
      <NoDataCard style="margin-top:16px" v-if="!hasData"></NoDataCard>
      <div class="headTitle" v-if="hasData">
        <span>{{$t('attendTime')}}</span>
        <span style="flex:1">{{$t('status')}}</span>
        <span>{{$t('type')}}</span>
      </div>
      <div class="dataPanel" v-if="hasData">
        <div class="month-item" v-for="item in monthdata">
          <div class="main-data">
            <span>{{item.punchTime.replace(/-/g,'/')}}<i v-if="item.note" class="icon iconfont" @click="showNote(item.note)">&#xe6bb</i></span>
            <span style="flex:1">{{item.type}}</span>
            <span>{{item.status}}</span>
          </div>
          <div class="sub-data">
            <span><span class="font-strong">{{$t('position')}}:</span>{{item.pos || $t('unknown')}}</span>
            <span><span class="font-strong">{{$t('origin')}} :</span>{{item.source || $t('unknown')}}</span>
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
            me.maxMonth = me.currentMonth;
            if(me.currentMonth){
              me.$store.dispatch('getAttendList',{month : me.currentMonth}).then((response)=>{
                if(response.body.status === 1){
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
    mounted:function(){
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
        currentMonth : (new Date()).getFullYear()+'-'+convertTimeValue((new Date()).getMonth()+1),
        maxMonth : '',
        minMonth : '',
      }
    },
    methods:{
      changeMonth(month){
        let me = this;
        me.$store.dispatch('getAttendList',{month : month}).then((response)=>{
          if(response.body.status === 1){
            me.monthdata = response.body.data;
          }else{
            f7.alert('',response.body.message);
          }
        })
      },
      showNote(note){
        f7.alert(note,this.$t('punchNote'));
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
        'myAttendance' : '考勤记录',
        'attendTime' : '刷卡时间',
        'status' : '状态',
        'type' :'类型',
        'position' : '刷卡点',
        'origin': '来源',
        'unknown' : '未知',
        'punchNote' : '打卡备注'
      },

      en: {
        'myAttendance' : 'My Records',
        'attendTime' : 'Punch Time',
        'status' : 'Status',
        'type' :'Type',
        'position' : 'Attance Place',
        'origin': 'Source',
        'unknown' : 'unknown',
        'punchNote' : 'Punch Note'
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
}
.dataPanel{
  height: calc(100% - 177px);
  position: absolute;
  width: 100%;
  overflow: auto;
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
}
.sub-data{
  align-items : center;
  display: flex;
  justify-content: space-between;
  padding: 4px 16px 0px 16px;
  font-size: 14px;
}
.headTitle span:last-child,.main-data span:last-child{
  flex:1;
  margin-right:12px;
  text-align:end;
}
.headTitle span:first-child{
  margin-left:12px;
  text-align: center;
  flex:3;
}
.main-data span:first-child{
  margin-left:12px;
  text-align: start;
  flex:3;
}
.main-data span:first-child .icon{
  font-size: 18px;
  margin-left: 4px;
  color: rgb(0,122,255);
}
.sub-data .font-strong{
  color: #333
}
</style>
