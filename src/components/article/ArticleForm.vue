<template>
  <div>
    <!-- props: ["childrenKey","id", "category", "name", "price", "describe", "imageUrl", "active"], -->
    <base-card>
      <h2>Dodavanje artikla</h2>
      <hr />
      <form @submit.prevent="submitForm">
        <div class="row mb-4" :class="{ invalid: !name.isValid }">
          <div class="col">
            <div class="form-outline mb-4">
              <!--  <span class="badge bg-primary" for="name">Naziv</span>  -->
              <label class="labelName" for="name">Naziv</label>
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
              <i class="fa fa-upload" aria-hidden="true"></i>
              Izaberite sliku
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
              @blur="clearValidity('imageUrl')"
            />
            <!--<p v-if="!imageUrl.isValid" style="color: red">
              Niste izabrali fotografiju.
            </p>  -->
          </div>
        </div>
        <div class="row mb-4" :class="{ invalid: !price.isValid }">
          <div class="col">
            <div class="form-outline mb-4">
              <!--<span class="badge bg-primary" for="price"
                >Izaberite kategoriju</span
              > -->
              <label class="labelChooseCategory" for="name"
                >Izaberite kategoriju</label
              >
              <br />
              <select
                name="category"
                id="category"
                class="selectCategory"
                v-model.trim="category.val"
                @blur="clearValidity('category')"
              >
                <option
                  v-for="item in getCategories"
                  :value="item"
                  :key="item.id"
                  id="selectID"
                >
                  {{ item.categoryName }}
                </option>
              </select>
              <p v-if="!category.isValid" style="color: red">
                Niste izabrali fotografiju.
              </p>
            </div>
          </div>
        </div>

        <div class="row mb-4" :class="{ invalid: !price.isValid }">
          <div class="col">
            <div class="form-outline mb-4">
              <!-- <span class="badge bg-primary" for="price">Cijena</span> -->
              <label class="labelPrice" for="name">Cijena</label>
              <input
                type="number"
                name="price"
                min="0"
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
              <!-- <span class="badge bg-primary" for="describe">Opis</span>  -->
              <label class="labelDescribe" for="name">Opis</label>
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
          v-if="!update"
          type="submit"
          id="addCategory"
          class="btn btn-primary btn-block mb-4"
          :disabled="!isLoadingPhoto"
        >
          <i class="fa fa-plus-circle" aria-hidden="true"></i>
          Dodaj
        </button>
        <button
          v-else
          type="submit"
          id="addCategory"
          class="btn btn-primary btn-block mb-4"
          :disabled="!isLoadingPhoto"
        >
          <i class="fa fa-plus-circle" aria-hidden="true"></i>
          Izmjeni
        </button>
      </form>
    </base-card>
  </div>
</template>

