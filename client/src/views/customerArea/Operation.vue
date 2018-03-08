<template>
  <div id="page">
    <LeftNav />
    <div id="page-content">
      <div>
        <h3>Mes opérations</h3>
        <div v-if="user && capital && form" id="recap">
          <section class="block">
            <h5>Toutes mes opérations</h5>
            <b-table id="table" striped hover :items="listOperations(capital.operations)" :fields="tableFields">
            </b-table>
          </section>

        </div>
        <h5 v-else>Loading...</h5>
      </div>
    </div>

  </div>
</template>

<script>
//
import api from "@/api";
import LeftNav from "@/components/LeftNav";
export default {
  components: { LeftNav },
  data() {
    return {
      user: null,
      capital: null,
      form: null,
      tableFields: ["date", "operations", "statut", "montant"],
      tableItems: []
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
    },
    listOperations(operations) {
      const table = [];
      operations.forEach(el =>
        table.push({
          date: el.date,
          operations: el.type,
          statut: el.status,
          montant: el.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " €"
        })
      );
      return table;
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

h5 {
  color: #206fb6;
}

#table {
  text-align: center;
}

.block {
  padding: 20px;
  background-color: white;
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
  color: black;
  min-width: 50px;
}
.table>>>td:nth-child(4) {
  font-weight: bold;
}
</style>