<template>
  <nav>
    <v-snackbar v-model="snackbar" :timeout="timeout" top color="success">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-app-bar app flat class="primary">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="white--text"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light grey--text">Todo</span>
        <span class="white--text">Project</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text color="white">
        <span>Sign Out</span>
        <v-icon right> mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" class="primary">
      <v-list>
        <v-list-item class="px-2 d-flex justify-center">
          <v-list-item-avatar size="100">
            <v-img src="../../public/images/avatar-1.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content class="white--text text-center">
            <v-list-item-title class="text-h6">
              The Net Ninja
            </v-list-item-title>
            <v-list-item-subtitle>Web developer</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <AddBtn @projectAdded="snackbar = true" />
      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              link.text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import AddBtn from "./AddProject.vue";

export default {
  data() {
    return {
      drawer: true,
      links: [
        { icon: "mdi-view-dashboard", text: "Dashboard", route: "/" },
        { icon: "mdi-folder", text: "My Projects", route: "/projects" },
        { icon: "mdi-account-group", text: "Team", route: "/team" },
      ],
      snackbar: false,
      text: "Your Project Added Succesfully.",
      timeout: 2000,
    };
  },
  components: {
    AddBtn,
  },
};
</script>

<style></style>
