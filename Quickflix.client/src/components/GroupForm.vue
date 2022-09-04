<template> 
    <!--modal for creating group  -->
    <div class="modal fade" id="create-group" tabindex="-1" role="dialog" aria-labelledby="modelTitleId"
    aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">    
                <form @submit.prevent = "handleSubmit">
                    <div class="form-group">
                        <label for="groupName">Enter the name of your group</label>
                        <input type="text" v-model="editable.groupName" class="form-control" id="groupName" aria-describedby="groupName" placeholder="Group Name"> 
                        <button class="btn btn-success">Create Group</button>              
                    </div>
                </form>      
            </div>
        </div>
    </div>

</template>

<script>
import { ref } from 'vue';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
    setup() {
        const editable = ref({})
        return {
            editable,
            async handleSubmit() {
                try {
                    logger.log("Creating group", editable.value)
                    await groupsService.createGroup(editable.value)
                    Pop.toast('Group Created!')                    
                } catch (error) {
                    Pop.error(error)
                }
            }   
        };
    },
};
</script>

<style>
</style>