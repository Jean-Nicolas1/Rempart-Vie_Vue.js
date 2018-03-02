<template>
  <div>
    <b-form @submit.prevent="submit">
    <b-card :header="header" header-tag="header" :title="question">
      <!-- <div class="choices"> -->
      <b-form-radio-group id="btnradios2" buttons stacked button-variant="outline-primary" 
      size="lg" :checked="selected" @input="$emit('update:selected', $event)" :options="options" name="radioBtnOutline" />
      <!-- </div> -->
      <p class="card-text">{{disclaimer}}</p>

      <b-button type="submit" variant="primary">Continuer</b-button>
 
    </b-card>
    </b-form>
</div>
</template>

<script>
export default {
  props: ["header", "question", "disclaimer", "options", "selected"],
  methods: {
    submit() {
      this.$emit("submit");
    }
  }
};
</script>

<style>
.btn-group-toggle > .btn {
  white-space: normal;
  margin-bottom: 15px;
  height: 80px;
}
.card-header {
  font-weight: bold;
  text-transform: uppercase;
}
/* .choices {
  display: flex;
  flex-wrap: wrap;
} */
</style>

