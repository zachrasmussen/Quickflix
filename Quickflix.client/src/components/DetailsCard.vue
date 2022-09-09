<template>
<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content" >
      <div class="text-center">
     <h3>{{content.title}}</h3> <b>Rating:{{content.imdbrating}}</b>
     <p><b>{{content.genre[0]}}</b></p>
     <p><b>{{content.synopsis}}</b></p>
    
    
    </div>
    </div>
  </div>
</div>


</template>
<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";

export default {
  
  // props: {
  //   content: {type: Object, required: true}
  // },
setup()

 {
  return {
    content: computed(() => AppState.contents[0]),
  };
},
};
</script>
<style lang="scss" scoped>
</style>