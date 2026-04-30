<template>
  <v-row class="fill-height" no-gutters>
    <v-col class="pa-8 pt-6 pb-2 overflow-hidden h-100">
      <v-row no-gutters>
        <v-col>
          <span class="text-display-small font-weight-bold"
            >Job Applications</span
          >
        </v-col>
      </v-row>

      <!-- Stat Cards -->
      <StatCards :total="total" :status-counts="statusCounts" />

      <v-row>
        <v-col cols="12">
          <ClientOnly>
            <v-tooltip location="end" text="Add new job application">
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  color="primary-darken-1"
                  variant="tonal"
                  icon="mdi-plus"
                  density="comfortable"
                  class="rounded-xl"
                  @click="handleAddDialog"
                />
              </template>
            </v-tooltip>
          </ClientOnly>
        </v-col>
      </v-row>

      <v-row>
        <!-- List View -->
        <v-col cols="12">
          <v-card class="rounded-lg" elevation="0">
            <v-data-table
              :headers="headers"
              :items="items"
              hide-default-footer
              height="500"
              fixed-header
              hover
              items-per-page="15"
              :loading="loading"
              @click:row="handleShowDrawer"
            >
              <!-- Truncate long text with tooltip -->
              <template #item.link="{ value }">
                <v-tooltip :text="value" location="top">
                  <template #activator="{ props }">
                    <span
                      v-bind="props"
                      class="d-inline-block text-truncate"
                      style="max-width: 150px"
                    >
                      {{ value }}
                    </span>
                  </template>
                </v-tooltip>
              </template>

              <!-- Status chip with color -->
              <template #item.status="{ item }">
                <v-select
                  v-model="item.status"
                  :items="statusOptions"
                  item-title="label"
                  item-value="value"
                  variant="plain"
                  hide-details
                  width="180"
                  @update:model-value="
                    (status) => handleStatusChange(item._id, status)
                  "
                >
                  <!-- Show colored chip as the selected value -->
                  <template #selection="{ item: selected }">
                    <v-chip :color="statusColors[selected.value]" size="small">
                      {{ selected.label }}
                    </v-chip>
                  </template>

                  <!-- Show colored chip in the dropdown list -->
                  <template #item="{ item: option, props: optionProps }">
                    <v-list-item v-bind="optionProps" title="">
                      <v-chip :color="statusColors[option.value]" size="small">
                        {{ option.label }}
                      </v-chip>
                    </v-list-item>
                  </template>
                </v-select>
              </template>
            </v-data-table>
          </v-card>
          <v-row class="d-flex justify-end align-center mt-2 ga-3">
            <span class="text-label-large text-grey-darken-1">{{
              pageRange
            }}</span>
            <v-btn
              size="small"
              variant="tonal"
              :disabled="page === 1"
              @click="page--"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              size="small"
              variant="tonal"
              :disabled="page === pages || pages === 0"
              @click="page++"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>

      <!-- ADD -->
      <v-dialog v-model="showAddDialog" width="500px" persistent scrollable>
        <JobApplicationForm
          v-model:form="jobApplication"
          :work-setup-options="workSetupOptions"
          :work-type-options="workTypeOptions"
          :status-options="statusOptions"
          @cancel="handleCancel"
          @save="handleSave"
        />
      </v-dialog>

      <!-- DETAILS -->
      <v-navigation-drawer
        v-model="showDetailsDrawer"
        location="right"
        width="350"
        permanent
      >
        <JobApplicationDetails
          :selected-row="selectedRow"
          :status-colors="statusColors"
          @delete="handleDeleteConfirmation"
          @update="handleUpdateDialog"
          v-model:show-drawer="showDetailsDrawer"
        />
      </v-navigation-drawer>

      <!-- UPDATE -->
      <v-dialog v-model="showUpdateDialog" width="500px" persistent scrollable>
        <JobApplicationForm
          v-model:form="jobApplication"
          :work-setup-options="workSetupOptions"
          :work-type-options="workTypeOptions"
          :status-options="statusOptions"
          mode="update"
          @cancel="handleCancelUpdate"
          @save="handleUpdate"
        />
      </v-dialog>

      <!-- Confirm Delete -->
      <v-dialog
        v-model="showDeleteConfirmation"
        width="500px"
        persistent
        scrollable
      >
        <ConfirmDelete @cancel="handleCancel" @delete="handleDelete" />
      </v-dialog>

      <!-- Delete snackbar -->
      <v-snackbar
        v-model="snackbarDelete"
        prepend-icon="mdi-delete-outline"
        color="error"
      >
        Successfully deleted.
        <template v-slot:actions>
          <v-btn variant="text" @click="snackbarDelete = false"> Close </v-btn>
        </template>
      </v-snackbar>

      <!-- Update snackbar -->
      <v-snackbar
        v-model="snackbarUpdate"
        prepend-icon="mdi-check-circle-outline"
        color="success"
      >
        Successfully updated.
        <template v-slot:actions>
          <v-btn variant="text" @click="snackbarUpdate = false"> Close </v-btn>
        </template>
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script setup>
definePageMeta({
  layout: "default",
  middleware: "auth",
});

