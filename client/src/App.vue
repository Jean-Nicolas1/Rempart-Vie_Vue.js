<template>
  <div id="app">
  <b-navbar variant="faded" type="light">
    <b-navbar-brand>
      <router-link to="/">
        <img id="logo" src="./assets/logo.png" alt="RV logo">
      </router-link>
    </b-navbar-brand>

      <router-link to="/performance">
        <b-button>Simuler la performance</b-button>
      </router-link>

      <router-link to="/signup">
        <b-button>Adhérer au contrat</b-button>
      </router-link>


      <router-link to="/login">
        <b-button>Se connecter</b-button>
      </router-link>

      
  </b-navbar>
    
  <div class="container">
    <router-view/>
  </div>

  </div>
</template>

<style>
#logo {
  width: 120px;
}
</style>
