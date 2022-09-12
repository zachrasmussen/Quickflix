<template>
  <div v-if="content">
    <img
      class="p-0 img-default img-fluid mx-1"
      :src="enhance(content.imageurl, 3)"
      alt=""
    />
    <section class="container-fluid">
      <div class="row border-bottom">
        <div class="col-12 d-flex justify-content-between">
          <button
            type="button"
            class="m-2 details-filter-icon"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i class="icon mdi mdi-page-next-outline"></i>
          </button>
          <DetailsCard />
          <h3 class="title-font text-center my-4 title-font">
            {{ content.title }}
          </h3>
          <button
            class="m-2 details-filter-icon"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasBottom"
            aria-controls="offcanvasBottom"
          >
            <i class="icon mdi mdi-dots-horizontal-circle-outline"></i>
          </button>
        </div>
      </div>
    </section>
    <section class="row my-3">
      <div class="d-flex justify-content-between mt-2 px-4">
        <h1
          class="bg-danger rounded-circle p-4 selectable"
          @click="nextMovie()"
        >
          👎🏼
        </h1>
        <h1
          class="bg-success rounded-circle p-4 selectable"
          @click="createContent([body]), nextMovie()"
        >
          👍🏼
        </h1>
      </div>
    </section>
  </div>
  <div
    class="offcanvas offcanvas-bottom"
    tabindex="-1"
    id="offcanvasBottom"
    aria-labelledby="offcanvasBottomLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasBottomLabel">FILTERS</h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body small">
      <div v-for="g in genres">
        <GenreButton :genre="g" />
      </div>
      <div v-for="t in types">
        <TypeButton :type="t" />
      </div>
    </div>
  </div>
</template>
  
<script>
import { computed } from "@vue/reactivity"
import { onMounted } from "vue";
import { routeLocationKey, useRoute } from "vue-router";
import { AppState } from "../AppState"
import { contentService } from "../services/ContentService";
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop";
import DetailsCard from "./DetailsCard.vue";


export default {
  // props: {
  //     myContent: { type: Object, required: true}
  // },
  setup() {
    const route = useRoute();

    return {
      genres: computed(() => AppState.genres),
      types: computed(() => AppState.types),
      content: computed(() => AppState.contents[0]),
      account: computed(() => AppState.account),
      myContent: computed(() => AppState.myContent),
      enhance(url, factor = 2) {
        logger.log("WHOLE", url);
        let ux = url.indexOf("UX") != -1 ? url.indexOf("UX") : url.indexOf("UY");
        logger.log(ux);
        let front = url.slice(0, ux + 2);
        let dataStr = url.slice(ux + 2, url.indexOf("_AL.jpg") - 7);
        logger.log("front", front);
        logger.log("data", dataStr);
        let data = dataStr.split(/_|,/g);
        logger.log(data);
        Math.round(data[0] = parseInt(data[0]) * factor);
        Math.round(data[3] = parseInt(data[3]) * factor);
        Math.round(data[4] = parseInt(data[4]) * factor);
        logger.warn(front + data.join(",").replace(",", "_") + "_AL_.jpg");
        return front + data.join(",").replace(",", "_") + "_AL_.jpg";
      },
      async nextMovie() {
        if (AppState.contents.length <= 1) {
          await contentService.getContent(AppState.page += 1);
        }
        try {
          AppState.contents.shift();
          console.log("NEXT MOVIE", AppState.contents);
        }
        catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      async createContent() {
        try {
          AppState.contents[0].groupId = route.params.groupId;
          await contentService.createContent(AppState.contents[0]);
        }
        catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      }
    };
  },
  components: { DetailsCard }
}
  </script>
  
<style>
.img-default {
  background-image: url("https://www.prokerala.com/movies/assets/img/no-poster-available.jpg");
  background-position: center;
  background-size: cover;
  height: 600px;
  width: 360px;
}
.title-font {
  font-family: "Montserrat", sans-serif;
  font-size: 1.25em;
  font-weight: 700;
}
.icon {
  font-size: 25px;
}
.details-filter-icon {
  padding: 0;
  border: none;
  background: none;
}
</style>