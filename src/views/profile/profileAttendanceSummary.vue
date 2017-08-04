<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <v-content className="page-content page-background">
      <SelfCard></SelfCard>
      <NoDataCard v-if="!hasData"></NoDataCard>
      <div class="summary-panel" v-else>
        <div class="summary-date">
          <span>{{$t('summary-date')}}</span>
          <span>{{summaryData.summary_date}}</span>
        </div>
        <div class="summary-title">
          <span>{{$t('summary-title')}}</span>
          <span>{{$t('summary-unit')}}</span>
        </div>
        <div class="summary-detail-panel">
          <div class="summary-item" v-for="it in summaryData.summary_data">
            <span>{{it.title}}</span>
            <span>{{it.value}}</span>
          </div>
        </div>
      </div>
    </v-content>
  </div>
</template>

<script>
  import VContent from '../../components/Content';
  import SelfCard from '../../components/SelfCard';
  import NavBar from '../../components/NavBar';
  import NoDataCard from '../../components/NoDataCard';

  export default {
    created:function(){
      let me = this;
      let id = me.$route.query.id || null;
      me.head.title = me.$route.query.title || me.$t('summary');
      me.$store.dispatch('getAttendanceSummaryDetail',{id : id}).then(
        (data) =>{
          me.summaryData = data;
        }
      );
    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title:''
        },
         summaryData : null
      }
    },
    computed:{
      hasData() {
        if(this.summaryData === null || this.summaryData.summary_data === undefined || this.summaryData.summary_data === null || this.summaryData.summary_data.length === 0){
          return false;
        }else{
          return true;
        }
      }
    },
    components: {
      VContent,
      SelfCard,
      NavBar,
      NoDataCard
    },
    methods : {
    },

    locales: {
      zh: {
        'summary' : '休假汇总',
        'summary-date' : '考勤月末日期',
        'summary-title' : '汇总项',
        'summary-unit' : '时间(小时)'
      },

      en: {
        'summary' : 'Attendance Summary',
        'summary-date' : 'Attendance Summary Date',
        'summary-title' : 'Summary Item',
        'summary-unit' : 'Time Unit(hour)'
      }
    }
  }
</script>

<style scoped>
  .summary-panel{
    background: white;
  }
  .summary-date{
    line-height: 48px;
    padding: 0px 16px;
  }
  .summary-date span:first-child{
    margin-right: 16px;
  }
  .summary-title{
    display: flex;
    border-bottom: 1px solid #dfdfdf;
    padding: 8px 16px;
  }
  .summary-item{
    display: flex;
    padding: 4px 16px;
  }
  .summary-title span:first-child,.summary-item span:first-child{
    flex : 2;
    font-size: 14px;
  }
  .summary-title span:last-child,.summary-item span:last-child{
    flex : 1;
    font-size: 14px;
  }
</style>
