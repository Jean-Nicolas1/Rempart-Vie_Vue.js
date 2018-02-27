<template>
    <div id="perf">
      <div id="years" class="slider">
        <p class="label">Durée de l'épargne</p>
        <vue-slider v-model="years.value" v-bind="years.options" class="vue-slider"></vue-slider>
        <p class="result">{{ years.value }}</p>
      </div>
      <div id="cap-init" class="slider">
        <p class="label">Capitalisation initiale</p>
        <vue-slider v-model="capInit.value" v-bind="capInit.options" class="vue-slider"></vue-slider>
        <p class="result">{{ capInit.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }} €</p>
      </div>
      <div id="cap-month" class="slider">
        <p class="label">Epargne mensuelle</p>
        <vue-slider v-model="capMonth.value" v-bind="capMonth.options" class="vue-slider"></vue-slider>
        <p class="result">{{ capMonth.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }} €</p>
      </div>
      <div>
        <column-chart :stacked="true" :data="chartData"></column-chart>
      </div>
  </div>
  
</template>

<script>
import vueSlider from "vue-slider-component";

export default {
  components: {
    vueSlider
  },
  data() {
    return {
      chartData: [
        {
          name: "Versements cumulés",
          data: { "Année 1": 1000, "Année 2": 1000, "Année 3": 1000, "Année 4": 1000, "Année 5": 1000 }
        },
        {
          name: "Intérêts cumulés",
          data: { "Année 1": 100, "Année 2": 210, "Année 3": 331, "Année 4": 464, "Année 5": 610 }
        }
      ],

      years: {
        value: "5 ans",
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
        value: 1000,
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
        value: 0,
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

