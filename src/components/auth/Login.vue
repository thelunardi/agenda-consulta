<template>
  <div class="card login">
    <div class="form-group">
      <div v-if="showError" class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Usuário não encontrado!</strong> Verifique seu e-mail e seu telefone.
        <button @click="closeAlert" type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <b><label for="email">E-mail*</label></b>
      <div>
        <input
          class="form-control"
          id="email"
          type="email"
          name="email"
          ref="email"
          v-model="email"
        >
      </div>
      <br>
      <b><label for="phone">Telefone*</label></b>
      <div class="input-group mb-3">
        <input
          class="form-control"
          type="text"
          id="phone"
          name="phone"
          ref="phone"
          v-model="phone"
        >
      </div>
      <div>
        <button
          class="btn btn-primary"
          @click="logar()"
          type="submit">
          Entrar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {httpUsers} from '../../service/config.js'

export default {
  name: 'login',
  data () {
    return {
      showError: false,
      email: '',
      phone: '',
      users: [],
      type: 'password'
    }
  },
  methods: {
    /**
     *
     */
    logar () {
      if (this.email === '') {
        this.$refs.email.focus()
        return
      }
      if (this.phone === '') {
        this.$refs.phone.focus()
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
          this.$store.dispatch('setUser', this.users)
          this.$router.push('/reservation')
          return
        }
        if (response.data.length === 0) {
          this.showError = true
        }
      }).catch(() => {
        this.showError = true
      })
    },
    /**
     *
     */
    closeAlert () {
      this.showError = false
    }
  }
}
</script>
<style scoped>
  .login {
    width: 50%;
    margin-top: 50px;
    margin-left: 25%;
    margin-right: 25%;
    padding: 20px;
  }

  .fa-eye {
    background-color: #333 !important;
    color: black !important;
  }
</style>
