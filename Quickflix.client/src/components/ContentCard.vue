<template>
    <img
        class="p-0 img-default img-fluid"
        v-if="(content.imageurl)"
        :src="enhance(content.imageurl, 3)"
        alt="" 
      />
      <h3 class="title-font text-center my-2">{{ content.title }}</h3>
      <div v-for="g in genres">
        <GenreButton :genre="g" />
      </div>
      <div v-for="t in types">
        <TypeButton :type="t" />
      </div>
      <div class="d-flex justify-content-between mt-5">
        <h1 class="bg-danger rounded-circle p-4" @click="nextMovie()">👎🏼</h1>
        <h1
          class="bg-success rounded-circle p-4"
          @click="nextMovie(), createContent([body])"
        >
          👍🏼
        </h1>
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

 
  export default {
      props: {
          content: { type: Object, required: true}
      },
      setup() {
const route = useRoute()
    //     async function getContent() {
    //   try {
    //     await contentService.getContent();
    //   }
    //   catch (error) {
    //     logger.error("[Getting Movies]", error);
    //     Pop.error(error);
    //   }
    // }

    //     onMounted(() => {
    //   getContent();

    // });
  
      return {
        genres: computed(() => AppState.genres),
      types: computed(() => AppState.types),
      content: computed(() => AppState.contents[0]),
      account: computed(() => AppState.account),
      myContent: computed(() => AppState.myContent),




        enhance(url, factor = 2) {
        logger.log('WHOLE', url)
        let ux = url.indexOf('UX') != -1 ? url.indexOf('UX') : url.indexOf('UY')
        logger.log(ux)
        let front = url.slice(0, ux + 2)
        let dataStr = url.slice(ux + 2, url.indexOf('_AL.jpg') - 7)
        logger.log('front', front)
        logger.log('data', dataStr)
        let data = dataStr.split(/_|,/g)
        logger.log(data)
        Math.round(data[0] = parseInt(data[0]) * factor)
        Math.round(data[3] = parseInt(data[3]) * factor)
        Math.round(data[4] = parseInt(data[4]) * factor)
        logger.warn(front + data.join(',').replace(',', '_') + '_AL_.jpg')
        return front + data.join(',').replace(',', '_') + '_AL_.jpg'
      },

      async nextMovie() {

if (AppState.contents.length <= 1) {
  await contentService.getContent(AppState.page += 1)
}
try {
  AppState.contents.shift()

  console.log('NEXT MOVIE', AppState.contents);
} catch (error) {
  logger.error(error)
  Pop.toast(error.message, 'error')
}


},

async createContent() {
if (route.params.groupId == true) {
    
    AppState.myContent.push(route.params.groupId)
}

try {
  await contentService.createContent(AppState.contents[0])

} catch (error) {
  logger.error(error)
  Pop.toast(error.message, 'error')
}
}
      }
      }
  }
  </script>
  
  <style>
    .img-default {
    background-image: url('https://www.prokerala.com/movies/assets/img/no-poster-available.jpg');
    background-position: center;
    background-size: cover;
    height: 85vh;
    width: 100%;
    
  }
  </style>