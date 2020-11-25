<template>
  <div>
    <ve-histogram
      :data="weekTotalData"
      :events="chartEvents"
      :settings="chartSetting"
    ></ve-histogram>
    <p>selected-week：{{ selectedWeek }}</p>
    <ve-line :data="commitData"></ve-line>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getCommitInfo } from "../apis//repoInfo";
import { checkAuth } from "@/apis/authorize";

const initialData = () => {
  return {
    weekTotalData: {},
    dayOfWeekData: [],
    commitData: {},
    selectedWeek: "",
    chartSetting: {
      selectedMode: "single",
    },
  };
};

export default Vue.extend({
  props: {
    repoId: Number,
  },
  data: function () {
    return initialData();
  },
  mounted() {
    this.getCommitInfoData();
  },
  computed: {
    chartEvents() {
      return {
        click: (e: any) => {
          this.clickChartEvent(e);
        },
      };
    },
  },
  methods: {
    getCommitInfoData() {
      getCommitInfo(this.repoId)
        .then((res) => {
          const data = res.data;
          this.weekTotalData = {
            columns: ["week", "total"],
            rows: data.weekTotalData,
          };
          this.dayOfWeekData = data.dayOfWeekData
          this.selectedWeek =
            data.weekTotalData[data.weekTotalData.length - 1].week;
          this.setCommitData();
        })
        .catch((err) => {
          alert("系統錯誤");
        });
    },
    setCommitData() {
      this.commitData = {
        columns: ["day", "commit"],
        rows: this.getCommitRowsData(),
      };
    },
    clickChartEvent(e: any) {
      this.selectedWeek = e.name;
      this.setCommitData();
    },
    getCommitRowsData() {
      let rows: { day: string; commit: number }[] = [];
      this.dayOfWeekData.forEach(
        (data: {
          week: string;
          detailDatas: { day: string; commit: number }[];
        }) => {
          if (data.week === this.selectedWeek) {
            rows = data.detailDatas;
          }
        }
      );
      return rows;
    },
  },
});
</script>