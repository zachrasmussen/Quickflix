<template>
  <div
    class="col-4 btn btn-outline-light rounded-pill text-dark fs-4 selectable"
    @click="updateLanguageFilter(language)"
  >
    {{ language }}
  </div>
</template>
<script>
import { contentService } from '../services/ContentService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
export default {
  props: {
    language: { type: String, required: true },
  },
  setup() {

    return {
      async updateLanguageFilter(language) {
        try {
          await contentService.updateLangaugeFilter(language)
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