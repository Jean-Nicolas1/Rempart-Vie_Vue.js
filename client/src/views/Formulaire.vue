<template>
  <div class="home">
  <Card @submit="formUpdate" :header="header" :question="question" :disclaimer="disclaimer" :options="options" :selected.sync="selected"/>
  </div>
</template>

<script>
import Card from "../components/Card";
import api from "../api";

export default {
  components: { Card },
  methods: {
    formUpdate() {
      api
        .formUpdate({
          investmentObjective: this.selected
        })
        .then(() => {
          this.$router.push("/login");
        })
        .catch(err => {
          this.error = err;
        });
    }
  },
  data() {
    return {
      header: "Objectif d'investissement",
      question: "Quel est votre principal objectif d'investissement ?",
      disclaimer: "",
      selected: "",
      options: [
        { text: "Me constituer une épargne de précaution", value: "radio1" },
        {
          text:
            "Compléter mon revenu en vue d'un projet ou d'une dépense importante (achat immobilier, voyage, études des enfants...)",
          value: "radio2"
        },
        { text: "Préparer ma retraite", value: "radio3" },
        { text: "Transmettre mon patrimoine", value: "radio4" },
        {
          text:
            "Dynamiser mon épargne en espérant atteindre une forte plus-value (Un rendement élevé est susceptible d'entraîner un risque important)",
          value: "radio5"
        }
      ]
    };
  }
};
</script>