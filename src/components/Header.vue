<template>
  <div class="navbar">
    <div class="navbar-inner">
      <div class="left">
        <a class="link" v-if="item.backShow" @click="routerBack(item.backHref)">
          <i class="icon icon-back"></i>
          <span>{{item.backInfo}}</span>
        </a>
      </div>
    <div class="center">{{ item.title }}</div>
      <div class="right">
        <router-link class="link icon-only" v-if="item.rightShow" :to="item.rightLink">
          <i class="icon iconfont icon-chuzhenbiaoshezhi"></i>
          <span>{{ item.rightInfo }}</span>
        </router-link>
      </div>
      </div>

  </div>
</template>

<script>
  export default {
    name: 'Header',

    /**
     * @type {string} propTitle
     * @type {{img: string, subtitle: string, text: string, link: string}[]} propItems
     */
    props: ['headerInfo'],
    data(){
      return {

      }
    },
    computed:{
      item() {
        return this.headerInfo;
      }
  },
  methods:{
    routerBack(href){
      if(href&&href.length>1){
        this.$router.push(href);
      }else{
        this.$router.back();
      }
    }
  }
  }
</script>

<style scoped>
.navbar .navbar-inner .left{
  width: 20%;
}
.navbar .navbar-inner .right{
  width: 20%;
  display: flex;
  justify-content: flex-end;
}
.navbar .navbar-inner .center{
  display: block;
}

</style>
