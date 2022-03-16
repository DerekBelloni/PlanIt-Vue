<template>
  <div class="container">
    <div
      class="
        home
        flex-grow-1
        d-flex
        flex-column
        align-items-center
        justify-content-center
      "
    >
      <div class="home-card p-5 m-3 bg-white rounded elevation-3">
        <div class="d-flex justify-content-end">
          <i
            class="mdi mdi-delete-forever icon-size selectable"
            @click="deleteSprint(sprint.id)"
          ></i>
        </div>
        <div class="row justify-content-between align-items-end">
          <div class="col-md-6 d-flex justify-content-around">
            <h2 class="d-flex align-items-end m-0">{{ sprint.name }}</h2>

            <i class="weight-icon mdi mdi-weight m-0"> 10</i>
          </div>
          <div class="col-md-6">
            <div class="row justify-content-around align-items-end">
              <div class="col-md-6">
                <button class="task-button btn-warning task-button">
                  Add Task <i class="mdi mdi-plus"></i>
                </button>
              </div>
              <div class="col-md-6">
                <h4>Tasks Compete 1/10</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { sprintsService } from "../services/SprintsService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { AppState } from "../AppState"
import { useRoute } from "vue-router"
export default {
  props: {
    sprint: {
      type: Object,
      required: true,
    }
  },

  setup() {
    const route = useRoute()
    return {

      activeProject: computed(() => AppState.activeProject),
      async deleteSprint(sprintId) {
        try {
          await sprintsService.deleteSprint(sprintId, route.params.projectId)
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
  font-size: 32px;
}
</style>