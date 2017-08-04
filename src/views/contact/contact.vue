<template>
  <div class="page">
    <NavBar :headerInfo="header"></NavBar>
    <v-content className="page-content">
      <SearchItem :onSearch="onSearch" :onSearchCancel="onSearchCancel" :onSearchFocus="onSearchFocus" :defaultStatus ="searchStatus" :defaultValue="searchContext"></SearchItem>
      <div class="search-mask" v-if="searchFocus"></div>
      <div v-if="doSearch" style="height:calc(100% - 30px)">
        <NoDataCard v-if="searchList.length === 0 " class="wx-title no-search-result" :title="$t('noResult')"></NoDataCard>
        <div class="wx-group" v-else>
          <ul class="wx-contacts seeDetail">
            <li class="wx-title group-title common-layout-center">{{$t('search-result')}}</li>
            <li v-for="item in searchList" class="wx-item">
              <ContactItem :item = "item" fromTab="search"></ContactItem>
            </li>
          </ul>
        </div>
      </div>
      <TabItemNew :tabArray="tabArray" :initalIndex = "currentTab" :onclick="chooseTab" style="height:calc(100% - 30px)" v-if="!doSearch">
        <div class="content-block tab-content-detail" slot="tab1">
            <NoDataCard v-if="favorList.length === 0" class="nofavor-tip" :title="$t('noFavorContact')"></NoDataCard>
            <InfiniteScroller class="wx-group" :scrollBottom="getMoreFavor" style="height:100%" className="favorContact" v-else>
              <ul class="wx-contacts seeDetail">
                <li v-for="item in favorList" class="wx-item">
                  <ContactItem :item = "item" fromTab="favor"></ContactItem>
                </li>
              </ul>
            </InfiniteScroller>
        </div>
        <div slot="tab2" class="tab-content-detail">
          <NoDataCard v-if="contactList.length === 0 " class="wx-title no-search-result" :title="$t('noContact')"></NoDataCard>
          <InfiniteScroller class="wx-group" :scrollBottom="getMoreContact" className="allContact" v-else>
            <ul class="wx-contacts seeDetail">
              <li v-for="item in contactList" class="wx-item">
                <ContactItem :item = "item" fromTab="all"></ContactItem>
              </li>
            </ul>
          </InfiniteScroller>
        </div>
      </TabItemNew>
    </v-content>
  </div>
</template>

<script>
  import VContent from '../../components/Content';
  import {APP_ENV_NOW} from '../../config';
  import NavBar from '../../components/NavBar';
  import SearchItem from '../../components/SearchItem';
  import TabItemNew from '../../components/TabItemNew';
  import ContactItem from '../../components/ContactItem';
  import InfiniteScroller from '../../components/InfiniteScroller';
  import { mapGetters } from 'vuex';
  import NoDataCard from '../../components/NoDataCard';

  export default {
    created:function(){
    },
    beforeRouteEnter(to, from, next) {
      next(vm=>{
        if(from.query.fromContact){
          vm.initalTab = from.query.fromContact;
        }
        if(!from.query.fromContact || from.query.fromContact !== 'search'){
          vm.$store.commit('clearSearchList');

          vm.$store.dispatch('getAllContact',{
            page : vm.currentPage.all,
            number : vm.per_page
          })
        }else{
          vm.doSearch = true;
          vm.defaultStatus = true;
        }
      });
    },
    data() {
      return {
        header:{
          backShow:false,
          rightShow:true,
          rightInfo:'',
          show:true,
          title:this.$t('company-contact')
        },
        tabArray :[this.$t('myFavor'),this.$t('allContact')],
        doSearch : false,
        searchFocus : false,
        currentPage : {
          all : 1,
          search : 1
        },
        per_page : 20,
        searchKey : '',
        initalTab : 'favor',
        defaultStatus : false
      }
    },

    computed : {
      favorList(){
        return store.get('favorList') || [];
      },
      currentTab(){
        if(this.initalTab === 'all'){
          return 1;
        }else{
          return 0;
        }
      },
      searchStatus(){
        return this.defaultStatus;
      },
      ...mapGetters(['contactList','searchList','searchContext'])
    },

    methods: {
      onSearchFocus(){
        this.searchFocus = true;
      },

      onSearchCancel() {
        this.doSearch = false;
        this.searchFocus = false;
        this.$store.commit('clearSearchList');
      },

      onSearch(key){
        this.searchKey = key;
        this.$store.commit('clearSearchList');
        this.$store.dispatch('getSearchContact',{
          key : this.searchKey,
          page : this.currentPage.search,
          number : this.per_page
        }).then(
          (response)=>{
            this.doSearch = true;
            this.searchFocus = false;
          }
        )
      },
      getMoreSearch(){
        this.currentPage.search++;
        this.$store.dispatch('getSearchContact',{
          key : this.searchKey,
          page : this.currentPage.search,
          number : this.per_page
        })
      },
      getMoreContact(){
        this.currentPage.all++;
        this.$store.dispatch('getAllContact',{
          page : this.currentPage.all,
          number : this.per_page
        })

      },
      chooseTab(tab){
      }
    },

    components: {
      VContent,
      NavBar,
      SearchItem,
      TabItemNew,
      ContactItem,
      InfiniteScroller,
      NoDataCard
    },

    locales: {
      zh: {
        'company-contact' : '我的同事',
        'search-tip' : '搜索姓名/职位/部门',
        'noFavorContact' : '没有收藏的联系人',
        'favorContact' : '收藏的联系人',
        'noResult' : '找不到符合条件的联系人',
        'search-result' : '搜索结果',
        'search-history' : '搜索历史',
        'searchTextNull' : '搜索内容不能为空',
        'cancel' : '取消',
        'noContact' : '没有任何联系人',
        'myFavor' : '我的好友',
        'allContact' : '所有人'
      },

      en: {
        'company-contact' : 'My Colleague',
        'search-tip' : 'Search name/postion/department',
        'noFavorContact' : 'No collection of contacts',
        'favorContact' : 'Collection of contacts',
        'noResult' : 'Cannot find qualified contact',
        'search-result' : 'Search results',
        'search-history' : 'Search history',
        'searchTextNull' : 'Search Text cannot be null',
        'cancel' : 'Cancel',
        'noContact' : 'No any Colleague',
        'myFavor' : 'My Favor',
        'allContact' : 'All Contact'
      }
    }
  }

</script>

<style  scoped>
.wx-pos{
  color : rgb(125,125,125);
}
.page-content{
  padding-bottom: 53px!important;
  overflow-x: hidden;
}
.tab-content-detail{
  height: 100%;
  overflow: hidden;
}
.wx-contacts.seeDetail{
  margin-top: 0px;
}
.wx-group.infinite-scroll{
  height: 100%;
  overflow: auto;
}
.search-mask{
  height: calc(100% - 83px);
  width: 100%;
  position: absolute;
  z-index: 1;
  background-color: #212121;
  opacity: 0.3;
}
.nofavor-tip{
  margin-top: 20px;
}
</style>
