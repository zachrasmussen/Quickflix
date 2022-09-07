<template>
      <div class="col-2 btn btn-outline-light rounded-pill text-dark fs-4 selectable" @click="updateGenreFilter(genre)">{{genre}}</div>

</template>
<script>
import { contentService } from '../services/ContentService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
export default {
    props: {
        genre: {type: String, required: true},
    },
setup() {
    
  return {
    async updateGenreFilter(genre){
        try {
          await contentService.updateGenreFilter(genre)
          await contentService.runFilter()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
    }
  };
},
};
</script>
<style> 
</style>