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
          familySituation: this.options.filter(option => option.value === this.selected)[0].text
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => {
          this.error = err;
        });
    }
  },
  data() {
    return {
      header: "Situation familiale",
      question: "Votre situation familiale",
      disclaimer: "",
      selected: "",
      options: [
        { text: "Célibataire", value: "radio1" },
        {
          text: "Marié(e)",
          value: "radio2"
        },
        { text: "Pacsé(e)", value: "radio3" },
        { text: "Union libre", value: "radio4" },
        {
          text: "Divorsé(e)",
          value: "radio5"
        },
        {
          text: "Veuf(ve)",
          value: "radio6"
        }
      ]
    };
  }
};
</script>