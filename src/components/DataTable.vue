<template>
  <v-data-iterator
    :items="tableData"
    :search="searchedName"
    fixed-header
    hide-default-footer
    hide-default-header
    style="background-color: rgba(237, 237, 237, 0)"
  >
    <template v-slot:default="props">
      <v-row>
        <v-col
          v-for="item in props.items"
          :key="item.name"
          cols="12"
          sm="12"
          md="6"
          lg="4"
        >
          <v-card>
            <v-row>
              <v-col style="text-align: right" class="mr-3">
                <v-icon @click="TEST(item)">mdi-close-thick</v-icon></v-col
              >
            </v-row>
            <v-row>
              <v-col>
                <p class="subheading font-weight-bold text-h4" @click="goToRepositoryDetail(item.id, item.name)">
                  {{ item.name }}
                </p></v-col
              >
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-data-iterator>
</template>

<script lang="ts">
import Vue from "vue";
import { getProjects } from "@/apis/projects.ts";
export default Vue.extend({
  props: ["searchedName", "tableData"],
  data() {
    return {
      headers: [
        {
          text: "ProjectName",
          value: "name",
        },
        {
          text: "Actions",
          value: "actions",
        },
      ],
    };
  },
  methods: {
    goToRepositoryDetail(id: string, projectName: string) {
      console.log(projectName);
      this.$router.push(`/repository/${id}?projectName=${projectName}`);
    },
    TEST(item: any) {
      console.log(item.id);
    },
  },
});
</script>