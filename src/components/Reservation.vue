<template>
  <div class="reservation">
    <b>Selecione uma Data:</b> <br>
    <ul class="days-reservation">
      <li v-if="dates.length > 0"
          v-for="(date, index) in dates"
          :key="index">
        <input class="form-check-input" type="radio" :name="index" :id="index" :value="date.value" v-model="day">
        <label class="form-check-label" :for="index">
          {{date.label}}
        </label>
        <div class="check">
          <div class="inside"></div>
        </div>
      </li>
    </ul>
    <br>
    <br>
    <div class="form-check">
      <b><label for="period">Período*</label></b>
      <select class="form-control" id="period" v-model="period">
        <option value="manha">Manhã</option>
        <option value="tarde">Tarde</option>
      </select>
    </div>
    <br>
    <div class="form-check">
      <button
        class="btn waves-effect"
        @click="salvarReserva()"
        type="submit">
        Salvar
      </button>
    </div>
    <br>
  </div>
</template>

<script>
import {httpReservation} from '../service/config.js'

let moment = require('moment')
const LIMIT_DAYS = 10
const HORA_SEMANA = '19:30'
const HORA_FIM_SEMANA = '18:00'

export default {
  name: 'reservation',
  data () {
    return {
      day: '',
      period: '',
      periodOptions: [
        {
          value: 'manha',
          label: 'Manhã'
        },
        {
          value: 'tarde',
          label: 'Tarde'
        }
      ],
      dates: []
    }
  },
  created () {
    this.exibirDatasDisponiveis()
  },
  methods: {
    exibirDatasDisponiveis () {
      moment.locale('pt')
      let now = moment()
      let nowAlteracao = moment()
      // verificar os feriados
      for (let days = 0; days < LIMIT_DAYS; days++) {
        if ((now.days() === 1 || now.days() === 2 || now.days() === 3 || now.days() === 4) && days === 0) {
          let dataComparacao = moment(`"${now.format('L')} ${HORA_SEMANA}"`, 'DD/MM/YYYY HH:mm')
          if (now > dataComparacao) {
            let agendamento = days + 2
            this.dates[days] = {
              value: nowAlteracao.add(agendamento, 'days').format('L'),
              label: nowAlteracao.format('dddd, D MMMM YYYY')
            }
            continue
          }
          this.dates[days] = {
            value: nowAlteracao.add(1, 'days').format('L'),
            label: nowAlteracao.format('dddd, D MMMM YYYY')
          }
          continue
        }
        if ((now.days() === 0 || now.days() === 5 || now.days() === 6) && days === 0) {
          let dataComparacao = moment(`"${now.format('L')} ${HORA_FIM_SEMANA}"`, 'DD/MM/YYYY HH:mm')
          if (now > dataComparacao || (now.days() === 5 || now.days() === 6)) {
            let agendamento = 4
            if (now.days() === 5) {
              agendamento = 3
            }
            if (now.days() === 5) {
              agendamento = 2
            }
            this.dates[days] = {
              value: nowAlteracao.add(agendamento, 'days').format('L'),
              label: nowAlteracao.format('dddd, D MMMM YYYY')
            }
            continue
          }
          this.dates[days] = {
            value: nowAlteracao.add(1, 'days').format('L'),
            label: nowAlteracao.format('dddd, D MMMM YYYY')
          }
          continue
        }
        this.dates[days] = {
          value: nowAlteracao.add(1, 'days').format('L'),
          label: nowAlteracao.format('dddd, D MMMM YYYY')
        }
      }
    },
    salvarReserva () {
      if (this.day === '' || this.period === '') {
        return
      }
      httpReservation.post('reservation', {
        id: 1,
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
<style scoped>
  .days-reservation ul{
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: auto;
  }

  ul li{
    display: block;
    position: relative;
    width: 100%;
    height: 30px;
    background-color: gainsboro;
    border-radius: 5px;
    margin-top: 3px;
    padding: 3px;
  }

  ul li input[type=radio]{
    position: absolute;
    visibility: hidden;
  }

  ul li label{
    display: block;
    position: relative;
    margin: 1px auto 1px auto;
    height: 3px;
    z-index: 6;
    cursor: pointer;
    -webkit-transition: all 0.25s linear;
  }

  ul li .check{
    display: block;
    position: absolute;
    border: 5px solid #AAAAAA;
    border-radius: 100%;
    height: 25px;
    width: 25px;
    margin-top: -5px;
    z-index: 5;
    transition: border .25s linear;
    -webkit-transition: border .25s linear;
  }

  ul li .check::before {
    display: block;
    position: absolute;
    content: '';
    border-radius: 50%;
    height: 15px;
    width: 15px;
    margin: auto;
    top: 2px;
    left: 2px;
    transition: background 0.25s linear;
    -webkit-transition: background 0.25s linear;
  }

  input[type=radio]:checked ~ .check {
    border: 3px solid royalblue;
  }

  input[type=radio]:checked ~ .check::before{
    background: royalblue;
  }

  input[type=radio]:checked ~ label{
    color: royalblue;
  }
</style>
