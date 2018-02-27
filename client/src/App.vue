<template>
  <div id="app">
  <b-navbar variant="faded" type="light">
    <b-navbar-brand>
      <router-link to="/">
        <img id="logo" src="./assets/logo.png" alt="RV logo">
      </router-link>
    </b-navbar-brand>
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
