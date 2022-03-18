<template>
  <div class="row w-100 justify-content-start">
    <div class="d-flex justify-content-center">
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
    <div class="offcanvas-header bg-info">
      <div>
        <img class="img-fluid profile-image" :src="account.picture" alt="" />

        <h2
          class="bold offcanvas-title p-0 border-bottom border-3 border-dark"
          id="offcanvasExampleLabel"
        >
          <b> {{ account.name }}</b>
        </h2>
      </div>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div class="mt-32">
        <ul v-for="p in projects" :key="p.id" class="">
          <router-link :to="{ name: 'Project', params: { projectId: p.id } }">
            <li
              class="
                round
                list-group-item
                selectable
                m-1
                float
                text-center
                bg-dark
              "
            >
              <h3>{{ p.name }}</h3>
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
  border: solid;
  border-width: 4px;
}
.float:hover {
  width: 350px;
  height: 50px;
}
</style>