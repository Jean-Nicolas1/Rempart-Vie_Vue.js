<template>
  <form  @submit.prevent="login">
  <div class="form-group">
    <input v-model="username" type="text" class="form-control" placeholder="Username" required>
  </div>
  <div class="form-group">
    <input v-model="password" type="password" class="form-control" placeholder="Mot de passe" required>
  </div>
  <button type="submit" class="btn btn-primary">Se connecter</button>
</form>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      username: "",
      password: "",
      error: null
    };
  },

  methods: {
    login() {
      this.error = null;
      api
        .login(this.username, this.password)
        .then(user => {
          this.$root.user = user;
          this.$router.push("/");
        })
        .catch(err => {
          this.error = err;
        });
    }
  }
};
</script>
