<template>
  <div class="component">
    <form class="d-flex flex-column">
      <div class="col-md-12">
        <div class="input-group mb-3">
          <input
            v-model="editable.body"
            type="text"
            class="form-control"
            placeholder="thoughts?"
            aria-label="tasknotes"
            aria-describedby="button-addon2"
          />
          <button
            class="btn btn-secondary"
            type="button"
            id="button-addon2"
            @click="createNote()"
          >
            <b> Add note</b>
          </button>
        </div>
      </div>
    </form>
    <div v-for="n in notes" :key="n.id">
      <h5>{{ n.body }}</h5>
      <img class="border img-fluid note-img" :src="n.creator.picture" alt="" />

      <i
        v-if="account.id == n.creatorId"
        class="mdi mdi-delete-forever selectable"
        @click="deleteNote(n.id)"
      />
    </div>
  </div>
</template>


<script>
import { computed, ref, watchEffect } from "@vue/runtime-core"
import { useRoute } from "vue-router"
import { notesService } from "../services/NotesService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { AppState } from "../AppState"
export default {
  props: {
    task: {
      type: Object,
      required: true
    }

  },
  setup(props) {
    const route = useRoute()
    let editable = ref({ taskId: props.task.id })



    return {
      editable,
      notes: computed(() => AppState.notes.filter(n => n.taskId == props.task.id)),
      account: computed(() => AppState.account),
      async createNote() {
        try {
          await notesService.createNote(editable.value, route.params.projectId)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },

      async deleteNote(noteId) {
        try {
          await notesService.deleteNote(noteId, route.params.projectId)
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
.note-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>