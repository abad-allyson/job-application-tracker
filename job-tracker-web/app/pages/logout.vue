<template>
  <v-row no-gutters class="fill-height" justify="center" align-content="center">
    <span
      >You had been logged out successfully.
      <nuxt-link :to="{ name: 'index' }">Login again?</nuxt-link></span
    >
  </v-row>
</template>
<script setup>
definePageMeta({
  layout: "plain",
});

useHead({
  title: "Log Out",
});

const { cookieConfig } = useRuntimeConfig().public;
useCookie("sid", cookieConfig).value = null;
useCookie("user", cookieConfig).value = null;
</script>
