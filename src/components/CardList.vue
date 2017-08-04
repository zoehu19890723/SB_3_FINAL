<template>

  <scroller style="margin-top: 44px" :on-refresh="refresh" :on-infinite="infinite" ref="dynamic_scroller">
    <div class="card demo-card-header-pic" v-for="item in items">
      <div class="card-content">
        <div class="card-content-inner">
          <p class="color-gray" v-html="item.title" style="margin-bottom: 1rem"></p>
          <p class="color-black" v-html="item.content"></p>
        </div>
      </div>
      <div class="card-footer">
        <a href="#">
          <p class="color-gray">{{$t('text')[0]}} &nbsp;&nbsp;&nbsp;{{item.dateDay}}，{{item.dateTime}}</p>
        </a>
        <router-link class="link" v-if="item.type=='blogs'" :to="{path:'./my/myDynamic/myDynamicDetail',query: {id:item.id}}">
          <p>{{$t('text')[1]}}</p>
        </router-link>
      </div>
    </div>

  </scroller>

</template>

<script>
  export default {
    name: 'CardList',
    props: [ 'propItems'],

    data() {
      return {
        title: this.propTitle,
      };
    },
    created:function(){
    },
    mounted:function() {
      setTimeout(() => {
        this.$refs.dynamic_scroller.resize()
      })
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
        text:[
            'Posted on',
            'Read more',
            'Like'
        ]
      },

      zh: {
        header: [{
          backInfo: '返回',
        }],
        text:[
          '发布于',
          '详情',
          '赞'
        ]
      },
    },
    computed: {
      items() {
        return this.propItems;
      },
    },
    components: {

    },
  }
</script>

<style scoped>

</style>
