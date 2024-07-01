<template>
  <div class="add-project mb-5 mt-3">
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn depressed color="secondary" v-bind="attrs" v-on="on" large>
            Add a New Project
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Add a New Project</span>
          </v-card-title>
          <v-card-text>
            <form>
              <v-text-field
                prepend-icon="mdi-subtitles"
                v-model="title"
                :error-messages="titleErrors"
                label="Title"
                required
                @input="$v.title.$touch()"
                @blur="$v.title.$touch()"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-book-open-variant"
                v-model="content"
                :error-messages="contentErrors"
                label="Content"
                required
                @input="$v.content.$touch()"
                @blur="$v.content.$touch()"
              ></v-text-field>
              <v-select
                v-model="status"
                :error-messages="statusErrors"
                :items="items"
                label="status"
                prepend-icon="mdi-list-status"
                required
              ></v-select>
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :error-messages="dateErrors"
                    v-model="formattedDate"
                    label="Due Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
              <v-layout row justify-space-around class="ma-2">
                <v-flex>
                  <v-btn
                    color="primary"
                    width="100%"
                    @click="submit"
                    :loading="loading"
                  >
                    Add Project
                  </v-btn>
                </v-flex>
                <v-flex>
                  <v-btn color="primary" width="100%" @click="clear">
                    clear
                  </v-btn>
                </v-flex>
                <v-flex>
                  <v-btn color="primary" width="100%" @click="close">
                    close
                  </v-btn>
                </v-flex>
              </v-layout>
            </form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, minLength } from "vuelidate/lib/validators";
import { format, parseISO } from "date-fns";
import db from "@/fb";

export default {
  name: "AddProject",
  mixins: [validationMixin],

  validations: {
    title: { required, maxLength: maxLength(30), minLength: minLength(3) },
    content: { required, maxLength: maxLength(1000), minLength: minLength(10) },
    date: { required, Date },
    status: { required },
  },

  data: () => ({
    title: "",
    content: "",
    date: null,
    menu2: false,
    dialog: false,
    loading: false,
    status: null,
    items: ["complete", "ongoing", "overdue"],
  }),

  computed: {
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.minLength &&
        errors.push("title must be at least 3 characters long");
      !this.$v.title.maxLength &&
        errors.push("title must be at most 30 characters long");
      !this.$v.title.required && errors.push("title is required.");
      return errors;
    },
    contentErrors() {
      const errors = [];
      if (!this.$v.content.$dirty) return errors;
      !this.$v.content.maxLength &&
        errors.push("content must be at most 1000 characters long");
      !this.$v.content.minLength &&
        errors.push("content must be at least 10 characters long");
      !this.$v.content.required && errors.push("content is required");
      return errors;
    },
    statusErrors() {
      const errors = [];
      if (!this.$v.status.$dirty) return errors;
      !this.$v.status.required && errors.push("status is required");
      return errors;
    },
    dateErrors() {
      const errors = [];
      if (!this.$v.date.$dirty) return errors;
      !this.$v.date.required && errors.push("Date is required");
      return errors;
    },
    formattedDate() {
      return this.date ? format(parseISO(this.date), "do LLL yyyy") : "";
    },
  },

  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true;
        var project = {
          title: this.title,
          content: this.content,
          due: format(this.date, "do LLL yyyy"),
          person: "The Net Ninja",
          status: this.status,
        };
      }
      db.collection("projects")
        .add(project)
        .then(() => {
          console.log("the project is added.");
          this.loading = false;
          this.dialog = false;
          this.$emit("projectAdded");
          this.clear();
        });
    },
    close() {
      this.dialog = false;
    },
    clear() {
      this.$v.$reset();
      this.title = "";
      this.content = "";
      this.date = null;
      this.status = null;
    },
  },
};
</script>
<style lang="scss" scoped>
.layout {
  gap: 5px;
}
</style>
