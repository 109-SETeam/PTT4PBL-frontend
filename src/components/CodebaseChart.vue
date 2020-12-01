<template>
  <div>
    <ve-line :data="chartData" :settings="chartSettings"></ve-line>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getCodebase } from "@/apis/repoInfo.ts";
export default Vue.extend({
  props: {
    repoId: Number,
  },
  data() {
    return {
      chartSettings: {
        area: true,
      },
      chartData: {
        columns: ["date", "numberOfRowsAdded", "numberOfRowsDeleted", "numberOfRows"],
        rows: [],
      },
    };
  },
  mounted() {
    this.getCodebaseData()
  },
  methods: {
    getCodebaseData(){
      getCodebase(1).then((res) => {
        const resData = res.data;
        this.chartData.rows = resData;
        console.log(resData);
      });
    },
  },
});
</script>