export default {
    userId(state) {
        return state.userId;
    },
    token(state){
        return state.token;
    },
    isAuthenticated(state){
        return !!state.token;
    },
    didAutoLogout(state) {
        return state.didAutoLogout;
    },
    getAdmin(state){
        //Eq04mSYm31XpLLhmoR5Mh5MHIJP2
        //console.log("STATE.ADMIN: "+state.admin);
        //console.log("STATE.USERID: "+state.userId);
        return state.admin === state.userId;
    }
};