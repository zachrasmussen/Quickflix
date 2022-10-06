<template>
  <!-- TODO make this part mobile responsive. -->
  <section class="container-fluid background-height">
    <div class="row">
      <div
        class="
          col-12 col-md-12
          d-flex
          flex-column flex-md-row
          justify-content-md-evenly
          align-items-center align-items-md-start
          mb-4
        "
      >
        <!-- SECTION this section is to show your account -->
        <div
          class="
            col-10 col-md-3
            order-1 order-md-2
            text-center
            mt-3
            card card-height
            elevation-2
            py-4
          "
        >
          <h3 class="title-font">Welcome</h3>

          <Login />
          <!-- <AccountForm /> -->
        </div>
        <!-- SECTION this section is to show which groups you are a part of -->
        <div class="col-10 col-md-4 order-2 order-md-1 mt-3">
          <div class="p-2 card elevation-2">
            <h4 class="text-center py-3 title-font">
              My Groups
              <!-- <i
                class="mdi mdi-plus-circle-outline create-group"
                data-bs-toggle="modal"
                data-bs-target="#create-group"
              ></i> -->
            </h4>
            <div class="px-5 pt-3 border-top" v-for="g in groups" :key="g.id">
              <router-link
                :to="{ name: 'ActiveGroup', params: { groupId: g.id } }"
              >
                <p>{{ g.name }}</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'


export default {
  name: 'Account',
  setup() {

    async function getGroupsByAccount() {
      try {
        await accountService.getYourGroups()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    }

    onMounted(() => {
      getGroupsByAccount()
    })

    return {
      account: computed(() => AppState.account),
      groups: computed(() => AppState.groups)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

.pro-pic {
  height: 55px;
  width: 55px;
}

login:hover {
  cursor: pointer;
}
.card-height {
  max-height: 150px;
}
.background-height {
  height: 100%;
  background-color: #f1f2f7;
}
.title-font {
  font-family: "Montserrat", sans-serif;
  font-size: 1.5em;
  font-weight: 700;
}
.create-group {
  font-size: 25px;
  color: #0096fa;
}
.create-group:hover {
  cursor: pointer;
}
</style>

<!-- https://stackoverflow.com/questions/70810476/nuxt-how-to-create-links-in-a-loop-using-the-data-as-the-link-reference -->
