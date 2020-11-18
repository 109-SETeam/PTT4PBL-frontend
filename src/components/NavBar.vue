<template>
  <v-app-bar dense dark>
    <v-toolbar-title>PMS</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="logout">
      <v-icon>mdi-logout</v-icon>
      Logout
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import store from '@/store';
import Vue from "vue";
export default Vue.extend({
  methods: {
    logout: () => {
        store.dispatch('logout')
    },
  },
});
</script>