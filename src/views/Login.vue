<template>
  <VBtn class="container login-btn" @click="handleLogin">Github登入 </VBtn>
</template>

<script lang="ts">
import Vue from "vue";
import { githubOAuthUrl } from "../config/config";
import { getUser } from "../apis/user";
import router from "@/router";

export default Vue.extend({
  methods: {
    handleLogin: (e: any) => {
      window.location.assign(githubOAuthUrl);
      router.currentRoute.query;
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