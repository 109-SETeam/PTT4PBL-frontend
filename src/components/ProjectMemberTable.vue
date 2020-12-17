<template>
  <v-dialog v-model="dialog" max-width="30%">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="success" v-bind="attrs" v-on="on">專案成員</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">專案成員</span>
      </v-card-title>
      <v-data-table :headers="headers" :items="tableData" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Owner: {{projectOwnerName}}</v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon v-if="notProjectOwner(item.id)" small @click="deleteUser(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-dialog>
</template>


<script lang="ts">
import Vue from "vue";
import { getProjectMember } from "@/apis/projects";
export default Vue.extend({
  props: ["projectOwnerId", "projectOwnerName", "projectId"],
  data() {
    return {
      test: "123",
      dialog: false,
      headers: [
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Actions",
          value: "actions",
        },
      ],
      tableData: [],
    };
  },
  created() {
    this.getProjectMember(this.projectId);
  },
  methods: {
    async getProjectMember(projectId: number){
      console.log(projectId);
      const result = await getProjectMember(projectId);

      this.tableData = result["data"];
      console.log(this.tableData);
    },
    notProjectOwner(userAccount: string){
      if (userAccount == this.projectOwnerId){
        return false;
      }
      else{
        return true;
      }
    }
  },
});
</script>