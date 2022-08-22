import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'

import { useCalendarStore } from '../calendar'

const today = new Date()
const dayInFuture = (n) => {
  const future = new Date()
  future.setDate(today.getDate() + n)
  return future
}

describe('Counter Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('formats dates', () => {
    const store = useCalendarStore()
    const date = new Date(2022, 0, 1)
    const formatted = store.format(date)
    const unformatted = store.unformat(formatted)
    expect(unformatted).toEqual(date)
  })

  it('sets up states and seeds', () => {
    const store = useCalendarStore()
    expect(store.reservedDates.length).toEqual(0)
    store.seedMock()
    expect(store.reservedDates.length).toBeGreaterThan(0)
  })

  it('stores days as reserved and checks for reservations accurately', () => {
    const store = useCalendarStore()
    expect(store.isReserved(today)).toBe(false)
    store.reserve(today, dayInFuture(1))
    expect(store.reservedDates.length).toEqual(2)
    expect(store.isReserved(today)).toBe(true)
    expect(store.isReserved(dayInFuture(1))).toBe(true)
    expect(store.isReserved(dayInFuture(2))).toBe(false)
  })
})
