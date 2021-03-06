<template>
  <div id="page">
    <LeftNav />
    <div id="page-content">
      <div>
        <h3>Tableau de bord</h3>
        <section id="recap">
          <div v-if="user && capital && form" class="block">
            <h5>Récapitulatif depuis adhésion</h5>
            <b-table id="table" striped hover :items="[{ 
            cumul_des_versements_bruts: cumulVersements(capital.operations) + ' €' , 
            rachats_bruts: cumulRachats(capital.operations) + ' €' ,
            solde_brut_des_investissements: cumul.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' €' ,
            plus_ou_moins_values_depuis_adhésion: (epargne-cumul).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') +' €',
            épargne_atteinte: epargne.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' €' ,
            date : date
            }]" :fields="tableFields">
            </b-table>
          </div>
          <div v-if="user && capital && form" class="block">
            <h5>Epargne atteinte vs montant cumulé des versements rachats</h5>
            <line-chart :data="chartData" :library="options"  legend="bottom" thousands=" " suffix=" €" :colors="['#206fb6','#27bd83']"/>
          </div>
          <h5 v-else>Loading...</h5>
        </section>
      </div>
    </div>

  </div>
</template>

<script>
import api from "@/api";
import LeftNav from "@/components/LeftNav";
export default {
  components: { LeftNav },
  data() {
    return {
      user: null,
      capital: null,
      form: null,
      perf: null,
      date: null,
      cumul: null,
      epargne: null,
      options: {
        scales: {
          xAxes: [
            {
              ticks: {
                fontSize: 14,
                fontColor: "black"
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                fontSize: 14,
                fontColor: "black"
              }
            }
          ]
        },
        legend: {
          labels: {
            // This more specific font property overrides the global property
            fontSize: 14,
            fontColor: "black"
          }
        }
      },
      tableFields: [
        "cumul_des_versements_bruts",
        "rachats_bruts",
        "solde_brut_des_investissements",
        "plus_ou_moins_values_depuis_adhésion",
        "épargne_atteinte",
        "date"
      ],
      chartData: [
        { name: "Epargne atteinte", data: {} },
        {
          name: "Cumul des versements/rachats",
          data: {}
        }
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
    soldeInvest() {
      return;
      this.cumul.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  },
  created() {
    const date = new Date();
    const twoDigits = function(myNumber) {
      return ("0" + myNumber).slice(-2);
    };
    const formattedDate = twoDigits(date.getDate()) + "/" + twoDigits(date.getMonth() + 1) + "/" + date.getFullYear();
    this.date = formattedDate;

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

    Promise.all([api.getPerf(), api.getCapital()])
      .then(values => {
        let perf = values[0];
        let capital = values[1];
        this.perf = perf;
        this.capital = capital;
        const adhesionDate = this.capital.operations[0].date;

        const monthNames = [
          "Janvier",
          "Février",
          "Mars",
          "Avril",
          "Mai",
          "Juin",
          "Juillet",
          "Août",
          "Septembre",
          "Octobre",
          "Novembre",
          "Décembre"
        ];
        const adhesionDateFormatted = new Date(
          adhesionDate.substring(6),
          adhesionDate.substring(3, 5) - 1,
          adhesionDate.substring(0, 2)
        );
        function monthDiff(d1, d2) {
          var months;
          months = (d2.getFullYear() - d1.getFullYear()) * 12;
          months -= d1.getMonth();
          months += d2.getMonth();
          return months <= 0 ? 0 : months;
        }
        const date = new Date();
        const monthSinceAdhesion = monthDiff(adhesionDateFormatted, date);

        // Cumul dataset creation
        let cumulDataSet = {};
        let cumul =
          this.capital.operations
            .filter(
              operation =>
                operation.type !== "Rachat partiel" &&
                operation.monthYearDate === this.capital.operations[0].monthYearDate
            )
            .reduce((a, b) => a + parseInt(b.amount), 0) -
          this.capital.operations
            .filter(
              operation =>
                operation.type === "Rachat partiel" &&
                operation.monthYearDate === this.capital.operations[0].monthYearDate
            )
            .reduce((a, b) => a + parseInt(b.amount), 0);
        cumulDataSet[this.capital.operations[0].monthYearDate] = cumul;
        for (let i = 1; i <= monthSinceAdhesion; i++) {
          cumulDataSet[
            `${monthNames[(adhesionDateFormatted.getMonth() + i) % 12]}_${adhesionDateFormatted.getFullYear() +
              Math.floor((adhesionDateFormatted.getMonth() + i) / 12)}`
          ] =
            cumul +
            this.capital.operations
              .filter(
                operation =>
                  operation.type !== "Rachat partiel" &&
                  operation.monthYearDate ===
                    `${monthNames[(adhesionDateFormatted.getMonth() + i) % 12]} ${adhesionDateFormatted.getFullYear() +
                      Math.floor((adhesionDateFormatted.getMonth() + i) / 12)}`
              )
              .reduce((a, b) => a + parseInt(b.amount), 0) -
            this.capital.operations
              .filter(
                operation =>
                  operation.type === "Rachat partiel" &&
                  operation.monthYearDate ===
                    `${monthNames[(adhesionDateFormatted.getMonth() + i) % 12]} ${adhesionDateFormatted.getFullYear() +
                      Math.floor((adhesionDateFormatted.getMonth() + i) / 12)}`
              )
              .reduce((a, b) => a + parseInt(b.amount), 0);

          cumul +=
            this.capital.operations
              .filter(
                operation =>
                  operation.type !== "Rachat partiel" &&
                  operation.monthYearDate ===
                    `${monthNames[(adhesionDateFormatted.getMonth() + i) % 12]} ${adhesionDateFormatted.getFullYear() +
                      Math.floor((adhesionDateFormatted.getMonth() + i) / 12)}`
              )
              .reduce((a, b) => a + parseInt(b.amount), 0) -
            this.capital.operations
              .filter(
                operation =>
                  operation.type === "Rachat partiel" &&
                  operation.monthYearDate ===
                    `${monthNames[(adhesionDateFormatted.getMonth() + i) % 12]} ${adhesionDateFormatted.getFullYear() +
                      Math.floor((adhesionDateFormatted.getMonth() + i) / 12)}`
              )
              .reduce((a, b) => a + parseInt(b.amount), 0);
        }
        this.chartData[1].data = cumulDataSet;
        this.cumul = cumul;

        // Epargne dataset creation
        let epargneDataSet = {};
        let epargne =
          // (1 + this.perf.filter(perf => perf.month === this.capital.operations[0].monthYearDate)[0].perf) *
          this.capital.operations
            .filter(
              operation =>
                operation.type !== "Rachat partiel" &&
                operation.monthYearDate === this.capital.operations[0].monthYearDate
            )
            .reduce((a, b) => a + parseInt(b.amount), 0) -
          this.capital.operations
            .filter(
              operation =>
                operation.type === "Rachat partiel" &&
                operation.monthYearDate === this.capital.operations[0].monthYearDate
            )
            .reduce((a, b) => a + parseInt(b.amount), 0);

        epargneDataSet[this.capital.operations[0].monthYearDate] = epargne;

        for (let i = 1; i <= monthSinceAdhesion; i++) {
          epargneDataSet[
            `${monthNames[(adhesionDateFormatted.getMonth() + i) % 12]}_${adhesionDateFormatted.getFullYear() +
              Math.floor((adhesionDateFormatted.getMonth() + i) / 12)}`
          ] =
            (1 +
              this.perf.filter(
                perf =>
                  perf.month ===
                  `${monthNames[(adhesionDateFormatted.getMonth() + i) % 12]} ${adhesionDateFormatted.getFullYear() +
                    Math.floor((adhesionDateFormatted.getMonth() + i) / 12)}`
              )[0].perf) *
            (epargne +
              this.capital.operations
                .filter(
                  operation =>
                    operation.type !== "Rachat partiel" &&
                    operation.monthYearDate ===
                      `${
                        monthNames[(adhesionDateFormatted.getMonth() + i) % 12]
                      } ${adhesionDateFormatted.getFullYear() +
                        Math.floor((adhesionDateFormatted.getMonth() + i) / 12)}`
                )
                .reduce((a, b) => a + parseInt(b.amount), 0) -
              this.capital.operations
                .filter(
                  operation =>
                    operation.type === "Rachat partiel" &&
                    operation.monthYearDate ===
                      `${
                        monthNames[(adhesionDateFormatted.getMonth() + i) % 12]
                      } ${adhesionDateFormatted.getFullYear() +
                        Math.floor((adhesionDateFormatted.getMonth() + i) / 12)}`
                )
                .reduce((a, b) => a + parseInt(b.amount), 0));
          epargne =
            (1 +
              this.perf.filter(
                perf =>
                  perf.month ===
                  `${monthNames[(adhesionDateFormatted.getMonth() + i) % 12]} ${adhesionDateFormatted.getFullYear() +
                    Math.floor((adhesionDateFormatted.getMonth() + i) / 12)}`
              )[0].perf) *
            (epargne +
              this.capital.operations
                .filter(
                  operation =>
                    operation.type !== "Rachat partiel" &&
                    operation.monthYearDate ===
                      `${
                        monthNames[(adhesionDateFormatted.getMonth() + i) % 12]
                      } ${adhesionDateFormatted.getFullYear() +
                        Math.floor((adhesionDateFormatted.getMonth() + i) / 12)}`
                )
                .reduce((a, b) => a + parseInt(b.amount), 0) -
              this.capital.operations
                .filter(
                  operation =>
                    operation.type === "Rachat partiel" &&
                    operation.monthYearDate ===
                      `${
                        monthNames[(adhesionDateFormatted.getMonth() + i) % 12]
                      } ${adhesionDateFormatted.getFullYear() +
                        Math.floor((adhesionDateFormatted.getMonth() + i) / 12)}`
                )
                .reduce((a, b) => a + parseInt(b.amount), 0));
        }
        this.chartData[0].data = epargneDataSet;
        this.epargne = epargne;
      })
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
#welcome {
  font-size: 20px;
  padding: 10px;
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
  padding: 5px;
  max-width: 50px;
}

.table>>>td {
  vertical-align: middle;
  color: #206fb6;
  font-weight: bold;
  max-width: 50px;
}

.table>>>td:nth-child(3) {
  color: #27bd83;
}
.table>>>td:nth-child(4) {
  color: #27bd83;
}
h5 {
  margin-bottom: 20px;
}
</style>