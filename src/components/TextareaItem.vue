<template>
  <div>
    <div class="wx-item">
      <div class="wx-name">
        {{title}}
         <span class="font-red" v-if="!nullable">*</span>
      </div>
    </div>
    <textarea :rows="rows" :maxlength="length" class="weui-input form_edit_textarea" style="width:100%;resize: none;" :placeholder="dataPlaceholder" v-model="dataValue"></textarea>
  </div>
</template>

<script>
  export default {
    name: 'TextareaItem',

    props: {
      defaultV : {
        type: String,
      },
      nullable:{
        type: Boolean,
        default: true
      },
      title : {
        type : String
      },
      dataPlaceholder : {
        type : String,
        default : '请输入'
      },
      rows :{
        type : [Number,String],
        default : 3
      },
      length : {
        type : [Number,String],
        default : 10000
      }
    },

    data(){
      return {
        dataValue : this.defaultV
      }
    }
  }
</script>

<style scoped>
 
</style>
