<template>
  <button
    class="btn btn-secondary p-2 m-2"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasTop"
    aria-controls="offcanvasTop"
  >
    Find
  </button>

  <div class="container-fluid">
    <div class="row d-flex justify-content-center">
      <h4 class="m-2 text-center">{{ activeGroup.name }}</h4>

      <button class="col-4 btn btn-primary text-white" @click="joinGroup()">
        Join Group
      </button>
      <div v-for="a in activeGroupMembers">
        <img
          class="img-fluid group-member-name rounded-circle"
          :src="a.profile.picture"
          alt=""
        />
      </div>
      <!-- get content cards for group -->
      <div v-for="m in myContent" :key="m.id" class="col-12">
        <GroupContentCard :myContent="m" />
      </div>
    </div>
  </div>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasTop"
    aria-labelledby="offcanvasTopLabel"
  >
    <div class="offcanvas-header">
      <h5 id="offcanvasTopLabel">Find</h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <ContentCard />
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
  // props: {
  //   myContent: {type: Object, required: true}
  // },

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
      activeGroupMembers: computed(() => AppState.activeGroupMembers),
      myContent: computed(() => AppState.myContent),
      async joinGroup() {
        try {
          let newMember = {
            groupId: route.params.groupId
          }
          await groupsService.createGroupMember(newMember)
        } catch (error) {
          logger.log(error)
        }
      }
    };
  },
  components: { GroupContentCard, ContentCard }
};
</script>
<style>
.group-member-name {
  width: 55px;
  height: 55px;
}
</style>





