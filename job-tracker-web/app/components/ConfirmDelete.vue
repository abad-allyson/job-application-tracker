<template>
  <v-card class="px-4 py-2" rounded="lg">
    <v-card-title class="d-flex align-center ga-1 font-weight-bold mt-2">
      <v-icon color="error">mdi-alert-circle-outline</v-icon>Delete
      Application</v-card-title
    >
    <v-card-text>
      Are you sure you want to delete? This action cannot be undone.
    </v-card-text>
    <v-toolbar color="surface">
      <v-spacer />
      <v-btn variant="outlined" @click="emit('cancel')">Cancel</v-btn>
      <v-btn color="error" variant="flat" class="ml-2" @click="emit('delete')"
        >Delete</v-btn
      >
    </v-toolbar>
  </v-card>
</template>

<script setup>
const emit = defineEmits(["delete", "cancel"]);
</script>
