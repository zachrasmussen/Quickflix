<template>

</template>
<script>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { groupsService } from '../services/GroupsService';
import { logger } from '../utils/Logger';

export default {
    setup() {
        const route = useRoute();
        async function getGroupById() {
            try {
              logger.log(route.params.groupId)  
              await groupsService.getGroupById(route.params.groupId)
            } catch (error) {
              logger.error(error)
              Pop.toast(error.message, 'error')
            }
        }

        onMounted(async () => {
            getGroupById()
        })
        return {};
    },
};
</script>
<style>
</style>