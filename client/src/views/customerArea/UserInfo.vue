<template>
  <div id="page">
    <LeftNav />
    <div id="page-content">
      <div>
        <b-form @submit.prevent="updateForm">
          <div class="btn-div container">
            <h3>Mon profil</h3>
            <b-button type="submit" size="lg" class="next-btn">Enregistrer</b-button>
          </div>
          <div class="container">

          <div class="card">
            <div class="card-header">
              {{section7.header}}
              <b-button @click="section7ButtonModify" v-if="!section7.isVisible" class="modify-btn">Modifier</b-button>
            </div>
            <div v-if="section7.isVisible" class="card-body">
              <b-container fluid>
                <div class="input-block">
                  <label for="birthdate">Date de naissance :</label>
                  <b-form-input v-model="section7.birthdate" type="date" placeholder="Date de naissance"></b-form-input>
                </div>
                <div class="input-block">
                  <label for="address">Adresse :</label>
                  <div class="inline">
                    <b-form-input v-model="section7.address" type="text" placeholder="23, rue de Berri"></b-form-input>
                    <b-form-input v-model="section7.zipcode" type="number" placeholder="75008"></b-form-input>
                  </div>
                  <b-form-input class="country-input" v-model="section7.country" type="text" placeholder="France"></b-form-input>
                </div>
                <div class="input-block">
                  <label for="tel">Téléphone :</label>
                  <b-form-input v-model="section7.tel" type="tel" placeholder="06 11 22 33 44"></b-form-input>
                </div>
                <b-button @click="section7ButtonContinue" class="continue-btn">Continuer</b-button>
              </b-container>
            </div>
          </div>

            <div class="card">
              <div class="card-header">
                {{section1.header}}
                <b-button @click="section1ButtonModify" v-if="!section1.isVisible" class="modify-btn">Modifier</b-button>
              </div>
              <div v-if="section1.isVisible" class="card-body">
                <Choice :question="section1.question" :options="section1.options" :selected.sync="section1.selected" :disclaimer="section1.disclaimer"></Choice>
                <b-button @click="section1ButtonContinue" class="continue-btn">Continuer</b-button>
              </div>
            </div>

            <div class="card">
              <div class="card-header">
                {{section2.header}}
                <b-button @click="section2ButtonModify" v-if="!section2.isVisible" class="modify-btn">Modifier</b-button>
              </div>
              <div v-if="section2.isVisible" class="card-body">
                <Choice :question="section2.question" :options="section2.options" :selected.sync="section2.selected" :disclaimer="section2.disclaimer"></Choice>
                <b-button @click="section2ButtonContinue" class="continue-btn">Continuer</b-button>
              </div>
            </div>

            <div class="card">
              <div class="card-header">
                {{section3.header}}
                <b-button @click="section3ButtonModify" v-if="!section3.isVisible" class="modify-btn">Modifier</b-button>
              </div>
              <div v-if="section3.isVisible" class="card-body">
                <Choice :question="section3.question" :options="section3.options" :selected.sync="section3.selected" :disclaimer="section3.disclaimer"></Choice>
                <b-button @click="section3ButtonContinue" class="continue-btn">Continuer</b-button>
              </div>
            </div>

            <div class="card">
              <div class="card-header">
                {{section4.header}}
                <b-button @click="section4ButtonModify" v-if="!section4.isVisible" class="modify-btn">Modifier</b-button>
              </div>
              <div v-if="section4.isVisible" class="card-body">
                <ChoiceH :question="section4.partA.question" :options="section4.partA.options" :selected.sync="section4.partA.selected" :disclaimer="section4.partA.disclaimer"></ChoiceH>
                <ChoiceH :question="section4.partB.question" :options="section4.partB.options" :selected.sync="section4.partB.selected" :disclaimer="section4.partB.disclaimer"></ChoiceH>
                <ChoiceH :question="section4.partC.question" :options="section4.partC.options" :selected.sync="section4.partC.selected" :disclaimer="section4.partC.disclaimer"></ChoiceH>
                <ChoiceH :question="section4.partD.question" :options="section4.partD.options" :selected.sync="section4.partD.selected" :disclaimer="section4.partD.disclaimer"></ChoiceH>
                <div id="checkbox">
                  <b-form-checkbox v-model="section4.status" value="accepted" unchecked-value="not_accepted">
                    Je certifie que je ne suis pas résident fiscal d’un autre pays que la France et les éléments communiqués dans le présent
                    formulaire sont exacts et conformes à la réalité.
                  </b-form-checkbox>

                </div>
                <b-button @click="section4ButtonContinue" :disabled="section4.status==='not_accepted'" class="continue-btn">Continuer</b-button>
              </div>
            </div>

            <div class="card">
              <div class="card-header">
                {{section5.header}}
                <b-button @click="section5ButtonModify" v-if="!section5.isVisible" class="modify-btn">Modifier</b-button>
              </div>
              <div v-if="section5.isVisible" class="card-body">
                <Choice :question="section5.question" :options="section5.options" :selected.sync="section5.selected" :disclaimer="section5.disclaimer"></Choice>
                <b-button @click="section5ButtonContinue" class="continue-btn">Continuer</b-button>
              </div>
            </div>

            <div class="card">
              <div class="card-header">
                {{section6.header}}
                <b-button @click="section6ButtonModify" v-if="!section6.isVisible" class="modify-btn">Modifier</b-button>
              </div>
              <div v-if="section6.isVisible" class="card-body">
                <Choice :question="section6.question" :options="section6.options" :selected.sync="section6.selected" :disclaimer="section6.disclaimer"></Choice>
                <b-button @click="section6ButtonContinue" class="continue-btn">Continuer</b-button>
              </div>
            </div>

          </div>
        </b-form>
      </div>

    </div>

  </div>
