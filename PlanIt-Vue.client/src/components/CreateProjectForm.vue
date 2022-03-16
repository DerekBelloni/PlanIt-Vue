<template>
  <form class="d-flex flex-column">
    <label for="">Project Name</label>
    <input v-model="editable.name" type="text" placeholder="project name..." />
    <label for="">Project Description</label>
    <input
      v-model="editable.description"
      type="text"
      placeholder="project description..."
    />
    <button class="btn btn-primary m-2" @click="createProject()">Submit</button>
  </form>
</template>


<script>
import { ref, watchEffect } from "@vue/runtime-core"
import { AppState } from "../AppState"
import { projectsService } from "../services/ProjectsService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { router } from "../router"

export default {
  setup() {
    let editable = ref({})

    return {
      editable,
      async createProject() {
        try {
          const newProject = await projectsService.createProject(editable.value)
          router.push({
            name: 'Project',
            params: { projectId: newProject.id }
          })
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