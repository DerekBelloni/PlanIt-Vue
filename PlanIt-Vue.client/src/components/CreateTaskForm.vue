<template>
  <div class="component">
    <form class="d-flex flex-column">
      <div class="row">
        <div class="col-md-6">
          <label for="">Label the task at hand</label>
          <input
            v-model="editable.name"
            type="text"
            placeholder="What shall we do..."
            name="name"
            aria-label="name"
            aria-title="name"
          />

          <label for="">Weight</label>
          <input
            v-model="editable.weight"
            type="number"
            placeholder="How hard"
            name="weight"
            aria-label="weight"
            aria-title="weight"
          />
        </div>
      </div>
      <button class="btn btn-danger shadow m-2" @click="createTask()">
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
import { useRoute } from "vue-router";
export default {
  props: {
    sprint: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    let editable = ref({ sprintId: props.sprint.id });

    return {
      editable,
      activeProject: computed(() => AppState.activeProject),
      async createTask(activeProjectId) {
        try {
          await tasksService.createTask(editable.value, route.params.projectId)
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