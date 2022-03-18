<template>
  <div
    class="
      container
      card-style
      d-flex
      justify-content-center
      align-items-center
    "
  >
    <div class="row mt-5">
      <div class="card card-style" style="width: 50em">
        <div class="card-body">
          <div class="row">
            <div class="col-md-4"></div>
            <div
              class="
                col-md-4
                d-flex
                align-items-center
                justify-content-center
                p-2
              "
            >
              <h2>Your Projects</h2>
            </div>
            <div class="col-md-4 p-2 d-flex justify-content-end">
              <button
                class="btn btn-info shadow"
                data-bs-toggle="modal"
                data-bs-target="#project-modal"
              >
                <b>Create Project</b>
              </button>
            </div>
            <Modal id="project-modal">
              <template #modal-header>
                <h4 class="text-dark">Create Project</h4>
              </template>
              <template #modal-body><CreateProjectForm /></template>
            </Modal>
          </div>
        </div>
        <div class="row justify-content-center align-items-center m-3">
          <div class="col-md-8">
            <ul
              v-for="p in projects"
              :key="p.id"
              class="list-group list-group-flush"
            >
              <router-link
                :to="{ name: 'Project', params: { projectId: p.id } }"
              >
                <li
                  class="
                    shadow
                    list-group-item
                    selectable
                    rounded
                    m-1
                    bg-danger
                    text-center
                  "
                >
                  <b> {{ p.name }}</b>
                </li>
              </router-link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState"
import { projectsService } from "../services/ProjectsService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { onMounted } from "@vue/runtime-core";
import { computed } from "@vue/reactivity";
export default {
  setup() {
    onMounted(async () => {
      try {
        await projectsService.getProjects()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      projects: computed(() => AppState.projects),

    }
  }
}
</script>


<style scoped lang="scss">
.card-style {
  border-radius: 10px;
}
</style>
