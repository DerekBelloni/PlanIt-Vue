<template>
  <div class="component">
    <form class="d-flex flex-column">
      <div class="row">
        <label class="d-flex align-items-center justify-content-center">
          <h3 class="border-bottom border-3 border-info">
            Transfer task to other sprint
          </h3>
        </label>
        <div class="row container-fluid px-5">
          <ul class="list-group-flush p-0" v-for="s in sprints" :key="s.id">
            <li
              class="
                rounded
                container-fluid
                bg-secondary
                list-group-item
                selectable
                m-1
                float
                text-center
              "
              @click="changeSprint(s.id)"
            >
              {{ s.name }}
            </li>
          </ul>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { AppState } from "../AppState";
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { tasksService } from "../services/TasksService";
import { Modal } from "bootstrap";
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    let editable = ref({})
    return {
      sprints: computed(() => AppState.sprints),
      async changeSprint(sprintId) {
        try {
          Modal.getOrCreateInstance(document.getElementById('edit-task-modal' + props.task.id)).hide()
          await tasksService.changeSprint(sprintId, route.params.projectId, props.task.id)
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