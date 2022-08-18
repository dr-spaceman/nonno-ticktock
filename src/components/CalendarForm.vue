<script setup>
import { computed, ref } from 'vue'

const emit = defineEmits(['on-change'])

const NUM_WEEKS_AHEAD_TO_SHOW = 6
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
const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const selectedStartDate = ref(null)
const selectedEndDate = ref(null)
// Object to emit upon change events
const dateInputs = {
  startDate: null,
  endDate: null,
}
// A reference to aid in date selection
let dateIndex = 0

const printHeader = computed(() => {
  if (!selectedStartDate.value || !selectedEndDate.value) {
    return 'Select a date range below'
  }

  const date1 = formatDate(selectedStartDate.value)
  const date2 = formatDate(selectedEndDate.value)
  const diffTime = Math.abs(date2 - date1)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return `${diffDays + 1} days and ${diffDays} night${
    diffDays > 1 ? 's' : ''
  } selected`
})

function selectDay(day) {
  if (isUnavailable(day)) {
    return
  }

  const prev = { selectedStartDate, selectedEndDate }

  if (!selectedStartDate.value) {
    selectedStartDate.value = day
  } else if (!selectedEndDate.value) {
    selectedEndDate.value = day
  } else {
    if (day.index > selectedEndDate.value.index) {
      selectedEndDate.value = day
    } else if (
      day.index > selectedStartDate.value.index &&
      day.index < selectedEndDate.value.index
    ) {
      selectedEndDate.value = day
    } else if (
      day.index === selectedStartDate.value.index ||
      day.index === selectedEndDate.value.index
    ) {
      selectedStartDate.value = day
      selectedEndDate.value = null
    } else if (day.index < selectedStartDate.value.index) {
      selectedStartDate.value = day
    }
  }

  // Check if any of the in between dates are unavailable
  if (selectedStartDate.value && selectedEndDate.value) {
    const start = selectedStartDate.value.index
    const end = selectedEndDate.value.index
    for (let i = start + 1; i < end; i++) {
      if (isUnavailable(getDayByIndex(i))) {
        selectedEndDate.value = prev.selectedEndDate.value
        selectedStartDate.value = prev.selectedStartDate.value
        return
      }
    }
  }

  dateInputs.startDate = formatDate(selectedStartDate.value)
  dateInputs.endDate = formatDate(selectedEndDate.value)

  emit('on-change', dateInputs)
}

function formatDate(day) {
  if (!day || !day.year || !day.month || !day.date) return ''

  return new Date(day.year, day.month, day.date)
}

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate()
}

const today = new Date()
const todayDate = today.getDate()
const todayDay = today.getDay()
const todayMonth = today.getMonth()
const todayYear = today.getFullYear()
const todayMonthDays = getDaysInMonth(todayYear, todayMonth)
let iMonth = todayMonth
let iMonthDays = todayMonthDays
let iDate = todayDate
let iWeek = 0
let iDay = todayDay + 1
let iYear = todayYear
let iMonthWeek = 0

const cal = { [iMonth]: [[]] }
const calPush = (n) => {
  if (!cal[iMonth]) {
    cal[iMonth] = [[]]
  }
  if (!cal[iMonth][iMonthWeek]) {
    cal[iMonth][iMonthWeek] = []
  }
  if (n && typeof n === 'object') {
    n = { ...n, ...{ index: dateIndex++ } }
  }
  cal[iMonth][iMonthWeek].push(n)
}
const isUnavailable = (day) => (day && day.unavailable) || day.past

const isSelected = (day) => {
  if (!day) {
    return false
  }
  if (day.index === selectedStartDate?.value?.index) {
    return true
  }
  return (
    day.index >= selectedStartDate?.value?.index &&
    day.index <= selectedEndDate?.value?.index
  )
}

const getDayByIndex = (index) => {
  if (typeof index !== 'number') {
    throw new Error('index must be a number')
  }

  for (const month in cal) {
    for (const week in cal[month]) {
      for (const day of cal[month][week]) {
        if (day.index === index) {
          return day
        }
      }
    }
  }

  throw new Error(`day index ${index} not found`)
}

// Fill in past days this week and today
for (let i = 0; i <= todayDay; i++) {
  const date = todayDate - (todayDay - i)
  if (date > 0 && date <= todayMonthDays) {
    calPush({
      date,
      day: i,
      month: iMonth,
      year: iYear,
      past: date < todayDate,
    })
  } else {
    calPush(null)
  }
}

// Fill in the rest
while (iWeek <= NUM_WEEKS_AHEAD_TO_SHOW) {
  while (iDay < 7) {
    iDate++
    iDay++
    if (iDate > iMonthDays) {
      for (let k = 0; k < 7; k++) {
        calPush(null)
        iDay++
        if (iDay === 8) {
          iDay = 0
          iWeek++
          iMonthWeek = 0
          iMonth++
          if (iMonth > 11) {
            iMonth = 0
            iYear++
          }
          iMonthDays = getDaysInMonth(iYear, iMonth)
          iDate = 0
        }
      }
    } else {
      calPush({ date: iDate, day: iDay - 1, month: iMonth, year: iYear })
    }
  }
  iDay = 0
  iWeek++
  iMonthWeek++
}
</script>

<template>
  <div class="calendar">
    <!-- <pre>{{ JSON.stringify(cal, null, 2) }}</pre> -->
    <header role="note">{{ printHeader }}</header>
    <template v-for="(weeks, month) in cal" :key="month">
      <h5>{{ months[month] }}</h5>
      <div class="weeks">
        <div class="week" v-for="(week, index) in weeks" :key="index">
          <template v-for="(day, i) in week">
            <div v-if="!day" class="empty" :key="i">
              <span></span>
            </div>
            <div
              v-else
              :class="{
                day: true,
                selected: isSelected(day),
                unavailable: isUnavailable(day),
              }"
              :data-date-index="day.index"
              role="button"
              :aria-disabled="isUnavailable(day)"
              :aria-label="`${days[day.day]} ${day.date} ${
                months[day.month]
              }, ${isUnavailable(day) ? 'Not ' : ''}Available`"
              @click="selectDay(day)"
              :key="`${day.month}${day.date}`"
            >
              <span>{{ day.date }}</span>
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.calendar {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}

header {
  padding: var(--padding);
  border: 2px solid var(--color-background-mute);
  border-radius: 50px;
  text-align: center;
}

h5 {
  margin: 0;
  padding: var(--padding);
  text-align: center;
  font-weight: 500;
  font-size: 15px;
}

.weeks {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}

.week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: var(--gap);
}

.day {
  padding: var(--padding);
  transition: background-color 0.2s ease-in-out;
  background-color: var(--color-background-mute);
}

.day:not([aria-disabled='true']) {
  cursor: pointer;
}

.day:not([aria-disabled='true']):hover {
  background-color: hsla(160, 100%, 37%, 0.3);
}

.day[aria-disabled='true'] {
  cursor: not-allowed;
  opacity: 0.5;
  text-decoration: line-through;
}

.day span {
  display: block;
  text-align: center;
}

.day.selected {
  background-color: hsla(160, 100%, 37%, 0.2);
}
</style>
