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
      <button
        class="col-6 p-2 btn btn-primary text-white"
        @click="displayUrl()"
      >
        Add Group Member
      </button>
      <p id="url"></p>

      <button
        class="col-4 btn btn-primary text-white"
        v-if="!alreadyJoined"
        @click="joinGroup()"
      >
        Join Group
      </button>

      <div v-for="a in activeGroupMembers" class="col-2 p-1">
        <img
          class="img-fluid group-member-name rounded-circle"
          :src="a.profile.picture"
          alt=""
        />
      </div>
      <!-- get content cards for group -->
      <div v-for="m in groupContents" :key="m.id" class="">
        <GroupContentCard :groupContents="m" />
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
    <div class="offcanvas-body" v-for="c in content" :key="c.id">
      <ContentCard :content="c"/>
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

    async function getContentByGroupId() {
      try {
        await contentService.getContentByGroupId(route.params.groupId)
      } catch (error) {
        logger.error(error)
        Pop.error(error)
      }
    }

    async function getGroupMembersByGroupId() {
      try {
        await groupsService.getGroupMembersByGroupId(route.params.groupId)
      } catch (error) {
        logger.error(error)
      }
    }


    onMounted(async () => {
      getGroupById();
      getContentByGroupId();
      getGroupMembersByGroupId();
    });

    return {
      groupContents: computed(() => AppState.groupContents),
      activeGroup: computed(() => AppState.activeGroup),
      activeGroupMembers: computed(() => AppState.activeGroupMembers),
      alreadyJoined: computed(() => {
        if (AppState.activeGroupMembers.find(a => a.accountId == AppState.account.id)) {
          return true
        }
        return false
      }),
      myContent: computed(() => AppState.myContent),
      content: computed(()=> AppState.contents),
      async joinGroup() {
        try {
          let newMember = {
            groupId: route.params.groupId
          }
          await groupsService.createGroupMember(newMember)
        } catch (error) {
          logger.log(error)
        }
      },
      async displayUrl() {
        // document.getElementById("url").innerHTML = window.location.href;
        // navigator.clipboard.writeText(copyText.value);
        navigator.clipboard.writeText('http://localhost:8080/#' + route.fullPath);

        // alert("Copied the group");
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





