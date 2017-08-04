<template>
  <div>
    <div class="tab-myleave">
      <span v-for="(item,index) in tabs" :class="['tab-custom',index === currentIndex ?'active cdp-red':'']" @click="_click(index)">{{item.text}}</span>
    </div>
    <div class="tabs-animated-wrap tab-content">
      <div class="tabs">
        <div v-for="(item,index) in tabs" :class="['tab tab-overflow-auto',index === currentIndex ?'active':'']">
          <slot :name="'tab'+(index+1)"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    tabArray :{
      type : Array,
      default : []
    },
    initalIndex : {
      type : Number,
      default : 0
    },
    onclick : null
  },
  data(){
    return {
      tempTabs : this.tabArray,
      dataIndex :0,
      changed : false
    }
  },
  computed :{
    currentIndex(){
      if(this.changed === false){
        return this.initalIndex;
      }else{
        return this.dataIndex;
      }
    },
    tabs(){
      let array = [];
      this.tempTabs.forEach((item)=>{
        let obj = {
          text : item,
          active : false
        };
        array.push(obj);
      })
      array[this.dataIndex].active = true;
      return array;
    }
  },
  methods:{
    _click(tab){
      this.dataIndex = tab;
      this.changed = true;

      if(this.onclick !== undefined && this.onclick !== null && typeof this.onclick === 'function'){
          this.onclick(tab);
        }
    }
  },

}
</script>

<style scoped>
  .cdp-red {
    color: #d80031;
  }
 .tab-myleave{
    background: white;
    border-bottom: 1px solid #cecece;
    padding-top: 8px;
    display: flex;
    margin: 0px;
 }
 .tab-custom{
    flex: 1;
    text-align: center;
 }
 .tab-custom.active{
    font-weight: bold;
    border-bottom: 1px solid;
 }
 .tab.tab-overflow-auto.active{
  display: block;
 }
  .tab.tab-overflow-auto{
  display: none;
 }
 .tabs-animated-wrap.tab-content{
    height: calc(100% - 32px);
    overflow: auto;
  }

</style>
