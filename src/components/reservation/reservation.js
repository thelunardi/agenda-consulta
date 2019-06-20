import {httpReservation, httpHolidays} from '../../service/config.js'

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
      holidays: {},
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
      year: moment().format('YYYY'),
      dates: [],
      params: {
        token: process.env.TOKEN_CALENDAR,
        json: true
      }
    }
  },
  created () {
    this.getNationalHolidays()
  },
  methods: {
    getNationalHolidays () {
      httpHolidays.get(`/?ano=${this.year}`, {
        params: this.params
      }).then(response => {
        this.holidays = response.data
        this.showAvailableDates()
      }).catch(() => {
        console.log('Erro ao listar os feriados nacionais.')
      })
    },
    showAvailableDates () {
      moment.locale('pt')
      let now = moment()
      let nowChange = moment()
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
    /**
     *
     */
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
      return (now.days() === WEEK_DAYS.monday || now.days() === WEEK_DAYS.tuesday || now.days() === WEEK_DAYS.wednesday || now.days() === WEEK_DAYS.thursday)
    },
    /**
     * @param now
     * @returns {boolean}
     */
    fridayToSunday (now) {
      return (now.days() === WEEK_DAYS.sunday || now.days() === WEEK_DAYS.friday || now.days() === WEEK_DAYS.saturday)
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
     * @param now
     * @returns {boolean}
     */
    searchDateHoliday (now) {
      let date = now.format('L')
      let result = false
      this.holidays.forEach((holiday) => {
        if (holiday.date === date) {
          result = true
        }
      })
      return result
    },
    /**
     * @param days
     * @param nowChange
     * @param daysToAdd
     */
    addDate (days, nowChange, daysToAdd) {
      while (this.searchDateHoliday(nowChange.add(daysToAdd, 'days'))) {
        nowChange.add(0, 'days')
      }
      this.dates[days] = {
        value: nowChange.format('L'),
        label: nowChange.format('dddd, D MMMM YYYY')
      }
    }
  }
}
