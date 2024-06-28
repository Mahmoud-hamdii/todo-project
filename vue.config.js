const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  base: "/todo-project/",
  transpileDependencies: ["vuetify"],
  lintOnSave: false,
});
