<template>
  <div class="container">
    <b-form @submit.prevent="updateCapital" >
      <div class="card">
        <div class="card-header">
          {{section1.header}}
          <b-button @click="section1ButtonModify" v-if="!section1.isVisible" class="modify-btn">Modifier</b-button>
        </div>
        <div v-if="section1.isVisible" class="card-body">
          <Choice :question="section1.partA.question" :options="section1.partA.options" :selected.sync="section1.partA.selected" :disclaimer="section1.partA.disclaimer" ></Choice>
          
          <label id="label" for="capital-input">Montant du premier versement libre *</label>
          <div class="input-group">
            <input id="capital-input" v-model="amount" type="text" class="form-control" aria-label="Amount (to the nearest euro)">
            <div class="input-group-append">
              <span class="input-group-text">€</span>
              <span class="input-group-text">0.00</span>
            </div>
          </div>
            
            <div id="checkbox">
              <b-form-checkbox v-model="section1.status" value="accepted" unchecked-value="not_accepted">
                 J'affirme que ce compte est bien à mon nom et situé en France, il s'agit du compte bancaire servant au virement
                (ou au prélèvement selon l'option choisie lors d'un versement libre)
              </b-form-checkbox>
            </div>
        </div>
      </div>

      <div id="navig">
        <b-button size="lg" class="previous-btn">
          <router-link to="/adhesion/informations-personnelles">Précédent</router-link>
        </b-button>
        
        <b-button type="submit" size="lg" class="next-btn" :disabled="section1.status==='not_accepted'">Suivant</b-button>
      </div>



    </b-form>
  </div>
</template>


<script>
import Choice from "@/components/Choice";
import api from "@/api";
export default {
  components: { Choice },
  methods: {
    updateCapital() {
      api
        .updateCapital({
          durationType: this.section1.partA.options.filter(option => option.value === this.section1.partA.selected)[0]
            .text,
          investedCapital: this.amount,
          validationStatus: this.section1.status,
          operations: [{ type: "Versement", amount: this.amount }]
        })
        .then(() => {
          this.$router.push("/account");
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
        header: "Adhésion et validation",
        status: "accepted",
        partA: {
          question: "Sélectionner le type de durée",
          disclaimer: "",
          selected: "",
          options: [{ text: "Durée viagère", value: "radio1" }, { text: "Durée déterminée", value: "radio2" }]
        }
      },
      amount: 0
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
#label {
  font-weight: bold;
  font-size: 20px;
}
.input-group {
  margin-bottom: 20px;
}
</style>