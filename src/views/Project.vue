<template>
  <v-app>
    <v-container fluid>
      <v-row class="d-flex justify-center pt-16">
        <v-col lg="2">
          <v-card max-width="374" height="700">
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-img
              height="250"
              src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            ></v-img>
            <v-edit-dialog>
              <div class="text-h3">{{ test.name }}</div>
              <template v-slot:input>
                <v-text-field
                  v-model="test.name"
                  :rules="[max25chars]"
                  label="Edit"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
            <v-btn color="success" @click="Test"
              ><v-icon style="background-color: #4CAF50 !important"
                >mdi-logout</v-icon
              >Logout</v-btn
            >
          </v-card>
        </v-col>
        <v-col lg="6">
          <v-row>
            <v-col lg="3" class="d-flex align-center text-h3">Project</v-col>
            <v-col lg="7" class="d-flex flex-row">
              <v-icon class="d-flex pt-2">mdi-magnify</v-icon>
              <v-text-field
                id="table-search-card"
                v-model="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-col>
            <v-col lg="2" class="d-flex justify-end align-end">
              <v-btn color="success" @click="Test"
                ><v-icon style="background-color: #4CAF50 !important"
                  >mdi-plus</v-icon
                >New</v-btn
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-data-table
                @click:row="Test"
                :headers="headers"
                :items="projects"
                :search="search"
                fixed-header
                height="400px"
                hide-default-footer
                hide-default-header
              >
              </v-data-table>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      test: {
        name: "willie",
      },
      max25chars: function (v: any) {
        return v.length <= 25 || "Input too long!";
      },
      search: "",
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          filterable: true,
          value: "name",
        },
      ],
      projects: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
        },
      ],
    };
  },
  methods: {
    Test(value: string) {
      console.log(value);
    },
  },
});
</script>

<style lang="scss">
tbody {
  tr:hover {
    cursor: pointer !important;
  }
}

.theme--light {
  background-color: rgb(237, 237, 237) !important;
}

#table-search-card {
  margin: 0px !important;
  background-color: rgb(237, 237, 237) !important;
}

.v-text-field {
  margin: 0px !important;
}

.container {
  background-color: rgb(247, 247, 247) !important;
}
</style>
