<template>
  <v-row>
    <v-col cols="12" lg="2">
      <v-card
        min-height="192"
        class="text-center rounded-lg pt-6"
        elevation="0"
      >
        <v-card-title class="text-title-medium text-grey-darken-1"
          >Total Applications</v-card-title
        >
        <v-card-text
          class="text-display-large text-my-font-color font-weight-medium mt-4"
        >
          {{ total }}
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" lg="6">
      <v-card
        class="text-center rounded-lg pa-4 d-flex align-center"
        elevation="0"
        min-height="160"
      >
        <v-row class="fill-height" align="center" dense>
          <v-col cols="12" md="4">
            <v-card
              elevation="0"
              color="secondary-darken-1"
              variant="tonal"
              rounded="lg"
            >
              <v-card-title class="text-label-medium">Applied</v-card-title>
              <v-card-text class="font-weight-bold text-title-large">
                {{ statusCounts["applied"] || "0" }}
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card elevation="0" color="error" variant="tonal" rounded="lg">
              <v-card-title class="text-label-medium">Rejected</v-card-title>
              <v-card-text class="font-weight-bold text-title-large">
                {{ statusCounts["rejected"] || "0" }}
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card elevation="0" color="success" variant="tonal" rounded="lg">
              <v-card-title class="text-label-medium"
                >Offer Received</v-card-title
              >
              <v-card-text class="font-weight-bold text-title-large">
                {{ statusCounts["offer-received"] || "0" }}
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card elevation="0" color="warning" variant="tonal" rounded="lg">
              <v-card-title class="text-label-medium"
                >For Interview</v-card-title
              >
              <v-card-text class="font-weight-bold text-title-large">
                {{ statusCounts["for-interview"] || "0" }}
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card elevation="0" color="orange" variant="tonal" rounded="lg">
              <v-card-title class="text-label-medium"
                >For Assessment</v-card-title
              >
              <v-card-text class="font-weight-bold text-title-large">
                {{ statusCounts["for-assessment"] || "0" }}
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card elevation="0" color="info" variant="tonal" rounded="lg">
              <v-card-title class="text-label-medium"
                >Awaiting Feedback</v-card-title
              >
              <v-card-text class="font-weight-bold text-title-large">
                {{ statusCounts["awaiting-feedback"] || "0" }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="12" lg="4">
      <v-card
        min-height="192"
        class="text-center rounded-lg pa-6"
        elevation="0"
      >
        <v-row class="fill-height" align="center" no-gutters>
          <v-col cols="12">
            <span class="text-title-medium">{{ dayToday }} </span>
          </v-col>
          <v-col cols="12" class="mt-2">
            <span class="text-display-small font-weight-bold"
              >{{ dateToday }}
            </span>
          </v-col>
          <v-col cols="12" class="mt-2">
            <span class="text-title-medium font-italic text-secondary"
              >{{ dailyQuote.text }}
            </span>
            <br />
            <span class="text-title-medium font-italic"
              >- {{ dailyQuote.author }}
            </span>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
defineProps({
  total: {
    type: Number,
    default: 0,
  },
  statusCounts: {
    type: Object,
    default: () => ({}),
  },
});

const dateToday = computed(() =>
  new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }),
);

const dayToday = computed(() =>
  new Date().toLocaleDateString("en-US", {
    weekday: "long",
  }),
);

const quotes = [
  { text: "Your only limit is your mindset.", author: "Unknown" },
  {
    text: "Success is the sum of small efforts repeated day in and day out.",
    author: "Robert Collier",
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    text: "Opportunities don't happen. You create them.",
    author: "Chris Grosser",
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    text: "The harder you work for something, the greater you'll feel when you achieve it.",
    author: "Unknown",
  },
  { text: "Dream it. Wish it. Do it.", author: "Unknown" },
  {
    text: "Keep going. Everything you need will come to you at the perfect time.",
    author: "Unknown",
  },
  {
    text: "You are never too old to set another goal or to dream a new dream.",
    author: "C.S. Lewis",
  },
  { text: "Rejection is redirection.", author: "Unknown" },
  { text: "Every expert was once a beginner.", author: "Helen Hayes" },
  {
    text: "Your career is a garden — it takes patience, care, and time to bloom.",
    author: "Unknown",
  },
];

const dailyQuote = computed(() => {
  const dayOfYear = Math.floor(
    (new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000,
  );
  return quotes[dayOfYear % quotes.length];
});
</script>
