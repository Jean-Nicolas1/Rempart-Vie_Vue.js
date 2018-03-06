<template>
  <div id="page">
    <b-nav id="navig" vertical class="w-25">
      <div v-if="user">
        Bienvenue,
        <br> {{user.username}}
      </div>
      <div id="nav-links">
        <router-link to="/account">Tableau de bord</router-link>
      </div>
      <div id="nav-links">
        <router-link to="/account/versement">Versements</router-link>
      </div>
    </b-nav>
    <div id="page-content">
      <div v-if="user && capital && form">
        Hello {{user.username}} Your are {{form.familySituation}} You invested {{capital.investedCapital}}
        <h3>Tableau de bord</h3>
        <section id="recap">
          <h5>Récapitulatif depuis adhésion</h5>
          <b-table id="table" striped hover :items="[{ 
          cumul_des_versements_bruts:capital.investedCapital.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' €' , 
          rachats_bruts:'10',
          solde_brut_des_investissements: '10',
          plus_ou_moins_values_depuis_adhésion:'10',
          performance_depuis_adhésion: '10',
          épargne_atteinte: '10',
          date : '10'
          }]" :fields="tableFields">
          </b-table>
        </section>
      </div>
      <h1 v-else>Loading...</h1>
    </div>

  </div>
</template>

<script>
import api from "@/api";
export default {
  data() {
    return {
      user: null,
      capital: null,
      form: null,
      tableFields: [
        "cumul_des_versements_bruts",
        "rachats_bruts",
        "solde_brut_des_investissements",
        "plus_ou_moins_values_depuis_adhésion",
        "performance_depuis_adhésion",
        "épargne_atteinte",
        "date"
      ]
    };
  },
  created() {
    api
      .getUser()
      .then(user => (this.user = user))
      .catch(err => {
        this.error = err;
      });
    api
      .getForm()
      .then(form => (this.form = form))
      .catch(err => {
        this.error = err;
      });
    api
      .getCapital()
      .then(capital => (this.capital = capital))
      .catch(err => {
        this.error = err;
      });
  }
};
</script>

<style scoped>
#navig {
  background-color: #074b78;
  padding: 10px;
  color: white;
}

#nav-links {
  color: white;
}

#page {
  display: flex;
  min-height: calc(100vh - 70px);
}

#page-content {
  background-color: rgb(235, 235, 235);
  padding: 20px;
}

#recap {
  background-color: white;
  padding: 20px;
}

h5 {
  color: #206fb6;
}

#table {
  text-align: center;
}

.table>>>th {
  vertical-align: middle;
  background-color: #206fb6;
  color: white;
  font-weight: normal;
  padding: 2px;
  min-width: 50px;
}

.table>>>td {
  vertical-align: middle;
  color: #206fb6;
  font-weight: bold;
  min-width: 50px;
}
</style>