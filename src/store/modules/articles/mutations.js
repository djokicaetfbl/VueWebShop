export default {
    newCategory(state, payload) {
        //console.log("BLA: ", payload);
        state.categories.push(payload);
    },
    setCategories(state, payload) {
        //console.log("PAYLOAD: "+JSON.stringify(payload));
        console.log("DJOLENCE"+payload);
        state.categories = payload;
    },
    setFetchTimestamp(state) {
        state.lastFetch = new Date().getTime();
        
    }

};