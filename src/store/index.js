import { createStore } from 'vuex';
import authModule from './modules/auth/index.js';
import articleModule from './modules/articles/index.js';

const store = createStore({
    modules: {
        auth: authModule,
        article: articleModule
    }
});

export default store;