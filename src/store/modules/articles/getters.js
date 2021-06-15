export default {
    coaches(state) {
        return state.coaches;
    },
    hasCoaches(state){
        return state.coaches && state.coaches.length > 0;
    },
    isCoach(_, getters, _2, rootGetters) { // da obezbjedim da kada se registrujem kao coach, da mi nestane dugme za ponovnu registraciju, jel, jer sam vec registrovan
        const coaches = getters.coaches; 
        const userId = rootGetters.userId; // pristupam getteru u index.js (store folderu) :D
        return coaches.some(coach => coach.id === userId);
    },
    shouldUpdate(state) {
        const lastFetch = state.lastFetch;
        if(!lastFetch) {
            return true;
        }

        const currentTimeStampe = new Date().getTime();
        return (currentTimeStampe - lastFetch) / 1000 > 60; // da li je proslo vise od minute, ako jeste update-uj
    }
};