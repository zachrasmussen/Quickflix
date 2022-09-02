<template>
  <div class="container-fluid">
    <div class="row" v-for="c in content" :key="c.id">
     <div class="col-md-4">
      <ContentCard :content="c" />
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
              content: computed(() => AppState.content)
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
  
