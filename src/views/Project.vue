<template>
  <v-container fluid fill-height class="container-background-color">
    <v-row class="d-flex justify-center">
      <!-- 左邊個人資訊 -->
      <v-col lg="2">
        <v-card max-width="374" height="700">
          <v-img
            class="mb-2"
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>
          <v-card-text>
            <v-col md="12"
              ><v-row class="d-flex justify-center">
                <v-edit-dialog>
                  <div class="text-h3">{{ user.name }}</div>
                  <template v-slot:input>
                    <v-text-field
                      v-model="user.name"
                      :rules="[max25chars]"
                      label="Edit Name"
                    ></v-text-field>
                  </template>
                </v-edit-dialog>
              </v-row>
            </v-col>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- 左邊個人資訊 end -->
      <!-- 右邊表格 -->
      <v-col lg="6">
        <v-row>
          <v-col lg="3" class="d-flex align-center text-h3">Project</v-col>
          <v-col lg="7" class="d-flex flex-row">
            <v-text-field
              id="table-search-card"
              class="align-self-end"
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Find a project..."
              hide-details
              clearable
              outlined
              dense
              solo
            ></v-text-field>
          </v-col>
          <v-col lg="2" class="d-flex justify-end align-end">
            <v-dialog v-model="dialog" max-width="60%">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="success"
                  v-bind="attrs"
                  v-on="on"
                  @click="clearInputProjectName"
                  ><v-icon style="background-color: #4caf50 !important"
                    >mdi-plus</v-icon
                  >New</v-btn
                >
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Add Project</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="Project Name"
                          v-model="inputAddedProjectName"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog = false">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="addProject"> Add </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col lg="12">
            <!-- <v-row v-for="i in Math.ceil((projects.length)/3)" :key="i" class="d-flex justify-space-between">
              <v-col v-for="j in 3" :key="j">

                <v-card class="mx-auto" max-width="400" v-if="getProjectInfoByIndex((i-1)*3+(j-1))">
                  <v-card-text>
                    <p class="display-1 text--primary">{{ getProjectInfoByIndex((i-1)*3+(j-1)).name }}</p>
                  </v-card-text>
                </v-card>

              </v-col>
            </v-row> -->

            <v-data-table
              :headers="headers"
              :items="projects"
              :search="search"
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
          </v-col>
        </v-row>
      </v-col>
      <!-- 右邊表格 end -->
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { addProject, getProject } from "@/apis/projects.ts";

export default Vue.extend({
  data() {
    return {
      inputAddedProjectName: "",
      dialog: false,
      user: {
        name: "willie",
      },
      max25chars: function (v: any) {
        return v.length <= 25 || "Input too long!";
      },
      search: "",
      headers: [
        {
          text: "ProjectName",
          value: "name",
        },
      ],
      projects: [] as any,
    };
  },
  mounted() {
    this.getProject();
  },
  methods: {
    // Test() {
    //   this.projects.push({ id: 123, name: "123" })
    // },
    clearInputProjectName() {
      this.inputAddedProjectName = "";
    },
    goToRepositoryDetail(id: string) {
      this.$router.push(`/project/${id}`);
    },
    async getProject() {
      this.projects = (await getProject("test123"))["data"];
    },
    async addProject() {
      //TODO：這邊要做新增專案成功及失敗的處理，成功：關閉dialog並顯示新增成功，失敗：保留dialog，顯示新增失敗
      // await addProject(this.inputAddedProjectName, "test123");
      this.dialog = false;
    },
  },
});
</script>

<style lang="scss">
tbody {
  tr:hover {
    // cursor: pointer !important;
    background-color: rgba(0, 0, 0, 0) !important;
  }
}

.v-data-table {
  // background-color: rgba(237, 237, 237, 0) !important;
  padding: 0 !important;
}

tbody {
  background-color: rgba(237, 237, 237, 0) !important;
  padding: 0 !important;
}

// #table-search-card {
//   margin: 0px !important;
//   background-color: rgb(237, 237, 237) !important;
// }

.v-text-field {
  margin: 0px !important;
}

.container-background-color {
  background-color: rgb(247, 247, 247) !important;
}
</style>
