import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import CalendarForm from '../CalendarForm.vue'

const today = new Date()
const dayInFuture = (n) => {
  const future = new Date()
  future.setDate(today.getDate() + n)
  return future
}

const calWrapper = {
  template: `<div><CalendarForm :startDate="startDate" /></div>`,
  data() {
    return {
      startDate: new Date(),
    }
  },
  components: { CalendarForm },
}

// Calendar starts 90 days from today
const futureCalendarStartDate = dayInFuture(90)
const FutureCalendar = {
  template: `<div><CalendarForm :startDate="startDate" /></div>`,
  data() {
    return {
      startDate: futureCalendarStartDate,
    }
  },
  components: { CalendarForm },
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

describe('CalendarForm', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('renders properly', () => {
    const wrapper = mount(calWrapper)
    const thisMonth = months[new Date().getMonth()]
    expect(wrapper.text()).toContain(thisMonth)
  })

  it('selects a date range', () => {
    const wrapper = mount(calWrapper)

    wrapper
      .find("[data-month='1']>[data-week='1']>[data-day='0']")
      .trigger('click')
    wrapper
      .find("[data-month='1']>[data-week='1']>[data-day='2']")
      .trigger('click')

    expect(wrapper.text()).toContain('3 days and 2 nights selected')
  })

  it('renders properly with a future start date', () => {
    const wrapper = mount(FutureCalendar)
    expect(wrapper.text()).toContain(months[futureCalendarStartDate.getMonth()])
  })
})
