<template>
  <div class="reservation">
    <div class="row">
      <label for="day">Data*</label>

      <div>
        <input
          id="day"
          type="date"
          name="day"
          v-model="day"
        >
      </div>
    </div>

    <div class="row">
      <label for="period">Período*</label>
      <input
        id="period"
        type="text"
        name="period"
        v-model="period"
      >
    </div>

    <div>
      <button
        class="btn waves-effect"
        @click="salvar()"
        type="submit">
        Salvar
      </button>
    </div>
  </div>
</template>

<script>
import {httpReservation} from '../service/config.js'

export default {
  name: 'reservation',
  data () {
    return {
      day: '',
      period: ''
    }
  },
  methods: {
    salvar () {
      if (this.day === '' || this.period === '') {
        return
      }
      httpReservation.post('db', {
        day: this.day,
        period: this.period
      }).then(() => {
        alert('Horário reservado com sucesso')
      }).catch(() => {
        alert('Erro ao reservar horário')
      })
    }
  }
}
</script>
