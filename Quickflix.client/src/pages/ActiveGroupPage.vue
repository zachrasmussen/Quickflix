<template>
  <div class="container-fluid">
    <div class="row">
      <h4 class="m-2">{{activeGroup.name}}</h4>
      <!-- get content cards for group -->
      <div v-for="c in contents" class="col-12">
        <GroupContentCard :content="c"/> 
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { groupsService } from '../services/GroupsService';
import { logger } from '../utils/Logger';
import GroupContentCard from '../components/GroupContentCard.vue';
import { contentService } from '../services/ContentService';
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState';

export default {
    setup() {
        const route = useRoute();
        async function getGroupById() {
            try {
                logger.log(route.params.groupId);
                await groupsService.getGroupById(route.params.groupId);
            }
            catch (error) {
                logger.error(error);
                Pop.toast(error.message, "error");
            }
        }

        async function getContentByGroupId() {
          try {
            await contentService.getContentByGroupId(route.params.groupId)
          } catch (error) {
            logger.error(error)
            Pop.error(error)
          }
        }
        onMounted(async () => {
            getGroupById();
            getContentByGroupId();
        });

        return {
          contents: computed(() => AppState.groupContents),
          activeGroup: computed(() => AppState.activeGroup)
        };
    },
    components: { GroupContentCard }
};
</script>
<style>
</style>