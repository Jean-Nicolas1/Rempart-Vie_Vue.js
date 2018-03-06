<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        Je crée mon espace
      </div>
      <div class="card-body">
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
        <div class="btn-div">
          <b-button size='lg' type="submit" class="continue-btn">Se connecter</b-button>
        </div>
      </form>
      </div>
    </div>
  </div>
  
  
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
        .then(user => {
          this.$root.user = user;
          this.$router.push("/adhesion/profil-investisseur");
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

<style scoped>
.card {
  margin-bottom: 20px;
  margin-top: 20px;
}
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  text-transform: uppercase;
  background-color: #206fb6;
  color: white;
}
.continue-btn {
  background-color: #206fb6;
  color: white;
}
.btn-div {
  text-align: center;
}
</style>