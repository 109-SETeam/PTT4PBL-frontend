<template>
  <v-container fill-height fluid class="paper">
    <v-row fill-height>
      <v-col lg="12" fill-height>
        <!-- <h1 class="title">歡迎使用PMS</h1> -->
        <!-- <v-btn class="login-btn pa-2" @click="handleLogin">Github登入 </v-btn> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { githubOAuthUrl } from "../config/config";
import router from "@/router";
import store from "@/store";
import App from "@/App.vue";

export default Vue.extend({
  mounted: () => {
    console.log(store.getters.isAuthenticated);
  },
  methods: {
    handleLogin: (e: any) => {
      window.location.assign(githubOAuthUrl);
    },
  },
});
</script>

<style lang="scss">
.paper {
  background-color: rgb(92, 92, 92);
}
.login-btn {
  background-color: rgb(46, 46, 46);
}
.title {
  color: rgb(255, 255, 255);
}
</style>