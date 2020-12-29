<template>
  <v-row class="mt-5 justify-center">
    <v-col cols="12" lg="10">
      <v-card elevation="2" outlined>
        <v-container fluid>
          <v-row>
            <v-col class="text-left"><span>ProjectNameForSonarqube</span></v-col>
          </v-row>
          <v-row>
            <v-col>
              <span class="mr-2">Bugs</span>
              <v-icon>mdi-bug</v-icon>
              <v-row class="justify-center mt-2"
                ><span class="mr-2">Bugs</span></v-row
              >
            </v-col>
            <v-divider vertical></v-divider>
            <v-col>
              <span class="mr-2">Vulnerabilities</span>
              <v-icon>mdi-security</v-icon>
              <v-row class="justify-center mt-2"
                ><span class="mr-2">Vulnerabilities</span></v-row
              >
            </v-col>
            <v-divider vertical></v-divider>
            <v-col>
              <span>Code Smells</span>
              <v-row class="justify-center mt-2"
                ><span class="mr-2">Code Smells</span></v-row
              >
            </v-col>
            <v-divider vertical></v-divider>
            <v-col>
              <span>Coverage</span>
              <v-row class="justify-center mt-2"
                ><span class="mr-2">Coverage</span></v-row
              >
            </v-col>
            <v-divider vertical></v-divider>
            <v-col>
              <span class="mr-2">Duplications</span>
              <v-icon>mdi-content-duplicate</v-icon>
              <v-row class="justify-center mt-2"
                ><span class="mr-2">Duplications</span></v-row
              >
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    repoId: Number,
  },
  data() {
    return {
      bugs: Number,
      codeSmells: Number,
      coverage: Number,
      vulnerabilities: Number,
      duplicatedLinesDensity: Number,
    };
  },
});
</script>

<style>
</style>