<template>
  <div class="wx-form" @click="_submitAction">
    <button :class="[clx, disable?'disable_btn_color':'back-color-imp']">{{btnText}}</button>
  </div>
</template>

<script>
  export default {
    name: 'SubmitBtn',

    props: ['btnText','submitAction','clx','disable'],

    methods: {
      _submitAction(e){
        if(!this.disable){
          this.submitAction(e);
        }
      }
    }
  }
</script>

<style scoped>
  .wx-form {
    display: -webkit-box;
    -webkit-box-align: center;
    margin: 0 12px;
  }
  .weui_btn {
    width: 100%;
    border-width: 0;
    outline: 0;
    -webkit-appearance: none;
    position: relative;
    display: block;
    box-sizing: border-box;
    text-align: center;
    text-decoration: none;
    line-height: 29px;
    border-radius: 5px;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    overflow: hidden;
    font-family : 'Heiti SC', DroidSansFallback, '微软雅黑', serif;
    margin:20px 0;
    font-size: 17px;
    padding: 8px 14px;
  }
  .code_btn{
    line-height: 32px;
    padding: 4px;
  }
  .disable_btn_color{
    background-color: rgb(221,221,221)
  }
</style>
