<template>
  <div :class="('col-' + width) + (tabletWidth ? ' tablet-' + tabletWidth : '')" style="overflow: hidden;text-overflow: ellipsis;"><slot></slot></div>
</template>
<script>
  export default {
    props: {
      'width': {
        type: [Number, String],
        default: 'auto'
      },
      'tablet-width': {
        type: [Number, String]
      },
      'btnTitle':{
        type: [String, String]
      }
    },
    data: function () {
      return {};
    }
  }
</script>
