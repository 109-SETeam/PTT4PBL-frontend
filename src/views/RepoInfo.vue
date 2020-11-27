<template>
  <v-container fill-height fluid class="justify-center">
    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="tab-item">
      <v-tab-item></v-tab-item>
      <v-tab-item><CommitChart v-bind:repoId="repoId" /></v-tab-item>
      <v-tab-item><ContributeChart v-bind:repoId="repoId" /></v-tab-item>
      <v-tab-item></v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import CommitChart from "@/components/CommitChart.vue";
import ContributeChart from "@/components/ContributeChart.vue";

export default Vue.extend({
  components: {
    CommitChart,
    ContributeChart
  },
  data() {
    return {
      tab: null,
      items: ["Issus", "Commit", "Contribute", "Code base"],
      repoId: 2,
    };
  },
});
</script>

<style lang="scss">
.tab-item {
  width: 100%;
}
</style>