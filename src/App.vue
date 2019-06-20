<template>
  <div id="app">
    <div class="home">
      <div class="item item-1 background-black">
        <div>
          Sistema de Agendamento de Consultas
        </div>
        <button
          class="btn btn-secondary btn-sm"
          v-if="logado"
          @click="logout()"
          type="submit">
          Logout
        </button>
      </div>
      <div class="item item-2">
        <router-view/>
      </div>
      <div class="item item-3 background-black"></div>
    </div>
  </div>
</template>

<script>
import {store} from '../src/store'
export default {
  computed: {
    logado () {
      return store.getters.authenticated
    }
  },
  methods: {
    /**
     *
     */
    logout () {
      store.dispatch('remove', this.users)
      this.$router.push('/')
    }
  }
}
</script>

<style src="./assets/main.css"></style>
