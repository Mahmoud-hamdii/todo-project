<template>
  <div class="team">
    <h2 class="h4 primary--text my-3">Team</h2>
    <v-container>
      <v-layout row>
        <v-flex xs12 sm6 md4 v-for="person in team" :key="person.id">
          <v-card flat class="ma-2">
            <v-responsive class="pt-4 text-center">
              <v-avatar size="100" class="grey lighten-2">
                <img :src="person.avatar" />
              </v-avatar>
            </v-responsive>

            <v-card-subtitle class="pb-0 font-weight-bold">{{
              person.name
            }}</v-card-subtitle>

            <v-card-text>
              <div class="secondary--text">{{ person.role }}</div>
              <div class="pt-2 gray--text">{{ person.content }}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="secondary" text>
                <v-icon small left>mdi-message</v-icon>
                Message
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import TeamJson from "@/json/team.json";

export default {
  data: function () {
    return {
      team: TeamJson,
    };
  },
};
</script>
