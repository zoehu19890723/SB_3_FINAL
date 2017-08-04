<template>
  <div>
    <div class="leave-item" @click="openPage">
      <div class = "status-img cut-img">
        <img v-lazy="item.userInfo.image" style="width:40px;height:40px">
      </div>
      <div class="b_main">
        <div class="border border-color">
          <div class = "summary">
            <div class = "title">
              <span>{{item.userInfo.name}}{{$t('prop')}}{{item.title}}</span>
              <i class="WeStar_iconfont arrow">&#xe624;</i>
            </div>
            <div class = "content" v-if="item.startTime && item.duration">
              <span>{{$t('startTime')}}:</span>
              <span class = "value">{{item.startTime}}</span>
              <span>,</span>
              <span>{{$t('lastTime')}}:</span>
              <span class = "value">{{item.duration}}</span>
            </div>
            <div class = "content">
              <span>{{$t('submitTime')}}:</span>
              <span class = "value">{{item.commitTime}}</span>
            </div>
            <div class = "content">
              <span>{{$t('approveStatus')}}:</span>
              <span class = "value">{{item.status.value}}</span>
            </div>
          </div>
        </div>
        <div class="out border-right-color">
          <div class="in in-color"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {assetsPublicPath} from '../config';
  export default {
    name : 'applyInfoCard',
    data(){
      return {
        errorImagePath : assetsPublicPath + '/static/img/default.jpg'
      }
    },
    props : {
      item : {},
      title : '',
      permissionCode : {
        type : Number,
        default :1
      },
    },

    computed:{
      path(){
        let id = this.item.id;
        let path = '';
        if(this.item.id === undefined || this.item.id === null){
          return null;
        }else if(id.indexOf('E01') > -1 || id.indexOf('E02') > -1 || id.indexOf('ELEAVE') > -1 ){//leave
          path += 'leave5';
        }else if(id.indexOf('E03') > -1 || id.indexOf('E04') > -1 || id.indexOf('EOT') > -1 ){//ot
          path += 'overtime4';
        }else if(id.indexOf('E06') > -1){//prove
          path += 'prove4';
        }else if(id.indexOf('E07') > -1){//general
          path += 'general4';
        }else if(id.indexOf('E08') > -1){//punch
          if(this.$route.fullPath.indexOf('punchrequest') < 0){
            path += 'punchrequest/punch4';
          }else{
            path += 'punch4';
          }
        }else{//transfer
          path += 'approval1';
        }
        return path;
      },
      currentIndex(){
        if(this.permissionCode%2 === 0){
          return 1;
        }else{
          return 0;
        }
      }
    },
    methods:{
       openPage(){
        if(!this.item.id || this.item.id === ''){
          f7.alert('',this.$t('noRoute'));
        }else{
          this.$router.push({
            path:this.path,
            query:{id : this.item.id,permissionCode:this.permissionCode,fromTab:this.currentIndex }
          })
        }
      }
    },

    locales: {
      zh: {
        'see-detail' : '查看详情',
        'prop' : '的',
        'startTime' : '开始',
        'lastTime' : '时长',
        'submitTime' : '提交时间',
        'approveStatus' : '审批状态',
        'noRoute' : '该条记录不能审批'
      },

      en: {
        'see-detail' : 'see details',
        'prop' : '\'s ',
        'startTime' : 'Start Time',
        'lastTime' : 'Duration',
        'submitTime' : 'Submit Time',
        'approveStatus' : 'Approve Status',
        'noRoute' : 'This Apply cannot be approved'
      }
    }
  }
</script>

<style scoped>
.in-color{
  border-right-color: white;
}
.arrow{
    float: right;
    margin-right: 8px;
}
.summary .title span{
  color: #212121;
}
</style>
