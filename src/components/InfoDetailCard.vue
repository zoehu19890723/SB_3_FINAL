<template>
  <div v-if="hasData">
    <div class="basic-info-card">
      <div class="user-info">
        <div class="user-image cut-img">
          <img v-lazy="detailData.applyPerson.image" style="width:60px;height:60px" :onerror="'javascript:this.src=\''+errorImagePath+'\''">
        </div>
        <div class="user-describtion">
          <div style = "font-size:14px;color: black;font-weight: bold;">{{detailData.applyPerson.name}}</div>
          <div>{{detailData.finalStatus.display}}</div>
        </div>
      </div>
      <div class="apply-descrition" v-if="!isTransfer">
        <div class="apply-item" v-for="item in detailData.leaveGeneral">
          <span style="margin-right:8px">{{item.title}} :</span>
          <span class="value">{{item.value}}</span>
        </div>
      </div>
      <div class="apply-descrition" v-if="isTransfer">
        <div class="apply-item" v-for="itemt in detailData.dataGeneral.transfer_info">
          <span style="margin-right:8px">{{itemt.title}} :</span>
          <span class="value">{{itemt.value}}</span>
        </div>
        <div class="apply-item row" v-for="itemd in detailData.dataGeneral.details">
          <span class="col-25" style="flex:1">{{itemd.title}}:</span>
          <span class="col-25 value">{{itemd.old_value}}</span>
            <span class="col-25"><i class="WeStar_iconfont">&#xe61a</i></span>
            <span class="col-25 value">{{itemd.new_value}}</span>
        </div>
      </div>
      <div class="final-status-image">
        <i class="WeStar_iconfont status-2" v-if="parseInt(detailData.finalStatus.code) === 2">&#xe60d;</i>
        <i class="WeStar_iconfont status-3" v-if="parseInt(detailData.finalStatus.code) === 3">&#xe60e;</i>
      </div>
    </div>
    <div class="approve-flow-card">
      <div class="one-item" v-for="it in detailData.approvePerson">
        <div class = "status-img step-no">
          {{it.step_no}}
        </div>
        <div class="b_main">
          <div class="border">
            <div v-for="itt in it.data">
              <div class="user-info-time">
                <span>{{itt.updateTime}}</span>
              </div>
              <div class="user-info">
                <div class="user-image cut-img">
                  <img :src="itt.image" style="width:40px;height:40px" :onerror="'javascript:this.src=\''+errorImagePath+'\''">
                </div>
                <div class="user-describtion">
                  <div class="name">{{itt.name}}</div>
                  <div :class="'status-'+itt.status.step_status">{{itt.status.display}}</div>
                  <div>{{itt.status.msg}}</div>
                </div>
              </div>
            </div>
          </div> 
          <div class="out"> 
            <div class="in"></div>
          </div>
        </div>
      </div>
      <hr class="flow-line" width= "1"> 
    </div>
  </div>
</template>

<script>
  import {assetsPublicPath} from '../config';
  export default {
    name : 'InfoDetailCard',
    
    props : {
      detailData : {
        type : Object,
        default : null
      },
    },

    data(){
      return {
        errorImagePath : assetsPublicPath + '/static/img/default.jpg'
      }
    },

    mounted : function(){
      let me = this;
      setTimeout(function(){
        if(me.detailData.approvePerson !== undefined && me.detailData.approvePerson !== null && me.detailData.approvePerson.length>0){
          let heightTop = $('.one-item').first().find('.status-img').offset().top;
          let heightBottom = $('.one-item').last().find('.status-img').offset().top;
          let height = heightBottom - heightTop + 30;
          $('.flow-line').height(height);

          let totalHeight = $('.page-content').height() - 88;
          let blockHeight = $('.basic-info-card').height() + $('.approve-flow-card').height() + 16 + 95;

          if (totalHeight > blockHeight) {
              let marginTop = totalHeight - blockHeight;
              $('.item-content.detail-edit-content').css('margin-top', marginTop);
          }
        }
      },500);
    },

    computed:{
      hasData(){
        if(this.detailData !== undefined && this.detailData !== null && this.detailData !== {} && this.detailData.applyPerson !== undefined){
          return true;
        }else{
          return false;
        }
      },
      isTransfer(){
        let data = this.detailData.dataGeneral;
        if(data === undefined){
          return false;
        }else{
          return true;
        }
      }
    },
    methods:{
    }
  }
</script>

<style scoped>
.apply-item span.value{
  word-break: break-all;
}
</style>
