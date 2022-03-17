<template>
  <div class="component">
    <form class="d-flex flex-column">
      <label for="">Sprint Name</label>
      <input
        v-model="editable.name"
        type="text"
        placeholder="name your sprint"
      />
      <button
        class="btn btn-primary m-2"
        @click="createSprint(activeProject.id)"
      >
        Submit
      </button>
    </form>
  </div>
</template>


<script>
import { ref, reactive, computed } from "@vue/reactivity"
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { sprintsService } from "../services/SprintsService"
import { watchEffect } from "@vue/runtime-core";
import { AppState } from "../AppState";


export default {
  setup() {
    let editable = ref({});
    watchEffect(async () => {

    })
    return {
      editable,
      activeProject: computed(() => AppState.activeProject),
      async createSprint() {
        try {
          await sprintsService.createSprint(editable.value, AppState.activeProject.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }

    }
  }
}
</script>


<style lang="scss" scoped>
</style>