<template>
  <div class="component">
    <div class="row p-2 shadow mt-2 bg-secondary rounded">
      <div class="col-md-6 d-flex justify-content-start align-items-end">
        <i class="mdi mdi-delete px-1 d-flex align-items-center"></i>
        <h4>{{}}</h4>
      </div>

      <div class="col-md-6 d-flex align-items-end justify-content-end">
        <div class="row">
          <div class="col-md-4 d-flex align-items-end">
            <h6>10</h6>
            <i class="mdi mdi-weight"></i>
          </div>
          <div class="col-md-8 d-flex justify-content-end">
            <button
              class="note-button btn-warning task-button rounded"
              data-bs-toggle="modal"
              data-bs-target="#notes-modal"
            >
              <h6>add note</h6>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>