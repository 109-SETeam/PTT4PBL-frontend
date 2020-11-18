<template>
  <v-container fluid fill-height class="container-background-color">
    <v-row> 
      <v-col lg="6"></v-col>
      <v-col lg="6"></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      repositories: null
    };
  },
  mounted() {
    this.Test();
  },
  methods: {
    Test() {
      console.log(this.$route.params.id);
    },
  },
};
</script>

<style>
</style>