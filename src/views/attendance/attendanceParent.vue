<template>
  <div class="page">
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
    <v-bar>
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
      this.$router.push('/home/attend/attend1')
    },
    data() {
      return {
        navItem:[
          {
            path: '/home/attend/attend1' ,
            label:this.$t('clock'),
            icon:'icon-shangxiaban'
          },{
            path: '/home/attend/attend2' ,
            label:this.$t('out'),
            icon:'icon-outing'
          },{
            path: '/home/attend/attend3' ,
            label:this.$t('summary'),
            icon:'icon-attendRecords'
          }
        ]
      }
    },
    watch: {
      '$route' (to, from) {
        const toLeval = parseInt(to.path.substr(to.path.length-1,1));
        const fromLeval = parseInt(from.path.charAt(from.path.length-1));
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
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
        'clock' : '上下班',
        'out' : '外出',
        'summary' : '打卡记录'
      },

      en: {
        'clock' : 'Punch',
        'out' : 'Outing',
        'summary' : 'Records'
      }
    }
  }
</script>

<style scoped>
.page-content{
  background-color: white;
}
</style>
