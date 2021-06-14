import mutations from './mutations.js';
import actions from './action.js';
import getters from './getters.js';

export default {
    state() {
        return {
            userId: null,
            token: null,
            didAutoLogout: false,
            admin: 'Eq04mSYm31XpLLhmoR5Mh5MHIJP2'
        };
    },
    mutations,
    actions,
    getters
}