export default {
    newCategory(state, payload) {
        state.categories.push(payload);
    },
    setCategories(state, payload) {
        state.categories = payload;
    },
    setFetchTimestamp(state) {
        state.lastFetch = new Date().getTime();  
    },
    updateCategories(state, number, payload){
        state.categories[number] = payload;
    }

};