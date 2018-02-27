<template>
  <form  @submit.prevent="signup">
  <div class="form-group">
    <input v-model="username" type="text" class="form-control" placeholder="Username" required>
  </div>
  <div class="form-group">
    <input v-model="email" type="email" class="form-control" aria-describedby="emailHelp" placeholder="Adresse email" required>
    <small id="emailHelp" class="form-text text-muted">Nous ne partagerons jamais votre adresse email.</small>
  </div>
  <div class="form-group">
    <input v-model="password" type="password" class="form-control" placeholder="Mot de passe" required>
  </div>
  <button type="submit" class="btn btn-primary">Continuer</button>
</form>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      email: "",
      password: "",
      username: "",
      error: null
    };
  },

  methods: {
    signup() {
      this.error = null;
      api
        .signup({
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push("/login");
        })
        .catch(err => {
          this.error = err;
        });
    }
  },

  computed: {
    usernameError() {
      if (!this.error) return null;
      if (this.error.name === "UserExistsError") {
        return this.error.message;
      }
    }
  }
};
</script>
