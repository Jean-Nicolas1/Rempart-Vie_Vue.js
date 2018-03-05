<template>
  <div>
  <p>{{question}}</p>
  
  <b-form-radio-group id="btnradios2" buttons stacked button-variant="outline-primary" 
      size="" :checked="selected" @input="$emit('update:selected', $event)" :options="options" name="radioBtnOutline" />
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
  margin-bottom: 15px;
  height: 80px;
}
#btnradios2 {
  width: 100%;
}

#btnradios2>>>label {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>