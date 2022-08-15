<script setup>
const contactDetails = {
  name: 'Gary Berti',
  phone: `<a href="tel:4102746338">410-274-6338</a>`,
  email: `<a href="mailto:gary@nonnonticktocks.com">gary@nonnonticktocks.com</a>`,
}
</script>

<template>
  <div class="contact">
    <h1>Contact Us</h1>
    <dl>
      <template v-for="(value, key, index) in contactDetails" :key="index">
        <dt>{{ key }}</dt>
        <dd v-html="value"></dd>
      </template>
    </dl>
  </div>
</template>

<style scoped>
.contact {
  max-width: 600px;
  margin: 0 auto;
}

dl {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1em;
}

dt {
  font-weight: bold;
  flex-shrink: 0;
}

dd {
  margin: 0;
  padding: 0;
  flex: 1 1 80%;
}
</style>
