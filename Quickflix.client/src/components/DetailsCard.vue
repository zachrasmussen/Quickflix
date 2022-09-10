<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="text-center p-3">
          <h3 class="title-font border-bottom pb-2">{{ content.title }}</h3>
          <p class="pt-2 justify-content-evenly d-flex">
            <b>Genre: {{ content.genre[0] }}</b>
            <b>Rating: {{ content.imdbrating }}</b>
          </p>
          <p>
            <p class="text-start">{{ content.synopsis }}</p>
          </p>
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
  setup() {
    return {
      content: computed(() => AppState.contents[0]),
    };
  },
};
</script>
<style lang="scss" scoped>
// .modal {
//   max-width: 500px;
// }
.title-font {
  font-family: "Montserrat", sans-serif;
  font-size: 1.5em;
  font-weight: 700;
}
</style>