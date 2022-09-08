<template>
  <div class="container-fluid" v-if="content">
    <div class="row">
      <div class="">
      <ContentCard />
     </div>

      
    </div>
  </div>
  <GroupForm />
</template>
  
<script>

import { computed, onMounted } from '@vue/runtime-core';
import { contentService } from '../services/ContentService.js'
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import ContentCard from '../components/ContentCard.vue';
export default {
  setup() {

    async function getContent() {
      try {
        await contentService.getContent();
      }
      catch (error) {
        logger.error("[Getting Movies]", error);
        Pop.error(error);
      }
    }

    onMounted(() => {
      getContent();

    });
    return {
      genres: computed(() => AppState.genres),
      types: computed(() => AppState.types),
      content: computed(() => AppState.contents[0]),
      account: computed(() => AppState.account),
      myContent: computed(() => AppState.myContent),





      // enhance(url, factor = 2) {
      //   logger.log('WHOLE', url)
      //   let ux = url.indexOf('UX') != -1 ? url.indexOf('UX') : url.indexOf('UY')
      //   logger.log(ux)
      //   let front = url.slice(0, ux + 2)
      //   let dataStr = url.slice(ux + 2, url.indexOf('_AL.jpg') - 7)
      //   logger.log('front', front)
      //   logger.log('data', dataStr)
      //   let data = dataStr.split(/_|,/g)
      //   logger.log(data)
      //   Math.round(data[0] = parseInt(data[0]) * factor)
      //   Math.round(data[3] = parseInt(data[3]) * factor)
      //   Math.round(data[4] = parseInt(data[4]) * factor)
      //   logger.warn(front + data.join(',').replace(',', '_') + '_AL_.jpg')
      //   return front + data.join(',').replace(',', '_') + '_AL_.jpg'
      // },


      // async nextMovie() {

      //   if (AppState.contents.length <= 1) {
      //     await contentService.getContent(AppState.page += 1)
      //   }
      //   try {
      //     AppState.contents.shift()

      //     console.log('NEXT MOVIE', AppState.contents);
      //   } catch (error) {
      //     logger.error(error)
      //     Pop.toast(error.message, 'error')
      //   }


      // },

      // async createContent() {


      //   try {
      //     await contentService.createContent(AppState.contents[0])

      //   } catch (error) {
      //     logger.error(error)
      //     Pop.toast(error.message, 'error')
      //   }
      // }

    };
  },
  components: { ContentCard }
}
</script>
  
<style scoped lang="scss">
  // .img-default {
  //   background-image: url('https://www.prokerala.com/movies/assets/img/no-poster-available.jpg');
  //   background-position: center;
  //   background-size: cover;
  //   height: 85vh;
  //   width: 100%;
    
  // }
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.title-font {
  font-family: "Montserrat", sans-serif;
}
</style>
  
