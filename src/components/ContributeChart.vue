<template>
  <v-row justify="space-around">
    <v-card v-for="(item, index) in data" :key="index" width="300" height="380">
      <v-card-title class="mb-1">
        <v-avatar size="60">
          <img alt="user" :src="item.author.avatar_url" />
        </v-avatar>
        <v-card-subtitle class="text-left">
          <a
            class="text-subtitle-1 font-weight-regular"
            target="aboutblank"
            :href="item.author.html_url"
            >{{ item.author.login }}</a
          >
        </v-card-subtitle>
      </v-card-title>

      <ve-line
        width="300px"
        height="300px"
        :legend-visible="false"
        :y-axis="yaxis"
        :data="chartData[index]"
        :settings="chartSettings"
        :colors="['#fb8532']"
      ></ve-line>
    </v-card>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { getContributeInfo } from "@/apis/repoInfo";

interface Rows {
  ws: string;
  c: number;
  a: number;
  d: number;
}

interface ChartData {
  rows: any[];
  columns: string[];
}

export default Vue.extend({
  props: {
    repoId: Number,
  },
  data() {
    return {
      yaxis: {
        max: 40,
      },
      data: {} as { author: string; total: number; weeks: Rows[] }[],
      chartSettings: {
        // metrics: ["commit"],
        labelMap: {
          ws: "day",
          c: "commits",
          a: "additions",
          d: "deletions",
        },
        dimension: ["ws"],
        area: true,
      },
      chartData: [] as ChartData[],
    };
  },
  methods: {
    getContributeInfo() {
      getContributeInfo(this.repoId)
        .then((response) => {
          this.data = response.data;
          this.data.forEach((item, index) => {
            this.chartData.push({
              rows: item.weeks,
              columns: ["ws", "c"],
            });
          });
        })
        .catch((err) => {
          alert("系統錯誤");
        });
    },
    reConstructContributeInfo(data: Rows[]): any {
      const rows: any[] = [];
      data.forEach((week) => {
        rows.push({
          day: week.ws,
          commits: week.c,
          additions: week.a,
          deletions: week.d,
        });
      });
      return rows;
    },
  },
  mounted() {
    this.getContributeInfo();
  },
});
</script>

<style>
a {
  text-decoration: none;
}
</style>