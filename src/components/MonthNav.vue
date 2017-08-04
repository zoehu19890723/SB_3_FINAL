<template>
  <div class="monthNav">
    <span :class="[(current === minMonth)?'':'active']" @click="gotoPreMonth"><i class="icon iconfont">&#xe604</i>{{$t('lastMonth')}}</span>
    <span class="month">{{displayMonth}}</span>
    <span :class="[(current === maxMonth)?'':'active']" @click="gotoNextMonth">{{$t('nextMonth')}}<i class="icon iconfont">&#xe609</i></span>
  </div>
</template>

<script>
  export default {
    name: 'MonthNav',
    props: ['currentMonth','monthAction','maxMonth','minMonth'],
    data(){
      return {
        current : this.currentMonth
      }
    },
    computed:{
      displayMonth(){
        if(this.current){
          return this.current.replace('-',this.$t('year'))+this.$t('month');
        }else{
          return '';
        }
      },
    },
    methods:{
      gotoPreMonth(){
        let cur_month = this.current;
        let year = parseInt(cur_month.split('-')[0]);
        let month = parseInt(cur_month.split('-')[1]);
        if(month < 2){
          month = 12;
          year = year -1;
        }else{
          month = month -1;
        }
        let newMonth = year + '-' + ((month <10) ? ('0'+month) : month);
        this.monthAction(newMonth);
        this.current = newMonth;
      },
      gotoNextMonth(){
        let cur_month = this.current;
        let year = parseInt(cur_month.split('-')[0]);
        let month = parseInt(cur_month.split('-')[1]);
        if(month > 11 ){
          month = 1;
          year = year + 1
        }else{
          month = month + 1
        }
        let newMonth = year + '-' + ((month <10) ? ('0'+month) : month);
        this.monthAction(newMonth);
        this.current = newMonth;
      }
    },
  locales: {
    zh: {
      'lastMonth' : '上月',
      'nextMonth' : '下月',
      'year':'年',
      'month' : '月'
    },

    en: {
      'lastMonth' : 'Last Month',
      'nextMonth' : 'Next Month',
      'year':'/',
      'month' : ''
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
  pointer-events : none;
}
.monthNav .active{
  color: #d80031;
  pointer-events : auto;
}
.monthNav .month{
  color: #d80031;
}
</style>
