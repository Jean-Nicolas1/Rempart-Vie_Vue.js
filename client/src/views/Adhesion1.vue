<template>
  <div class="home">
    <b-form @submit.prevent="formUpdate">
    
      <div class="card">
        <div class="card-header">
          <p>{{section1.header}}</p>
          <b-button @click="section1ButtonModify" v-if="!section1.isVisible" class="modify-btn">Modifier</b-button>
        </div>
        <div v-if="section1.isVisible" class="card-body">
          <Choice :question="section1.question" :options="section1.options" :selected.sync="section1.selected" :disclaimer="section1.disclaimer" ></Choice>
          <b-button @click="section1ButtonContinue" class="continue-btn">Continuer</b-button>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <p>{{section2.header}}</p>
          <b-button @click="section2ButtonModify" v-if="!section2.isVisible" class="modify-btn">Modifier</b-button>
        </div>
        <div v-if="section2.isVisible" class="card-body">
          <Choice :question="section2.question" :options="section2.options" :selected.sync="section2.selected" :disclaimer="section2.disclaimer" ></Choice>
          <b-button @click="section2ButtonContinue" class="continue-btn">Continuer</b-button>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <p>{{section3.header}}</p>
          <b-button @click="section3ButtonModify" v-if="!section3.isVisible" class="modify-btn">Modifier</b-button>
        </div>
        <div v-if="section3.isVisible" class="card-body">
          <Choice :question="section3.question" :options="section3.options" :selected.sync="section3.selected" :disclaimer="section3.disclaimer" ></Choice>
          <!-- <b-button @click="section3ButtonContinue" class="continue-btn">Continuer</b-button> -->
        </div>
      </div>

      <b-button type="submit" size="lg" class="next-btn">Suivant</b-button>
    </b-form>
  

  </div>
</template>

<script>
import Choice from "../components/Choice";
import api from "../api";

export default {
  components: { Choice },
  methods: {
    section1ButtonModify() {
      this.section1.isVisible = true;
      this.section2.isVisible = false;
      this.section3.isVisible = false;
      window.scrollTo(0, 0);
    },
    section1ButtonContinue() {
      this.section1.isVisible = false;
      this.section2.isVisible = true;
      window.scrollTo(0, 0);
    },
    section2ButtonModify() {
      this.section1.isVisible = false;
      this.section2.isVisible = true;
      this.section3.isVisible = false;
      window.scrollTo(0, 0);
    },
    section2ButtonContinue() {
      this.section2.isVisible = false;
      this.section3.isVisible = true;
      window.scrollTo(0, 0);
    },
    section3ButtonModify() {
      this.section1.isVisible = false;
      this.section2.isVisible = false;
      this.section3.isVisible = true;
      window.scrollTo(0, 0);
    },
    formUpdate() {
      api
        .formUpdate({
          investmentObjective: this.section1.options.filter(option => option.value === this.section1.selected)[0].text,
          investmentHorizon: this.section2.options.filter(option => option.value === this.section2.selected)[0].text,
          gestionMode: this.section3.options.filter(option => option.value === this.section3.selected)[0].text
        })
        .then(() => {
          this.$router.push("/adhesion/informations-personnelles");
        })
        .catch(err => {
          this.error = err;
        });
    }
  },
  data() {
    return {
      section1: {
        isVisible: true,
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
      },

      section2: {
        isVisible: false,
        header: "Horizon d'investissement",
        question: "Quel est l'horizon d'investissement de l'épargne de votre contrat d'assurance-vie ?",
        disclaimer: "",
        selected: "",
        options: [
          { text: "Moins de 3ans", value: "radio1" },
          {
            text: "Entre 3 et 5 ans",
            value: "radio2"
          },
          { text: "Entre 5 et 8 ans", value: "radio3" },
          { text: "Plus de 8 ans", value: "radio4" }
        ]
      },

      section3: {
        isVisible: false,
        header: "Mode de gestion",
        question: "Préférez-vous :",
        disclaimer: "",
        selected: "",
        options: [
          { text: "Piloter vous-même votre investissement au quotidien", value: "radio1" },
          {
            text:
              "Bénéficier de la gestion profilée à travers des supports en unités de compte gérés par l'équipe d'experts de l'investissement de BDL Capital Management.",
            value: "radio2"
          }
        ]
      }
    };
  }
};
</script>

<style>
.card {
  margin-bottom: 20px;
  margin-top: 20px;
}
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  text-transform: uppercase;
  background-color: #206fb6;
  color: white;
}
.continue-btn {
  background-color: #206fb6;
  color: white;
}
.modify-btn {
  background-color: white;
  color: #206fb6;
}
.next-btn {
  background-color: #206fb6;
  color: white;
  margin-bottom: 20px;
}
</style>