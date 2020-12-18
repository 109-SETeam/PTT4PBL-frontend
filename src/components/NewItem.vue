<template>
  <v-dialog v-model="dialog" max-width="60%">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="success" v-bind="attrs" v-on="on" @click="clearInputData"
        ><v-icon>mdi-plus-box-multiple-outline</v-icon></v-btn
      >
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">{{ vCardTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                :label="vTextLabel"
                v-model="inputData"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn color="blue darken-1" text @click="add"> Add </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["vCardTitle", "vTextLabel"],
  data() {
    return {
      inputData: "",
      dialog: false,
      userAccounts: [] as any,
    };
  },
  methods: {
    add() {
      this.$emit("add", this.inputData);
      this.dialog = false;
    },
    clearInputData() {
      this.inputData = "";
    },
  },
});
</script>