const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  base: "/",
  transpileDependencies: ["vuetify"],
  lintOnSave: false,
});
