<template>
  <v-data-table
    :headers="headers"
    :items="tableData"
    :search="searchedName"
    fixed-header
    hide-default-footer
    hide-default-header
    style="background-color: rgba(237, 237, 237, 0)"
  >
    <template v-slot:[`item.name`]="{ item }">
      <v-card class="my-2" @click="goToRepositoryDetail(item.id)">
        <v-card-text>
          <p class="display-1 text--primary">{{ item.name }}</p>
        </v-card-text>
      </v-card>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue from "vue";
import {getProject} from "@/apis/projects.ts";
export default Vue.extend({
  props: ['searchedName', 'tableData'],
  data() {
    return {
      headers: [
        {
          text: "ProjectName",
          value: "name",
        },
      ],
    };
  },
  methods: {
    goToRepositoryDetail(id: string) {
      this.$router.push(`/project/${id}`);
    },
  },
});
</script>