<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        Je me connecte
      </div>
      <div class="card-body">
        <form  @submit.prevent="login">
          <div class="form-group">
            <input v-model="username" type="text" class="form-control" placeholder="Username" required>
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
          this.$router.push("/account");
        })
        .catch(err => {
          this.error = err;
        });
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
