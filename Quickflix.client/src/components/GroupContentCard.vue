<template>
    <div class="container-fluid" v-if="myContent">
      <div class="row">
        <div class="col-12">
          <div class="card m-3">
            <img class="card-img-top" :src="myContent.imageurl" alt="Card image cap">
            <div class="card-body">
              <h6 class="card-title">{{myContent.title}}</h6>
            </div>    
          </div>
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
    myContent: {type: Object , required: true}
  },
    setup() {
        return {
          // myContent: computed(() => AppState.myContent),
        };
    },
};
</script>

<style>
</style>