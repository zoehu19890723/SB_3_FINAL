<template>

  <div class="wx-group media-list list-block" style="margin: 10px 0px">
    <div class="list-group">
      <ul class="wx-contacts">
        <li class="wx-item" style="padding:2px 8px;">
          <div class="wx-name" style="height: 36px; display: flex;align-items: center;justify-content: space-between;">
            <span style="font-size: 18px;color: black">{{propTitle}}</span>
            <span>
              <router-link to="/home/newEmpListPage"><i class="icon iconfont color-gray">&#xe677;</i>
              </router-link>
            </span>
          </div>
        </li>

        <li v-for="item in items" class="wx-item employee-card">
          <router-link :to="{path:'./home/newEmpListPage/empDetailPage',query: {id:item.id}}" style="width:100%;display: flex">
            <span class="wx-icon edit-head-photo cut-img" style="min-width:60px;min-height:60px;border: 1px solid #cecece;">
              <img v-lazy="item.photo" style="width: 70px;height: 70px; margin: -5px 0 0 -5px" v-if="item.hasImg"/>
              <div :style="'background-color:'+item.photoColor" class="photo-text" v-else>{{item.abbChar}}</div>
            </span>
            <div>
              <div v-if="lang=='zh'" class="wx-name" style="font-weight:bold">{{item.displayName_CN}}</div>
              <div v-else class="wx-name" style="font-weight:bold">{{item.displayName_US}}</div>

              <div class="item-subtitle" style="display: flex;flex-wrap: wrap;">
                <div>
                  <div v-if="lang=='zh'" style="color: #333333">{{item.department_CN}}</div>
                  <div v-else style="color: #333333">{{item.department_US}}</div>
                </div><div style="margin: 0 5px;font-size: 14px;" class="color-gray" >|</div>
                <div>
                  <div v-if="lang=='zh'" style="color: #333333">{{item.position_CN}}</div>
                  <div v-else style="color: #333333">{{item.position_US}}</div>
                </div>
              </div>
              <div class="item-subtitle">
                <span class="color-gray" style="font-size: 0.6rem">{{$t('entryDate')}}{{item.enterDate}}</span>
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
  .photo-text{
    width: 70px;
    height: 70px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: white;
    margin: -5px 0 0 -5px
  }
</style>
<script>
  import {dealUsrPhoto} from '../utils/tools';
  export default {
    name: 'NewEmpList',

    /**
     * @type {string} propTitle
     * @type {{img: string, subtitle: string, text: [string], link: string}[]} propItems
     */
    props: ['propTitle', 'propItems','titleImg'],

    data() {
      return {
        title: this.propTitle,
        lang:localStorage.getItem('EP_lang')
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
        }],
        entryDate:'Entry date:'
      },

      zh: {
        header: [{
          backInfo: '返回',
        }],
        entryDate:'入职日期：'

      },
    },

    computed: {
      items() {
        this.propItems.forEach((item)=>{
          if(item.nameTxt){
            item = dealUsrPhoto(item,item.nameTxt);
          }
        });
        return this.propItems;
      },
    },

  };
</script>
