<template>
  <div id="app">
  <b-navbar variant="faded" type="light">
    <b-navbar-brand>
      <router-link to="/">
        <img id="logo" src="./assets/logo.png" alt="RV logo">
      </router-link>
    </b-navbar-brand>

      <router-link  to="/performance">
        <b-button>Simuler la performance</b-button>
      </router-link>

      <router-link  v-if="!$root.user" to="/signup">
        <b-button>Adhérer au contrat</b-button>
      </router-link>


      <router-link  v-if="!$root.user" to="/login">
        <b-button>Se connecter</b-button>
      </router-link>

      <router-link v-if="$root.user"  to="/login">
        <b-button @click="logout">Se déconnecter</b-button>
      </router-link>

      
  </b-navbar>
    

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
  width: 120px;
}
</style>
