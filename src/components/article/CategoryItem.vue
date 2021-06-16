<template id="bla">
  <MDBListGroup horizontal>
    <MDBListGroupItem>
      <MDBCard style="max-width: 100%">
        <MDBCardImg
          top
          src="https://mdbootstrap.com/img/new/standard/nature/182.jpg"
          class="img-fluid"
          alt="..."
        />
        <MDBCardBody>
          <MDBCardText>
            <router-link to="/articles/kucanskiAparati">Kucanski aparati</router-link>
            <button class="btn btn-primary" v-if="isLoggedIn" @click="ukloniKategoriju" >Ukloni</button>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBListGroupItem>
    <MDBListGroupItem>
      <MDBCard style="width: 100%">
        <MDBCardImg
          top
          src="https://mdbootstrap.com/img/new/standard/nature/182.jpg"
          class="img-fluid"
          alt="..."
        />
        <MDBCardBody>
          <MDBCardText> Racunari i racunarska oprema </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBListGroupItem>
    <MDBListGroupItem>
      <MDBCard style="width: 100%">
        <MDBCardImg
          top
          src="https://mdbootstrap.com/img/new/standard/nature/182.jpg"
          class="img-fluid"
          alt="..."
        />
        <MDBCardBody>
          <MDBCardText> TV, elektornika i mobiteli </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBListGroupItem>
  </MDBListGroup>
  <MDBListGroup horizontal>
    <MDBListGroupItem>
      <MDBCard style="width: 100%">
        <MDBCardImg
          top
          src="https://mdbootstrap.com/img/new/standard/nature/182.jpg"
          class="img-fluid"
          alt="..."
        />
        <MDBCardBody>
          <MDBCardText> Parfimerija i drogerija </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBListGroupItem>
    <MDBListGroupItem>
      <MDBCard style="width: 100%">
        <MDBCardImg
          top
          src="https://mdbootstrap.com/img/new/standard/nature/182.jpg"
          class="img-fluid"
          alt="..."
        />
        <MDBCardBody>
          <MDBCardText> Knjige </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBListGroupItem>
    <MDBListGroupItem>
      <MDBCard style="width: 100%">
        <MDBCardImg
          top
          src="https://mdbootstrap.com/img/new/standard/nature/182.jpg"
          class="img-fluid"
          alt="..."
        />
        <MDBCardBody>
          <MDBCardText> Vrt i alati </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBListGroupItem>
  </MDBListGroup>
</template>

<script>
import {
  MDBListGroup,
  MDBListGroupItem,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImg,
  mdbRipple,
} from "mdb-vue-ui-kit";

export default {
  props: ["id", "name",  "picture"],
  components: {
    MDBListGroup,
    MDBListGroupItem,
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardImg,
  },
  directives: {
    mdbRipple,
  },
  methods: {
    ukloniKategoriju() {
      console.log("Ukloni kategoriju!");
    }
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

.btn.btn-primary{
  float: right;
}

#bla{
  width: 100%;
}
</style>