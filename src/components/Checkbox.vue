<template>
  <label class="label-switch" @click.prevent="setCheckState"> 
    <input type="checkbox" class="weui-input" v-if="!checked"/>
    <input type="checkbox" class="weui-input" checked v-else/>
    <div class="checkbox"></div>
  </label>
</template>

<script>
  export default {
    name: 'Checkbox',

    props: {
      checkState:{
        type: [String,Number]
      }
    },
    data(){
      return{
        tempCheck : null
      }
    },
    computed: {
      checked(){
        let state = null;
        if(this.tempCheck === null){
          state  = parseInt(this.checkState) === 1 ? true : false;
        }else{
          state  = this.tempCheck === 1 ? true : false;
        }
        return state;
      }
    },
    methods : {
      setCheckState(){
        if(this.checked === false){
          this.tempCheck = 1;
        }else{
          this.tempCheck = 0;
        }
      }
    }
  }
</script>
