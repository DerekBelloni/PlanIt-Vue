<template>
  <div class="container">
    <div class="d-flex align-items-center justify-content-center">
      <div class="home-card sprint-card p-4 m-3 bg-white rounded elevation-3">
        <div class="row align-items-center">
          <div
            class="
              col-md-3
              d-flex
              justify-content-center
              align-items-center
              task-button
            "
          >
            <!-- task button -->
            <button
              class="task-button btn-warning task-button rounded"
              data-bs-toggle="modal"
              :data-bs-target="'#task-modal' + sprint.id"
            >
              Add Task <i class="mdi mdi-plus"></i>
            </button>
            <Modal :id="'task-modal' + sprint.id">
              <template #modal-title>
                <h4>Add Task</h4>
              </template>
              <template #modal-body>
                <CreateTaskForm :sprint="sprint" />
              </template>
            </Modal>
          </div>
          <div
            class="
              col-md-6
              d-flex
              justify-content-around
              border-bottom border-3
              text-dark
              border-dark
              p-0
            "
          >
            <div class="row">
              <div class="col-md-12 d-flex align-items-end p-0">
                <h2 class="p-0 m-0">{{ sprint.name }}</h2>
              </div>
              <div class="col-md-3 d-flex justify-content-between"></div>
            </div>
          </div>
          <div class="col-md-3 d-flex justify-content-around">
            <div class="row justify-content-between">
              <div
                class="col-md-8 d-flex justify-content-around align-items-end"
              >
                <h4 class="d-flex justify-contents-center align-items-center">
                  {{ totalTaskWeight }}
                </h4>
                <i
                  class="
                    mdi mdi-weight
                    icon-size
                    d-flex
                    justify-contents-center
                    align-items-center
                  "
                ></i>
              </div>
              <div class="col-md-4">
                <i
                  v-if="account.id == sprint.creatorId"
                  class="mdi mdi-delete-forever icon-size selectable"
                  @click="deleteSprint(sprint.id)"
                ></i>
              </div>
            </div>
          </div>
        </div>
        <!-- task item -->
        <div v-for="t in tasks" :key="t.id">
          <Task :task="t" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { sprintsService } from "../services/SprintsService"
import { tasksService } from "../services/TasksService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { AppState } from "../AppState"
import { useRoute } from "vue-router"
import { watchEffect } from '@vue/runtime-core'
export default {
  props: {
    sprint: {
      type: Object,
      required: true,
    }
  },

  setup(props) {
    const route = useRoute()

    return {
      totalTaskWeight: computed(() => {
        let sum = 0
        for (let i = 0; i < AppState.tasks.length; i++) {
          const elem = AppState.tasks[i];
          sum += elem.weight
          return sum
        }
      }),
      tasks: computed(() => AppState.tasks),
      account: computed(() => AppState.account),
      projects: computed(() => AppState.projects),
      tasks: computed(() => AppState.tasks.filter(t => t.sprintId == props.sprint.id)),
      activeProject: computed(() => AppState.activeProject),
      async deleteSprint(sprintId) {
        try {
          if (await Pop.confirm("are you sure you want to delete this sprint?")) {
            await sprintsService.deleteSprint(sprintId, route.params.projectId)
          }
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
.icon-size {
  font-size: 40px;
}
.sprint-card {
  width: 750px;
}
.task-button {
  height: 40px;
}
.weight-size {
  font-size: 25px;
}
.note-button {
  height: 30px;
}
</style>