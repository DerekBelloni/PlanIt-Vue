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
            <div class="col-md-6 p-2"><h2>Projects</h2></div>
            <div class="col-md-6 p-2 d-flex justify-content-end">
              <button
                class="btn btn-info"
                data-bs-toggle="modal"
                data-bs-target="#form-modal"
              >
                Create Project
              </button>
            </div>
            <Modal>
              <template #modal-header>
                <h4>Create Project</h4>
              </template>
              <template #modal-body><CreateProjectForm /></template>
              <template #modal-footer>
                <button class="btn btn-primary">Submit</button>
              </template>
            </Modal>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-8">
            <ul
              v-for="p in projects"
              :key="p.id"
              class="list-group list-group-flush"
            >
              <router-link
                :to="{ name: 'Project', params: { projectId: p.id } }"
              >
                <li class="list-group-item selectable">
                  {{ p.name }}
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
