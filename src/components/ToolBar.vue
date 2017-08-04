<template>
	<div :class="['toolbar', focused ? 'focus' : '']" :style="cssStyle">
  	<div class="toolbar-inner">
      <textarea class="input_text" :rows="rowNumber" :placeholder="placeholder" @focus="onFocus" @blur="onBlur" v-model="dataValue"></textarea>
    	<a v-if="btnNumber === 1" href="#" class="cancel-link-actions" @click="_clickCancel">{{$t('cancel-apply')}}</a>
      <div class="action-btn-two" v-if="btnNumber === 2">
        <a href="#" class="approve-link-actions status-3" @click="_clickRefuse">{{$t('refuse-apply')}}</a>
        <a href="#" class="approve-link-actions" @click="_clickAgree">{{$t('approve-apply')}}</a>
      </div>
  	</div>
	</div>
</template>
<script>
  export default {
    name: 'Toolbar',

    props: {
    	btnArray : {
    		type:Array,
    		default : []
    	},
      placeholder : {
        type : String,
        default : '请输入...'
      }
    },
    mounted : function(){
      let me = this;
      window.addEventListener('native.keyboardshow', function(e) {
        var height = e.keyboardHeight;
        me.cssStyle = 'position:fixed;transition: all 0.2s linear;height:'+(160+height)+'px';
      });
      window.addEventListener('native.keyboardhide', function(e) {
       me.cssStyle = 'position:fixed;transition: all 0.2s linear;';
      });
    },
    data(){
      return {
        focused : false,
        rowNumber : 1,
        dataValue : '',
        cssStyle : 'position:fixed;transition: all 0.2s linear;'
      }
    },

    computed : {
    	btnNumber(){
    		return this.btnArray.length
    	}
    },

    methods: {
      _clickCancel(e){
      	if(this.btnNumber === 1){
      		this.btnArray[0](this.dataValue);
      	}
      },
      _clickRefuse(e){
      	if(this.btnNumber === 2){
      		this.btnArray[0](this.dataValue);
      	}
      },
      _clickAgree(e){
      	if(this.btnNumber === 2){
      		this.btnArray[1](this.dataValue);
      	}
      },
      onFocus(){
        this.focused = true;
        this.rowNumber = 4;
      },
      onBlur(){
        this.focused = false;
        this.rowNumber = 1;
      }
    },

    locales: {
      zh: {
        'cancel-apply' : '撤销申请',
        'refuse-apply' : '拒绝',
        'approve-apply' : '同意',
      },

      en: {
        'cancel-apply' : 'Withdrawn application',
        'refuse-apply' : 'Refuse',
        'approve-apply' : 'Agree',
      }
    }
  }
</script>
<style scoped>
 .input_text{
    border-radius: 16px;
    font-size: 16px;
    padding: 4px 16px;
    resize: none;
 }
 .toolbar.focus{
    height: 160px;
 }

 .focus .toolbar-inner{
    flex-direction: column;
    align-items: inherit;
    padding: 16px;
    height: 160px;
 }

 .focus .toolbar-inner textarea{
    border-radius: 4px;
 }

 .focus .toolbar-inner .cancel-link-actions{
    text-align: end;
 }
  .action-btn-two{
    display: flex;
    justify-content: space-between;
    width:100px;
  }
 .focus .action-btn-two{
    width:100%;
    margin-top: 8px;
 }

</style>