<template>
  <div
    class="col-4 btn btn-outline-light rounded-pill text-dark fs-4 selectable"
    @click="updateProviderFilter(provider)"
  >
    {{ provider }}
  </div>
</template>
<script>
import { contentService } from '../services/ContentService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
export default {
  props: {
    provider: { type: String, required: true },
  },
  setup() {

    return {
      async updateProviderFilter(provider) {
        try {
          await contentService.updateProviderFilter(provider)
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