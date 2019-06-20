import {httpReservation} from '../../service/config.js'

let moment = require('moment/moment')
const LIMIT_DAYS = 10
const TIME_WEEK = '19:30'
const TIME_WEEKEND = '18:00'
const WEEK_DAYS = {sunday: 0, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6}

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
    this.showAvailableDates()
  },
  methods: {
    showAvailableDates () {
      moment.locale('pt')
      let now = moment()
      let nowChange = moment()
      // verificar os feriados
      for (let days = 0; days < LIMIT_DAYS; days++) {
        if (this.mondayToThursday(now) && days === 0) {
          let dateToCompare = moment(`"${now.format('L')} ${TIME_WEEK}"`, 'DD/MM/YYYY HH:mm')
          if (this.afterTimeMondayToThursday(now, dateToCompare, days, nowChange)) {
            continue
          }
          this.addDate(days, nowChange, 1)
          continue
        }
        if (this.fridayToSunday(now) && days === 0) {
          let dateToCompare = moment(`"${now.format('L')} ${TIME_WEEKEND}"`, 'DD/MM/YYYY HH:mm')
          if (this.afterTimeSaturdaySunday(now, dateToCompare, days, nowChange)) {
            continue
          }
          this.addDate(days, nowChange, 1)
          continue
        }
        this.addDate(days, nowChange, 1)
      }
    },
    saveReservation () {
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
    },
    /**
     * @param now
     * @returns {boolean}
     */
    mondayToThursday (now) {
      return (now.days() === 1 || now.days() === 2 || now.days() === 3 || now.days() === 4)
    },
    /**
     * @param now
     * @returns {boolean}
     */
    fridayToSunday (now) {
      return (now.days() === 0 || now.days() === 5 || now.days() === 6)
    },
    /**
     * @param now
     * @param dateToCompare
     * @param days
     * @param nowChange
     * @returns {boolean}
     */
    afterTimeMondayToThursday (now, dateToCompare, days, nowChange) {
      if (now > dateToCompare) {
        let schedulingDays = days + 2
        this.addDate(days, nowChange, schedulingDays)
        return true
      }
      return false
    },
    /**
     * @param now
     * @param dateToCompare
     * @param days
     * @param nowChange
     * @returns {boolean}
     */
    afterTimeSaturdaySunday (now, dateToCompare, days, nowChange) {
      if (now > dateToCompare || (now.days() === WEEK_DAYS.saturday || now.days() === WEEK_DAYS.sunday)) {
        let schedulingDays = 4
        if (now.days() === WEEK_DAYS.saturday) {
          schedulingDays = 3
        }
        if (now.days() === WEEK_DAYS.sunday) {
          schedulingDays = 2
        }
        this.addDate(days, nowChange, schedulingDays)
        return true
      }
      return false
    },
    /**
     * @param days
     * @param nowChange
     * @param daysToAdd
     */
    addDate (days, nowChange, daysToAdd) {
      this.dates[days] = {
        value: nowChange.add(daysToAdd, 'days').format('L'),
        label: nowChange.format('dddd, D MMMM YYYY')
      }
    }
  }
}
