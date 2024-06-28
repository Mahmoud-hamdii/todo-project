<template>
  <v-app>
    <NavBar />
    <v-main class="mx-4 mb-4">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss" scoped>
#app {
  background: #f5f5f5;
}
</style>
