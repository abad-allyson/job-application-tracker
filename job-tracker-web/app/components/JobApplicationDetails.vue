<template>
  <div class="d-flex flex-column" style="height: 100%">
    <!-- Top toolbar -->
    <div class="flex-grow-0">
      <v-toolbar color="surface" class="px-2 py-4">
        <v-toolbar-title>
          <v-row no-gutters>
            <v-col cols="12">
              <span class="font-weight-bold text-title-large">{{
                selectedRow?.company
              }}</span>
            </v-col>
            <v-col cols="12">
              <span class="text-grey-darken-1 text-label-large">{{
                selectedRow?.jobTitle
              }}</span>
            </v-col>
          </v-row>
        </v-toolbar-title>
        <template #append>
          <v-btn icon="mdi-close" variant="plain" @click="emit('close')" />
        </template>
      </v-toolbar>
      <v-divider />
    </div>

    <!-- Details -->
    <div class="flex-grow-1 overflow-y-auto">
      <v-row class="px-6 mt-6 text-title-small">
        <v-col>
          <v-row align="center">
            <v-col cols="6" class="d-flex align-center ga-2">
              <Tag color="#757575" size="20px" />
              <span class="text-grey-darken-1">Status</span>
            </v-col>
            <v-col cols="6" class="d-flex align-center">
              <v-chip
                :color="statusColors[selectedRow?.status]"
                class="text-capitalize"
                size="small"
              >
                {{ statusLabel }}
              </v-chip>
            </v-col>
          </v-row>

          <v-row align="center">
            <v-col cols="6" class="d-flex align-center ga-2">
              <MapPin color="#757575" size="20px" />
              <span class="text-grey-darken-1">Location</span>
            </v-col>
            <v-col cols="6" class="d-flex align-center">
              <span class="ml-2 text-break">{{ selectedRow?.location }}</span>
            </v-col>
          </v-row>

          <v-row align="center">
            <v-col cols="6" class="d-flex align-center ga-2">
              <LaptopMinimal color="#757575" size="20px" />
              <span class="text-grey-darken-1">Work Setup</span>
            </v-col>
            <v-col cols="6" class="d-flex align-center">
              <span class="ml-2">{{ selectedRow?.workSetup }}</span>
            </v-col>
          </v-row>

          <v-row align="center">
            <v-col cols="6" class="d-flex align-center ga-2">
              <ClipboardClockIcon color="#757575" size="20px" />
              <span class="text-grey-darken-1">Work Type</span>
            </v-col>
            <v-col cols="6" class="d-flex align-center">
              <span class="ml-2">{{ selectedRow?.workType }}</span>
            </v-col>
          </v-row>

          <v-row align="center">
            <v-col cols="6" class="d-flex align-center ga-2">
              <Banknote color="#757575" size="20px" />
              <span class="text-grey-darken-1">Monthly Salary</span>
            </v-col>
            <v-col cols="6" class="d-flex align-center">
              <span class="ml-2 text-break">{{
                selectedRow?.salary ? `₱ ${selectedRow?.salary}` : ""
              }}</span>
            </v-col>
          </v-row>

          <v-row align="center">
            <v-col cols="6" class="d-flex align-center ga-2">
              <Link2 color="#757575" size="20px" />
              <span class="text-grey-darken-1">Job Link</span>
            </v-col>
            <v-col cols="6" class="d-flex align-center">
              <v-tooltip :text="selectedRow?.link" location="top">
                <template #activator="{ props }">
                  <nuxt-link
                    :to="selectedRow?.link"
                    target="_blank"
                    v-bind="props"
                    class="d-inline-block text-truncate text-info"
                    style="max-width: 150px"
                  >
                    {{ selectedRow?.link }}
                  </nuxt-link>
                </template>
              </v-tooltip>
            </v-col>
          </v-row>

          <v-divider class="my-4" />

          <v-row no-gutters align="center">
            <v-col cols="12" class="d-flex align-center ga-2">
              <span class="font-weight-bold">Notes</span>
            </v-col>
            <v-col cols="12" class="d-flex align-center">
              <v-card
                width="100%"
                height="150"
                variant="tonal"
                color="grey-darken-1"
                class="my-2"
              >
                <v-card-text>
                  <span class="text-break text-black text-pre-wrap">{{
                    selectedRow?.notes
                  }}</span>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>

    <!-- Action buttons -->
    <div class="flex-grow-0">
      <v-divider />
      <v-toolbar color="surface" class="px-4 py-2">
        <v-spacer />
        <v-btn color="secondary" variant="tonal" @click="emit('update')"
          >Edit</v-btn
        >
        <v-btn color="error" variant="flat" class="ml-2" @click="emit('delete')"
          >Delete</v-btn
        >
      </v-toolbar>
    </div>
  </div>
</template>

<script setup>
import {
  Banknote,
  Link2,
  MapPin,
  LaptopMinimal,
  ClipboardClockIcon,
  Tag,
} from "@lucide/vue";

const props = defineProps({
  selectedRow: {
    type: Object,
    default: null,
  },
  statusColors: {
    type: Object,
    default: () => ({}),
  },
  showDrawer: {
    type: Boolean,
    default: false,
  },
  statusOptions: { type: Array, default: () => [] },
});

const emit = defineEmits(["cancel", "delete", "update", "close"]);

const statusLabel = computed(() => {
  const found = props.statusOptions.find(
    (s) => s.value === props.selectedRow?.status,
  );
  return found ? found.label : props.selectedRow?.status;
});
</script>
