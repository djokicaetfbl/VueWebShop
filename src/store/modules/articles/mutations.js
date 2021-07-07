export default {
    newCategory(state, payload) {
        state.categories.push(payload);
    },
    setCategories(state, payload) {
        state.categories = payload;
    },
    setArticles(state, payload){
        state.articles = payload;
    },
    setFetchTimestamp(state) {
        state.lastFetch = new Date().getTime();  
    },
    updateCategories(state, number, payload){
        state.categories[number] = payload;
    },
    newArticle(state, payload) {
        state.articles.push(payload);
    },
    setCart(state, payload){
        state.cart = payload;
    },

};