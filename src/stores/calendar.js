/**
 * Manage the stores relevant to the calendar.
 *
 * @roadmap
 * [ ] Basic state management models.
 * [ ] Mocks for testing.
 * [ ] Store management via localstorage.
 * [ ] Store management via database.
 */
import { defineStore } from 'pinia'

const today = new Date()
const dayInFuture = (n, baseDate = today) => {
  const future = new Date()
  future.setDate(baseDate.getDate() + n)
  return future
}

export const useCalendarStore = defineStore({
  id: 'calendar',
  state: () => ({
    reservedDates: [],
  }),
  getters: {
    getAll() {
      return this.reservedDates
    },
  },
  actions: {
    format(date) {
      if (typeof date.getDate !== 'function') {
        throw new Error('Date is not a valid date object.')
      }
      date.setHours(0, 0, 0, 0)
      const dateStr = date.toJSON()

      return dateStr
    },
    unformat(dateStr) {
      const date = new Date(dateStr)

      return date
    },
    isReserved(date) {
      if (!date) {
        return false
      }
      if (typeof date.getDate !== 'function') {
        throw new Error('Date is not a valid date object.')
      }
      const formatted = this.format(date)
      const check = this.reservedDates.includes(formatted)
      console.log('checking', formatted, 'in', this.reservedDates, check)

      return check
    },
    addDate(date) {
      const dateStr = this.format(date)
      this.reservedDates.push(dateStr)
    },
    reserve(startDate, endDate) {
      if (startDate >= endDate) {
        throw new Error('Start date must be before end date')
      }

      let date = startDate
      let n = 0
      let newDates = []
      while (date <= endDate) {
        newDates.push(date)
        date = dayInFuture(++n, date)
        n++
        if (n === 99) {
          throw new Error('timeout exceeded')
        }
      }

      newDates.forEach((date) => this.addDate(date))
    },
    /**
     * Add some days to the reserved dates list for testing.
     */
    seedMock() {
      const today = new Date()
      const dayInFuture = (n) => {
        const future = new Date()
        future.setDate(today.getDate() + n)
        return future
      }
      this.reserve(dayInFuture(8), dayInFuture(9))
      this.reserve(dayInFuture(20), dayInFuture(24))
    },
  },
})
