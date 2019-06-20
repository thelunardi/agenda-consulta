<template>
  <div class="login">
    <div class="form-group">

    <label for="email">E-mail*</label>

      <div>
        <input
          class="form-control"
          id="email"
          type="email"
          name="email"
          v-model="email"
        >
      </div>
    </div>

    <div class="form-group">
      <label for="phone">Telefone*</label>

      <div>
        <input
          class="form-control"
          id="phone"
          name="phone"
          type="password"
          v-model="phone"
        >
      </div>
    </div>

    <div>
      <button
        class="btn waves-effect"
        @click="logar()"
        type="submit">
        Entrar
      </button>
    </div>
  </div>
</template>

<script>
import {httpUsers} from '../service/config.js'
import {store} from '../store'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      phone: '',
      users: []
    }
  },
  methods: {
    logar () {
      if (this.email === '' || this.phone === '') {
        return
      }
      httpUsers.get('/users', {
        params: {
          email: this.email,
          phone: this.phone
        }
      }).then(response => {
        if (response.data.length > 0) {
          this.users = response.data[0]
          store.dispatch('set', this.users)
          this.$router.push('/reservation')
        }
      }).catch(() => {
        alert('Usuário não encontrado')
      })
    }
  }
}
</script>
<style>
  .login {
    width: 50%;
    margin-top: 50px;
    margin-left: 25%;
    margin-right: 25%;
  }
</style>
