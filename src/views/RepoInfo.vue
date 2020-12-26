<template>
  <v-container fill-height fluid class="justify-center">
    <RepoInfoCompareForm @change="changeCompareRepo" />
    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-show="!isCompare">Issus</v-tab>
      <v-tab>Commit</v-tab>
      <v-tab v-show="!isCompare">Contribute</v-tab>
      <v-tab>Code base</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="tab-item">
      <v-tab-item><IssuesTable v-show="!isCompare" v-bind:repoId="repoId" /></v-tab-item>
      <v-tab-item
        ><CommitChart
          v-bind:repoId="repoId"
          v-bind:compareRepoId="compareRepoId"
      /></v-tab-item>
      <v-tab-item><ContributeChart v-show="!isCompare" v-bind:repoId="repoId" /></v-tab-item>
      <v-tab-item><CodebaseChart v-bind:repoId="repoId" /></v-tab-item>
      <v-tab-item></v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import CommitChart from "@/components/CommitChart.vue";
import CodebaseChart from "@/components/CodebaseChart.vue";
import ContributeChart from "@/components/ContributeChart.vue";
import IssuesTable from "@/components/IssuesTable.vue";
import RepoInfoCompareForm from "@/components/RepoInfoCompareForm.vue";

export default Vue.extend({
  components: {
    CommitChart,
    CodebaseChart,
    ContributeChart,
    IssuesTable,
    RepoInfoCompareForm,
  },
  data() {
    return {
      tab: null,
      repoId: Number(this.$route.params.repoId),
      compareRepoId: null,
      isCompare: false
    };
  },
  methods: {
    changeCompareRepo(comparedRepo: any) {
      if(comparedRepo.isCompare != this.isCompare){
        this.tab = null;
      }
      this.isCompare = comparedRepo.isCompare;
      this.compareRepoId = comparedRepo.repoId;
    },
  },
});
</script>

<style lang="scss">
.tab-item {
  width: 100%;
  height: 100%;
}
</style>