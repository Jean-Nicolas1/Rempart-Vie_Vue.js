<template>
  <b-nav id="navig" vertical class="w-25">
    <div id="welcome">
      Bienvenue,
      <br>
      <strong>{{$root.user.name}}</strong>
    </div>
    <div id="nav-links">
      <router-link to="/account">
        <b-button :class="{'nav-btn-active': $route.fullPath=== '/account', 'nav-btn': $route.fullPath!== '/account' }">Tableau de bord</b-button>
      </router-link>
    </div>
    <div id="nav-links">
      <router-link to="/account/mon-profil">
        <b-button :class="{'nav-btn-active': $route.fullPath=== '/account/mon-profil', 'nav-btn': $route.fullPath!== '/account/mon-profil' }">Mon profil</b-button>
      </router-link>
    </div>
    <div id="nav-links">
      <router-link to="/account/versement">
        <b-button :class="{'nav-btn-active': $route.fullPath=== '/account/versement', 'nav-btn': $route.fullPath!== '/account/versement' }">Versements</b-button>
      </router-link>
    </div>
    <div id="nav-links">
      <router-link to="/account/rachat">
        <b-button :class="{'nav-btn-active': $route.fullPath=== '/account/rachat', 'nav-btn': $route.fullPath!== '/account/rachat' }">Rachats partiels</b-button>
      </router-link>
    </div>
    <div id="nav-links">
      <router-link to="/account/mes-operations">
        <b-button :class="{'nav-btn-active': $route.fullPath=== '/account/mes-operations', 'nav-btn': $route.fullPath!== '/account/mes-operations' }">Mes opérations</b-button>
      </router-link>
    </div>
  </b-nav>
</template>

<script>
export default {};
</script>


<style scoped>
#navig {
  background-color: #074b78;
  padding: 10px;
  color: white;
}

#welcome {
  font-size: 20px;
  padding: 10px;
  margin-bottom: 10px;
}

.nav-btn {
  background-color: white;
  color: #074b78;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
}

.nav-btn-active {
  background-color: #074b78;
  color: white;
  border-color: white;
  border-width: 3px;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
}

#nav-links {
  color: white;
  margin-bottom: 2px;
}
</style>