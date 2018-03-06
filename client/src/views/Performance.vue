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
      <div>
        <column-chart :key="keyColumnChart" :stacked="true" :data="chartData"></column-chart>
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
    const rate = 0.05;
    const rateMonth = (1 + rate) ** (1 / 12) - 1;
    for (let i = 1; i <= parseInt(this.years.value); i++) {
      this.chartData[0].data[`Année ${i}`] = this.capInit.value + this.capMonth.value * 12 * i;
      this.chartData[1].data[`Année ${i}`] = this.chartData[0].data[`Année ${i}`] * rate;
    }
  },

  methods: {
    update() {
      const rate = 0.1;
      this.chartData[0].data = {};
      this.chartData[1].data = {};
      for (let i = 1; i <= parseInt(this.years.value); i++) {
        this.chartData[0].data[`Année ${i}`] = this.capInit.value + this.capMonth.value * 12 * i;
        // this.chartData[1].data[`Année ${i}`] = this.capMonth.value * (((1 + rateMonth) ** 13 - 1) / rateMonth - 1);
        this.chartData[1].data[`Année ${i}`] = this.chartData[0].data[`Année ${i}`] * rate;
      }
      this.keyColumnChart++;
    }
  },

  data() {
    return {
      keyColumnChart: 0,

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
          piecewiseActiveStyle: {
            backgroundColor: "#3498db"
          },
          labelActiveStyle: {
            color: "#3498db"
          }
        }
      },

      capInit: {
        value: 5000,
        options: {
          width: "70%",
          interval: 100,
          max: 500000,
          formatter: "{value} €",
          style: {
            marginLeft: "3%",
            marginRight: "3%"
          }
        }
      },

      capMonth: {
        value: 800,
        options: {
          width: "70%",
          interval: 10,
          max: 5000,
          formatter: "{value} €",
          style: {
            marginLeft: "3%",
            marginRight: "3%"
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
</style>

