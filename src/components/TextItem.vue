<template>
  <li class="wx-item" >
    <span class="wx-content">
      <input type="text" :placeholder="dataPlaceholder" v-model="dataValue" class="weui-input"/>
    </span>
    <div class="wx-name">
      {{title}}
       <span class="font-red" v-if="!nullable">*</span>
    </div>
</li>
</template>

<script>
  export default {
    name: 'TextItem',

    props: {
      defaultV : {
        type: String,
      },
      dataPlaceholder:{
        type: String,
        default : '请输入'
      },
      nullable:{
        type: Boolean,
        default: true
      },
      title : {
        type : String
      }
    },

    computed:{
      dataValue(){
        return this.defaultV;
      }
    }
  }
</script>

<style scoped>
 
</style>
