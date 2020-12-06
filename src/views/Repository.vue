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
          <v-col lg="4" class="text-h3">Repository</v-col>
        </v-row>
        <v-row class="justify-space-between">
          <v-col :lg="searchbarLength" class="d-flex flex-row">
            <TableSearch
              vTextLabel="Find a Repo..."
              @ChangeInput="ChangeInput($event)"
            />
          </v-col>
          <v-col lg="2" class="d-flex justify-end align-end">
            <NewItem
              vCardTitle="Add Repository"
              vTextLabel="Repository URL"
              @add="add($event)"
            />
          </v-col>
          <v-col v-if="isOwner" lg="3" class="d-flex justify-end align-end">
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
              <template v-slot:[`item.name`]="{ item }">
                <div class="py-2">
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
import { getUserInfo, isCurrentUserProjectOwner } from "@/apis/user";
import UserInfo from "@/components/UserInfo.vue";
import DataTable from "@/components/DataTable.vue";
import NewItem from "@/components/NewItem.vue";
import InviteUser from "@/components/InviteUser.vue";
import TableSearch from "@/components/TableSearch.vue";
import { invite, sendInvitation } from "@/apis/notification";

export default Vue.extend({
  components: {
    UserInfo,
    // DataTable,
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
      ],
      max25chars: function (v: any) {
        return v.length <= 25 || "Input too long!";
      },
      user: { type: Object },
      repositories: [],
      dialog: false,
      id: this.$route.params.id,
      url: "",
      msg: "",
      snackBar: false,
      snackBarTimeout: 1500,
      snackBarColor: "",
      isOwner: false,
      userAccounts: [],
      searchbarLength: 7,
    };
  },
  async created() {
    this.user = (await getUserInfo())["data"];
    this.repositories = (await getRepository(this.id))["data"];
    this.isOwner = (await isCurrentUserProjectOwner(this.id))["data"].success;
    if (!this.isOwner) this.searchbarLength = 10;
  },
  methods: {
    async add(url: any) {
      const result = (await addRepo(Number(this.id), url));
      this.msg = result["data"].message;
      this.dialog = false;
      this.snackBar = true;
      this.snackBarColor = result["data"].success ? "green" : "red";
      await this.getResitories();
    },
    async getResitories() {
      this.repositories = (await getRepository(this.id))["data"];
    },
    ChangeInput(searchedRepo: any) {
      this.search = searchedRepo;
    },

    async send(applicantId: any) {
      const result = await sendInvitation(applicantId, Number(this.id));
      this.dialog = false;
      this.msg = result["data"].message;
      this.snackBar = true;
      this.snackBarColor = result["data"].success ? "green" : "red";
    },

    async clickInvatation(projectId: number) {
      invite(Number(this.id)).then((res) => {
        this.userAccounts = res.data;
      });
    },
  },
});
</script>
<style></style>
