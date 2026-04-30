<template>
  <v-app>
    <v-app-bar v-if="$vuetify.display.mobile" color="primary" elevation="0">
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <ClientOnly>
      <v-navigation-drawer v-model="drawer" class="px-5">
        <v-list color="secondary-darken-1">
          <v-list-item v-if="$vuetify.display.mdAndUp">
            <v-list-item-title
              class="font-weight-bold text-title-large py-2 mt-1 text-center"
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
    </ClientOnly>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify";

const { mobile } = useDisplay();
const route = useRoute();

const drawer = ref(!mobile.value);

watch(mobile, (isMobile) => {
  drawer.value = !isMobile;
});

function isInDashboard() {
  return route.name === "id-dashboard";
}

function logout() {
  navigateTo({ name: "logout" });
}
</script>
