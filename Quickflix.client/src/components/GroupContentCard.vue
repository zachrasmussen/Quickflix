<template>
    <div class="" v-if="groupContents">
      <div class="d-flex justify-content-center">
        <div class="col-md-3 m-3">
          <img class="customImg" :src="groupContents.imageurl" alt="Card image cap">
          <h6 class="">{{groupContents.title}}</h6>
        </div>
      </div>
    </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { Content } from "../models/Content";

export default {
  props: {
    groupContents: {type: Object, required: true}
  },
    setup() {
        return {
          // groupContents: computed(() => AppState.groupContents),
        };
    },
};
</script>

<style>
      .customImg {
 
    height: 600px;
    width: 360px;
    
  }
</style>