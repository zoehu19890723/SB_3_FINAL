<template>
  <div class="weui_cell">
    <div class="weui_cell_bd weui_cell_primary">
      <input :id="dataId" v-if="!isPwd" class="weui_input" type="text" :placeholder="dataPlaceholder" @keyup="onInputKeyup"  @blur="onInputBlur" @focus="onInputFocus" v-model = "dataValue">
      <input :id="dataId" v-if="isPwd" class="weui_input" type="password" :placeholder="dataPlaceholder" @keyup="onInputKeyup"  @blur="onInputBlur" @focus="onInputFocus" v-model = "dataValue">
    </div>
    <div class="weui_cell_ft" @click="onClearText"> 
      <span :class="['WeStar_iconfont', showClear ? 'showClear': 'hideClear']" >&#xe60c;&nbsp</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'InputText',

    props: {
      dataId : {
        type: String,
      },
      dataPlaceholder:{
        type: String,
      },
      isPwd:{
        type: Boolean,
        default: false
      },
      defaultV : {
        type : String,
        default: ''
      }
    },

    data(){
      return {
        showClear : false,
        dataValue : this.defaultV,
        clearclicked : false
      }
    },

    computed: {
    },

    methods: {
      onInputKeyup(e){
        let value = e.target.value.trim();
        if(value.length > 0){
          this.showClear = true;
        }else{
          this.showClear = false;
        }
      },

      onInputFocus(e){
        let value = e.target.value.trim();
        if(value.length > 0){
          this.showClear = true;
        }
      },

      onInputBlur(e){
        this.showClear = false;
      },

      onClearText(e){
        document.getElementById(this.dataId).value = '';
        this.dataValue = '';
      }

    }
  }
</script>

<style scoped>
  .weui_cell {
    padding: 10px 0;
    display: block;
    position: relative;
  }

  .weui_cell:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    -webkit-transform-origin: 0 0;
    -ms-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(.5);
    -ms-transform: scaleY(.5);
    transform: scaleY(.5);
    left: 15px;
  }

  .weui_cell_bd.weui_cell_primary{
    display: table-cell;
    vertical-align: middle;
    word-wrap: break-word;
    word-break: break-all;
    white-space: normal;
    width: 100%;
  }
  .weui_input{
    width: 100%;
    border: 0;
    outline: 0;
    -webkit-appearance: none;
    background-color: transparent;
    font-size: inherit;
    height: 1.41176471em;
    line-height: 1.41176471;
    padding: 0 20px;
    border-radius: 5px;
    box-shadow: none;
    -webkit-box-sizing: border-box;
    color: #888;
    padding-left: 15px;
    font: 400 1em/1.4 Tahoma,Arial,Roboto,"Droid Sans","Helvetica Neue","Droid Sans Fallback","Heiti SC","Microsoft YaHei",sans-self;
  }
  .weui_cell_ft{
    display: table-cell;
    vertical-align: middle;
    word-wrap: break-word;
    word-break: break-all;
    white-space: nowrap;
    text-align: right;
    color: #888;
  }
  .showClear{
    visibility: visible;
  }
  .hideClear{
    visibility: hidden;
  }
</style>
