<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid">
    <router-view />
  </main>
  <footer>
    <div class="bg-primary text-dark text-center p-4">
      <h1 class="text-secondary">Welcome</h1>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
