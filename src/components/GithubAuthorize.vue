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
    store.dispatch("login", code);
  },
});
</script>