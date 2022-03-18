<template>
  <nav
    class="
      navbar navbar-expand-lg navbar-dark
      bg-primary
      px-3
      d-flex
      justify-content-between
    "
  >
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center text-dark">
        <h1>Home</h1>
      </div>
    </router-link>
    <h1 class="title-home text-dark">PlanIt</h1>
    <div>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>

      <div class="collapse navbar-collapse" id="navbarText">
        <span class="navbar-text">
          <button
            class="btn selectable text-uppercase my-2 my-lg-0"
            @click="login"
            v-if="!user.isAuthenticated"
          >
            Login
          </button>

          <div class="dropdown my-2 my-lg-0" v-else>
            <div
              class="dropdown-toggle selectable"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              id="authDropdown"
            >
              <img
                :src="user.picture"
                alt="user photo"
                height="40"
                class="rounded"
              />
              <span class="mx-3 text-dark">{{ user.name }}</span>
            </div>
            <div
              class="dropdown-menu p-0 list-group w-100"
              aria-labelledby="authDropdown"
            >
              <div
                class="
                  list-group-item
                  text-dark
                  list-group-item-action
                  hoverable
                  selecatable
                "
                data-bs-toggle="modal"
                data-bs-target="#account-modal"
              >
                Edit Profile
              </div>

              <div
                class="
                  list-group-item list-group-item-action
                  hoverable
                  text-danger
                "
                @click="logout"
              >
                <i class="mdi mdi-logout"></i>
                logout
              </div>
            </div>
          </div>
        </span>
      </div>
    </div>
  </nav>
  <Modal id="account-modal">
    <template #modal-title>
      <h4>Edit Profile</h4>
    </template>
    <template #modal-body><EditAccountForm /></template>
  </Modal>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed } from 'vue'
import { accountService } from "../services/AccountService"
import { Modal } from "bootstrap";
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      },


    }
  }
}
</script>

<style scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.title-home {
  font-size: 10vh;
}
</style>
