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
    isReserved(date) {
      return this.reservedDates.includes(date.toJSON())
    },
    reserve(startDate, endDate) {
      if (startDate >= endDate) {
        throw new Error('Start date must be before end date')
      }

      let date = startDate
      let n = 0
      let newDates = []
      while (date <= endDate) {
        newDates.push(date.toJSON())
        date.setDate(date.getDate() + 1)
        n++
        if (n === 99) {
          throw new Error('timeout exceeded')
        }
      }

      this.reservedDates = [...this.reservedDates, ...newDates]
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
