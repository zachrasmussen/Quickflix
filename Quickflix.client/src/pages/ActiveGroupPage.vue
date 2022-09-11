<template>
  <section class="container-fluid">
    <!-- SECTION this section is for the group name, to select movies for the group and the link -->
    <section class="row">
      <div class="col-12 d-flex justify-content-between p-4">
        <button
          class="text-primary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasTop"
          aria-controls="offcanvasTop"
        >
          <i class="icon mdi mdi-television"></i>
        </button>

        <h4 class="m-2 text-center title-font">{{ activeGroup.name }}</h4>

        <button
          type="button"
          class="text-primary"
          data-bs-container="body"
          data-bs-toggle="popover"
          data-bs-placement="top"
          data-bs-content="Copied!"
          @click="displayUrl()"
        >
          <i class="add-member mdi mdi-link"></i>
        </button>

        <!-- <p id="url"></p> -->
      </div>
    </section>

    <!-- SECTION this section is for the the button to join the group -->
    <section class="row d-flex justify-content-center">
      <button
        class="col-4 col-md-2 btn btn-primary text-white"
        v-if="!alreadyJoined"
        @click="joinGroup()"
      >
        Join Group
      </button>
    </section>

    <!-- SECTION this section is to display the members of the group -->
    <section class="row d-flex justify-content-center m-3">
      <div class="col-12 col-md-5 p-2 card elevation-2">
        <div>
          <h5 class="text-center border-bottom pb-3">
            {{ activeGroup.name }} Group Members
          </h5>

          <img
            v-for="a in activeGroupMembers"
            class="img-fluid group-member-name rounded-circle m-1 my-2"
            :src="a.profile.picture"
            :title="a.profile.name"
            alt=""
          />
        </div>
      </div>
    </section>
    <!-- SECTION this section is to display the content of the group -->
    <div v-for="m in groupContents" :key="m.id" class="">
      <GroupContentCard :groupContents="m" />
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
  </section>
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
    async function getContent() {
      try {
        await contentService.getContent();
      }
      catch (error) {
        logger.error("[Getting Movies]", error);
        Pop.error(error);
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

    async function getDuplicates() {
      try {
        await groupsService.getDuplicates(route.params.groupId)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    }


    onMounted(async () => {
      await getGroupById();
      await getContentByGroupId();
      await getGroupMembersByGroupId();
      await getContent();
      await getDuplicates();
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
      content: computed(() => AppState.contents),
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
      },
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
.title-font {
  font-family: "Montserrat", sans-serif;
  font-size: 1.5em;
  font-weight: 700;
}
.add-member {
  font-size: 2em;
}
button {
  padding: 0;
  border: none;
  background: none;
}
.icon {
  font-size: 2em;
}
</style>





