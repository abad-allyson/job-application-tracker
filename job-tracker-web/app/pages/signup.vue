<template>
  <v-row align="center" justify="center" class="fill-height">
    <v-col cols="12" class="d-flex justify-center">
      <v-card class="pa-4" elevation="2" width="400">
        <v-card-title class="text-center font-weight-bold"
          >Sign Up</v-card-title
        >
        <v-card-text>
          <v-form v-model="valid">
            <v-row no-gutters>
              <v-col>
                <InputLabel title="First Name" required />
                <v-text-field
                  v-model="user.firstName"
                  required
                  :rules="[requiredRule]"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col>
                <InputLabel title="Last Name" required />
                <v-text-field
                  v-model="user.lastName"
                  required
                  :rules="[requiredRule]"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col>
                <InputLabel title="Email" required />
                <v-text-field
                  v-model="user.email"
                  type="email"
                  required
                  :rules="[requiredRule, emailRule]"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col>
                <InputLabel title="Password" required />
                <v-text-field
                  v-model="user.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  :rules="[requiredRule, passwordRule]"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="showPassword = !showPassword"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col>
                <InputLabel title=" Confirm Password" required />
                <v-text-field
                  v-model="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  required
                  :rules="[requiredRule, confirmPasswordRule(user.password)]"
                  :append-inner-icon="
                    showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'
                  "
                  @click:append-inner="
                    showConfirmPassword = !showConfirmPassword
                  "
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col cols="12" class="d-flex justify-center">
                <span class="text-error font-weight-bold font-italic">{{
                  message
                }}</span>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col cols="12" class="d-flex justify-center">
                <span class="text-success font-weight-bold font-italic">{{
                  confirmation
                }}</span>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col>
                <v-btn
                  color="secondary"
                  class="mt-4 font-weight-medium"
                  block
                  variant="flat"
                  :disabled="!valid"
                  @click="signup()"
                  >Sign Up</v-btn
                >
              </v-col>

              <v-col cols="12" class="text-center mt-2">
                <span
                  >Already have an acount?
                  <NuxtLink to="/login">Login</NuxtLink></span
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
  title: "Create Account",
});

const { requiredRule, emailRule, passwordRule, confirmPasswordRule } =
  useUtils();
const { add } = useUser();

const user = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
});

const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const message = ref("");
const valid = ref(true);

const confirmation = ref("");

function signup() {
  try {
    add(user.value);
    confirmation.value =
      "Account created successfully! Redirecting to login...";

    setTimeout(() => {
      navigateTo({ name: "index" });
    }, 2000);
  } catch (error) {
    message.value = error.response._data.message;
  }
}
</script>
