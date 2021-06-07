<template>
  <the-header></the-header>
  <base-card>
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
      <div class="column">
        <div class="card-body">
          <h5 class="card-title">Naziv artikla</h5>
          <p class="card-text">
            2 Ovo je neki opis artikla, sad ovdje imamo malo detaljniji opis
            ovoga artikla :D
          </p>
          <h5 class="card-title">Cijena: 100KM</h5>

          <div class="row">
            <div class="column">
                <div class="col-sm-6 col-md-5 col-lg-6">
			<div class="qty-selector input-group js-qty-selector ">
				<span class="input-group-btn">
					<button class="btn btn-primary" id="buttonPlus" type="button"><i class="fas fa-plus"></i></button>
                    
					<input type="number" id="quantity"  readonly maxlength="3" class="form-control" value="1" name="pdpAddtoCartInput">
                    
					<button class="btn btn-primary" id="buttonMinus" type="button"><i class="fas fa-minus"></i></button>
				</span>
			</div>
			<div class="stock-status">
				</div>
		</div>
            </div>
            <div class="column"><button class="btn btn-primary" type="button">Dodaj u korpu <i class="fas fa-shopping-cart fa-2x"></i></button></div>
          </div>
        </div>
      </div>
    </div>
  </base-card>
</template>

<script>
import TheHeader from "../../components/layout/TheHeader.vue";
import BaseCard from "../../components/ui/BaseCard.vue";

export default {
  components: {
    TheHeader,
    BaseCard,
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

/* Create two equal columns that floats next to each other */
.column {
  float: left;
  width: 50%;
  padding: 10px;
  height: 300px; /* Should be removed. Only for demonstration */
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

#buttonPlus{
  height: 30px;
}

#buttonMinus{
  height: 30px;
}

#quantity{
  max-width: 58px;
}
</style>