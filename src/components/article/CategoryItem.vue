<template>
  <MDBListGroup horizontal>
    <MDBListGroupItem>
        <MDBCard style="width: 100%">
    <MDBCardImg top src="https://mdbootstrap.com/img/new/standard/nature/182.jpg" alt="..."/>
    <MDBCardBody>
      <MDBCardText>
        Kucanski aparati
      </MDBCardText>
    </MDBCardBody>
  </MDBCard>
    </MDBListGroupItem>
    <MDBListGroupItem>
  <MDBCard style="width: 100%">
    <MDBCardImg top src="https://mdbootstrap.com/img/new/standard/nature/182.jpg" alt="..."/>
    <MDBCardBody>
      <MDBCardText>
        Racunari i racunarska oprema
      </MDBCardText>
    </MDBCardBody>
  </MDBCard>
    </MDBListGroupItem>
    <MDBListGroupItem>
  <MDBCard style="width: 100%">
    <MDBCardImg top src="https://mdbootstrap.com/img/new/standard/nature/182.jpg" alt="..."/>
    <MDBCardBody>
      <MDBCardText>
        TV, elektornika i mobiteli
      </MDBCardText>
    </MDBCardBody>
  </MDBCard>
    </MDBListGroupItem>
  </MDBListGroup>
  <MDBListGroup horizontal>
    <MDBListGroupItem>
        <MDBCard style="width: 100%">
    <MDBCardImg top src="https://mdbootstrap.com/img/new/standard/nature/182.jpg" alt="..."/>
    <MDBCardBody>
      <MDBCardText>
        Parfimerija i drogerija
      </MDBCardText>
    </MDBCardBody>
  </MDBCard>
    </MDBListGroupItem>
    <MDBListGroupItem>
  <MDBCard style="width: 100%">
    <MDBCardImg top src="https://mdbootstrap.com/img/new/standard/nature/182.jpg" alt="..."/>
    <MDBCardBody>
      <MDBCardText>
        Knjige
      </MDBCardText>
    </MDBCardBody>
  </MDBCard>
    </MDBListGroupItem>
    <MDBListGroupItem>
  <MDBCard style="width: 100%">
    <MDBCardImg top src="https://mdbootstrap.com/img/new/standard/nature/182.jpg" alt="..."/>
    <MDBCardBody>
      <MDBCardText>
        Vrt i alati
      </MDBCardText>
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
  props: ["id", "name", "picture"],
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
};
</script>

<style scoped>

.list-group-item {
  height: auto;
}

</style>