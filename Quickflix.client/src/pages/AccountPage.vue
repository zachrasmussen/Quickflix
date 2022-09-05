<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div>
    <h4>My groups</h4>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
import {logger} from '../utils/Logger'
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
</style>
