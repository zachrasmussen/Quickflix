<template>
  <button class="btn btn-secondary p-2 m-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">Find</button>

  
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
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
  <div class="offcanvas-header">
    <h5 id="offcanvasTopLabel">Find</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    ...<div><ContentCard /></div>
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
import ContentCard from "../components/ContentCard.vue";

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

<<<<<<< HEAD
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
    components: { GroupContentCard, ContentCard }
=======
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
>>>>>>> 876f4e281f9363958052b605fe6879aaed30722d
};
</script>
<style>
</style>