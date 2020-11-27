<template>
  <v-menu
    :close-on-content-click="false"
    offset-y
    transition="scale-transition"
  >
    <!-- template start -->
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-badge dot :value="hasMessage">
          <v-icon large> mdi-bell-circle </v-icon>
        </v-badge>
      </v-btn>
    </template>
    <!-- template end -->
    <!-- list start -->
    <v-list two-line max-width="400" max-height="500" class="overflow-y-auto">
      <template v-for="(item, index) in items">
        <v-list-item :key="item.project.id">
          <v-list-item-content>
            <v-list-item-title
              class="text-left mb-2"
              v-text="item.inviter"
            ></v-list-item-title>
            <v-list-item-subtitle
              class="text-left"
              v-text="subtitleText + item.project.name"
            ></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <div class="d-flex">
              <v-btn @click="Test(item)" color="green" icon
                ><v-icon>mdi-check</v-icon></v-btn
              >
              <v-btn @click="Test(item)" color="red" icon
                ><v-icon>mdi-close</v-icon></v-btn
              >
            </div>
          </v-list-item-action>
        </v-list-item>
        <v-divider
          v-if="index < items.length - 1"
          :key="item.project.name"
        ></v-divider>
      </template>
    </v-list>
    <!-- list end -->
  </v-menu>
</template>

<script lang="ts">
import Vue from "vue";
import * as signalR from '@aspnet/signalr';

export default Vue.extend({
  data() {
    return {
      hasMessage: false,
      subtitleText: "想邀請你加入：",
      items: [
        { inviter: "user1", project: { id: 0, name: "p0" }, isAgreed: false },
        { inviter: "user2", project: { id: 1, name: "p1" }, isAgreed: false },
        { inviter: "user3", project: { id: 2, name: "p2" }, isAgreed: false },
        { inviter: "user3", project: { id: 3, name: "p3" }, isAgreed: false },
        { inviter: "user3", project: { id: 4, name: "p4" }, isAgreed: false },
        { inviter: "user3", project: { id: 5, name: "p5" }, isAgreed: false },
        { inviter: "user3", project: { id: 6, name: "p6" }, isAgreed: false },
        { inviter: "user3", project: { id: 7, name: "p7" }, isAgreed: false },
        { inviter: "user3", project: { id: 8, name: "p8" }, isAgreed: false },
        { inviter: "user3", project: { id: 9, name: "p9" }, isAgreed: false },
        { inviter: "user3", project: { id: 10, name: "p10" }, isAgreed: false },
        { inviter: "user3", project: { id: 11, name: "p11" }, isAgreed: false },
        { inviter: "user3", project: { id: 12, name: "p12" }, isAgreed: false },
        { inviter: "user3", project: { id: 13, name: "p13" }, isAgreed: false },
        { inviter: "user3", project: { id: 14, name: "p14" }, isAgreed: false },
        { inviter: "user3", project: { id: 15, name: "p15" }, isAgreed: false },
        { inviter: "user3", project: { id: 16, name: "p16" }, isAgreed: false },
        { inviter: "user3", project: { id: 17, name: "p17" }, isAgreed: false },
        { inviter: "user3", project: { id: 18, name: "p18" }, isAgreed: false },
        { inviter: "user3", project: { id: 19, name: "p19" }, isAgreed: false },
      ],
    };
  },
  methods: {
    Test(something: any) {
      console.log(something);
    },
  },
});
</script>

<style>
</style>
