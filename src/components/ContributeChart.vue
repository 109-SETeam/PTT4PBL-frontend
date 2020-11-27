<template>
  <div></div>
</template>

<script>
import Vue from "vue";
import { getContributeInfo } from "@/apis/repoInfo";

export default Vue.extend({
  data() {
    return {
      props: {
        repoId: Number,
      },
    };
  },
});
</script>

<style>
</style>