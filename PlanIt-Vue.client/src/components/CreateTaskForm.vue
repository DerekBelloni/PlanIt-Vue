<template>
  <div class="component">
    <form class="d-flex flex-column">
      <div class="row">
        <div class="col-md-6">
          <label for="">Label the task at hand</label>
          <input
            v-model="editable.description"
            type="text"
            placeholder="What shall we do..."
          />

          <label for="">Weight</label>
          <input
            v-model="editable.weight"
            type="number"
            placeholder="How hard"
          />
        </div>
      </div>
      <button class="btn btn-primary m-2" @click="createTask(activeProject.id)">
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
import { tasksService } from '../services/TasksService';
export default {
  setup() {
    let editable = ref({});
    watchEffect(async () => {

    })
    return {
      editable,
      activeProject: computed(() => AppState.activeProject),
      async createTask(activeProjectd) {
        try {
          await tasksService.createTask(editable.value, activeProjectId)
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