<template>
  <div>
      <span class="wx-content upload edit-attatchment" @click="openImage">
          <img :src="photo" style='height:48px;width: 48px;' v-if="hasImage">
          <i class="WeStar_iconfont right-arrow font-color-with-imp noDataItem" v-else>&#xe614;</i>
      </span>
      <div class="wx-name">{{title}}
        <span class="font-red" v-if="!nullable">*</span>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'ImageItem',

    props: {
      nullable:{
        type: Boolean,
        default: true
      },
      title : {
        type : String
      },
      photo : {
        type : String,
        default : null
      },
      dest : {
        type : String,
        default : 'leaveApply'
      }
    },

    computed: {
      hasImage(){
        if(this.photo !== undefined && this.photo !== null && this.photo !== ''){
          return true;
        }else{
          return false;
        }
      }
    },

    methods: {
      openImage(){
        let me = this;
        me.$router.push({ path: '/home/uploadPic', query: { from: this.dest ,photo:this.photo}});
      }
    },
    components: {
    }
  }
</script>

<style scoped>
 
</style>