<script>
import BaseCard from "../../components/ui/BaseCard.vue";

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
      update: false,
      isLoadingPhoto: false,
    };
  },
  created() {
    // ovo je za update
    if (
      this.$route.params.childrenKey && // ovo primam msm preko onog new-category
      this.$route.params.id &&
      this.$route.params.name &&
      this.$route.params.imageUrl &&
      this.$route.params.active &&
      this.$route.params.describe &&
      this.$route.params.price &&
      this.$route.params.category &&
      this.$route.params.update
    ) {
      this.category.val = this.$route.params.category; //categoryName
      // this.category.val.categoryName = this.$route.params.category;
      this.imageUrl.val = this.$route.params.imageUrl;
      this.id = this.$route.params.id;
      this.active = this.$route.params.active;
      this.childrenKey.val = this.$route.params.childrenKey;
      this.update = this.$route.params.update;
      this.name.val = this.$route.params.name;
      this.price.val = this.$route.params.price;
      this.describe.val = this.$route.params.describe;
      if (this.imageUrl.val !== "") {
        this.isLoadingPhoto = true;
      }
      /*setTimeout(() => 
      
      , 500);*/
    }
  },

  mounted() {
    document
      .getElementById("category")
      .getElementsByTagName("option")[0].selected = this.category.val;
  },

  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },

    validateForm() {
      this.formIsValid = true;
      if (this.name.val === "") {
        this.name.isValid = false;
        this.formIsValid = false;
      }
      if (this.imageUrl.val.localeCompare("") === 0) {
        this.imageUrl.isValid = false;
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
      this.imageUrl.val = "";
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
      this.isLoadingPhoto = true;
    },
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        console.log("FORMA NIJE VALIDNA !");
        return;
      }

      //console.log("NAME VAL"+this.name.val);
      // console.log("CATEGORY VAL"+this.category.val.categoryName);
      //console.log("CATEGORY (JSON) VAL"+JSON.stringify(this.category.val.categoryName));

      var formDataCreate = {};
      var formDataUpdate = {};

      if (this.update) {
        // ako ima childrenKey onda je u pitanje update
        console.log("USAO U UPDATE!!"); // if category val onda ovaj form data inace formData koji ima category.val.categoryName
        console.log("H1: " + this.category.val.categoryName); // ovo je za kad NE izaberem onda je undefined
        console.log("H2: " + this.category.val);

        if (this.category.val.categoryName === undefined) {
          formDataUpdate = {
            childrenKey: this.childrenKey.val,
            id: this.randomString(),
            name: this.name.val,
            imageUrl: this.imageUrl.val,
            describe: this.describe.val,
            price: this.price.val,
            category: this.category.val, // UPECAO GA :D
            active: true,
          };
        } else {
          formDataUpdate = {
            childrenKey: this.childrenKey.val,
            id: this.randomString(),
            name: this.name.val,
            imageUrl: this.imageUrl.val,
            describe: this.describe.val,
            price: this.price.val,
            category: this.category.val.categoryName, // UPECAO GA :D
            active: true,
          };
        }

        // set default select

        var tmpArticles = this.getArticles;
        var tmp2 = JSON.stringify(this.childrenKey.val.toString().trim());
        //console.log("TMP2: "+tmp2);
        for (let i = 0; i < tmpArticles.length; i++) {
          var tmp1 = JSON.stringify(tmpArticles[i].childrenKey)
            .toString()
            .trim();
          //console.log("TMP1: "+tmp1);
          if (tmp1.localeCompare(tmp2) == 0) {
            // 0 vraca ako su jednaki
            //tmpCategories.splice(i, 1);
            tmpArticles[i].childrenKey = this.childrenKey.val;
            tmpArticles[i].id = this.id;
            tmpArticles[i].category = this.categoryName.val;
            tmpArticles[i].imageUrl = this.imageUrl.val;
            tmpArticles[i].active = this.active;
            tmpArticles[i].name = this.name;
            tmpArticles[i].describe = this.describe;
            tmpArticles[i].price = this.price;
            //console.log("tmpCategories[i]"+tmpCategories[i]);
            this.getArticles[i] = tmpArticles[i];
          }
        }
        //console.log("formDataUpdate"+formDataUpdate.id);
        this.$emit("save-data", formDataUpdate);
      } else {
        formDataCreate = {
          id: this.randomString(),
          name: this.name.val,
          imageUrl: this.imageUrl.val,
          describe: this.describe.val,
          price: this.price.val,
          category: this.category.val.categoryName,
          active: true,
        };
        this.$emit("save-data", formDataCreate);
      }
    },
  },

  computed: {
    getCategories() {
      //console.log("DOBIO SAM: "+JSON.stringify(this.$store.getters["article/categories"]));
      return this.$store.getters["article/categories"];
    },
    getArticles() {
      //console.log("DOBIO SAM: "+JSON.stringify(this.$store.getters["article/categories"]));
      return this.$store.getters["article/categories"];
    },
  },
};
</script>

<style scoped>
.labelName,
.labelChooseCategory,
.labelPrice,
.labelDescribe {
  font-size: 18px;
  font-weight: bold;
  color: #1266f1;
}

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
  /*width: 30%;*/
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

.badge.bg-primary {
  font-size: 20px;
}

#addCategory {
  background-color: #00b74a;
}

#uploadImage,
#addCategory {
  font-size: 18px;
}
</style>