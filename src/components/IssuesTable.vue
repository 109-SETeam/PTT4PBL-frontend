<template>
  <div>
    <v-tabs>
      <v-tab>Open</v-tab>
      <v-tab>Close</v-tab>
      <v-tab-item>
        <v-data-table
          :loading="loading"
          loading-text="Loading... Please wait"
          dense
          :headers="headers"
          :items="items.openIssues"
          class="elevation-1"
        ></v-data-table>
      </v-tab-item>
      <v-tab-item>
        <v-card-text
          >平均Issue處理時間：{{ items.averageDealwithIssueTime }}</v-card-text
        >
        <v-data-table
          :loading= "loading"
          loading-text="Loading... Please wait"
          dense
          :headers="headers"
          :items="items.closeIssues"
          class="elevation-1"
        ></v-data-table>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getIssueInfo } from "@/apis/repoInfo";

export default Vue.extend({
  props: {
    repoId: Number,
  },
  data() {
    return {
      loading: true,
      headers: [
        { text: "No.", align: "start", value: "number" },
        { text: "Title", value: "title" },
        { text: "CreatedTime", value: "created_at" },
        { text: "ClosedTime", value: "closed_at" },
      ],
      items: [] as any,
    };
  },
  async created() {
    this.items = (await getIssueInfo(this.repoId))["data"];
    this.loading = false;
  },
  methods: {},
});
</script>