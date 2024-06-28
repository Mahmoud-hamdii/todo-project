<template>
  <div class="project">
    <h2 class="h4 primary--text my-3">My Projects</h2>
    <v-container class="my-5">
      <v-expansion-panels>
        <v-expansion-panel v-for="project in myProjects" :key="project.id">
          <v-expansion-panel-header>
            {{ project.title }}
            <template v-slot:actions>
              <v-icon v-if="project.status === 'complete'" color="secondary">
                mdi-check
              </v-icon>
              <v-icon v-else-if="project.status === 'overdue'" color="error">
                mdi-alert-circle
              </v-icon>
              <v-icon v-else color="accent"> $expand </v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="font-weight-bold">{{ project.due }}</div>
            {{ project.content }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
import db from "@/fb";

export default {
  data: function () {
    return {
      projects: [],
    };
  },
  computed: {
    myProjects() {
      return this.projects.filter((project) => {
        return project.person === "The Net Ninja";
      });
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
