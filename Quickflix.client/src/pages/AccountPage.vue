<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div>
    <h4>My groups</h4> 
    <nav>
      <div v-for="g in groups" :key="g.id">
        <router-link :to="{name: 'ActiveGroupPage', params: {groupId: g.id}}">
          <p >{{g.name}}</p>
        </router-link>
      </div>  
    </nav>   
        
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

<!-- https://stackoverflow.com/questions/70810476/nuxt-how-to-create-links-in-a-loop-using-the-data-as-the-link-reference -->
