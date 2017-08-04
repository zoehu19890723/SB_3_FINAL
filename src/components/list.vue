<template>
  <div class="list-block">
    <ul>
      <li v-for="item in items">
        <router-link :to="{path:item.iframePath,query: {id:item.id,title:item.name}}" class="item-link item-content">

          <div class="item-media">
            <i class="icon" :class="item.icon"></i>
          </div>
          <div class="item-inner">
            <div class="item-title">{{item.name}}</div>
          </div>

        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'List',
    props: ['propTitle', 'propItems'],
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
    }
  }
</script>

<style scoped>

</style>
