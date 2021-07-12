<template>
  <center>
    <v-card elevation="24" max-width="400">
      <v-container class="grey lighten-5">
        <form @submit.prevent="login">
          <v-text-field v-model="email" label="Email" required></v-text-field>
          <v-text-field
            v-model="password"
            type="password"
            label="Password"
            required
          ></v-text-field>
          <v-btn class="mr-4" type="submit">Login</v-btn>
        </form>
        <br />
        <p v-if="feedback" class="red--text">{{ feedback }}</p>
      </v-container>
    </v-card>
  </center>
</template>

<script>
import auth from "firebase";
export default {
  name: "Login",
  data() {
    return {
      feedback: null,
      password: null,
      email: null,
    }
  },
  methods: {
    login() {
      if (this.email && this.password) {
        auth
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then((result) => {
            this.$router.push({ name: "Shelf" });
            this.feedback = null;
          })
          .catch((err) => {
            this.feedback = err.message;
          });
      } else {
        this.feedback = "You must enter a email and password";
      }
    },
  },
};
</script>
<style>
</style>