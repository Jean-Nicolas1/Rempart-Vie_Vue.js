<template>
  <div class="container">
    <div id="perf">
      <div id="years" class="slider">
        <p class="label">Durée de l'épargne</p>
        <vue-slider @callback="update" v-model="years.value" v-bind="years.options" class="vue-slider"></vue-slider>
        <p class="result">{{ years.value }}</p>
      </div>
      <div id="cap-init" class="slider">
        <p class="label">Capitalisation initiale</p>
        <vue-slider @callback="update" v-model="capInit.value" v-bind="capInit.options" class="vue-slider"></vue-slider>
        <p class="result">{{ capInit.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }} €</p>
      </div>
      <div id="cap-month" class="slider">
        <p class="label">Epargne mensuelle</p>
        <vue-slider @callback="update" v-model="capMonth.value" v-bind="capMonth.options" class="vue-slider"></vue-slider>
        <p class="result">{{ capMonth.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }} €</p>
      </div>
      <div id="summary">
        <div class="info">
          Versements cumulés au terme <br>
          <span class="figure">
        {{cumulDeposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}} €
          </span>
        </div>
        <div class="info info-green">
          Intérêts cumulés au terme <br>
          <span class="figure">
        {{cumulInterest.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}} €
          </span>
        </div>
        <div class="info info-blue">
          Capital final <br>
          <span class="figure">
        {{finalCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}} €
          </span>
        </div>
        </div>
      <div>
        <column-chart :key="keyColumnChart" :stacked="true" :data="chartData" :library="options" legend="bottom" thousands=" " suffix=" €"
          :colors="['#206fb6','#27bd83']"></column-chart>
      </div>
    </div>

  </div>

</template>

<script>
import vueSlider from "vue-slider-component";

