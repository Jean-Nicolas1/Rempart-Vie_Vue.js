<template>
  <div class="home">
    <b-form @submit.prevent="formUpdate">
      
      <div class="card">
        <div class="card-header">
          {{section1.header}}
          <b-button @click="section1ButtonModify" v-if="!section1.isVisible" class="modify-btn">Modifier</b-button>
        </div>
        <div v-if="section1.isVisible" class="card-body">
          <Choice :question="section1.partA.question" :options="section1.partA.options" :selected.sync="section1.partA.selected" :disclaimer="section1.partA.disclaimer" ></Choice>
          <Choice :question="section1.partB.question" :options="section1.partB.options" :selected.sync="section1.partB.selected" :disclaimer="section1.partB.disclaimer" ></Choice>
          <Choice :question="section1.partC.question" :options="section1.partC.options" :selected.sync="section1.partC.selected" :disclaimer="section1.partC.disclaimer" ></Choice>
          <Choice :question="section1.partD.question" :options="section1.partD.options" :selected.sync="section1.partD.selected" :disclaimer="section1.partD.disclaimer" ></Choice>
            <div id="checkbox">
              <b-form-checkbox v-model="section1.status" value="accepted" unchecked-value="not_accepted">
                 Je certifie que je ne suis pas résident fiscal d’un autre pays que la France et les éléments communiqués dans le 
                 présent formulaire sont exacts et conformes à la réalité.
              </b-form-checkbox>

            </div>
          <b-button @click="section1ButtonContinue" :disabled="section1.status==='not_accepted'" class="continue-btn">Continuer</b-button>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          {{section2.header}}
          <b-button @click="section2ButtonModify" v-if="!section2.isVisible" class="modify-btn">Modifier</b-button>
        </div>
        <div v-if="section2.isVisible" class="card-body">
          <Choice :question="section2.question" :options="section2.options" :selected.sync="section2.selected" :disclaimer="section2.disclaimer" ></Choice>
          <b-button @click="section2ButtonContinue" class="continue-btn">Continuer</b-button>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          {{section3.header}}
          <b-button @click="section3ButtonModify" v-if="!section3.isVisible" class="modify-btn">Modifier</b-button>
        </div>
        <div v-if="section3.isVisible" class="card-body">
          <Choice :question="section3.question" :options="section3.options" :selected.sync="section3.selected" :disclaimer="section3.disclaimer" ></Choice>
          <!-- <b-button @click="section3ButtonContinue" class="continue-btn">Continuer</b-button> -->
        </div>
      </div>
      <div id="navig">
      <b-button size="lg" class="previous-btn">
        <router-link to="/adhesion/profil-investisseur">Précédent</router-link>
        
        </b-button>
      <b-button type="submit" size="lg" class="next-btn">Suivant</b-button>

      </div>

    </b-form>
  
  
  
  <!-- <Card @submit="formUpdate" :header="header" :question="question" :disclaimer="disclaimer" :options="options" :selected.sync="selected"/> -->
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
          fiscalResidenceA: this.section1.partA.options.filter(
            option => option.value === this.section1.partA.selected
          )[0].text,
          fiscalResidenceB: this.section1.partB.options.filter(
            option => option.value === this.section1.partB.selected
          )[0].text,
          fiscalResidenceC: this.section1.partC.options.filter(
            option => option.value === this.section1.partC.selected
          )[0].text,
          fiscalResidenceD: this.section1.partD.options.filter(
            option => option.value === this.section1.partD.selected
          )[0].text,
          fiscalResidenceStatus: this.section1.status,
          salary: this.section2.options.filter(option => option.value === this.section2.selected)[0].text,
          familySituation: this.section3.options.filter(option => option.value === this.section3.selected)[0].text
        })
        .then(() => {
          this.$router.push("/adhesion/validation");
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

      section3: {
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
            text: "Divorsé(e)",
            value: "radio5"
          },
          {
            text: "Veuf(ve)",
            value: "radio6"
          }
        ]
      },

      section2: {
        isVisible: false,
        header: "Salaire",
        question: "Votre salaire",
        disclaimer: "",
        selected: "",
        options: [
          { text: "1000 €", value: "radio1" },
          {
            text: "2000 €",
            value: "radio2"
          },
          { text: "3000 €", value: "radio3" },
          { text: "4000 €", value: "radio4" },
          {
            text: "5000 €",
            value: "radio5"
          },
          {
            text: "6000 €",
            value: "radio6"
          }
        ]
      }
    };
  }
};
</script>

<style scoped>
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
#checkbox {
  margin-bottom: 20px;
}
.next-btn {
  background-color: #206fb6;
  color: white;
  margin-bottom: 20px;
}
.previous-btn {
  background-color: white;
  color: #206fb6;
  margin-bottom: 20px;
}
#navig {
  display: flex;
  justify-content: space-between;
}
</style>