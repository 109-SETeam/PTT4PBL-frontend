<template>
  <div>
    <!-- <v-container fluid> -->
    <v-row class="mb-6" no-gutters>
      <v-col>
        <v-card class="pa-2" outlined tile>1/2</v-card>
      </v-col>
      <v-col>
        <v-card class="pa-2" outlined tile>1/2</v-card>
      </v-col>
    </v-row>

    <v-row class="mb-6" no-gutters>
      <v-col>
        <v-card class="pa-2" outlined tile>1/3</v-card>
      </v-col>
      <v-col>
        <v-card class="pa-2" outlined tile>1/3</v-card>
      </v-col>
      <v-col>
        <v-card class="pa-2" outlined tile>1/3</v-card>
      </v-col>
    </v-row>
    <!-- </v-container> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      project: [],
      alignments: ["start", "center", "end"]
    };
  },
  methods: {}
});
</script>

<style></style>
