<template id="bla">
  <!-- <MDBListGroup horizontal>  -->
    <MDBListGroupItem>
      <MDBCard style="max-width: 100%">
         <!-- <MDBCardImg top :src="picture" class="img-fluid" alt="..." /> -->
        <img :src="picture" height="150" width="150" />
        <MDBCardBody>
          <MDBCardText>
            <router-link to="/articles/kucanskiAparati"
              >{{ name }}</router-link
            >
            <button
              class="btn btn-primary"
              v-if="isLoggedIn"
              @click="ukloniKategoriju"
            >
              Ukloni
            </button>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBListGroupItem>
  <!-- </MDBListGroup>  -->

</template>

<script>
import {
  //MDBListGroup,
  MDBListGroupItem,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  //MDBCardImg,
  mdbRipple,
} from "mdb-vue-ui-kit";

export default {
  props: ["id", "name", "picture"],
  components: {
   // MDBListGroup,
    MDBListGroupItem,
    MDBCard,
    MDBCardBody,
    MDBCardText,
   //MDBCardImg,
  },
  directives: {
    mdbRipple,
  },
  data() {
    return {
      //imageUrl: "https://mdbootstrap.com/img/new/standard/nature/182.jpg",
    };
  },
  methods: {
    ukloniKategoriju() {
      console.log("Ukloni kategoriju!");
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.getAdmin;
    },
  },
};
</script>

<style scoped>
.list-group-item {
  height: auto;
}

.btn.btn-primary {
  float: right;
}

#bla {
  width: 100%;
}
</style>