<script setup>
import { reactive } from 'vue'

import CalendarForm from '../components/CalendarForm.vue'

function onSubmit() {
  console.log(form)
}

/**
 * Controlled form object
 *
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {Date} startDate
 * @property {Date} endDate
 */
const form = reactive({
  name: '',
  email: '',
  phone: '',
  startDate: null,
  endDate: null,
})

/**
 * @param {Object} inputs
 * @param {Date} inputs.startDate
 * @param {Date} inputs.endDate
 */
function handleChangeDates(inputs) {
  form.startDate = inputs.startDate
  form.endDate = inputs.endDate
}
</script>

<template>
  <div class="reserve">
    <h2>Book the House</h2>

    <form @submit.prevent="onSubmit">
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
          type="text"
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

<style scoped>
.reserve {
  max-width: 600px;
  margin: 0 auto;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.form-group {
  display: flex;
}

.form-group label {
  flex: 1;
  margin-right: 1em;
}

.form-group .form-control {
  flex: 3;
}
</style>
