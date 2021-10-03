import 'mdb-vue-ui-kit/css/mdb.min.css'


import {  createApp } from 'vue'

import router from './router.js';
import App from './App.vue'
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue'; // putanju uvijek dodaj na ctrl + space
import BaseBadge from './components/ui/BaseBadge.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';
import BaseDialog from './components/ui/BaseDialog.vue';

import VueSelect from 'vue-next-select';
import 'vue-next-select/dist/index.min.css';
import store from './store/index.js';

import { VueWindowSizePlugin } from 'vue-window-size/option-api';



const app = createApp(App);

app.use(VueWindowSizePlugin);
app.use(router); // kazemo nasoj aplikaciji da koristi rutiranje // hvali koda za stoe itd
app.use(store);


app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);
app.component('vue-select', VueSelect)

app.mount('#app');

//https://vuejsexamples.com/simple-alert-for-vue-js/ za alert

