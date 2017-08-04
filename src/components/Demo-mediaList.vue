<template>
  <div class="wx-group media-list list-block" style="margin: 10px 0px">
    <div class="list-group">
      <ul class="wx-contacts">
        <li class="wx-item" style="padding: 2px 8px;">
          <div class="wx-name" style="height: 36px; display: flex;align-items: center;justify-content: space-between;">
            <img :src="titleImg" v-if="titleImg" style="width: 70px;margin: 0 10px 0 0;">
            <span style="font-size: 18px;color: black">{{propTitle}}</span>
            <span>
              <router-link to="/home/hotPositionPage"><i class="icon iconfont color-gray">&#xe677;</i>
              </router-link>
            </span>
          </div>
        </li>

        <li class="wx-item postion-detail" v-for="item in items" style="margin-left:8px">

        <a href="#" @click="openPage(item.link,item.iframeTitle,item.iframePath)" style="width:100%">
           <span class="wx-icon" style="width:42px ;height:42px;">
                            <img :src="item.img" style = "width:42px ;height:42px;">
                        </span>
          <div class="wx-name">{{item.subtitle}}</div>
          <div class="wx-pos" style="font-size:12px">
            <span style="margin-right:8px;color:#7d7d7d;">{{item.text[0]}}</span>
            <span style="color:green;margin-right:8px">{{item.text[1]}}</span>
            <span style="color:#7d7d7d">{{item.text[2]}}</span>
          </div>
        </a>

          <!--<router-link :to="{path:item.iframePath,query: {redirect:item.link,title:item.iframeTitle,backInfo:$t('header')[0].backInfo,from:'?from=demo'}}" style="width:100%">-->
                        <!--<span class="wx-icon" style="width:42px ;height:42px;">-->
                            <!--<img :src="item.img" style = "width:42px ;height:42px;">-->
                        <!--</span>-->
            <!--<div class="wx-name">{{item.subtitle}}</div>-->
            <!--<div class="wx-pos" style="font-size:12px">-->
              <!--<span style="margin-right:8px;color:#7d7d7d;">{{item.text[0]}}</span>-->
              <!--<span style="color:green;margin-right:8px">{{item.text[1]}}</span>-->
              <!--<span style="color:#7d7d7d">{{item.text[2]}}</span>-->
            <!--</div>-->
          <!--</router-link>-->
        </li>

      </ul>
    </div>
  </div>

</template>
<style   lang="less" scoped>
  .item-media-img {
    width: 50px;
    height: 50px;
  }
  .ep-demo-list-title{
    font-size: 20px;
    color: black;
  }
</style>
<script>
  import {openLink} from '../utils/tools';
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
    methods: {
    openPage(link,title,path){
      openLink(link,title,path);
    }

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
        return this.propItems;
      },
    },

  };
</script>