export default {
  components: {
    vueSlider
  },

  created() {
    const rate = 0.0519;
    const rateMonth = (1 + rate) ** (1 / 12) - 1;
    let depositArray = [];
    for (let i = 1; i <= 12; i++) {
      depositArray.push(this.capInit.value + this.capMonth.value * i);
    }
    this.chartData[0].data[`Année 1`] = depositArray[depositArray.length - 1];
    let interestArray = [];
    for (let i = 1; i <= 12; i++) {
      interestArray.push((this.capInit.value + this.capMonth.value * i) * rateMonth);
    }
    // this.chartData[1].data[`Année 1`] = this.chartData[0].data[`Année 1`] * rate;
    this.chartData[1].data[`Année 1`] = interestArray.reduce((a, b) => a + b);
    for (let i = 2; i <= parseInt(this.years.value); i++) {
      // this.chartData[0].data[`Année ${i}`] = this.capInit.value + this.capMonth.value * 12 * i;
      for (let j = 1; j <= 12; j++) {
        depositArray.push(this.chartData[0].data[`Année ${i - 1}`] + this.capMonth.value * j);
      }
      this.chartData[0].data[`Année ${i}`] = depositArray[depositArray.length - 1];
      for (let j = 1; j <= 12; j++) {
        interestArray.push(
          (this.chartData[0].data[`Année ${i - 1}`] +
            this.chartData[1].data[`Année ${i - 1}`] +
            this.capMonth.value * j) *
            rateMonth
        );
      }
      this.chartData[1].data[`Année ${i}`] =
        // (this.chartData[0].data[`Année ${i}`] + this.chartData[1].data[`Année ${i - 1}`]) * rate;
        this.chartData[1].data[`Année ${i}`] = interestArray.reduce((a, b) => a + b);
      this.cumulDeposit = depositArray[depositArray.length - 1];
      this.cumulInterest = interestArray.reduce((a, b) => a + b);
      this.finalCapital = depositArray[depositArray.length - 1] + interestArray.reduce((a, b) => a + b);
    }
  },

  methods: {
    update() {
      const rate = 0.0519;
      const rateMonth = (1 + rate) ** (1 / 12) - 1;
      this.chartData[0].data = {};
      this.chartData[1].data = {};
      let depositArray = [];
      for (let i = 1; i <= 12; i++) {
        depositArray.push(this.capInit.value + this.capMonth.value * i);
      }
      this.chartData[0].data[`Année 1`] = depositArray[depositArray.length - 1];
      let interestArray = [];
      for (let i = 1; i <= 12; i++) {
        interestArray.push((this.capInit.value + this.capMonth.value * i) * rateMonth);
      }
      // this.chartData[1].data[`Année 1`] = this.chartData[0].data[`Année 1`] * rate;
      this.chartData[1].data[`Année 1`] = interestArray.reduce((a, b) => a + b);
      for (let i = 2; i <= parseInt(this.years.value); i++) {
        // this.chartData[0].data[`Année ${i}`] = this.capInit.value + this.capMonth.value * 12 * i;
        for (let j = 1; j <= 12; j++) {
          depositArray.push(this.chartData[0].data[`Année ${i - 1}`] + this.capMonth.value * j);
        }
        this.chartData[0].data[`Année ${i}`] = depositArray[depositArray.length - 1];
        for (let j = 1; j <= 12; j++) {
          interestArray.push(
            (this.chartData[0].data[`Année ${i - 1}`] +
              this.chartData[1].data[`Année ${i - 1}`] +
              this.capMonth.value * j) *
              rateMonth
          );
        }
        this.chartData[1].data[`Année ${i}`] =
          // (this.chartData[0].data[`Année ${i}`] + this.chartData[1].data[`Année ${i - 1}`]) * rate;
          this.chartData[1].data[`Année ${i}`] = interestArray.reduce((a, b) => a + b);
      }
      this.cumulDeposit = depositArray[depositArray.length - 1];
      this.cumulInterest = interestArray.reduce((a, b) => a + b);
      this.finalCapital = depositArray[depositArray.length - 1] + interestArray.reduce((a, b) => a + b);
      // console.log(depositArray[depositArray.length - 1], interestArray.reduce((a, b) => a + b));
    }
  },

  data() {
    return {
      cumulDeposit: 0,
      cumulInterest: 0,
      finalCapital: 0,
      keyColumnChart: 0,
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
      chartData: [
        {
          name: "Versements cumulés",
          data: {}
        },
        {
          name: "Intérêts cumulés",
          data: {}
        }
      ],

      years: {
        value: "4 ans",
        options: {
          width: "70%",
          tooltip: "always",
          disabled: false,
          piecewise: true,
          piecewiseLabel: false,
          tooltipStyle: {
            backgroundColor: "#206fb6",
            borderColor: "#206fb6"
          },
          style: {
            marginLeft: "3%",
            marginRight: "3%"
          },
          data: ["1 an", "2 ans", "3 ans", "4 ans", "5 ans", "6 ans", "7 ans", "8 ans"],
          piecewiseStyle: {
            backgroundColor: "#ccc",
            visibility: "visible",
            width: "12px",
            height: "12px"
          },
          processStyle: {
            backgroundColor: "#206fb6"
          },
          piecewiseActiveStyle: {
            backgroundColor: "#206fb6"
          },
          labelActiveStyle: {
            color: "#206fb6"
          }
        }
      },

      capInit: {
        value: 5000,
        options: {
          width: "70%",
          interval: 1000,
          max: 100000,
          formatter: `{value} €`,
          style: {
            marginLeft: "3%",
            marginRight: "3%"
          },
          tooltipStyle: {
            backgroundColor: "#206fb6",
            borderColor: "#206fb6"
          },
          processStyle: {
            backgroundColor: "#206fb6"
          },
          piecewiseActiveStyle: {
            backgroundColor: "#206fb6"
          },
          labelActiveStyle: {
            color: "#206fb6"
          }
        }
      },

      capMonth: {
        value: 800,
        options: {
          width: "70%",
          interval: 100,
          max: 5000,
          formatter: "{value} €",
          style: {
            marginLeft: "3%",
            marginRight: "3%"
          },
          tooltipStyle: {
            backgroundColor: "#206fb6",
            borderColor: "#206fb6"
          },
          processStyle: {
            backgroundColor: "#206fb6"
          },
          piecewiseActiveStyle: {
            backgroundColor: "#206fb6"
          },
          labelActiveStyle: {
            color: "#206fb6"
          }
        }
      }
    };
  }
};
</script>

<style>
#perf {
  margin-top: 50px;
}

.slider {
  display: flex;
  margin-bottom: 20px;
}

p {
  margin-top: 7px;
}

.vue-slider {
  margin-top: 5px;
}

.result {
  font-weight: bold;
  font-size: 20px;
  color: #206fb6;
}

.label {
  font-weight: bold;
}

#summary {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.info {
  text-align: center;
  background-color: #206fb6;
  color: white;
  padding: 10px;
  border-radius: 10px;
  font-size: 20px;
  width: 28%;
  vertical-align: middle;
}
.info-green {
  background-color: #27bd83;
}
.info-blue {
  background-color: #074b78;
}
#cap-month {
  margin-bottom: 0;
}
.figure {
  font-weight: bold;
  font-size: 25px;
}
</style>

