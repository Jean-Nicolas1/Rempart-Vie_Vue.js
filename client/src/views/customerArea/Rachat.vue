<template>
  <div id="page">
    <b-nav id="navig" vertical class="w-25">
      <div v-if="user">
        Bienvenue,
        <br> {{user.username}}
      </div>
      <div id="nav-links">
        <router-link to="/account">Tableau de bord</router-link>
      </div>
      <div id="nav-links">
        <router-link to="/account/versement">Versements</router-link>
      </div>
      <div id="nav-links">
        <router-link to="/account/rachat">Rachats partiels</router-link>
      </div>
      <div id="nav-links">
        <router-link to="/account/mes-operations">Mes opérations</router-link>
      </div>
    </b-nav>
    <div id="page-content">
      <div>
        <h3>Rachats partiels</h3>
        <div id="recap" class="row">
          <div class="action col-sm-6">
            <div v-if="user && capital && form" class="block">
              <h5>Rachat partiel</h5>
              <p class='desc'>Effectuer un rachat partiel sur ce contrat</p>
              <div class="btn-div">
                <b-button @click="edit" v-if="!isEditing" class="continue-btn">Effectuer un rachat partiel</b-button>
              </div>
            </div>
            <h5 v-else>Loading...</h5>
          </div>
        </div>

        <div v-if="isEditing" class="container">
          <b-form @submit.prevent="buyBack">
            <div class="card">
              <div class="card-header">
                {{section1.header}}
                <b-button @click="section1ButtonModify" v-if="!section1.isVisible" class="modify-btn">Modifier</b-button>
              </div>
              <div v-if="section1.isVisible" class="card-body">
                <div id="checkbox">
                  <b-form-checkbox v-model="section1.status" value="accepted" unchecked-value="not_accepted">
                    Avant de procéder à une opération sur mon contrat Rempart Vie, j’atteste avoir vérifié et mis à jour l’ensemble de mes données
                    personnelles fournies lors de l’adhésion
                  </b-form-checkbox>
                </div>

                <label id="label" for="capital-input">Montant du rachat partiel *</label>
                <div class="input-group">
                  <input id="capital-input" v-model="amount" type="text" class="form-control" aria-label="Amount (to the nearest euro)">
                  <div class="input-group-append">
                    <span class="input-group-text">€</span>
                    <span class="input-group-text">0.00</span>
                  </div>
                </div>

                <Choice :question="section1.partA.question" :options="section1.partA.options" :selected.sync="section1.partA.selected" :disclaimer="section1.partA.disclaimer"></Choice>

                <div class="btn-div">
                  <b-button type="submit" size="lg" class="next-btn" :disabled="section1.status==='not_accepted'">Valider</b-button>
                </div>
              </div>
            </div>




          </b-form>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Choice from "@/components/Choice";
import api from "@/api";
export default {
  components: { Choice },
  data() {
    return {
      user: null,
      capital: null,
      form: null,
      isEditing: false,
      amount: 0,
      section1: {
        isVisible: true,
        header: "Rachat partiel",
        status: "accepted",
        partA: {
          question: "Quel est la raison de votre rachat ?",
          disclaimer: "",
          selected: "",
          options: [
            { text: "J'ai besoin de cet argent pour gérer un imprévu", value: "radio1" },
            {
              text: "Je suis inquiet des performances du contrat",
              value: "radio2"
            },
            { text: "Je suis satisfait de mon investissement mais souhaite utiliser cette somme", value: "radio3" },
            { text: "Autre", value: "radio4" }
          ]
        }
      }
    };
  },
  methods: {
    edit() {
      this.isEditing = true;
    },
    buyBack() {
      const date = new Date();
      const twoDigits = function(myNumber) {
        return ("0" + myNumber).slice(-2);
      };
      const formattedDate = twoDigits(date.getDate()) + "/" + twoDigits(date.getMonth() + 1) + "/" + date.getFullYear();
      api
        .updateCapital({
          operation: {
            type: "Rachat partiel",
            amount: this.amount,
            date: formattedDate,
            status: "En cours de validation",
            validationStatus: this.section1.status,
            buyBackReason: this.section1.partA.options.filter(
              option => option.value === this.section1.partA.selected
            )[0].text
          }
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
      .then(form => (this.form = form))
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
}

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

#label {
  font-weight: bold;
  font-size: 20px;
}

.input-group {
  margin-bottom: 20px;
}
</style>