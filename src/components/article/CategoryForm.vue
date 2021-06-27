<template>
  <div>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="row mb-4" :class="{ invalid: !categoryName.isValid }">
          <div class="col">
            <div class="form-outline mb-4">
              <span class="badge bg-primary" for="categoryName">Naziv</span>
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
            <button class="btn btn-info" @click="onPickFile">
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
    };
  },
  created() {
    // ovo je za update

    if (
      this.$route.params.childrenKey &&
      this.$route.params.id &&
      this.$route.params.categoryName &&
      this.$route.params.imageUrl &&
      this.$route.params.active
    ) {
      this.categoryName.val = this.$route.params.categoryName;
      this.imageUrl.val = this.$route.params.imageUrl;
      this.id = this.$route.params.id;
      this.active = this.$route.params.active;
      this.childrenKey.val = this.$route.params.childrenKey;
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
      if (!this.image.val) {
        this.image.isValid = false;
        this.formIsValid = false;

        console.log("Image dont have value: " + this.image.val);
      }
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
      // console.log("USAO");
      this.validateForm();
      //console.log("USAO1");
      if (!this.formIsValid) {
        return;
      }
      if (!this.image) {
        console.log("Image is NULL");
        return;
      }
      //console.log("USAO2");
      var formDataCreate = {};
      var formDataUpdate = {};

      //console.log("CHILDREN KEY VALUE: " + this.childrenKey.val);

      if (this.childrenKey.val != "") {
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
        //console.log("TMP2: "+tmp2);
        for (let i = 0; i < tmpCategories.length; i++) {
          var tmp1 = JSON.stringify(tmpCategories[i].childrenKey)
            .toString()
            .trim();
            //console.log("TMP1: "+tmp1);
          if (tmp1.localeCompare(tmp2) == 0) {
            // 0 vraca ako su jednaki
            //tmpCategories.splice(i, 1);
            tmpCategories[i].childrenKey =  this.childrenKey.val;
            tmpCategories[i].id = this.id;
            tmpCategories[i].categoryName = this.categoryName.val;
            tmpCategories[i].imageUrl = this.imageUrl.val;
            tmpCategories[i].active = this.active;
            //console.log("tmpCategories[i]"+tmpCategories[i]);
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
        //console.log("USAO3");
        // console.log("FORM DATA: " + formDataUpdate.id);
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
  width: 30%;
  float: right;
}

.invalid label {
  color: red;
}

.invalid input {
  border: 1px solid red;
}
</style>