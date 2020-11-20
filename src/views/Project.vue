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
                  <div class="text-h3">{{ User.name }}</div>
                  <template v-slot:input>
                    <v-text-field
                      v-model="User.name"
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
            <v-dialog v-model="dialog" max-width="300px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="success" v-bind="attrs" v-on="on"
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
                      <v-col cols="12" lg="12" sm="6" md="4">
                        <v-text-field
                          label="project name"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-btn color="success" v-bind="attrs" v-on="on" @click="TEST"
                        ><v-icon style="background-color: #4caf50 !important"
                          >mdi-plus</v-icon
                        >ADD</v-btn
                      >
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <v-data-table
              :headers="headers"
              :items="projects"
              :search="search"
              fixed-header
              hide-default-footer
              hide-default-header
            >
              <template v-slot:[`item.name`]="{ item }">
                <div @click="goToRepositoryDetail(item.id)" class="py-2">
                  {{ item.name }}
                </div>
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
import { getProject } from "@/apis/projects.ts";

export default Vue.extend({
  data() {
    return {
      dialog: false,
      User: {
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
      projects: [],
    };
  },
  mounted() {
    this.getProject();
  },
  methods: {
    goToRepositoryDetail(id: string) {
      this.$router.push(`/project/${id}`);
    },
    async getProject() {
      this.projects = (await getProject("zxjte9411"))["data"];
    },
    TEST(){
      console.log("success");
    }
  },
});
</script>

<style lang="scss">
tbody {
  tr:hover {
    cursor: pointer !important;
  }
}

.v-data-table {
  background-color: rgb(237, 237, 237) !important;
}

tbody {
  background-color: rgb(237, 237, 237) !important;
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
