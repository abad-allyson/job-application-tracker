<template>
  <span class="font-weight-medium mb-2">
    {{ title }} <span v-if="props.required" class="text-error">*</span>
  </span>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
});
</script>
