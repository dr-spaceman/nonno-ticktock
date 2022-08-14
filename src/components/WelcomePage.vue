<script setup>
import { RouterLink } from 'vue-router'

import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>
      <RouterLink to="/reserve">Reservations</RouterLink>
    </template>

    Reserve the beach house for your family or a group of friends.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>
      <RouterLink to="/about">About the House</RouterLink>
    </template>

    Find out more about the house and the beach.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>
      <RouterLink to="/contact">Contact Us</RouterLink>
    </template>

    Questions? Comments? Concerns? Contact us and we'll get back to you.
  </WelcomeItem>
</template>
