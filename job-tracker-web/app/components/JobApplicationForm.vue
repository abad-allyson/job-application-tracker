<template>
  <v-card class="pa-4" max-height="600px" rounded="lg">
    <v-row no-gutters class="fill-height px-6 pb-4" align="center">
      <span class="font-weight-bold text-headline-small">
        {{
          props.mode === "update"
            ? "Edit Job Application"
            : "Add Job Application"
        }}
      </span>
    </v-row>

    <v-divider />

    <v-card-text>
      <v-form v-model="valid">
        <v-row no-gutters>
          <v-col cols="12">
            <InputLabel title="Company" required />
            <v-text-field v-model="formModel.company" :rules="[requiredRule]" />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            <InputLabel title="Job Title" required />
            <v-text-field
              v-model="formModel.jobTitle"
              :rules="[requiredRule]"
            />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            <InputLabel title="Location" required />
            <v-text-field
              v-model="formModel.location"
              :rules="[requiredRule]"
            />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col class="flex-column mr-2">
            <InputLabel title="Work Setup" required />
            <v-select
              v-model="formModel.workSetup"
              :items="props.workSetupOptions"
              :rules="[requiredRule]"
            />
          </v-col>
          <v-col class="ml-2">
            <InputLabel title="Work Type" required />
            <v-select
              v-model="formModel.workType"
              :items="props.workTypeOptions"
              :rules="[requiredRule]"
            />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            <InputLabel title="Monthly Salary" />
            <v-text-field v-model="formModel.salary" :rules="[salaryRule]" />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            <InputLabel title="Link" />
            <v-text-field v-model="formModel.link" />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            <InputLabel title="Notes" />
            <v-textarea
              v-model="formModel.notes"
              placeholder="Benefits, interview notes, contacts, next steps…"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>

    <v-toolbar color="surface" flat>
      <v-row class="pa-6 mt-4">
        <v-col cols="6">
          <v-btn block variant="outlined" size="large" @click="emit('cancel')">
            Cancel
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn
            block
            color="secondary"
            variant="flat"
            size="large"
            :disabled="!valid"
            @click="handleSave"
          >
            Save
          </v-btn>
        </v-col>
      </v-row>
    </v-toolbar>
  </v-card>
</template>

<script setup>
import InputLabel from "~/components/InputLabel.vue";

const { requiredRule, salaryRule } = useUtils();

const props = defineProps({
  workSetupOptions: { type: Array, required: true },
  workTypeOptions: { type: Array, required: true },
  mode: { type: String, default: "add" },
});

const title = ref("");

const emit = defineEmits(["cancel", "save"]);

const formModel = defineModel("form", {
  type: Object,
});

const valid = ref(false);

function handleSave() {
  emit("save", formModel.value);
}
</script>
