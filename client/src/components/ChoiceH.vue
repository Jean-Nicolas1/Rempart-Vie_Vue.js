<template>
  <div>
  <p class="question">{{question}}</p>
  
  <b-form-radio-group id="btnradios2" buttons button-variant="outline-primary" 
      size="lg" :checked="selected" @input="$emit('update:selected', $event)" :options="options" name="radioBtnOutline" />
  <p>{{disclaimer}}</p>
  </div>
</template>

<script>
export default {
  props: ["options", "question", "selected", "disclaimer"]
};
</script>

<style scoped>
#btnradios2>>>.btn {
  white-space: normal;
  margin-right: 15px;
  height: 80px;
  width: 100px;
}
#btnradios2 {
  width: 100%;
}

#btnradios2>>>label {
  display: flex;
  align-items: center;
  justify-content: center;
}
.question {
  font-weight: bold;
}
</style>