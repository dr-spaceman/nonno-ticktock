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
    /**
     * @type {String[]}
     */
    reservedDates: [],
  }),
  getters: {
    getAll() {
      return this.reservedDates
    },
  },
  actions: {
    /**
     * Format a date to a string that can be used as a key in the reservedDates array.
     *
     * @param {Date} date The date to format.
     *
     * @return {String} The formatted date.
     */
    format(date) {
      if (typeof date.getDate !== 'function') {
        throw new Error('Date is not a valid date object.')
      }
      date.setHours(0, 0, 0, 0)
      const dateStr = date.toJSON()

      return dateStr
    },
    /**
     * Unformat a date from a string that was previously formatted.
     *
     * @param {String} dateStr The date to unformat.
     *
     * @return {Date} The unformatted date.
     */
    unformat(dateStr) {
      const date = new Date(dateStr)

      return date
    },
    /**
     * Check if a date is reserved.
     *
     * @param {Date} date The date to check.
     *
     * @return {Boolean} True if the date is reserved, false otherwise.
     */
    isReserved(date) {
      if (!date) {
        return false
      }
      if (typeof date.getDate !== 'function') {
        throw new Error('Date is not a valid date object.')
      }
      const formatted = this.format(date)
      const check = this.reservedDates.includes(formatted)

      return check
    },
    /**
     * Reserve a date.
     *
     * @param {Date} date The date to reserve.
     */
    addDate(date) {
      const dateStr = this.format(date)
      this.reservedDates.push(dateStr)
    },
    /**
     * Register a reservation.
     *
     * @param {Date} startDate The start date of the reservation.
     * @param {Date} endDate The end date of the reservation.
     */
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
