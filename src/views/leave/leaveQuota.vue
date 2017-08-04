<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <v-content className="page-content page-background">
      <SelfCard></SelfCard>
      <NoDataCard v-if="groups.length === 0"></NoDataCard>
      <div class="list-block" style="margin: 5px 0;" v-for="group in groups" v-else>
        <div class="wx-group">
          <div class="wx-title group-split-block border-color">{{group.title}}</div>
          <ul class="wx-settings">
            <li v-for="item in group.leaveData">
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title">{{item.title}}</div>
                  <span class="ess-item-value">{{item.value}}</span>
                </div>
              </div>
            </li>
          </ul>
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
      this.$store.dispatch('getMyLeaveQuota').then(
        (response) => {
          if(response.body.status === 1){
            this.groups = response.body.data;
          }else{
            f7.alert('',response.body.message);
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
          title:this.$t('my-leave-quota')
        },
        groups : [],
      }},
    components: {
      VContent,
      SelfCard,
      NavBar,
      NoDataCard
    },

    locales: {
      zh: {
        'my-leave-quota' : '我的休假配额',
        'get-quota-fail' : '获取休假配额失败',
        'loading' : '数据加载中...'
      },

      en: {
        'my-leave-quota' : 'My leave quota',
        'get-quota-fail' : 'Data exception.',
        'loading' : 'Loading...'
      }
    }
  }
</script>

<style scoped>
.border-color{
  border-color: rgb(216,0,49);
}
</style>
