<template>
  <div class="dashboard">
    <h2 class="h4 primary--text my-3">Dashboard</h2>
    <v-container class="my-4">
      <v-layout row class="ma-4">
        <v-flex xs12 md6 class="text-center">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                color="primary"
                width="100%"
                @click="sortBy('person')"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon left>mdi-account-search</v-icon>
                Sort by Person
              </v-btn>
            </template>
            <span>Sort by Person</span>
          </v-tooltip>
        </v-flex>
        <v-flex xs12 md6 class="text-center">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                color="primary"
                width="100%"
                @click="sortBy('title')"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon left small>mdi-subtitles</v-icon>
                Sort by Title
              </v-btn>
            </template>
            <span>Sort by Title</span>
          </v-tooltip>
        </v-flex>
      </v-layout>
      <v-card
        flat
        class="pa-5"
        v-for="project in paginatedProjects"
        :key="project.id"
      >
        <v-layout
          row
          wrap
          :class="`pa-3 project ${project.status} align-center`"
        >
          <v-flex xs12 md6>
            <div class="caption grey--text">Project Title</div>
            <div>{{ project.title }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Person</div>
            <div>{{ project.person }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due Date</div>
            <div>{{ project.due }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="d-flex justify-center">
              <v-chip
                class="chip caption white--text font-weight-bold text-uppercase"
                >{{ project.status }}</v-chip
              >
            </div>
          </v-flex>
        </v-layout>
      </v-card>
      <!-- Pagination controls -->
      <v-pagination
        v-model="currentPage"
        :length="pages"
        @input="changePage"
      ></v-pagination>
    </v-container>
  </div>
</template>

<script>
import db from "@/fb";

export default {
  data: function () {
    return {
      projects: [],
      currentPage: 1,
      pageSize: 6, // Number of projects per page
    };
  },
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
    changePage(page) {
      this.currentPage = page;
    },
  },
  computed: {
    // Calculate total number of pages based on pageSize
    pages() {
      return Math.ceil(this.projects.length / this.pageSize);
    },
    // Slice myProjects array to display only projects for the current page
    paginatedProjects() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      return this.projects.slice(startIndex, startIndex + this.pageSize);
    },
  },
  created() {
    db.collection("projects").onSnapshot((res) => {
      const changes = res.docChanges();

      changes.forEach((change) => {
        if (change.type === "added") {
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id,
          });
        }
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.project.complete {
  border-left: 4px solid #1e88e5;
  .chip {
    background: #1e88e5;
  }
}
.project.ongoing {
  border-left: 4px solid #43a047;
  .chip {
    background: #43a047;
  }
}
.project.overdue {
  border-left: 4px solid #f50057;
  .chip {
    background: #f50057;
  }
}
</style>
