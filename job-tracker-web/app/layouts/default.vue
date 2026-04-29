<template>
  <v-app>
    <v-navigation-drawer permanent class="px-5">
      <v-list color="secondary-darken-1">
        <v-list-item>
          <v-list-item-title
            class="font-weight-bold text-title-large py-2 mt-1 d-flex align-center ga-1"
            ><v-icon>mdi-briefcase-edit-outline</v-icon
            >JobTracker</v-list-item-title
          >
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
          link
          value="dashboard"
          class="mt-2"
          :active="isInDashboard()"
        >
          <template #title
            ><span class="text-label-large">Dashboard</span>
          </template>

          <template #prepend>
            <v-icon size="small">mdi-table</v-icon>
          </template>
        </v-list-item>
        <v-list-item link @click="logout()">
          <template #title
            ><span class="text-label-large">Logout</span>
          </template>

          <template #prepend>
            <v-icon size="small">mdi-logout</v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
function logout() {
  navigateTo({ name: "logout" });
}

import { useRoute } from "vue-router";
const route = useRoute();

function isInDashboard() {
  if (route.name === "id-dashboard") {
    return true;
  }
}
</script>
