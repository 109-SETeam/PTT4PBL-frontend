<template>
  <v-app>
    <v-container fluid>
      <v-row class="d-flex justify-center pt-16">
        <!-- 左邊個人資訊 -->
        <v-col lg="2">
          <v-card max-width="374" height="700">
            <v-img
              class="mb-2"
              height="250"
              src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            ></v-img>
            <v-edit-dialog>
              <div class="text-h3">{{ test.name }}</div>
              <template v-slot:input>
                <v-text-field
                  v-model="test.name"
                  :rules="[max25chars]"
                  label="Edit Name"
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
        <!-- 左邊個人資訊 end -->
        <!-- 右邊表格 -->
        <v-col lg="6">
          <v-row>
            <v-col lg="3" class="d-flex align-center text-h3">Project</v-col>
            <v-col lg="7" class="d-flex flex-row">
              <v-text-field
                id="table-search-card"
                class="align-self-end"
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                label="Find a project..."
                hide-details
                clearable
                outlined
                dense
                solo
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
                :headers="headers"
                :items="projects"
                :search="search"
                fixed-header
                height="400px"
                hide-default-footer
                hide-default-header
              >
                <template v-slot:[`item.name`]="{ item }">
                  <div @click="Test(item.id)" class="py-2">
                    {{ item.name }}
                  </div>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-col>
        <!-- 右邊表格 end -->
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
          text: "ProjectName",
          // align: "start",
          // filterable: true,
          value: "name",
        },
      ],
      projects: [
        {
          id: 0,
          name: "Frozen Yogurt",
        },
        {
          id: 1,
          name: "Ice cream sandwich",
        },
        {
          id: 2,
          name: "Eclair",
        },
        {
          id: 3,
          name: "Cupcake",
        },
        {
          id: 4,
          name: "Gingerbread",
        },
        {
          id: 5,
          name: "Jelly bean",
        },
        {
          id: 6,
          name: "Lollipop",
        },
        {
          id: 7,
          name: "Honeycomb",
        },
        {
          id: 8,
          name: "Donut",
        },
        {
          id: 9,
          name: "KitKat",
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

.v-data-table {
  background-color: rgb(237, 237, 237) !important;
}

tbody {
  background-color: rgb(237, 237, 237) !important;
}

// #table-search-card {
//   margin: 0px !important;
//   background-color: rgb(237, 237, 237) !important;
// }

.v-text-field {
  margin: 0px !important;
}

.container {
  background-color: rgb(247, 247, 247) !important;
}
</style>
