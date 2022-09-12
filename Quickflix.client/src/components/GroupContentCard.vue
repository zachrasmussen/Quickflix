<template>
  <div class="" v-if="groupContents">
    <div class="row justify-content-center d-flex">
      <div class="col-10 col-md-4 m-3 p-0 card d-flex flex-row">
        <img
          class="customImg"
          :src="groupContents.imageurl"
          alt="Card image cap"
        />
        <div class="m-3">
          <h6 class="font-title">{{ groupContents.title }}</h6>
          <p>Genre: {{ groupContents.genre }}</p>
          <p>Rating: {{ groupContents.imdbrating }}</p>
          <p>Synopsis: {{ groupContents.synopsis }}</p>
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
    groupContents: { type: Object, required: true }
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
  width: 150px;
}
.font-title {
  font-family: "Montserrat", sans-serif;
  font-size: 1.05em;
  font-weight: 700;
}
</style>