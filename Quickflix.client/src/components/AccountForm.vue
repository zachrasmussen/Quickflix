<template>
  <form
    class="card elevation-2 bg-white mt-5 p-3 account-form"
    @submit.prevent="handleSubmit()"
  >
    <div class="text-start">
      <div>
        <label for="name">Name:</label>
        <input
          type="text"
          class="form-control"
          v-model="editable.name"
          required
          name="name"
        />
      </div>

      <div class="my-3">
        <label for="picture">Picture:</label>
        <input
          type="text"
          class="form-control"
          v-model="editable.picture"
          required
          picture="picture"
        />
      </div>

      <div>
        <button type="submit" class="btn btn-primary text-white w-100 mt-2">
          Save
        </button>
      </div>
    </div>
  </form>
</template>


<script>
import { ref, watchEffect } from "vue";
import { AppState } from "../AppState.js";
import { router } from "../router.js";
import { accountService } from "../services/AccountService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const editable = ref({});

    watchEffect(() => {
      if (!AppState.account) {
        return;
      }
      editable.value = { ...AppState.account };
    });

    return {
      editable,
      async handleSubmit() {
        try {
          await accountService.editAccount(editable.value);
          router.push({
            name: "Profile",
            params: { profileId: editable.value.id },
          });
        } catch (error) {
          // logger.error("[Editing Account]", error);
          // Pop.error(error);
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>
