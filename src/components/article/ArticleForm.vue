<template>
  <div>
    <!-- props: ["childrenKey","id", "category", "name", "price", "describe", "imageUrl", "active"], -->
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="row mb-4" :class="{ invalid: !name.isValid }">
          <div class="col">
            <div class="form-outline mb-4">
              <span class="badge bg-primary" for="name">Naziv</span>
              <input
                type="text"
                name="name"
                id="name"
                class="form-control"
                v-model.trim="name.val"
                placeholder="Naziv"
                @blur="clearValidity('name')"
              />
              <p v-if="!name.isValid" style="color: red">
                Naziv artikla ne može da bude prazan.
              </p>
            </div>
          </div>
        </div>

        <div class="row mb-4" :class="{ invalid: !image.isValid }">
          <div class="col">
            <button class="btn btn-info" id="uploadImage" @click="onPickFile">
              Upload image
            </button>
            <input
              type="file"
              style="display: none"
              ref="fileInput"
              accept="image/*"
              @change="onFilePicked"
            />

            <img
              id="image"
              v-if="imageUrl.val !== ''"
              top
              :src="imageUrl.val"
              class="img-fluid"
              alt="..."
            />
          </div>
        </div>
        <div class="row mb-4" :class="{ invalid: !price.isValid }">
          <div class="col">
            <div class="form-outline mb-4">
              <span class="badge bg-primary" for="price"
                >Izaberite kategoriju</span
              >
              <br />
              <select name="category" id="category" class="selectCategory" v-model.trim="category.val">
                <option v-for="item in getCategories" :value="item" :key="item.id">{{ item.categoryName }}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="row mb-4" :class="{ invalid: !price.isValid }">
          <div class="col">
            <div class="form-outline mb-4">
              <span class="badge bg-primary" for="price">Cijena</span>
              <input
                type="text"
                name="price"
                id="price"
                class="form-control"
                v-model.trim="price.val"
                placeholder="Opis"
                @blur="clearValidity('price')"
              />
            </div>
          </div>
        </div>

        <div class="row mb-4" :class="{ invalid: !describe.isValid }">
          <div class="col">
            <div class="form-outline mb-4">
              <span class="badge bg-primary" for="describe">Opis</span>
              <input
                type="text"
                name="describe"
                id="describe"
                class="form-control"
                v-model.trim="describe.val"
                placeholder="Opis"
                @blur="clearValidity('describe')"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          id="addCategory"
          class="btn btn-primary btn-block mb-4"
        >
          Dodaj
        </button>
      </form>
    </base-card>
  </div>
</template>

<script>
import BaseCard from "../../components/ui/BaseCard.vue";
// props: ["childrenKey","id", "category", "name", "price", "describe", "imageUrl", "active"],

export default {
  components: { BaseCard },
  emits: ["save-data"], // BITNO
  data() {
    return {
      name: {
        val: "",
        isValid: true,
      },
      describe: {
        val: "",
        isValid: true,
      },
      /*category: {
        val: ["Racunari", "Roboti", "Automobili", "Avioni"],
        isValid: true,
      },*/
      category: {
        val: "",
        isValid: true,
      },
      price: {
        val: 0.0,
        isValid: true,
      },
      image: {
        val: null,
        isValid: true,
      },
      imageUrl: {
        val: "",
        isValid: true,
      },
      formIsValid: true,
      id: "",
      active: true,
      childrenKey: {
        val: "",
      },
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      console.log("POZVAO VALIDATE FORM !");
      this.formIsValid = true;
      if (this.name.val === "") {
        this.categoryName.isValid = false;
        this.formIsValid = false;
      }
      if (!this.image.val) {
        this.image.isValid = false;
        this.formIsValid = false;
      }
      if (this.describe.val == "") {
        this.describe.isValid = false;
        this.formIsValid = false;
      }
      if (this.price.val === 0) {
        this.price.isValid = false;
        this.formIsValid = false;
      }
      if (this.category.val === "") {
        console.log("OVA NE VALJA :D !");
        this.category.isValid = false;
        this.formIsValid = false;
      }
    },    
    randomString() {
      var length = 32;
      var chars =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var result = "";
      for (var i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
      return result;
    },

    onPickFile() {
      this.$refs.fileInput.click(); // trigerujem na klik
    },
    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Molimo Vas iazberite validan fajl!");
      }
      // stavimo ga u base64 string -> binary file to string value
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl.val = fileReader.result;
        //console.log("IMAGE URL: " + this.imageUrl.val);
      });
      fileReader.readAsDataURL(files[0]);
      //console.log("FILE OD 0: " + files[0]);
      this.image.val = files[0];
      //console.log("this.image.val: " + this.image.val);
      //console.log("FILENAME: " + filename);
    },
    submitForm() {
      console.log("SUBMIT FORM!");
      this.validateForm();
      if (!this.formIsValid) {
        console.log("FORMA NIJE VALIDNA !");
        return;
      }

      //console.log("NAME VAL"+this.name.val);
     // console.log("CATEGORY VAL"+this.category.val.categoryName);
      //console.log("CATEGORY (JSON) VAL"+JSON.stringify(this.category.val.categoryName));

      var formDataCreate = {};
      //var formDataUpdate = {};


      
      formDataCreate = {
        id: this.randomString(),
        name: this.name.val,
        imageUrl: this.imageUrl.val,
        describe: this.describe.val,
        price: this.price.val,
        category: this.category.val.categoryName,
        active: true
      };
      console.log(formDataCreate);
      this.$emit("save-data", formDataCreate);
    },
  },

  computed: {
    getCategories() {
      //console.log("DOBIO SAM: "+JSON.stringify(this.$store.getters["article/categories"]));
      return this.$store.getters["article/categories"];
    },
  },
};
</script>

<style scoped>
img {
  padding: 20px;
  max-height: 150px;
  max-width: 150px;
}
#name {
  border: 2px solid #1266f1;
}

#describe {
  border: 2px solid #1266f1;
  min-height: 150px;
}

#price {
  border: 2px solid #1266f1;
}

#password {
  border: 2px solid #1266f1;
}

.form-outline.mb-4 {
  width: 100%;
}

#addCategory {
  width: 30%;
  float: right;
}

.invalid label {
  color: red;
}

.invalid input {
  border: 1px solid red;
}

.selectCategory {
  width: 100%;
  min-width: 15ch;
  max-width: 30ch;
  border: 1px solid var(--select-border);
  border-radius: 0.25em;
  padding: 0.25em 0.5em;
  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: #fff;
  background-image: linear-gradient(to top, #f9f9f9, #fff 33%);
}

.badge.bg-primary{
  font-size: 20px;
}

#uploadImage, #addCategory{
  font-size: 20px;
}

</style>