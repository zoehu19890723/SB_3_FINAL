<template>
  <div>
    <slot v-for="item in items">
        <div class="wx-group media-list list-block" style="margin: 12px 0px 12px 0px;">
          <div class="list-group">
            <ul class="wx-contacts">
              <li class="wx-item" style="padding: 2px 8px;">
                <div class="wx-name" style="height: 36px; display: flex;align-items: center;justify-content: space-between;">
                  <img :src="titleImg" v-if="titleImg" style="width: 70px;margin: 0 10px 0 0;">
                  <span style="font-size: 20px;color: black">{{item.name}}</span>
                  <span>
              <router-link :to="{path:item.listLink,query: {id:item.id,title:item.name}}"><i class="icon iconfont">&#xe677;</i>
              </router-link>
            </span>
                </div>
              </li>
              <slot v-if="item.posts.size!=0">

                <li  v-for="itemInfo in item.posts" class="wx-item" style="height:80px;margin-left:8px" @click="openPage(itemInfo.link,itemInfo.subTitle)">
                  <!-- <router-link :to="{path:itemInfo.iframeLink,query: {redirect:itemInfo.link,title:itemInfo.subTitle}}" style="width:100%"> -->
                        <span class="wx-icon" style="width:90px ;height:60px;border-radius: 2px;overflow:hidden">
                            <img :src="itemInfo.img" style = "width:90px ;height:60px;">
                        </span>
                    <div class="wx-name">{{itemInfo.subTitle}}</div>
                    <div class="wx-pos" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;font-size:12px">
                      <span style="margin-right:8px">{{itemInfo.abstract}}</span>
                    </div>
                  <!-- </router-link> -->
                </li>

              </slot>

            </ul>

          </div>
        </div>
    </slot>
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
  import {openLink} from '../utils/tools';
  export default {
    name: 'Multi-MediaList',

    /**
     * @type {string} propTitle
     * @type {{img: string, subtitle: string, text: [string], link: string}[]} propItems
     */
    props: ['propTitle', 'propItems','titleImg'],

    create(){

    },

    methods: {

      openPage(link,title){
        //   if(localStorage.getItem('EP_browser')==="android"){
        //     var ref = cordova.InAppBrowser.open(link+'?token='+localStorage.getItem('EP_token'), '_blank', 'location=yes,toolbar=yes');
        //   }else{
        //     var ref = cordova.InAppBrowser.open(link+'?token='+localStorage.getItem('EP_token'), '_blank', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption='+this.$t('button'));
        //   }
        // ref.show()
        let path = '/dynamic/dynamicList/iframePage';
        openLink(link,title,path);
      }

    },



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
        }],
        button:'Close'
      },

      zh: {
        header: [{
          backInfo: '返回',
        }],
        button:'关闭'
      },
    },

    computed: {
      items() {
        return this.propItems;
      },
    },

  };
</script>
