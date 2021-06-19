export default {
    categories(state) {
        return state.categories;
        // rootGetters.userId; // pristupam getteru u index.js (store folderu) :D BITNO
    },
    hasCategories(state){
        console.log("BLA1: "+state.categories);
        console.log("BLA2: "+state.categories.length);
        return state.categories && state.categories.length > 0;
    },
    isCoach(_, getters, _2, rootGetters) { // da obezbjedim da kada se registrujem kao coach, da mi nestane dugme za ponovnu registraciju, jel, jer sam vec registrovan
        const coaches = getters.coaches; 
        const userId = rootGetters.userId; // pristupam getteru u index.js (store folderu) :D
        return coaches.some(coach => coach.id === userId); // vjerv. uklonim ovu metodu kasnije
    },
    shouldUpdate(state) {
        const lastFetch = state.lastFetch;
        if(!lastFetch) {
            return true;
        }

        const currentTimeStampe = new Date().getTime();
        return (currentTimeStampe - lastFetch) / 1000 > 60; // da li je proslo vise od minute, ako jeste update-uj // refresuj sadrzaj, mozda i uklonim
    }
};