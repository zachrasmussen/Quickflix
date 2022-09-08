<template>
  <div class="container-fluid">
    <div class="row d-flex justify-content-center">
      <h4 class="m-2 text-center">{{ activeGroup.name }}</h4>
      <!-- TODO add @click later -->
      <button class="col-4 btn btn-primary text-white" @click="joinGroup()">
        Join Group
      </button>
      <!-- get content cards for group -->
      <div v-for="c in contents" class="col-12">
        <GroupContentCard :content="c" />
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
      activeGroup: computed(() => AppState.activeGroup),
      // newGroupMember: computed(() => AppState.account.id)
      async joinGroup() {
        try {
          // const newGroupMember = {
          //   groupId: AppState.activeGroup.id,
          //   accountId: AppState.account.id
          // }
          let accountId = AppState.account.id
          // logger.log('creating new member', newGroupMember)
          await groupsService.createGroupMember(route.params.groupId, accountId)
        } catch (error) {
          logger.error(error)
        }
      },
    };
  },

  components: { GroupContentCard }
};
</script>
<style>
</style>