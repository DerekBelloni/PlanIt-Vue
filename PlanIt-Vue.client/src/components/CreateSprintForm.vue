<template>
  <div class="component">
    <form class="d-flex flex-column">
      <label for="">Project Name</label>
      <input
        v-model="editable.name"
        type="text"
        placeholder="project name..."
      />
      <label for="">Project Description</label>
      <input
        v-model="editable.description"
        type="text"
        placeholder="project description..."
      />
      <button class="btn btn-primary m-2" @click="createProject()">
        Submit
      </button>
    </form>
  </div>
</template>


<script>
export default {
  setup() {

    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>