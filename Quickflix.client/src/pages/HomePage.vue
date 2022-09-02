<template>
  <div class="container-fluid" v-if="content">
    <div class="row">
     <!-- <div class="col-md-4" v-for="c in content" :key="c.id">
      <ContentCard :content="c"/>
     </div> -->
    <h3 class="text-center" >{{content.title}}</h3>
     <img :src="content.imageurl" alt="">
     <div class="d-flex justify-content-around">
        <h1 class="mdi mdi-thumb-down selectable"></h1>
        <h1 class="mdi mdi-thumb-up selectable"></h1>
     </div>
     
    </div>
  </div>
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
              content: computed(() => AppState.contents[1])
          };
      },
      components: { ContentCard }
  }
  </script>
  
  <style scoped lang="scss">
  .home{
    display: grid;
    height: 80vh;
    place-content: center;
    text-align: center;
    user-select: none;
    .home-card{
      width: 50vw;
      > img{
        height: 200px;
        max-width: 200px;
        width: 100%;
        object-fit: contain;
        object-position: center;
      }
    }
  }
  </style>
  
