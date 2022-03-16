<template>
  <form class="d-flex flex-column">
    <label for="">Profile Name</label>
    <input v-model="editable.name" type="text" placeholder="profile name..." />
    <label for="">Profile Photo</label>
    <input
      v-model="editable.picture"
      type="text"
      placeholder="profile picture..."
    />
    <label for="">Profile Email</label>
    <input
      v-model="editable.email"
      type="text"
      placeholder="profile email..."
    />
    <button class="btn btn-primary m-2" @click="editAccount()">Submit</button>
  </form>
</template>


<script>
import { ref, watchEffect } from "@vue/runtime-core";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { accountService } from "../services/AccountService";
import { Modal } from "bootstrap";
export default {
  setup() {
    let editable = ref({});
    watchEffect(() => {
      editable.value = AppState.account
    })
    return {
      editable,
      async editAccount() {
        try {
          await accountService.editAccount(editable.value)
          Modal.getOrCreateInstance(document.getElementById('account-modal')).hide()
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