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
      <v-col lg="6">
        <v-row class="justify-space-between">
          <v-col lg="4" class="text-h3">Repository</v-col>
          <v-col lg="6" class="d-flex flex-row">
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
                <v-btn color="success" dark v-bind="attrs" v-on="on"
                  ><v-icon style="background-color: #4caf50 !important"
                    >mdi-plus</v-icon
                  >
                  New
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Add Repository</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="RepositoryURL"
                          v-model="url"
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
                  <v-btn color="blue darken-1" text @click="add"> Add </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <v-data-table
              :headers="headers"
              :items="repositories"
              :search="search"
              fixed-header
              hide-default-footer
              hide-default-header
            >
              <template v-slot:[`item.name`]="{ item }">
                <div @click="Test(item)" class="py-2">
                  {{ item.name }}
                </div>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-col>
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
import router from "@/router";
import { addRepo, getRepository } from "@/apis/repository.ts";
export default Vue.extend({
  data() {
    return {
      search: "",
      headers: [
        {
          text: "RepositoryName",
          value: "name",
        },
      ],
      max25chars: function (v: any) {
        return v.length <= 25 || "Input too long!";
      },
      user: {
        name: "TEST",
      },
      repositories: [],
      dialog: false,
      id: this.$route.params.id,
      url: "",
      msg: "",
      snackBar: false,
      snackBarTimeout: 1000,
      snackBarColor: "",
    };
  },
  mounted() {
    this.getResitories();
  },
  methods: {
    Test(item: any) {
      console.log(item);
    },
    async add() {
      const result: any = await addRepo(Number(this.id), this.url);
      this.url = "";
      this.msg = result["data"].message;
      this.dialog = false;
      this.snackBar = true;
      this.snackBarColor = result["data"].success ? "green" : "red";
      console.log(this.snackBarColor);
    },
    async getResitories() {
      this.repositories = (await getRepository(this.id))["data"];
    },
  },
});
</script>
<style></style>
