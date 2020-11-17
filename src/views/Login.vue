<template>
  <v-container>

    <VBtn class="container login-btn" @click="handleLogin">Github登入 </VBtn>
    <VBtn class="container login-btn" @click="test">Github </VBtn>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { githubOAuthUrl } from "../config/config";
import { getUser } from "../apis/user";
import { checkAuth } from "../apis/authorize";
import router from "@/router";
import store from '@/store';

export default Vue.extend({
  mounted: () => {
      console.log(store.getters.isAuthenticated)
  },
  methods: {
    handleLogin: (e: any) => {
      window.location.assign(githubOAuthUrl);
    },
    test: (e: any) => {
      getUser().then((res) => {
        console.log(res);
      });
    },
  },
});
</script>

<style lang="scss">
.container {
  background-color: rgb(92, 92, 92);
  height: 100vh;
}
.login-btn {
  background-color: rgb(46, 46, 46);
}
</style>