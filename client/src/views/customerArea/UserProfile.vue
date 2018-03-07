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
      <div id="nav-links">
        <router-link to="/account/rachat">Rachats partiels</router-link>
      </div>
      <div id="nav-links">
        <router-link to="/account/mes-operations">Mes opérations</router-link>
      </div>
    </b-nav>
    <div id="page-content">
      <div>
        <h3>Tableau de bord</h3>
        <section id="recap">
          <div v-if="user && capital && form" class="block">
            <h5>Récapitulatif depuis adhésion</h5>
            <b-table id="table" striped hover :items="[{ 
            cumul_des_versements_bruts: cumulVersements(capital.operations) + ' €' , 
            rachats_bruts: cumulRachats(capital.operations) + ' €' ,
            solde_brut_des_investissements: soldeInvest(capital.operations) + ' €' ,
            plus_ou_moins_values_depuis_adhésion:'10',
            performance_depuis_adhésion: '10',
            épargne_atteinte: '10',
            date : '10'
            }]" :fields="tableFields">
            </b-table>
          </div>
          <div v-if="user && capital && form" class="block">
            <h5>Graphique</h5>
            
          </div>
          <h5 v-else>Loading...</h5>
        </section>
      </div>
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
  methods: {
    cumulVersements(operations) {
      return operations
        .filter(operation => operation.type !== "Rachat partiel")
        .reduce((a, b) => a + parseInt(b.amount), 0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    cumulRachats(operations) {
      return operations
        .filter(operation => operation.type === "Rachat partiel")
        .reduce((a, b) => a + parseInt(b.amount), 0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    soldeInvest(operations) {
      return (
        operations
          .filter(operation => operation.type !== "Rachat partiel")
          .reduce((a, b) => a + parseInt(b.amount), 0) -
        operations.filter(operation => operation.type === "Rachat partiel").reduce((a, b) => a + parseInt(b.amount), 0)
      )
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
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
  width: 100%;
}

#recap {
  padding: 20px 0;
}
.block {
  padding: 20px;
  background-color: white;
  margin-bottom: 20px;
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