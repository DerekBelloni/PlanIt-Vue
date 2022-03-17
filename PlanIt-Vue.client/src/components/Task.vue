<template>
  <div class="component">
    <div class="row p-2 shadow mt-2 bg-secondary selectable rounded">
      <div class="col-md-6 d-flex justify-content-start align-items-end">
        <!-- <div class="form-check">
          <input
            @click.stop=""
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault"> </label>
        </div> -->
        <i
          v-if="account.id == task.creatorId"
          @click="deleteTask"
          class="mdi mdi-delete px-1 d-flex align-items-center"
        ></i>
        <h4>{{ task.name }}</h4>
      </div>
      <i
        class="mdi mdi-comment-text-multiple-outline"
        data-bs-toggle="offcanvas"
        :data-bs-target="'#oc-' + task.id"
      />
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
          :checked="task.isComplete"
          @click="markComplete(task.id)"
        />
        <label class="form-check-label" for="flexCheckDefault">
          Default checkbox
        </label>
      </div>
      <div class="col-md-3 d-flex align-items-end justify-content-end">
        <div class="row">
          <div class="col-md-6"></div>
          <div class="col-md-6">
            <i
              class="mdi mdi-cog-outline selectable"
              :data-bs-target="'#edit-task-modal' + task.id"
              data-bs-toggle="modal"
            ></i>
          </div>
        </div>
      </div>
      <div class="col-md-3 d-flex align-items-end justify-content-end">
        {{ task.weight }}
        <i class="mdi mdi-weight"></i>
        <div class="row">
          <div
            class="col-md-4 d-flex justify-content-around align-items-end p-2"
          ></div>
          <div class="col-md-8 d-flex justify-content-end"></div>
        </div>
      </div>
    </div>
    <Modal id="notes-modal" />
  </div>
  <Modal :id="'edit-task-modal' + task.id">
    <template #modal-body><EditTaskForm :task="task" /></template>
  </Modal>
  <OffCanvasNotes :id="'oc-' + task.id">
    <template #oc-title>{{ task.name }} Details</template>
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
</style>