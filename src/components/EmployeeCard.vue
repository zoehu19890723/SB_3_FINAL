<template>
  <div class="list-block media-list" style="margin-top: 15px; ">
    <ul>
      <li>
        <div class="item-content" style="align-items:flex-start">
          <div class="item-media" id="profileImg">
            <img v-lazy="itemObj.photo" class="img-response" v-if="itemObj.hasImg"/>
            <div :style="'background-color:'+itemObj.photoColor" class="photo-text" v-else>{{itemObj.abbChar}}</div>
          </div>
          <div class="item-inner profileItems">
            <div class="item-title-row" style="justify-content:flex-start">
              <div v-if="lang=='zh'"  class="item-title color-black">{{ itemObj.displayName_CN }}</div>
              <div v-else  class="item-title color-black">{{ itemObj.displayName_US }}</div>
              <router-link :to="{ path:itemObj.likeUrl,query: { id: this.uid }}" class="button" style="height:20px;line-height:20px;display: inherit; margin: 0 10px;">{{ $t('like')}}
              </router-link>
            </div>
            <div class="item-subtitle" style="display: flex;flex-wrap: wrap;">
              <div>
                <div v-if="lang=='zh'" style="color: #333333">{{itemObj.department_CN}}</div>
                <div v-else style="color: #333333">{{itemObj.department_US}}</div>
              </div><div style="margin: 0 5px;font-size: 14px;" class="color-gray" >|</div>
              <div>
                <div v-if="lang=='zh'" style="color: #333333">{{itemObj.position_CN}}</div>
                <div v-else style="color: #333333">{{itemObj.position_US}}</div>
              </div>
            </div>
            <!--<div class="item-subtitle" style="display: flex;flex-wrap: wrap;">-->
              <!--<div class="chip bg-blue" style="margin-right: 5px;">-->
                <!--<div v-if="lang=='zh'" class="chip-label">{{itemObj.department_CN}}</div>-->
                <!--<div v-else class="chip-label">{{itemObj.department_US}}</div>-->
              <!--</div>-->
              <!--<div class="chip bg-blue">-->
                <!--<div v-if="lang=='zh'" class="chip-label">{{itemObj.position_CN}}</div>-->
                <!--<div v-else class="chip-label">{{itemObj.position_US}}</div>-->
              <!--</div>-->
            <!--</div>-->
            <div class="item-subtitle">
              <a :href="'mailto:'+itemObj.email">
              <i class="f7-icons">email</i><span class="color-black">{{itemObj.email}}</span>
              </a>
            </div>
            <div class="item-subtitle">
              <a :href="'tel:'+itemObj.mobile">
              <i class="f7-icons">phone</i><span class="color-black">{{itemObj.mobile}}</span>
              </a>
            </div>
            <div v-if="typeof(daysAwayBirthday())=='string'">
            </div>
            <div v-else>

              <div v-if="daysAwayBirthday()<7">
                <div class="item-subtitle">
                  <i class="iconfont icon-cake color-red" style="font-size: 16px;"></i>
                  <span style="margin-left:3px;">
                    {{ $t('birthdayText')[2] }}
                  </span>
                </div>
              </div>
              <div v-else class="item-subtitle">
                <i class="iconfont icon-cake" style="font-size: 16px;"></i>
                <span style="margin-left:3px;">{{ $t('birthdayText')[0] }}{{daysAwayBirthday()}}{{ $t('birthdayText')[1] }}
                <router-link :to="{ path:itemObj.sendUrl,query: { id: this.uid }}" class="button" style="width: 90px;display: inherit; margin: 0 10px;">{{ $t('blessing')}}
                  </router-link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {dealUsrPhoto,TotalDays} from '../utils/tools';
  export default {
    name: 'EmployeeCard',
    props: [ 'propTitle','propItem','userId'],

    data() {
      return {
        uid:this.userId,
        title: this.propTitle,
        name:'',
        department:'',
        position:'',
        lang:localStorage.getItem('EP_lang')
      };
    },
    created:function(){


    },
    mounted:function() {

    },
    methods:{
         daysAwayBirthday:function(){
             var birthday = this.itemObj.birthday
             var daysTotal = 0;
           if(birthday){
             var  date  =  new Date();
             var year = date.getFullYear();//当前年份
             var _month = date.getMonth() + 1;//当前月份
             var _day =date.getDate();//当前天数
             var month = parseInt(birthday.split('-')[1]);//生日月份
             var day = parseInt(birthday.split('-')[2]);//生日天数
             if (month > _month)
             {
               for (var j = _month; j < month; j++)
               {
                 daysTotal = TotalDays(year, j, daysTotal);
               }
               daysTotal = daysTotal + day - _day;
             } else if (month < _month) {
               for (var k = month; k < _month; k++) {
                 daysTotal = TotalDays(year,k, daysTotal);
               }
               var dayFull = TotalDays(year, 0, daysTotal);
               daysTotal = dayFull - daysTotal + day - _day;
             } else
             {
               if (day >= _day) {
                 daysTotal = day - _day;
               } else
               {
                 daysTotal = TotalDays(year, 0, daysTotal) - (_day - day);
               }
             }
             return daysTotal;
           }else{
             daysTotal = '--'
               return daysTotal;
           }
           }
    },
    /**
     * @description 多语言
     */
    locales: {
      en: {
        header: [{
          backInfo: 'Back',
        }],
        birthdayText:['','d to the B-Day','Happy birthday'],
        name:'',
        blessing:'blessing',
        like:'Like'
      },

      zh: {
        header: [{
          backInfo: '返回',
        }],
        birthdayText:['距生日还有','天','祝生日快乐'],
        name:'',
        blessing:'祝福',
        like:'点赞'
      },
    },
    computed: {
      itemObj() {
        if(!this.propItem || !this.propItem.nameTxt){
          return this.propItem
        }else{
          return dealUsrPhoto(this.propItem,this.propItem.nameTxt);
        }
      },
    },
    components: {

    },
  }
</script>

<style scoped>
  .f7-icons{
    font-size: 15px;
  }
  .item-subtitle span{
    margin:0 10px;
  }
  .item-media{

  }
  .img-response{
    width: 48px;
    height: 48px;
    border-radius: 24px;
  }
  img[lazy=loading] {
    /*your style here*/
  }
  img[lazy=error] {
    /*your style here*/
    background-image: url("/static/img/default.jpg");
  },
  img[lazy=loaded] {
    /*your style here*/
  }
  /*
  or background-image
  */
  .yourclass[lazy=loading] {
    /*your style here*/
  }
  .yourclass[lazy=error] {
    /*your style here*/
  },
  .yourclass[lazy=loaded] {
    /*your style here*/
  }
  .photo-text{
    width: 48px;
    height: 48px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: white;
  }
</style>
