<template>
  <div class="component mt-3">
    <div class="row p-2 shadow mt-2 bg-secondary selectable rounded">
      <div class="col-md-3 d-flex align-items-center justify-content-between">
        <div class="d-flex justify-content-around">
          <div class="col-md-6 p-2">
            <!-- note canvas -->
            <i
              class="icon mdi mdi-comment-text-multiple-outline"
              data-bs-toggle="offcanvas"
              :data-bs-target="'#oc-' + task.id"
            />
          </div>
          <div class="col-md-6 p-2">
            <!-- edit task gear -->
            <i
              class="icon mdi mdi-cog-outline selectable"
              :data-bs-target="'#edit-task-modal' + task.id"
              data-bs-toggle="modal"
            ></i>
          </div>
        </div>
      </div>
      <div class="col-md-6 d-flex align-items-center">
        <div class="row">
          <div class="col-md-12 d-flex">
            <div class="d-flex align-items-end">
              <!-- checkbox -->
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  :checked="task.isComplete"
                  @click="markComplete(task.id)"
                />
                <label class="form-check-label" for="flexCheckDefault"> </label>
              </div>
            </div>

            <!-- task name -->
            <h3>{{ task.name }}</h3>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="row justify-content-center align-items-center">
          <!-- task weight and icon -->
          <div
            class="col-md-6 d-flex justify-content-center align-items-center"
          >
            <div>
              {{ task.weight }}
              <i class="mdi mdi-weight"></i>
            </div>
          </div>
          <div
            class="col-md-6 d-flex justify-content-center align-items-center"
          >
            <!-- delete task -->
            <i
              v-if="account.id == task.creatorId"
              @click="deleteTask"
              class="icon-trash mdi mdi-delete px-1 d-flex align-items-center"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <Modal id="notes-modal" />
  </div>
  <Modal :id="'edit-task-modal' + task.id">
    <template #modal-body><EditTaskForm :task="task" /></template>
  </Modal>
  <OffCanvasNotes :id="'oc-' + task.id">
    <template #oc-title>
      <h2 class="border-bottom border-3 border-dark">
        <b> {{ task.name }} Details</b>
      </h2>
    </template>
    <template #oc-body><Notes :task="task" /></template>
  </OffCanvasNotes>
</template>


<script>
import { computed } from "@vue/reactivity"
import { useRoute } from "vue-router"
import { tasksService } from '../services/TasksService'
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { AppState } from "../AppState"

export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const route = useRoute()
    return {
      account: computed(() => AppState.account),

      async deleteTask() {
        try {
          if (await Pop.confirm("Are you sure you want to delete this task?")) {
            await tasksService.deleteTask(props.task.id, route.params.projectId)
          }

        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },

      async markComplete(taskId) {
        try {
          await tasksService.markComplete(taskId, route.params.id, props.task.id,)
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
.icon {
  font-size: 30px;
}
.icon-trash {
  font-size: 30px;
}
</style>