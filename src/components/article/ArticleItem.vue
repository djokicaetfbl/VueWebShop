<template>
 <!--  <the-header></the-header>    -->
  <div class="card">
    <img
      :src="imageUrl"
      class="card-img-top"
      alt="..."
      style="max-height: 300px"
    />
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <p class="card-text">2
          {{ describe }}
      </p>
      <h5 class="card-title" >Cijena: {{ price }}KM</h5>
      <!-- <a href="#!" class="btn btn-primary"><router-link to="/articles/kucanskiAparati/1">Detalji</router-link></a> -->
       <h3 id="h3"><router-link to="/articles/kucanskiAparati/1">Detalji</router-link></h3>
    </div>
  </div>
</template>

<script>
//import TheHeader from "../layout/TheHeader.vue";

export default {
 // components: { TheHeader },
  props: ["childrenKey","id", "category", "name", "price", "describe", "imageUrl", "active"],
};
</script>

<style scoped>

#h3 {
    float: right;
}

</style>