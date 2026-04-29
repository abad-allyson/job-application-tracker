<template>
  <v-row align="center" justify="center" class="fill-height">
    <v-col cols="12" class="d-flex justify-center">
      <v-card class="pa-4" elevation="2" width="400">
        <v-card-title class="text-center">Login</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              required
            ></v-text-field>
            <v-btn
              color="secondary"
              class="mt-4"
              block
              variant="flat"
              @click="login()"
              >Login</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
definePageMeta({
  layout: "plain",
});

const email = ref("");
const password = ref("");

const showPassword = ref(false);
const message = ref("");

async function login() {
  const { cookieConfig } = useRuntimeConfig().public;
  try {
    const data = await $fetch(`/api/auth`, {
      method: "POST",
      body: { email: email.value, password: password.value },
    });

    useCookie("sid", cookieConfig).value = data.sid;
    useCookie("user", cookieConfig).value = data.user;

    console.log("navigating to dashboard");
    navigateTo({ name: "dashboard" });
  } catch (error) {
    message.value = error.response._data.message;
  }
}
</script>
