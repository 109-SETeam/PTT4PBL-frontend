<template>
  <v-data-iterator
    :items="tableData"
    :search="searchedName"
    :user="user"
    fixed-header
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
                <v-icon
                  @click="removeProject(item.id, user.id)"
                  :disabled="!isDeleteProjectEnable(user.id, item.ownerId)"
                  >mdi-close-thick</v-icon
                ></v-col
              >
            </v-row>
            <v-row>
              <v-col>
                <div @click="goToRepositoryDetail(item.id, item.name)">
                  <div class="subheading font-weight-bold text-h4">
                    {{ item.name }}
                  </div>
                  <div style="text-align: left" class="mt-8 ml-2">
                    Owner: {{ item.ownerName }}
                  </div>
                </div></v-col
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
import { getProjects, deleteProject } from "@/apis/projects.ts";
export default Vue.extend({
  props: ["searchedName", "tableData", "user"],
  data() {
    return {
      dialog: false,
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
      this.$router.push(`/repository/${id}?projectName=${projectName}`);
    },

    isDeleteProjectEnable(userId: string, owner: string) {
      return owner === userId;
    },

    removeProject(projectId: string, userId: string) {
      this.$emit("deleteProject", projectId, userId);
      this.dialog = false;
    },
  },
});
</script>