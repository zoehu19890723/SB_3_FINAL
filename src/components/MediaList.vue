<template>
  <div>
  <div class="content-block-title">
    <img :src="titleImg" v-if="titleImg" style="width: 70px;margin: 0 10px 0 0;">
    {{propTitle}}
  </div>
  <div class="list-block media-list">
    <ul>
      <li v-for="item in items">
        <router-link :to="{path:item.iframePath,query: {redirect:item.link,title:item.iframeTitle,backInfo:$t('header')[0].backInfo,from:'?from=demo'}}" class="item-content item-link">
          <div class="item-media">
            <img class="item-media-img" :src="item.img">
          </div>
          <div class="item-inner">
            <div class="item-subtitle">{{item.subtitle}}</div>
            <div class="item-text">
              {{item.text[0]}}<br>
              {{item.text[1]}}
            </div>
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
</style>
<script>
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
