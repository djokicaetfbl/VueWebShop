<template>
  <the-header></the-header>

  <h1 id="korpa">Korpa</h1>
  <base-card>
    <MDBTable>
      <thead class="table-light">
        <tr>
          <th scope="col">Proizvod</th>
          <th scope="col">Ukloni</th>
          <th scope="col">Kolicina</th>
          <th scope="col">Cijena</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <th scope="row">
            <div class="row">
              <div class="column">
                <div class="card">
                  <img
                    src="https://mdbootstrap.com/img/new/standard/nature/184.jpg"
                    class="card-img-top"
                    alt="..."
                    style="max-height: 300px"
                  />
                </div>
              </div>
              <div class="card-body">
                <p>Naziv artikla</p>
              </div>
            </div>
          </th>
          <th scope="row">
            <MDBBtn color="danger">Ukloni</MDBBtn>
          </th>
          <th scope="row">Kolicina</th>
          <th>Cijena</th>
        </tr>
        <!-- kraj reda -->
        <tr>
          <th scope="row">
            <div class="row">
              <div class="column">
                <div class="card">
                  <img
                    src="https://mdbootstrap.com/img/new/standard/nature/184.jpg"
                    class="card-img-top"
                    alt="..."
                    style="max-height: 300px"
                  />
                </div>
              </div>
              <div class="card-body">
                <p>Naziv artikla</p>
              </div>
            </div>
          </th>
          <th scope="row">
            <MDBBtn color="danger">Ukloni</MDBBtn>
          </th>
          <th scope="row">Kolicina</th>
          <th>Cijena</th>
        </tr>
      </tbody>
    </MDBTable>

    <MDBBtn color="success" @click="buy">Kupi</MDBBtn>
  </base-card>
</template>

<script>
import TheHeader from "../../components/layout/TheHeader.vue";
import BaseCard from "../../components/ui/BaseCard.vue";
import { MDBTable, MDBBtn } from "mdb-vue-ui-kit";
export default {
  components: { TheHeader, BaseCard, MDBTable, MDBBtn },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  methods: {
    buy() {
      console.log("KUPI!");

      if (this.isLoggedIn) {

          console.log("Iznos, Uspjesna kupovina :D");

      } else {
        console.log("KUPI!");
      }
    },
    handleError() {
      this.error = null;
    },
  },
  computed: {
    isLoggedIn() {
      //this.isLoading = this.$store.getters.isAuthenticated;
      return this.$store.getters.isAuthenticated;
      // return this.isLoading;
    },
  },
};
</script>

<style scoped>
#korpa {
  margin-top: 5%;
  margin-left: 10%;
}

.column {
  float: left;
  min-width: 50%;
  padding: 10px;
  /*height: 300px;*/ /* Should be removed. Only for demonstration */
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

.th,
td {
  text-align: center;
}

tr {
  line-height: 1px;
}
</style>