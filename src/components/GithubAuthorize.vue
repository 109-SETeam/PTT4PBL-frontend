<template>
  <div></div>
</template>

<script lang="ts">
import router from "@/router";
import store from "@/store";
import Vue from "vue";
import { mapActions } from "vuex";
import { authenticateGithubToken } from "../apis/authorize";

export default Vue.extend({
  mounted: () => {
    const query = router.currentRoute.query;
    const code = query.code.toString();
    //authenticateGithubToken(code).then((res)=>{
    //    console.log(res)
    //})
    store.dispatch("login", code);
    console.log(store.getters.isAuthenticated)
  },
});
</script>