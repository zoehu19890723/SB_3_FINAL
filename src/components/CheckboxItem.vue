<template>
  <li class="wx-item" >
    <span class="wx-content">
      <span>{{text}}</span>
      <label class="label-switch" @click.prevent="changeState"> 
        <input type="checkbox" class="weui-input" v-if="!checked"/>
        <input type="checkbox" class="weui-input" checked v-else/>
        <div class="checkbox"></div>
      </label>
    </span>
    <div class="wx-name">
      {{title}}
       <span class="font-red" v-if="!nullable">*</span>
    </div>
</li>
</template>

<script>
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
      checkState:{
        type: [String,Number]
      },
      changeAction : {
        type: Function,
        default: null
      },
      text : {
        type : String,
        default : ''
      }
    },
    data() {
      return{
        activeState :  null
      }
    },
    computed: {
      checked(){
        let state = null;
        if(this.activeState === null){
          state  = parseInt(this.checkState) === 1 ? true : false;
        }else{
          state  = this.activeState === 1 ? true : false;
        }
        return state;
      }
    },

    methods: {
      changeState(){
        let me = this;
        if(this.checked === false){
          this.activeState = 1;
        }else{
          this.activeState = 0;
        }
        if(me.changeAction !== undefined && me.changeAction !== null && typeof me.changeAction === 'function'){
          me.changeAction(this.activeState);
        }
      }
    }
  }
</script>

<style scoped>
</style>
