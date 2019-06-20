<template>
  <div id="app">
    <div class="home">
      <div class="item item-1 background-black">
        <div>
          Sistema de Agendamento de Consultas
        </div>
        <button
          class="btn btn-secondary btn-sm"
          v-if="loggedIn"
          @click="logout()"
          type="submit">
          Logout
        </button>
      </div>
      <div class="item item-2">
        <transition name="fade">
          <router-view/>
        </transition>
      </div>
      <div class="item item-3 background-black"></div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    loggedIn () {
      return this.$store.getters.authenticated
    }
  },
  methods: {
    /**
     *
     */
    logout () {
      this.$store.dispatch('removeUser', this.users)
      this.$router.push('/')
    }
  }
}
</script>

<style src="./assets/main.css"></style>
