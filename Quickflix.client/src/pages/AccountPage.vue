<template>
  <!-- TODO make this part mobile responsive. -->
  <section class="container-fluid bg-light">
    <div class="row">
      <div class="col-12 col-md-12 d-flex justify-content-evenly m-3">
        <!-- SECTION this section is to show which groups you are a part of -->
        <div class="col-6 col-md-4">
          <div class="p-2 card elevation-2">
            <nav>
              <h4 class="text-center border-bottom pb-3">My Groups</h4>
              <div
                class="px-5 mt-3 border-bottom"
                v-for="g in groups"
                :key="g.id"
              >
                <router-link
                  :to="{ name: 'ActiveGroup', params: { groupId: g.id } }"
                >
                  <p>{{ g.name }}</p>
                </router-link>
              </div>
            </nav>
          </div>
        </div>
        <!-- SECTION this section is to show your account -->
        <div class="col-6 col-md-3 text-center">
          <h3>Welcome {{ account.name }}</h3>
          <div class="col-3">
            <Login />
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
</style>

<!-- https://stackoverflow.com/questions/70810476/nuxt-how-to-create-links-in-a-loop-using-the-data-as-the-link-reference -->
