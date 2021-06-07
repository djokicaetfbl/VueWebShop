// malo vuex-a
/* Vuex is a state management pattern + library for Vue.js applications. It serves as a centralized store for all the components in an application, with rules 
ensuring that the state can only be mutated in a predictable fashion. It also integrates with Vue's official devtools extension (opens new window)to provide advanced 
features such as zero-config time-travel debugging and state snapshot export / import. 
*/

let timer; // GLOBALNA VARIJABLA

export default { // definisemo akcije za login i signup
    async login(context, payload) { // nema namespace-a pa u dispatch samo stavim logn , isto je i za sign up
        return context.dispatch('auth', {
            ...payload,
            mode: 'login',
        });
    },
    async signup(context, payload) { // auth je odma ispod funkcija , nemamo namespace
        return context.dispatch('auth', {
            ...payload,
            mode: 'signup',
        });
    },

    async auth(context, payload) {
        const mode = payload.mode;
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCBtbrgnO2dQzNMleLxUqRbyHiYmDFQV9I';

        if(mode === 'signup') {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCBtbrgnO2dQzNMleLxUqRbyHiYmDFQV9I'
        }
        const response = await fetch(url, { // Project Overview -> Project settings -> WebAPI Key -- AIzaSyCBtbrgnO2dQzNMleLxUqRbyHiYmDFQV9I
        method: 'POST',
        body: JSON.stringify({
            email: payload.email, // ovo su podaci sa firebase apija za signup
            password: payload.password,
            returnSecureToken: true
        })
    });
    const responseData = await response.json();

        if(!response.ok) {
            console.log(responseData);
            const error = new Error(responseData.message || 'Failed to authenticate.');
            throw error;
        }

        //console.log(responseData);

        const expiresIn = +responseData.expiresIn * 1000; // + ispred konvertuje u broj type: number
        //const expiresIn = 5000; // samo za potrebe testiranja 5 sekundi
        const expirationDate = new Date().getTime() + expiresIn;

        // timeout za autologin korisnika

        timer = setTimeout(function(){
            context.dispatch('autoLogout');
        }, expiresIn);

        localStorage.setItem('token', responseData.idToken); // za automatski login i logout
        localStorage.setItem('userId', responseData.localId);
        localStorage.setItem('tokenExpiration', expirationDate);

        context.commit('setUser', { // setUser je metoda iz mutations.js
            token: responseData.idToken,
            userId: responseData.localId,
            //tokenExpiration: expirationDate
        });
    },


    tryLogin(context) { //autologin
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        const expiresIn = +tokenExpiration - new Date().getTime();

        if( expiresIn < 0) {
            return;
        }

        timer = setTimeout(function() {
            context.dispatch('autoLogout');
        }, expiresIn);

        if(token && userId) {
            context.commit('setUser', {
                token: token,
                userId: userId,
                tokenExpiration: tokenExpiration
            });
        }
    },

    logout(context) {

        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');

        clearTimeout(timer);

        context.commit('setUser', {
            token: null,
            userId: null,
            //tokenExpiration: null
        });
    },

    autoLogout(context) {
        context.dispatch('logout');
        context.commit('setAutoLogout');
    }
};