<template>
  <div class="search-container">
    <div class="search-bar-panel" :style="{width:searhPanelWidth}">
      <i class="WeStar_iconfont">&#xe630</i>
      <form method="post" id="form" action="#" @submit.prevent style=" width: 95%;">
        <input class="input-box" type="search" @search="_onSearch" :placeholder="
          $t('search-tip')" @focus="_onSearchFocus" v-model="searchValue"/>
      </form>
    </div>
    <span class="cancel_btn" @click="_onSearchCancel">
      {{$t('cancel')}}
    </span>
  </div>
</template>
<script>

  export default {
    name: 'SearchItem',
    
    data(){
      return {
        searchValue : this.defaultValue,
        searchStatus : false,
        changed : false
      }
    },
    props: {
      onSearch: null,
      onSearchFocus : null,
      onSearchCancel : null,
      defaultStatus : false,//init status false-no search;true-search,
      defaultValue : ''
    },
    computed: {
      searhPanelWidth(){
        if(this.changed === false){
          return this.defaultStatus ? 'calc(96% - 100px)': 'calc(96% - 40px)';
        }else{
          return this.searchStatus ? 'calc(96% - 100px)': 'calc(96% - 40px)';
        }
      }
    },

    methods:{
      _onSearchFocus() {
        this.changed = true;
        this.searchStatus = true;
        if(this.onSearchFocus !== undefined && this.onSearchFocus !== null && typeof this.onSearchFocus === 'function'){
          this.onSearchFocus();
        }
      },

      _onSearchCancel() {
        this.changed = true;
        this.searchStatus = false;
        this.searchValue = '';
        if(this.onSearchCancel !== undefined && this.onSearchCancel !== null && typeof this.onSearchCancel === 'function'){
          this.onSearchCancel();
        }
      },

      _onSearch(){
        if(this.onSearch !== undefined && this.onSearch !== null && typeof this.onSearch === 'function'){
          let value = this.searchValue;
          this.onSearch(value);
        }
      }

    },

    locales: {
      zh: {
        'search-tip' : '搜索姓名/职位/部门',
        'cancel' : '取消',
      },

      en: {
        'search-tip' : 'Search name/postion/department',
        'cancel' : 'Cancel',
      }
    }
  }
</script>
<style scoped>
  .tab-item.active {
    color:  #ed8e07 !important;
  }
  .tab-item.inactive {
  }
  .search-bar-panel {
    border: 1px solid #cecece;
    margin: 4px 2%;
    height: 12px;
    border-radius: 16px;
    font-size: 14px;
    padding: 4px 8px;
    display: -webkit-box;
    -webkit-box-align: center;
    display: flex;
    align-items: center;
    transition: all .2s linear;
    -moz-transition: all .2s linear;
    -webkit-transition: all .2s linear;
    -o-transition: all .2s linear;
    background: white;
  }
</style>
