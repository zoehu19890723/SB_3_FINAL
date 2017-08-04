<template>
  <div class="card">
    <div class="wx-group">
      <ul class="wx-person">
        <li class="wx-item specli">
          <div class="wx-time" ></div>
          <span class="wx-icon edit-head-photo cut-img specImg" @click="updatePhoto(personCard.photo)">  
            <img v-lazy="personCard.photo" style="width:90px;height:90px" :onerror="'javascript:this.src=\''+errorImagePath+'\''"/>
          </span>
          <div class="wx-name" style="font-weight: bold;">{{personCard.name}}</div>
          <span class="postext">{{personCard.post || $t('unknown')}}</span>
          <span style="font-size: 15px;" class="color-gray" >|</span>
          <span class="postext">{{personCard.department || $t('unknown')}}</span>
          <div class="wx-content" style="margin-top:4px">
            <a :href="'mailto:'+ personCard.mail">
              <i class="f7-icons">email</i> 
              <span>{{personCard.mail}}</span>
            </a>
          </div>
          <div class="wx-content">
            <a :href="'tel:'+ personCard.tel">
              <i class="f7-icons">phone</i> 
              <span>{{personCard.tel}}</span>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { AutoResizeImage } from '../utils/tools';
  import {assetsPublicPath} from '../config';
  export default {
    name : 'selfCard',
    data(){
      return {
        baseURL:'',
        errorImagePath : assetsPublicPath + '/static/img/default.jpg'
      }
    },
    computed:{
      ...mapGetters(['personCard'])
    },
    methods:{
      updatePhoto(src){
        let me = this;
        // me.$router.push({ path: '/home/uploadPic', query: { from: 'selfCard' ,photo:src}});
      },
    },
    locales: {
      zh: {
        'unknown' : '未知',
      },

      en: {
        'unknown' : 'unknown',
      }
    }
  }
</script>

<style scoped>
  .specli{
    height : 90px;
  }
  .specImg{
    width:90px!important;
    height :90px!important;
  }
  .f7-icons{
    font-size: 15px;
    margin-right: 8px;
  }
  a span{
    font-size: 15px;
    color: #333;
  }
  a{
    display: flex;
    align-items: center;
    line-height: 21px;
  }
  .postext{
    color: rgb(51, 51, 51);
    font-size: 15px;
  }
</style>
