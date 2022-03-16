<template>
  <div class="row w-100 justify-content-start">
    <div class="col-12">
      <button
        class="
          create-btn
          btn btn-primary
          rounded-pill
          shadow
          d-flex
          align-items-center
          justify-content-center
          m-2
        "
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
      >
        <b>Your Projects</b>
      </button>
    </div>
  </div>
  <div
    class="offcanvas offcanvas-start"
    tabindex="-1"
    id="offcanvasExample"
    aria-labelledby="offcanvasExampleLabel"
  >
    <div class="offcanvas-header">
      <div>
        <img class="img-fluid profile-image" :src="account.picture" alt="" />

        <h3
          class="offcanvas-title p-2 border-bottom"
          id="offcanvasExampleLabel"
        >
          {{ account.name }}
        </h3>
      </div>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div class="mt-3">
        <ul v-for="p in projects" :key="p.id" class="list-group-flush">
          <router-link :to="{ name: 'Project', params: { projectId: p.id } }">
            <li class="list-group-item selectable">
              {{ p.name }}
            </li>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, reactive } from "@vue/reactivity"
import { AppState } from "../AppState"
import { onMounted } from "@vue/runtime-core"
import { projectsService } from "../services/ProjectsService"
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
      activeProject: computed(() => AppState.activeProject),
      account: computed(() => AppState.account)

    }
  }
}
</script>


<style lang="scss" scoped>
.profile-image {
  border-radius: 50%;
  height: 125px;
  width: 125px;
  border: solid #c38d9e;
  border-width: 4px;
}
</style>