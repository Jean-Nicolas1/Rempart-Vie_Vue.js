<template>
  <div>
    <section v-if="user">
      Hello {{user.username}}
    </section>
    <h1 v-else>Loading...</h1> 
  </div>
</template>

<script>
import api from "../api";
export default {
  data() {
    return {
      user: null
    };
  },
  created() {
    api
      .getUser()
      .then(user => (this.user = user))
      .catch(err => {
        this.error = err;
      });
  }
};
</script>

