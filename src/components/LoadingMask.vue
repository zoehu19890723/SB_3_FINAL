<template>
  <div id="ess_loadingToast" class="weui_loading_toast" v-if="mask.show"> 
    <div class="weui_mask_transparent"></div> 
    <div :class="['weui_toast','specStyle',mask.loading ? '':'onlyText']"> 
      <div class="weui_loading" v-if="mask.loading">
        <div class="weui_loading_leaf weui_loading_leaf_0"></div> 
        <div class="weui_loading_leaf weui_loading_leaf_1"></div> 
        <div class="weui_loading_leaf weui_loading_leaf_2"></div> 
        <div class="weui_loading_leaf weui_loading_leaf_3"></div> 
        <div class="weui_loading_leaf weui_loading_leaf_4"></div> 
        <div class="weui_loading_leaf weui_loading_leaf_5"></div> 
        <div class="weui_loading_leaf weui_loading_leaf_6"></div> 
        <div class="weui_loading_leaf weui_loading_leaf_7"></div> 
        <div class="weui_loading_leaf weui_loading_leaf_8"></div> 
        <div class="weui_loading_leaf weui_loading_leaf_9"></div> 
        <div class="weui_loading_leaf weui_loading_leaf_10"></div> 
        <div class="weui_loading_leaf weui_loading_leaf_11"></div> 
      </div> 
      <p :class="['weui_toast_content',mask.loading ? '':'onlyText']" style="text-align: center">{{mask.text}}</p> 
    </div> 
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'LoadingMask',
  computed : {
    ...mapGetters(['mask'])
  }
}
</script>

<style scoped>
.specStyle{
  width: 100px;
  min-height: 100px;
  top: calc(50% - 50px);
  left: calc(50% + 10px);
}
.weui_toast.onlyText{
  width: initial;
  min-height: initial;
  padding: 16px;
}
.weui_toast_content.onlyText{
  margin-top: inherit;
}
</style>
