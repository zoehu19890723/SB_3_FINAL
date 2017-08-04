<template>
  <div class="page">
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
    <v-bar v-if="showTab">
      <bar-item v-for="item in navItem" :path="item.path" :label="item.label" :icon="item.icon">
      </bar-item>
    </v-bar>
  </div>
</template>

<script>
  import VBar from '../../components/Bar';
  import BarItem from '../../components/BarItem';

  export default {
    created:function(){
      if(this.$route.fullPath.indexOf('/home/punchrequest/punch') < 0){
        this.$router.push('/home/punchrequest/punchSummary')
      }else if(this.$route.fullPath.indexOf('/home/punchrequest/punchSummary') >-1){
        this.showTab = true;
      }
    },
    data() {
      return {
        navItem:[
          {
            path: '/home/punchrequest/punchSummary',
            label:this.$t('record'),
            icon:'icon-attendAbnoraml'
          },{
            path: '/home/punchrequest/punch',
            label:this.$t('apply'),
            icon:'icon-budaka'
          }
        ],
        showTab: false
      }
    },
    watch: {
      '$route' (to, from) {
        const toLeval = parseInt(to.path.substr(to.path.length-1,1));
        const fromLeval = parseInt(from.path.charAt(from.path.length-1));
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        if(from.path.indexOf('punchrequest/punch') >-1 && to.path.indexOf('punchrequest/punch3') >-1){
          to.query.clean = 1;
        }
        if(toDepth === fromDepth && from.path.indexOf('punchSummary')>-1){
          this.transitionName = 'slide-left';
        }else if( toDepth === fromDepth && to.path.indexOf('punchSummary')>-1){
          this.transitionName = 'slide-right';
        }else if(isNaN(toLeval) === false && isNaN(fromLeval) === false){
          this.transitionName = toLeval < fromLeval ? 'slide-right' : 'slide-left';
        }else if(isNaN(toLeval) === true && isNaN(fromLeval) === false){
          this.transitionName = 'slide-right';
        }else if(isNaN(toLeval) === false && isNaN(fromLeval) === true){
          this.transitionName = 'slide-left';
        }else{
          this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
        }

        if(isNaN(toLeval) === false){
          this.showTab = false;
        }else{
          this.showTab = true;
        }
      }
    },
    methods:{
      
    },
    components: {
      VBar,
      BarItem
    },

    locales: {
      zh: {
        'record' : '考勤异常',
        'apply' : '补打卡申请',
      },

      en: {
        'record' : 'Exception Record',
        'apply' : 'Punch Request'
      }
    }
  }
</script>

<style scoped>
.page-content{
  background-color: white;
}
.topPanel{
  display: flex;
  padding: 8px 0px;
  margin:0px 8px;
  align-items: center;
  border-bottom: 1px solid #999;
  color: #666
}
.left-panel{
  align-items: center;
  display: flex;
  flex:1;
}
.left-panel i{
  margin-right: 8px;
  /*color: rgb(0,122,255);*/
}
.right-panel{
  font-size: 14px;
  line-height: 20px;
}
.work-order span:first-child{
  word-spacing: 10px;
}
.work-order{
  color: #999;
}
.attendance-panel{
  padding:8px;
  font-size: 14px;
}
.current-time{
  margin-bottom: 8px;
}
.work{
  padding: 8px;
}
.work .attendence-action-panel{
  text-align: center;
  display: none;
}
.work .hint{
  display: flex;
  align-items: center;
}
.hint .point{
  color: white;
  border-radius: 50%;
  padding: 3px 6px 5px 6px;
  font-size: 12px;
  margin-right: 8px;
}
.hint .icon{
  margin-right: 8px;
  font-size: 22px;
}
.active .hint .icon{
  color: rgb(0,122,255);
}
.point{
  background-color: #999;
}
.attendence-action-panel .attendence-action{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  position: relative;
  margin: 20px 0px 20px calc(50% - 60px);
}
.attendance-back {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  position: absolute;
  top: -10px;
  left: -10px;
  z-index: -1;
}
.work.active{
  background: rgba(0,122,255,0.05);
}
.work.active .attendence-action-panel{
  display: block;
}
.success-hint{
  margin-left: 36px;
  line-height: 36px;
  font-size: 14px;
  color: rgb(58,203,75);
}
.active .success-hint{
  display: none;
}
.action-text{
  font-size: 20px;
}
.success-hint .icon{
  font-size: 16px;
}
.success-hint span:last-child{
  color: #999;
}
</style>
