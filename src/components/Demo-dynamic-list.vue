<template>
  <div class="wx-group media-list" style="margin-bottom:20px">
    <div class="list-group">
      <ul class="wx-contacts">
        <li class="wx-item" style="padding:0px 0px 0px 8px;background-color: #cfcfcf;">
          <div class="wx-name" style="height: 36px; display: flex;align-items: center;">
                            <span v-if="titleImg">
                                 <img :src="titleImg" style="width: 70px;margin: 0 10px 0 0;">
                            </span>
            <span style="font-size: 14px;color: black;">{{propTitle}}</span>
          </div>
        </li>

        <li  v-for="item in items" class="wx-item" style="height:60px;margin-left:8px">
          <router-link :to="{path:item.iframePath,query: {redirect:item.link,title:item.iframeTitle,backInfo:$t('header')[0].backInfo,from:'?from=demo'}}" style="width:100%">
                        <span class="wx-icon" style="width:90px ;height:60px;border-radius: 2px;overflow:hidden">
                            <img :src="item.img" style = "width:90px ;height:60px;">
                        </span>
          <div class="wx-name">{{item.subtitle}}</div>
          <div class="wx-pos" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;font-size:12px">
            <span style="margin-right:8px">{{item.text[0]}}</span>
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
  .wx-pos{
    color:#7d7d7d
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
