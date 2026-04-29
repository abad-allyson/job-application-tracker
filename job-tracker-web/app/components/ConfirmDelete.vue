<template>
  <v-card class="px-4 py-4" rounded="lg">
    <v-card-title class="d-flex align-center ga-2 font-weight-bold">
      <v-icon color="error">mdi-alert-circle</v-icon>Delete
      Application</v-card-title
    >
    <v-card-text>
      Are you sure you want to delete this job application? This action cannot
      be undone.
    </v-card-text>
    <v-toolbar color="surface" flat>
      <v-row class="pa-6">
        <v-col cols="6">
          <v-btn variant="outlined" size="large" @click="emit('cancel')" block
            >Cancel</v-btn
          >
        </v-col>
        <v-col cols="6">
          <v-btn
            color="error"
            variant="flat"
            size="large"
            block
            @click="emit('delete')"
            >Delete</v-btn
          >
        </v-col>
      </v-row>
    </v-toolbar>
  </v-card>
</template>

<script setup>
const emit = defineEmits(["delete", "cancel"]);
</script>
