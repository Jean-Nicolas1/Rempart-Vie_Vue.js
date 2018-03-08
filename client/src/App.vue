<template>
  <div id="app">
    <div class="container">
      <b-navbar class="header" variant="faded" type="light">
        <b-navbar-brand>
          <router-link to="/">
            <img id="logo" src="./assets/logo.png" alt="RV logo">
          </router-link>
        </b-navbar-brand>
        <router-link to="/performance">
          <b-button class="grey-btn">Simuler la performance</b-button>
        </router-link>
        <router-link v-if="!$root.user" to="/signup">
          <b-button class="green-btn">Adhérer au contrat</b-button>
        </router-link>
        <router-link v-if="!$root.user" to="/login">
          <b-button class="blue-btn">Mon espace</b-button>
        </router-link>
        <router-link v-if="$root.user" to="/account">
          <b-button class="blue-btn">Mon espace</b-button>
        </router-link>
        <router-link v-if="$root.user" to="/login">
          <b-button class="red-btn" @click="logout">Se déconnecter</b-button>
        </router-link>
      </b-navbar>
    </div>


    <router-view/>


  </div>
</template>

<script>
import api from "./api";
export default {
  created() {
    const user = api.loadUser();
    if (user) this.$root.user = user;
  },
  methods: {
    logout() {
      api.logout();
      this.$root.user = null;
      this.$router.push("/login");
    }
  }
};
</script>



<style>
#logo {
  width: 200px;
}
.header {
  padding: 10px 0;
}
.blue-btn {
  background-color: #206fb6;
  color: white;
  border-radius: 20px;
  border-color: #206fb6;
}
.green-btn {
  background-color: #27bd83;
  color: white;
  border-radius: 20px;
  border-color: #27bd83;
}
.grey-btn {
  border-radius: 20px;
}
.red-btn {
  background-color: firebrick;
  border-radius: 20px;
  border-color: firebrick;
}
</style>