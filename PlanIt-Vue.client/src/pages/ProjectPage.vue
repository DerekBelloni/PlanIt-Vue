<template>
  <div class="container">
    <OffCanvas />
    <div class="row container-fluid">
      <div class="col-md-6 d-flex justify-content-center align-items-center">
        <h1>{{ activeProject.name }}</h1>
        <i class="mdi mdi-delete-forever icon-size"></i>
      </div>
      <div class="col-md-6 d-flex justify-content-center">
        <button
          class="task-button btn-warning task-button"
          data-bs-toggle="modal"
          data-bs-target="#sprint-modal"
        >
          Add Sprint
          <i class="mdi mdi-plus"></i>
        </button>
      </div>
    </div>
    <div v-for="s in sprints" :key="s.id">
      <Sprint :sprint="s" />
    </div>
  </div>
  <Modal id="sprint-modal">
    <template #modal-title>
      <h4>Add Sprint</h4>
    </template>
    <template #modal-body><CreateSprintForm /></template>
  </Modal>
</template>



<script>
import { computed, onMounted, watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { projectsService } from "../services/ProjectsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";
import { sprintsService } from "../services/SprintsService"
export default {
  setup() {
    const route = useRoute();
    watchEffect(async () => {
      try {
        await projectsService.setActiveProject(route.params.projectId)
        await sprintsService.getSprints(AppState.activeProject.id)

      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })

    return {
      projects: computed(() => AppState.projects),
      activeProject: computed(() => AppState.activeProject),
      sprints: computed(() => AppState.sprints)

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

.icon-size {
  font-size: 48px;
}
</style>