useHead({
  title: "Dashboard | JobTracker",
});

import { ref } from "vue";
import JobApplicationForm from "~/components/JobApplicationForm.vue";
import JobApplicationDetails from "~/components/JobApplicationDetails.vue";
import ConfirmDelete from "~/components/ConfirmDelete.vue";
import StatCards from "~/components/StatCards.vue";

const headers = [
  { title: "Company", key: "company" },
  { title: "Job Title", key: "jobTitle" },
  { title: "Location", key: "location" },
  { title: "Status", key: "status" },
  { title: "Work Setup", key: "workSetup" },
  { title: "Work Type", key: "workType" },
  { title: "Salary", key: "salary" },
  { title: "Link", key: "link" },
];

const showAddDialog = ref(false);
const showUpdateDialog = ref(false);
const showDetailsDrawer = ref(false);
const snackbarDelete = ref(false);
const snackbarUpdate = ref(false);
const showDeleteConfirmation = ref(false);

const route = useRoute();
const { addJobApplication, getByUserId, updateStatus, deleteById, updateById } =
  useApplication();
const userId = computed(() => route.params.id);

const jobApplication = ref({
  company: "",
  jobTitle: "",
  location: "",
  workSetup: "",
  workType: "",
  salary: "",
  link: "",
  notes: "",
});

const items = ref([]);
const page = ref(1);
const pages = ref(1);
const pageRange = ref([]);
const total = ref();
const selectedRow = ref(null);
const statusCounts = ref({});

const statusColors = {
  applied: "secondary-darken-1",
  "for-interview": "warning",
  "for-assessment": "orange",
  "awaiting-feedback": "info",
  "offer-received": "success",
  rejected: "error",
};

const statusOptions = [
  {
    label: "Applied",
    value: "applied",
  },
  {
    label: "For Interview",
    value: "for-interview",
  },
  {
    label: "For Assessment",
    value: "for-assessment",
  },
  {
    label: "Awaiting Feedback",
    value: "awaiting-feedback",
  },
  {
    label: "Offer Received",
    value: "offer-received",
  },
  {
    label: "Rejected",
    value: "rejected",
  },
];

const workSetupOptions = ["Remote", "Hybrid", "On-site"];
const workTypeOptions = ["Full-time", "Part-time", "Contract", "Internship"];

const {
  data: applicationsData,
  status: applicationsReqStatus,
  refresh: refreshApplications,
} = useLazyAsyncData(
  `get-all-job-applications-page-${page.value}`,
  () => getByUserId({ page: page.value, userId: userId.value }),
  { watch: [page], server: false },
);

watchEffect(() => {
  if (applicationsData.value) {
    items.value = applicationsData.value.items;
    pages.value = applicationsData.value.pages;
    pageRange.value = applicationsData.value.pageRange;
    total.value = applicationsData.value.total;
    statusCounts.value = applicationsData.value.statusCounts;
  }
});

const loading = computed(() => applicationsReqStatus.value === "pending");

function handleAddDialog() {
  jobApplication.value = {
    company: "",
    jobTitle: "",
    location: "",
    workSetup: "",
    workType: "",
    salary: "",
    link: "",
    notes: "",
  };
  showAddDialog.value = true;
}

function handleCancel() {
  showAddDialog.value = false;
  showUpdateDialog.value = false;
  showDeleteConfirmation.value = false;
}

function handleUpdateDialog() {
  jobApplication.value = { ...selectedRow.value };
  showUpdateDialog.value = true;
}

function handleCancelUpdate() {
  showUpdateDialog.value = false;
}

function handleShowDrawer(__, item) {
  showDetailsDrawer.value = true;
  selectedRow.value = item.item;
}

function handleDeleteConfirmation() {
  showDeleteConfirmation.value = true;
}

async function handleSave(formData) {
  try {
    await addJobApplication({ userId: userId.value, application: formData });
    page.value = 1;
    await refreshApplications();
    showAddDialog.value = false;
  } catch (error) {
    console.error("Error adding application:", error);
  }
}

async function handleStatusChange(id, status) {
  try {
    console.log("id:", id, "status:", status);
    await updateStatus({ id, status });
    await refreshApplications();
  } catch (error) {
    console.error("Failed to update status:", error);
  }
}

async function handleDelete() {
  try {
    await deleteById(selectedRow.value._id);
    page.value = 1;
    await refreshApplications();
    showDetailsDrawer.value = false;
    selectedRow.value = null;
    showDeleteConfirmation.value = false;
    snackbarDelete.value = true;
  } catch (error) {
    console.error("Failed to delete application", error);
  }
}

async function handleUpdate(formData) {
  try {
    await updateById(selectedRow.value._id, {
      userId: userId.value,
      application: formData,
    });
    selectedRow.value = { ...formData };
    page.value = 1;
    snackbarUpdate.value = true;
    await refreshApplications();
    showUpdateDialog.value = false;
  } catch (error) {
    console.error("Error adding application:", error);
  }
}
</script>
