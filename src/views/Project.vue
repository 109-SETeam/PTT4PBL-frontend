<template>
  <v-container fluid fill-height class="container-background-color">
    <v-row class="d-flex justify-center">
      <!-- 左邊個人資訊 -->
      <v-col lg="2">
        <UserInfo />
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
              v-model="searchedName"
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
                  <v-btn color="blue darken-1" text @click="addProject">
                    Add
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col lg="12">
            <DataTable
              :searchedName="searchedName"
              :tableData="projects"
              @goToRepositoryDetail="console.log('2')"
            />
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
import UserInfo from "@/components/UserInfo.vue";
import DataTable from "@/components/DataTable.vue";

export default Vue.extend({
  components: {
    UserInfo,
    DataTable,
  },
  data() {
    return {
      inputAddedProjectName: "",
      dialog: false,
      searchedName: "",
      projects: [] as any,
    };
  },
  mounted() {
    this.getProject();
  },
  methods: {
    clearInputProjectName() {
      this.inputAddedProjectName = "";
    },
    async getProject() {
      console.log(await getProject("test123"));
      this.projects = (await getProject("test123"))["data"];
    },
    async addProject() {
      //TODO：這邊要做新增專案成功及失敗的處理，成功：關閉dialog並顯示新增成功，失敗：保留dialog，顯示新增失敗
      const result = await addProject(this.inputAddedProjectName, "test123");

      if (result) {
        console.log("success");
      } else {
        console.log("fail");
      }

      this.dialog = false;
      this.projects = (await getProject("test123"))["data"];
    },
  },
});
</script>

<style lang="scss">
tbody {
  tr:hover {
    background-color: rgba(0, 0, 0, 0) !important;
  }
}

.v-data-table {
  padding: 0 !important;
}

tbody {
  background-color: rgba(237, 237, 237, 0) !important;
  padding: 0 !important;
}

.v-text-field {
  margin: 0px !important;
}

.container-background-color {
  background-color: rgb(247, 247, 247) !important;
}
</style>
