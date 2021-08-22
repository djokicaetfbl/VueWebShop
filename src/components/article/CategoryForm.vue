<template>
  <div>
    <base-card>
      <h2>Dodavanje kategorije</h2>
      <hr />
      <form @submit.prevent="submitForm">
        <div class="row mb-4" :class="{ invalid: !categoryName.isValid }">
          <div class="col">
            <div class="form-outline mb-4">
              <!-- <span class="badge bg-primary" for="categoryName">Naziv</span> -->
              <label class="labelCategoryName" for="categoryName">Naziv</label
              ><br />
              <input
                type="text"
                name="categoryName"
                id="categoryName"
                class="form-control"
                v-model.trim="categoryName.val"
                placeholder="Naziv"
                @blur="clearValidity('categoryName')"
              />
              <p v-if="!categoryName.isValid" style="color: red">
                Naziv kategorije ne može da bude prazan.
              </p>
            </div>
          </div>
        </div>

        <div class="row mb-4" :class="{ invalid: !image.isValid }">
          <div class="col">
            <button class="btn btn-info" id="uploadPhoto" @click="onPickFile">
              <i class="fa fa-upload" aria-hidden="true"></i>
              Izaberite sliku
            </button>
            <input
              type="file"
              style="display: none"
              ref="fileInput"
              accept="image/*"
              @blur="clearValidity('imageUrl')"
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
            <!-- <p v-if="!imageUrl.isValid" style="color: red">
              Niste izabrali fotografiju.
            </p>  -->
          </div>
        </div>
        <button v-if="!update"
          type="submit"
          id="addCategory"
          class="btn btn-primary btn-block mb-4"
          :disabled="!isLoadingPhoto"
        >
          <i class="fa fa-plus-circle" aria-hidden="true"></i>
          Dodaj
        </button>
        <button v-else
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
("mdb-vue-ui-kit");

export default {
  components: { BaseCard },
  emits: ["save-data"], // BITNO
  data() {
    return {
      categoryName: {
        val: "",
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
      this.$route.params.categoryName &&
      this.$route.params.imageUrl &&
      this.$route.params.active &&
      this.$route.params.update
    ) {
      this.categoryName.val = this.$route.params.categoryName;
      this.imageUrl.val = this.$route.params.imageUrl;
      this.id = this.$route.params.id;
      this.active = this.$route.params.active;
      this.childrenKey.val = this.$route.params.childrenKey;
      this.update = this.$route.params.update;
      if (this.imageUrl.val !== "") {
        this.isLoadingPhoto = true;
      }
      //this.image.val = "123";
    }
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.categoryName.val === "") {
        this.categoryName.isValid = false;
        this.formIsValid = false;
        //console.log("DJOLE: " + this.categoryName.val);
      }
      if (this.imageUrl.val.localeCompare("") === 0) {
        console.log("USAO BRE");
        this.imageUrl.isValid = false;
        this.formIsValid = false;
      }
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
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl.val = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image.val = files[0];

      this.isLoadingPhoto = true;
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

    submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      console.log("NASTAVIO");
     /* if (!this.image) {
        console.log("Image is NULL");
        return;
      }*/
      var formDataCreate = {};
      var formDataUpdate = {};
      if (this.update) {
        // ako ima childrenKey onda je u pitanje update

        formDataUpdate = {
          childrenKey: this.childrenKey.val,
          id: this.randomString(),
          categoryName: this.categoryName.val,
          imageUrl: this.imageUrl.val,
          active: true,
        };

        var tmpCategories = this.getCategories;
        var tmp2 = JSON.stringify(this.childrenKey.val.toString().trim());
        for (let i = 0; i < tmpCategories.length; i++) {
          var tmp1 = JSON.stringify(tmpCategories[i].childrenKey)
            .toString()
            .trim();
          if (tmp1.localeCompare(tmp2) == 0) {
            tmpCategories[i].childrenKey = this.childrenKey.val;
            tmpCategories[i].id = this.id;
            tmpCategories[i].categoryName = this.categoryName.val;
            tmpCategories[i].imageUrl = this.imageUrl.val;
            tmpCategories[i].active = this.active;
            this.getCategories[i] = tmpCategories[i];
          }
        }
        //console.log("formDataUpdate"+formDataUpdate.id);
        this.$emit("save-data", formDataUpdate);
      } else {
        formDataCreate = {
          id: this.randomString(),
          categoryName: this.categoryName.val,
          imageUrl: this.imageUrl.val,
          active: true,
        };
        this.$emit("save-data", formDataCreate);
        //console.log("U PITANJU JE create!");
      }
    },
  },
  computed: {
    getCategories() {
      return this.$store.getters["article/categories"];
    },
  },
};
</script>

<style scoped>
.labelCategoryName {
  font-size: 18px;
  font-weight: bold;
  color: #1266f1;
}

img {
  padding: 20px;
  max-height: 150px;
  max-width: 150px;
}
#categoryName {
  border: 2px solid #1266f1;
}

#describe {
  border: 2px solid #1266f1;
  min-height: 150px;
}

#email {
  border: 2px solid #1266f1;
}

#password {
  border: 2px solid #1266f1;
}

.form-outline.mb-4 {
  width: 100%;
}

#addCategory {
  /* width: 30%;*/
  float: right;
  font-size: 18px;
  background-color: #00b74a;
}

.invalid label {
  color: red;
}

.invalid input {
  border: 1px solid red;
}

#uploadPhoto {
  font-size: 18px;
}
</style>