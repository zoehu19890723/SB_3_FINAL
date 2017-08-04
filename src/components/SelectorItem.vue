<template>
  <div>
    <span class="wx-content">
      <input type="text" :id="fieldCode" class="weui-input"  value="" sourceValue="" readonly v-model="dataValue" :placeholder="placeholder" :data-flag = "dataFlag"/>
      <i class="WeStar_iconfont right-arrow">&#xe624;</i>
    </span>
    <div class="wx-name">
      {{title}}
      <span class="font-red" v-if="!nullable">*</span>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  export default {
    name: 'CheckboxItem',

    props: {
      title : {
        type: String,
      },
      nullable:{
        type: Boolean,
        default: true
      },
      fieldCode:{
        type: String
      },
      defaultValue : '',
      avaliableArray : {
        type: Array
      },
      placeholder : '',
      changeAction : {
        type: Function,
        default: null
      },
      closeAction: {
        type: Function,
        default: null
      },
    },
    computed:{
      dataFlag(){
        if(this.avaliableArray !== undefined && this.avaliableArray!== null && this.avaliableArray.length > 0 ){
          this.initPicker();
          return true;
        }else{
          return false;
        }
      }
    },

    mounted : function(){
      if(this.avaliableArray !== undefined && this.avaliableArray!== null && this.avaliableArray.length > 0){
        this.initPicker();
      }
    },

    data(){
      return {
        picker : null,
        dataValue : '',
        pickerInited : false
      }
    },
    locales: {
      zh: {
        'sure' : '确认',
      },

      en: {
        'sure' : 'Sure',
      }
    },

    methods: {
      initPicker(){
        let me = this;
        let avaliableArray = me.avaliableArray;
        let defaultValue = me.defaultValue;
        let deval = [];
        let value = null;
        if(defaultValue !== undefined && defaultValue !== '' && defaultValue !== null){
          value = _.find(avaliableArray,{
            value : defaultValue
          });
          if(value){
            deval = [value.value];
          }
          
        }else if(avaliableArray.length > 0){
          value = avaliableArray[0].value;
          deval = [value];
        }

        me.picker = f7.picker({
          input: '#'+me.fieldCode,
          toolbarTemplate: '<div class="toolbar">' +
              '<div class="toolbar-inner">' +
              '<div class="left">' +
              '<a href="#" class="link toolbar-randomize-link"></a>' +
              '</div>' +
              '<div class="right">' +
              '<a href="#" class="link close-picker">'+this.$t('sure')+'</a>' +
              '</div>' +
              '</div>' +
              '</div>',
          value : deval,
          textAlign : 'center',
          cols: [{
              values: (function() {
                  let arr = [];
                  avaliableArray.forEach(function(value,index) {
                      if(typeof value === "object" && value.value !== undefined){
                          arr.push(value.value);
                      }else{
                          arr.push(value);
                      }
                  });
                  return arr;
              })(),
              displayValues: (function() {
                  let disArr = [];
                  avaliableArray.forEach(function(value,index) {
                      if(typeof value === "object" && value.display !== undefined){
                          disArr.push(value.display);
                      }else{
                          disArr.push(value);
                      }
                  });
                  return disArr;
              })()
          }],
          formatValue: function(p, values, displayValues) {
            return displayValues;
          },
          onChange: function(p, values, displayValues) {
            if(p.cols[0] !== undefined && p.cols[0] !== null){
              let seleted = p.cols[0].value;
              if(me.changeAction !== undefined && me.changeAction !== null && typeof me.changeAction === 'function'){
                me.changeAction(seleted);
              }
            }
          },
          onClose : function(p){
            if(me.closeAction !== undefined && me.closeAction !== null && typeof me.closeAction === 'function'){
              me.closeAction(p.value);
            }
          }
        });
        if(defaultValue !== undefined && defaultValue !== '' && defaultValue !== null){
          let display = _.find(me.avaliableArray,{
            value : defaultValue
          });
          if(display){
            me.dataValue = display.display;
          }
          
        }
      }
    }
  }
</script>

<style scoped>
</style>
