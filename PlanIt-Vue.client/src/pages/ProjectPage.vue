<template>
  <div class="container-fluid">
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
      <div class="home-card p-5 bg-white rounded elevation-3">
        <div class="row justify-content-between align-items-end">
          <div class="col-md-6 d-flex justify-content-around">
            <h2 class="d-flex align-items-end m-0">Project Name</h2>

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
import { onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { projectsService } from "../services/ProjectsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
export default {
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        await projectsService.setActiveProject(route.params.projectId)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {

    }
  }
}
</script>


<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 60vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
.task-button {
  font-weight: 600;
  border-radius: 5px;
  height: 40px;
  display: inline-block;
  width: 120px;
}

.weight-icon {
  font-size: 32px;
}
</style>
