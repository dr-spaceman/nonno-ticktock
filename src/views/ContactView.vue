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
  min-width: 300px;
  margin: 0 auto;
}

dl {
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}

dt {
  font-weight: bold;
  width: 19%;
  margin: 1em 0 0;
}

dd {
  margin: 1em 0 0 auto;
  padding: 0;
  width: 80%;
}
</style>
