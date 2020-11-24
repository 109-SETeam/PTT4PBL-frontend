<template>
  <div>
    <ve-histogram
      :data="chartData"
      :events="chartEvents"
      :settings="chartSetting"
    ></ve-histogram>
    <p>selected-week：{{ selectedWeek }}</p>
    <ve-line :data="detailData"></ve-line>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getCommitInfo } from "../apis/githubInfo";
import { checkAuth } from "@/apis/authorize";

const dateFormat = (date: number) => {
  const formatDate = new Date(date * 1000);
  return formatDate.getMonth() + 1 + "/" + formatDate.getDate();
};

const initialData = () => {
  return {
    chartData: {},
    detailData: {},
    commitData: [],
    selectedWeek: "",
    chartSetting: {
      selectedMode: "single",
    },
  };
};

export default Vue.extend({
  props: {
      owner:String,
      repo:String
  },
  data: function () {
    return initialData();
  },
  mounted() {
    this.getCommitChartInfo();
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
    getCommitChartInfo() {
      getCommitInfo(this.owner, this.repo)
        .then((res) => {
          const data = res.data;
          data.forEach((item: { total: number; week: any; days: any }) => {
            item.week = dateFormat(item.week);
          });
          this.selectedWeek = data[data.length - 1].week;
          this.commitData = data;
          this.setChartData();
          this.setDetailChartData();
        })
        .catch((err) => {
          alert("系統錯誤");
        });
    },
    setChartData() {
      this.chartData = {
        columns: ["week", "total"],
        rows: this.commitData,
      };
    },
    setDetailChartData() {
      this.detailData = {
        columns: ["day", "commit"],
        rows: this.getDetailData(),
      };
    },
    clickChartEvent(e: any) {
      this.selectedWeek = e.name;
      this.setDetailChartData();
    },
    getDetailData() {
      const rows: { day: string; commit: number }[] = [];
      this.commitData.forEach(
        (item: { total: number; week: string; days: any }) => {
          if (item.week === this.selectedWeek) {
            let dayCount = 0;
            item.days.forEach((day: number) => {
              rows.push({
                day: this.convertDayToString(dayCount),
                commit: day,
              });
              dayCount++;
            });
            return;
          }
        }
      );
      return rows;
    },
    convertDayToString(day: number) {
      switch (day) {
        case 0: {
          return "Sunday";
        }
        case 1: {
          return "Monday";
        }
        case 2: {
          return "Tuesday";
        }
        case 3: {
          return "Wednesday";
        }
        case 4: {
          return "Thursday";
        }
        case 5: {
          return "Friday";
        }
        case 6: {
          return "Saturday";
        }
        default: {
          return "";
        }
      }
    },
  },
});
</script>