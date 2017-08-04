<template>

  <div class="wx-group media-list list-block" style="margin: 12px 0px 12px 0px;">
    <div class="list-group">
      <ul class="wx-contacts">
        <li class="wx-item" style="padding:0px 0px 0px 8px;">
          <div class="wx-name" style="height: 36px; display: flex;align-items: center;">
            <span style="font-size: 20px;color: black">{{propTitle}}</span>
          </div>
        </li>

        <li v-for="item in items" class="wx-item employee-card">
          <router-link :to="{path:item.iframePath,query: {redirect:item.link,title:item.iframeTitle,backInfo:$t('header')[0].backInfo,from:'?from=demo'}}" style="width:100%">
              <span class="wx-icon edit-head-photo cut-img" style="min-width:75px;min-height:75px;border: 1px solid #cecece;">
                  <img :src="item.photo" style="width: 75px;height: 75px;" v-if="item.hasImg"/>
                  <div :style="'background-color:'+item.photoColor" class="photo-text" v-else>{{item.abbChar}}</div>
              </span>
          <div>
            <div class="wx-name" style="font-weight:bold">{{item.subtitle}}</div>
            <span class="wx-pos" style="font-size:12px; color:#7d7d7d">{{item.text[0]}}</span>
          </div>
            </router-link>
        </li>

      </ul>
    </div>
  </div>


</template>
<style scoped>
  .item-media-img {
    width: 50px;
    height: 50px;
  }
  .employee-card{
    margin-left: 8px;
    min-height: 85px;
    display: flex;
    align-items: center;
  }
  .cut-img{
    border-radius: 50%;
    overflow: hidden;
  }
</style>
<script>
  import {dealUsrPhoto} from '../utils/tools';
  export default {
    name: 'MediaList',

    /**
     * @type {string} propTitle
     * @type {{img: string, subtitle: string, text: [string], link: string}[]} propItems
     */
    props: ['propTitle', 'propItems','titleImg'],

    data() {
      return {
        title: this.propTitle,
      };
    },
    methods:{

    },

    /**
     * @description 多语言
     */
    locales: {
      en: {
        header: [{
          backInfo: 'Back',
        }]
      },

      zh: {
        header: [{
          backInfo: '返回',
        }]
      },
    },

    computed: {
      items() {
        console.log(this.propItem);
        if(!this.propItem || !this.propItem.nameTxt){
          return this.propItem;
        }else{
          return dealUsrPhoto(this.propItem,this.propItem.nameTxt);
        }
      },
    },

  };
</script>
