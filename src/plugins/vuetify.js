import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify, {});

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#9C27B0",
        secondary: "#1E88E5",
        accent: "#43A047",
        error: "#F50057",
      },
    },
  },
});
