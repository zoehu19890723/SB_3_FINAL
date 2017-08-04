<template>
  <div class="toolbar tabbar tabbar-labels">
    <div class="toolbar-inner">
        <slot></slot>
    </div>
  </div>
</template>

<style scoped>
  .tab-item.active {
    color:  #ed8e07 !important;
  }
  .tab-item.inactive {
  }
</style>
