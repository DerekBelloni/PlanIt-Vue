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
            <button class="task-button btn-warning task-button">
              Add Task <i class="mdi mdi-plus"></i>
            </button>
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
                  10
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
                  class="mdi mdi-delete-forever icon-size selectable"
                  @click="deleteSprint(sprint.id)"
                ></i>
              </div>
            </div>
          </div>
        </div>
        <div class="row p-2">
          <div class="col-md-4 d-flex justify-content-start">
            <i class="mdi mdi-delete px-1 d-flex align-items-center"></i>
            <h4>task name</h4>
          </div>
          <div class="col-md-8">
            <h5>Task weight</h5>
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
  font-size: 40px;
}
.sprint-card {
  width: 750px;
  height: 250px;
}
.task-button {
  height: 40px;
}
.weight-size {
  font-size: 25px;
}
</style>