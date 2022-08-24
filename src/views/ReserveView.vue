<script setup>
import { reactive } from 'vue'

import CalendarForm from '../components/CalendarForm.vue'
import { useCalendarStore } from '../stores/calendar'

const store = useCalendarStore()

/**
 * Controlled form object
 *
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {Date} startDate
 * @property {Date} endDate
 * @property {string} error - Error message
 * @property {boolean} loading The form has been submitted and is thinking
 * @property {boolean} complete The form has been submitted and stored successfully
 */
const form = reactive({
  name: '',
  email: '',
  phone: '',
  startDate: null,
  endDate: null,
  error: null,
  loading: false,
  complete: false,
})

/**
 * @param {Object} inputs
 * @param {Date} inputs.startDate
 * @param {Date} inputs.endDate
 */
function handleChangeDates(inputs) {
  form.error = null
  form.startDate = inputs.startDate
  form.endDate = inputs.endDate
}

function onSubmit() {
  form.error = null
  try {
    ;['name', 'email'].forEach((field) => {
      if (!form[field]) {
        throw new Error(`${field} is required`)
      }
    })
    if (!form.startDate || !form.endDate) {
      throw new Error('Please select a date range')
    }

    store.reserve(form.startDate, form.endDate)

    form.complete = true
  } catch (e) {
    console.error(e)
    form.error = e.message
  }
}
</script>

<template>
  <div class="reserve">
    <h2>Book the House</h2>

    <div v-if="form.complete">
      <strong>Reservation complete.</strong> Enjoy your stay.
    </div>
    <form v-else @submit.prevent="onSubmit">
      <div v-if="form.error" class="error" role="alert">
        <strong>Error</strong> {{ form.error }}
      </div>

      <div class="calendar">
        <CalendarForm @on-change="handleChangeDates" />
      </div>

      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="form.name"
          placeholder="Name"
          required
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="form.email"
          placeholder="Email"
          required
        />
      </div>
      <div class="form-group">
        <label for="phone">Phone</label>
        <input
          type="tel"
          class="form-control"
          id="phone"
          v-model="form.phone"
          placeholder="Phone"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<style>
.reserve {
  --gap: 4px;
  --padding: 4px;
  max-width: 500px;
  margin: 0 auto;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.form-group {
  display: flex;
  align-items: center;
}

.form-group label {
  flex: 1;
  margin-right: 1em;
}

.form-group .form-control {
  flex: 3;
}

.error {
  color: var(--color-error);
  border: 2px solid var(--color-error);
  padding: var(--padding) calc(var(--padding) * 2);
  border-radius: 3px;
}
</style>
