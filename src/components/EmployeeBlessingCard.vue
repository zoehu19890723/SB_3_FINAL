<template>
  <div class="content-block" style="margin:0 0 10px 0;padding: 0">
    <div class="content-block-inner" style="padding-top: 0;padding-right:0">
      <div class="subtitle-in" style="font-size: 14px;line-height: 30px;padding-left: 15px;">
        <span> {{propTitle}}</span>
      </div>
      <div  style="padding: 5px 15px;">
        <div class="row">
          <div class="col-33" v-for="(card, index) in cardTotal">
            <router-link :to="{path:cardDetailPath,query: {index:index}}" style="display: flex;flex-direction: column;align-items: center;border-radius: 5px;padding: 5px;" :style="{background:card.cardColor}">
              <i class="iconfont" :class="card.cardIcon" style="color:white;font-size: 1.2rem">×{{card.cardNumber}}</i>
              <span style="color:white;font-size: 0.6rem;">{{card.cardName}}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BlessingCard',
    props: [ 'propTitle','propItem','cardDetailPath'],

    data() {
      return {
        lang:localStorage.getItem('EP_lang')
      };
    },
    created(){
    },
    mounted(){

    },
    computed: {
      cardTotal(){
        let item = {
          cardAvailables:false,
          cardColor:"",
          cardIcon:"",
          cardId:"",
          cardName:"",
          cardNumber:"",
          cardType:""
        }

        while (this.propItem.length!=0&&this.propItem.length%3!=0)
        {
          this.propItem.push(item)
        }

        return this.propItem
      }
    },
    methods:{
    },
    /**
     * @description 多语言
     */
    locales: {
      en: {

      },

      zh: {

      },
    },
    components: {

    },
  }
</script>

<style scoped>
  .subtitle-in:after{
    content: '';
    right: auto;
    top: auto;
    height: 1px;
    width: 100%;
    background-color: #c8c7cc;
    display: block;
    z-index: 15;
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
  }
</style>
