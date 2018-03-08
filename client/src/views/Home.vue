<template>
  <div class="page container">
    <div id="section1" class="row">
      <div id="text" class="col-lg-8 col-md-6">
        <h2>Confiez vos économies à une équipe de spécialistes en toute simplicité</h2>
        <h3>
          <strong>Rempart Vue</strong>, c'est un produit... Simple non?</h3>
        <router-link v-if="user" to="/signup">
          <b-button size="lg" class="blue-btn">Adhérer au contrat</b-button>
        </router-link>
        <router-link v-else to="/account">
          <b-button size="lg" class="blue-btn">Adhérer au contrat</b-button>
        </router-link>
      </div>

      <div id="img" class="col-lg-4 col-md-6">
        <img src="@/assets/team.png" alt="Illustration Rempart Vie" class="float-right">
      </div>
      </div>
      <div id="section2" class="row">
        <div id="img" class="col-lg-4 col-md-6">
          <img style="width:106%" src="@/assets/analytics.png" alt="Illustration Rempart Vie" class="float-right">
        </div>

        <div id="text" class="col-lg-8 col-md-6">
          <h2><strong>Rempart Vue</strong>, c'est un contrat d'assurance vie 100% en ligne qui bénéficie de nombreux avantages fiscaux</h2>
          <h3>
            Un rendement de
            <strong>5,19%</strong> annualisé sur 5 ans</h3>
          <router-link to="/performance">
            <b-button size="lg" class="green-btn">Simuler la performance</b-button>
          </router-link>
        </div>
      </div>
    </div>

</template>

<script>
export default {};
</script>

<style scoped>
.page {
  font-family: "Oxygen", sans-serif;
  font-size: 16px;
  margin-bottom: 50px;
}

#section1 {
  color: #206fb6;
  margin-top: 10px;
}
#section2 {
  color: #27bd83;
}

#text {
  text-align: center;
  padding: 2%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#img {
  padding: 0;
}

#section1>>>img {
  width: 100%;
  height: 100%;
}

#button {
  padding: 10px;
  align-self: center;
  font-size: 16px;
}

#section1>>>h1,
h2,
a {
  margin-bottom: 20px;
}

.blue-btn {
  background-color: #206fb6;
  color: white;
  border-radius: 20px;
  border-color: #206fb6;
  font-weight: bold;
  margin-top: 20px;
}

.green-btn {
  background-color: #27bd83;
  color: white;
  border-radius: 20px;
  border-color: #27bd83;
  font-weight: bold;
  margin-top: 20px;
}
</style>


