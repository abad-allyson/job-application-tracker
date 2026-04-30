<template>
  <v-app>
    <v-app-bar v-if="$vuetify.display.mobile" color="background" elevation="0">
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <ClientOnly>
      <v-navigation-drawer v-model="drawer">
        <v-list color="secondary-darken-1">
          <v-list-item>
            <template #prepend>
              <v-avatar color="secondary-darken-1" variant="tonal" size="large">
                {{ initials }}
              </v-avatar>
            </template>
            <v-list-item-title class="text-title-medium font-weight-bold">
              {{ user.firstName }} {{ user.lastName }}
            </v-list-item-title>
          </v-list-item>

          <v-divider class="my-2"></v-divider>
          <v-list-item
            link
            value="dashboard"
            class="mt-2 mx-4"
            :active="isInDashboard()"
          >
            <template #title
              ><span class="text-label-large">Dashboard</span>
            </template>

            <template #prepend>
              <v-icon size="small">mdi-table</v-icon>
            </template>
          </v-list-item>
          <v-list-item link class="mt-2 mx-4" @click="logout()">
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

const { getById: getUser } = useUser();

const user = ref({});
const userId = computed(() => route.params.id);

onMounted(async () => {
  user.value = await getUser(userId.value);
});

const initials = computed(() => {
  const first = user.value?.firstName?.charAt(0) ?? "";
  const last = user.value?.lastName?.charAt(0) ?? "";
  return (first + last).toUpperCase();
});
</script>
