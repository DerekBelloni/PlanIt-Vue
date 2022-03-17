<template>
  <div class="component">
    <form class="d-flex flex-column">
      <label for="">Label the task at hand</label>
      <input v-model="editable" type="text" placeholder="What shall we do..." />

      <label for="">Weight</label>
      <input v-model="editable" type="number" placeholder="How hard" />

      <button class="btn btn-primary m-2" @click="createTask(activeProject.id)">
        Submit
      </button>
    </form>
  </div>
</template>


<script>
import { ref, reactive, computed } from "@vue/reactivity"
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { sprintsService } from "../services/SprintsService"
import { watchEffect } from "@vue/runtime-core";
import { AppState } from "../AppState";
export default {
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>