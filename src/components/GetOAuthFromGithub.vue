<template>
  <div></div>
</template>

<script lang="ts">
import router from "@/router";
import Vue from "vue";
import { authenticateGithubToken } from "../apis/oauth";

export default Vue.extend({
  mounted: () => {
    console.log(router.currentRoute.query);
    const query = router.currentRoute.query;
    const code = query.code.toString();
    authenticateGithubToken(code).then((res) => {
        console.log(res);
    });
  },
});
</script>