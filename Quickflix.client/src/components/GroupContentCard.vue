<template>
    <div class="container-fluid" v-if="groupContents">
      <div class="row">
        <div class="col-12">
          <div class="card m-3">
            <img class="card-img-top" :src="groupContents.imageurl" alt="Card image cap">
            <div class="card-body">
              <h6 class="card-title">{{groupContents.title}}</h6>
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
</style>