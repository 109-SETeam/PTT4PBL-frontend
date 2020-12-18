<template>
  <v-container fluid fill-height class="container-background-color">
    <v-row class="d-flex justify-center">
      <!-- 左邊個人資訊 -->
      <v-col lg="2">
        <UserInfo :name="user.name" :avatarUrl="user.avatarUrl" />
      </v-col>
      <!-- 左邊個人資訊 end -->
      <v-col lg="6">
        <v-row>
          <v-col style="text-align: left">
            <v-edit-dialog @save="save" :return-value.sync="projectName">
              <div class="text-h3">{{ projectName }}</div>
              <template v-slot:input>
                <v-text-field
                  v-model="projectName"
                  label="Edit Name"
                ></v-text-field>
              </template> </v-edit-dialog
          ></v-col>
        </v-row>
        <v-row v-if="isOwner">
          <v-col class="d-flex align-begin pt-1">
            <InviteUser
              vCardTitle="Invite User"
              vTextLabel="User Name"
              @clickInvitation="clickInvatation($event)"
              :userInfo="userAccounts"
              @invite="send($event)"
            />
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
              <template v-slot:top>
                <v-row class="d-flex justify-space-around">
                  <v-col class="pl-5">
                    <TableSearch
                      vTextLabel="Find a Repo..."
                      @ChangeInput="ChangeInput($event)"
                    />
                  </v-col>
                  <v-col class="d-flex justify-end align-end pr-5">
                    <NewItem
                      vCardTitle="Add Repository"
                      vTextLabel="Repository URL"
                      @add="add($event)"
                    />
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-dialog v-model="dialogDelete" max-width="60%">
                  <v-card>
                    <v-card-title class="headline"
                      >Are you sure you want to delete?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="deleteCancel()"
                        >Cancel</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteConfirm()"
                        >OK</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
              <template v-slot:[`item.name`]="{ item }">
                <a class="py-2" @click="goToRepoInfo(item.id)">
                  {{ item.name }}
                </a>
              </template>
              <template v-slot:[`item.action`]="{ item }">
                <div class="d-flex justify-end align-end">
                  <v-icon @click="deleteRepo(item.id)"> mdi-delete </v-icon>
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
import { editProject, getProject } from "@/apis/projects";
import { addRepo, getRepository, deleteRepo } from "@/apis/repository.ts";
import { getUserInfo, isCurrentUserProjectOwner } from "@/apis/user";
import UserInfo from "@/components/UserInfo.vue";
import NewItem from "@/components/NewItem.vue";
import InviteUser from "@/components/InviteUser.vue";
import TableSearch from "@/components/TableSearch.vue";
import { invite, sendInvitation } from "@/apis/notification";

export default Vue.extend({
  components: {
    UserInfo,
    NewItem,
    TableSearch,
    InviteUser,
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "RepositoryName",
          value: "name",
        },
        {
          text: "action",
          value: "action",
        },
      ],
      user: { type: Object, id: "" },
      repositories: [{ type: Object, id: "", name: "", test: "" }],
      dialog: false,
      projectId: this.$route.params.id,
      projectName: "",
      url: "",
      msg: "",
      snackBar: false,
      snackBarTimeout: 3000,
      snackBarColor: "",
      isOwner: false,
      userAccounts: [],
      searchbarLength: 7,
      dialogDelete :false,
      wantToDeleteRepoId:-1, 
    };
  },
  async created() {
    this.user = (await getUserInfo())["data"];
    this.repositories = (await getRepository(this.projectId))["data"];
    this.isOwner = (await isCurrentUserProjectOwner(this.projectId))[
      "data"
    ].success;
    await this.getProjectName();
    if (!this.isOwner) this.searchbarLength = 10;
  },
  methods: {
    async goToRepoInfo(repoId: any) {
      this.$router.push(`/repoInfo/${repoId}`);
    },
    async save() {
      const result = await editProject(
        Number(this.projectId),
        this.projectName
      );
      this.msg = result["data"].message;
      this.snackBar = true;
      this.snackBarColor = result["data"].success ? "green" : "red";
      await this.getProjectName();
    },
    async add(url: any) {
      const result = await addRepo(Number(this.projectId), url);
      this.msg = result["data"].message;
      this.dialog = false;
      this.snackBar = true;
      this.snackBarColor = result["data"].success ? "green" : "red";
      await this.getResitories();
    },
    async getResitories() {
      this.repositories = (await getRepository(this.projectId))["data"];
    },
    async getProjectName() {
      this.projectName = (await getProject(Number(this.projectId)))[
        "data"
      ].name;
    },
    ChangeInput(searchedRepo: any) {
      this.search = searchedRepo;
    },

    deleteRepo(repoId: any) {
      this.dialogDelete = true;
      this.wantToDeleteRepoId = repoId;
    },

    async deleteConfirm(){
      const result = await deleteRepo(this.projectId, this.wantToDeleteRepoId);
      this.dialogDelete = false;
      this.wantToDeleteRepoId = -1;
      this.msg = result["data"].message;
      this.snackBar = true;
      this.snackBarColor = result["data"].success ? "green" : "red";
      await this.getResitories();
    },
    deleteCancel(){
      this.dialogDelete = false;
      this.wantToDeleteRepoId = -1;
    }
    ,
    async send(applicantId: any) {
      const result = await sendInvitation(applicantId, Number(this.projectId));
      this.dialog = false;
      this.msg = result["data"].message;
      this.snackBar = true;
      this.snackBarColor = result["data"].success ? "green" : "red";
    },

    async clickInvatation(projectId: number) {
      invite(Number(this.projectId)).then((res) => {
        this.userAccounts = res.data;
      });
    },
  },
});
</script>
<style></style>
