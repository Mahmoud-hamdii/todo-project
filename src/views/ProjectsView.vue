<template>
  <div class="project">
    <h2 class="h4 primary--text my-3">My Projects</h2>
    <v-container class="my-5">
      <v-card
        flat
        class="pa-5"
        v-for="project in paginatedProjects"
        :key="project.id"
      >
        <v-dialog transition="dialog-top-transition" max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on">
              <v-layout
                row
                wrap
                :class="`pa-3 project ${project.status} align-center`"
              >
                <v-flex xs12 md4>
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
                <v-flex xs6 sm4 md2>
                  <div class="d-flex justify-center">
                    <v-btn @click="deleteProject(project.id)" color="primary">
                      <v-icon>mdi-delete-circle</v-icon>
                      Delete
                    </v-btn>
                  </div>
                </v-flex>
              </v-layout>
            </div>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar color="primary" dark
                >Project ( {{ project.title }} ) Content</v-toolbar
              >
              <v-card-text>
                <div class="pa-4 text-h5">{{ project.content }}</div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn text @click="dialog.value = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
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
  computed: {
    myProjects() {
      return this.projects.filter((project) => {
        return project.person === "The Net Ninja";
      });
    },
    // Calculate total number of pages based on pageSize
    pages() {
      return Math.ceil(this.myProjects.length / this.pageSize);
    },
    // Slice myProjects array to display only projects for the current page
    paginatedProjects() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      return this.myProjects.slice(startIndex, startIndex + this.pageSize);
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
  methods: {
    deleteProject(id) {
      // Assuming db is Firebase Firestore db
      db.collection("projects")
        .doc(id)
        .delete()
        .then(() => {
          // Remove the project from local array
          this.projects = this.projects.filter((project) => project.id !== id);
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
    changePage(page) {
      this.currentPage = page;
    },
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
