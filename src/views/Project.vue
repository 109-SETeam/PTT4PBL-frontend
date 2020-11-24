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
            <TableSearch
              vTextLabel="Find a Project..."
              @ChangeInput="ChangeInput($event)"
            />
          </v-col>
          <v-col lg="2" class="d-flex justify-end align-end">
            <NewItem
              vCardTitle="Add Project"
              vTextLabel="Project Name"
              @add="addproject($event)"
            />
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col lg="12">
            <DataTable :searchedName="searchedName" :tableData="projects" />
          </v-col>
        </v-row>
      </v-col>
      <!-- 右邊表格 end -->
      <v-snackbar
        v-model="snackBar"
        :timeout="snackBarTimeout"
        :color="snackBarColor"
      >
        {{ msg }}
      </v-snackbar>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { addProject, getProjects } from "@/apis/projects.ts";
import UserInfo from "@/components/UserInfo.vue";
import DataTable from "@/components/DataTable.vue";
import NewItem from "@/components/NewItem.vue";
import TableSearch from "@/components/TableSearch.vue";

export default Vue.extend({
  components: {
    UserInfo,
    DataTable,
    NewItem,
    TableSearch,
  },
  data() {
    return {
      dialog: false,
      searchedName: "",
      projects: [] as any,
      msg: "",
      snackBar: false,
      snackBarTimeout: 1500,
      snackBarColor: "",
    };
  },
  mounted() {
    this.getProject();
  },
  methods: {
    async getProject() {
      console.log(await getProject("test123"));
      this.projects = (await getProject("test123"))["data"];
    },
    async addproject(inputData: any) {
      //TODO：這邊要做新增專案成功及失敗的處理，成功：關閉dialog並顯示新增成功，失敗：保留dialog，顯示新增失敗
      const result = await addProject(inputData, "test123");

      if (result) {
        this.msg = "新增成功";
        this.snackBar = true;
        this.snackBarColor = "green";
        this.projects = (await getProject("test123"))["data"];
      } else {
        this.msg = "新增失敗";
        this.snackBar = true;
        this.snackBarColor = "red";
      }

      this.dialog = false;
    },
    ChangeInput(searchedName: any) {
      this.searchedName = searchedName;
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
