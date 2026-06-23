<template>
  <v-row align="center" justify="center" class="fill-height">
    <v-col cols="12" class="d-flex justify-center">
      <v-card class="pa-4" elevation="2" width="400">
        <v-card-title class="text-center font-weight-bold">Login</v-card-title>
        <v-card-text>
          <v-form v-model="valid" @keydown.enter.exact="login()">
            <v-row no-gutters>
              <v-col>
                <InputLabel title="Email" />
                <v-text-field
                  v-model="email"
                  type="email"
                  :rules="[requiredRule]"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col>
                <InputLabel title="Password" />
                <v-text-field
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  :rules="[requiredRule]"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="showPassword = !showPassword"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col cols="12" class="text-center">
                <span class="text-error font-weight-bold font-italic">{{
                  message
                }}</span>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col cols="12">
                <v-btn
                  color="secondary-darken-1"
                  class="mt-4"
                  block
                  variant="flat"
                  :disabled="!valid"
                  :loading="loading"
                  @click="login()"
                  >Login</v-btn
                >
              </v-col>
              <v-col cols="12" class="text-center mt-2">
                <span
                  >Don't have an account? <a href="/signup">Sign up</a></span
                >
              </v-col>
            </v-row>
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

useHead({
  title: "Login",
  link: [{ rel: "icon", type: "image/png", href: "/icon.png" }],
});

const { requiredRule } = useUtils();

const valid = ref(true);
const email = ref("");
const password = ref("");

const showPassword = ref(false);
const message = ref("");
const loading = ref(false);

async function login() {
  const { cookieConfig } = useRuntimeConfig().public;
  try {
    loading.value = true;
    const data = await $fetch(`/api/auth`, {
      method: "POST",
      body: { email: email.value, password: password.value },
    });

    useCookie("sid", cookieConfig).value = data.sid;
    useCookie("user", cookieConfig).value = data.user;

    console.log("navigating to dashboard");
    navigateTo({ name: "id-dashboard", params: { id: data.user } });
  } catch (error) {
    message.value = error.response._data.message;
    loading.value = false;
  } finally {
    loading.value = false;
  }
}
</script>
