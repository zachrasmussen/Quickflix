<template>
  <div
    class="col-4 btn btn-outline-light rounded-pill text-dark fs-4 selectable"
    @click="updateTypeFilter(type)"
  >
    {{ type }}
  </div>
</template>
<script>
import { contentService } from '../services/ContentService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
export default {
  props: {
    type: { type: String, required: true },
  },
  setup() {

    return {
      async updateTypeFilter(type) {
        try {
          await contentService.updateTypeFilter(type)
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