</template>

<script>
import Choice from "@/components/Choice";
import ChoiceH from "@/components/ChoiceH";
import LeftNav from "@/components/LeftNav";
import api from "@/api";
export default {
  components: { Choice, ChoiceH, LeftNav },
  data() {
    return {
      section1: {
        isVisible: false,
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
          { text: "Moins de 3 ans", value: "radio1" },
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
      },

      section4: {
        isVisible: false,
        header: "Auto-certification de résidence fiscale",
        partA: {
          question: "Êtes-vous uniquement résident fiscal français ?",
          disclaimer: "",
          selected: "",
          options: [{ text: "Oui", value: "radio1" }, { text: "Non", value: "radio2" }]
        },
        partB: {
          question:
            "Etes-vous citoyen américain ou détenez-vous une carte verte (Green Card) en cours de validité ou un numéro d'immatriculation fiscal américain (TIN) ?",
          disclaimer: "",
          selected: "",
          options: [{ text: "Oui", value: "radio1" }, { text: "Non", value: "radio2" }]
        },
        partC: {
          question: "Avez-vous un lieu de résidence personnel, fiscal ou un numéro de téléphone aux Etats-Unis ?",
          disclaimer: "",
          selected: "",
          options: [{ text: "Oui", value: "radio1" }, { text: "Non", value: "radio2" }]
        },
        partD: {
          question:
            "Etes-vous lié à une personne américaine agissant comme votre représentant, votre conseiller en investissement ou patrimonial, votre mandataire ou qui aurait procuration sur vos comptes ?",
          disclaimer: "",
          selected: "",
          options: [{ text: "Oui", value: "radio1" }, { text: "Non", value: "radio2" }]
        },
        status: "accepted"
      },

      section5: {
        isVisible: false,
        header: "Vos revenus",
        question: "A combien s'élèvent vos revenus nets annuels ?",
        disclaimer: "",
        selected: "",
        options: [
          { text: "Moins de 25 000 €", value: "radio1" },
          {
            text: "25 000 à 50 000 €",
            value: "radio2"
          },
          { text: "50 000 à 75 000 €", value: "radio3" },
          { text: "75 000 à 100 000 €", value: "radio4" },
          {
            text: "100 000 à 300 000 €",
            value: "radio5"
          },
          {
            text: "Plus de 300 000 €",
            value: "radio6"
          }
        ]
      },

      section6: {
        isVisible: false,
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
            text: "Divorcé(e)",
            value: "radio5"
          },
          {
            text: "Veuf(ve)",
            value: "radio6"
          }
        ]
      },

      section7: {
        isVisible: false,
        header: "Informations personnelles",
        birthdate: null,
        address: "",
        zipcode: null,
        country: "",
        tel: null
      }
    };
  },
  methods: {
    section1ButtonModify() {
      this.section1.isVisible = true;
      window.scrollTo(0, 0);
    },
    section1ButtonContinue() {
      this.section1.isVisible = false;
      window.scrollTo(0, 0);
    },
    section2ButtonModify() {
      this.section2.isVisible = true;
      window.scrollTo(0, 0);
    },
    section2ButtonContinue() {
      this.section2.isVisible = false;
      window.scrollTo(0, 0);
    },
    section3ButtonModify() {
      this.section3.isVisible = true;
      window.scrollTo(0, 0);
    },
    section3ButtonContinue() {
      this.section3.isVisible = false;
      window.scrollTo(0, 0);
    },
    section4ButtonModify() {
      this.section4.isVisible = true;
      window.scrollTo(0, 0);
    },
    section4ButtonContinue() {
      this.section4.isVisible = false;
      window.scrollTo(0, 0);
    },
    section5ButtonModify() {
      this.section5.isVisible = true;
      window.scrollTo(0, 0);
    },
    section5ButtonContinue() {
      this.section5.isVisible = false;
      window.scrollTo(0, 0);
    },
    section6ButtonModify() {
      this.section6.isVisible = true;
      window.scrollTo(0, 0);
    },
    section6ButtonContinue() {
      this.section6.isVisible = false;
      window.scrollTo(0, 0);
    },
    section7ButtonModify() {
      this.section7.isVisible = true;
      window.scrollTo(0, 0);
    },
    section7ButtonContinue() {
      this.section7.isVisible = false;
      window.scrollTo(0, 0);
    },
    updateForm() {
      api
        .updateForm({
          investmentObjective: this.section1.options.filter(option => option.value === this.section1.selected)[0].text,
          investmentHorizon: this.section2.options.filter(option => option.value === this.section2.selected)[0].text,
          gestionMode: this.section3.options.filter(option => option.value === this.section3.selected)[0].text,
          fiscalResidenceA: this.section4.partA.options.filter(
            option => option.value === this.section4.partA.selected
          )[0].text,
          fiscalResidenceB: this.section4.partB.options.filter(
            option => option.value === this.section4.partB.selected
          )[0].text,
          fiscalResidenceC: this.section4.partC.options.filter(
            option => option.value === this.section4.partC.selected
          )[0].text,
          fiscalResidenceD: this.section4.partD.options.filter(
            option => option.value === this.section4.partD.selected
          )[0].text,
          fiscalResidenceStatus: this.section4.status,
          salary: this.section5.options.filter(option => option.value === this.section5.selected)[0].text,
          familySituation: this.section6.options.filter(option => option.value === this.section6.selected)[0].text,
          birthdate: this.section7.birthdate,
          address: this.section7.address,
          zipcode: this.section7.zipcode,
          country: this.section7.country,
          tel: this.section7.tel
        })
        .then(() => {
          this.$router.push("/account");
        })
        .catch(err => {
          this.error = err;
        });
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
      .then(form => {
        this.section7.birthdate = form.birthdate.toString().substr(0, 10);
        this.section7.address = form.address;
        this.section7.zipcode = form.zipcode;
        this.section7.country = form.country;
        this.section7.tel = form.tel;
        this.section1.selected = this.section1.options.filter(
          option => option.text === form.investmentObjective
        )[0].value;
        this.section2.selected = this.section2.options.filter(
          option => option.text === form.investmentHorizon
        )[0].value;
        this.section3.selected = this.section3.options.filter(option => option.text === form.gestionMode)[0].value;
        this.section4.partA.selected = this.section4.partA.options.filter(
          option => option.text === form.fiscalResidenceA
        )[0].value;
        this.section4.partB.selected = this.section4.partB.options.filter(
          option => option.text === form.fiscalResidenceB
        )[0].value;
        this.section4.partC.selected = this.section4.partC.options.filter(
          option => option.text === form.fiscalResidenceC
        )[0].value;
        this.section4.partD.selected = this.section4.partD.options.filter(
          option => option.text === form.fiscalResidenceD
        )[0].value;
        this.section4.status = form.fiscalResidenceStatus;
        this.section5.selected = this.section5.options.filter(option => option.text === form.salary)[0].value;
        this.section6.selected = this.section6.options.filter(option => option.text === form.familySituation)[0].value;
      })
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

.action {
  padding: 10px;
  width: 50%;
}

.block {
  padding: 20px;
  background-color: white;
  height: 185px;
}

.desc {
  height: 55px;
}

h5 {
  color: #206fb6;
}

.continue-btn {
  background-color: #206fb6;
  color: white;
}

.btn-div {
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card {
  margin-bottom: 5px;
  margin-top: 5px;
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

.modify-btn {
  background-color: white;
  color: #206fb6;
}

#checkbox {
  margin-bottom: 20px;
}

.next-btn {
  background-color: #27bd83;
  color: white;
  border-color: #27bd83;
}

.previous-btn {
  background-color: white;
  color: #206fb6;
  margin-bottom: 20px;
}

#label {
  font-weight: bold;
  font-size: 20px;
}

.input-group {
  margin-bottom: 20px;
}

.inline {
  display: flex;
}

.input-block {
  margin-bottom: 20px;
}

.country-input {
  margin-top: 10px;
}

label {
  font-weight: bold;
}
</style>