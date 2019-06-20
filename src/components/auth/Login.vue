<template>
  <div class="card login">
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
      <br>
      <label for="phone">Phone*</label>
      <div class="input-group mb-3">
        <input
          class="form-control"
          :type="type"
          id="phone"
          name="phone"
          v-model="phone"
        >
        <div class="input-group-append">
          <button @click="showPhone" class="btn btn-outline-secondary" type="button">
            <i class="fa fa-eye"></i>
          </button>
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
  </div>
</template>

<script>
import {httpUsers} from '../../service/config.js'

export default {
  name: 'login',
  data () {
    return {
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
          this.$store.dispatch('setUser', this.users)
          this.$router.push('/reservation')
        }
      }).catch((error) => {
        alert('Usuário não encontrado', error)
      })
    },
    showPhone () {
      if (this.type === 'password') {
        this.type = 'text'
        return
      }
      this.type = 'password'
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
