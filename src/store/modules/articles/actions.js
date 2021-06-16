export default {

    /*uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      },*/

    async addCategory(context, data) {
            console.log("USAO U ADD CATEGORY");
            console.log("CONTEXT: "+context);
            console.log("DATA: "+data);
            //console.log("RANDOM ID: "+this.uuidv4());
        
        //const userId = context.rootGetters.categoryId;
        const categoryData = {
           // id: context.rootGetters.userId,
            categoryName: data.categoryName,
            image: data.image
        };

        const response = await fetch('https://webshopvuediplomski-default-rtdb.europe-west1.firebasedatabase.app/categories/.json', {
            method: 'PUT',
            body: JSON.stringify(categoryData)
        });

        if(!response.ok) {
            console.log("ERROR!");
        }

        context.commit('newCategory', { // newCategory u mutations.js
            ...categoryData, // ... (tri tacke ) radimo sa kopijom categoryData
            //id: userId
        });

        /*
        const token = context.rootGetters.token;

        //console.log("COACH DATA: ",coachData );

        const response =await fetch(`https://vue-http-demo-d9003-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=` + token, {  
            // fetch is function built in in browser :D , ovo .json na kraju je u vezi firebase-a , nema veze sa Vue-om 
            // za autetikaciju koristnika . tj pirlikom registracije dodjeli mu token json?auth=` + token
            method: 'PUT',
            body: JSON.stringify(coachData) 
        }); // PAZI KORISTE SE `` ,da bi se dodao USER ID u string, 
        
        // sljedeca linija koda ce sada zbog async i await da se izvrsi samo ako je request gotov

        // const responseData = await response.json();

        if(!response.ok) {
            //error ...
        }


        context.commit('registerCoach', { // registerCoach u mutations.js
            ...coachData, // ... (tri tacke ) radimo sa kopijom coachData
            id: userId
        });  */
    },

    async loadCoaches(context, payload) {    //https://vue-http-demo-d9003-default-rtdb.europe-west1.firebasedatabase.app/

        if(!payload.forceRefresh &&  !context.getters.shouldUpdate) {
            return;
        }
        const response = await fetch(`https://vue-http-demo-d9003-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`);
        const responseData = await response.json();
        
        if(!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }

        const coaches = [];

        for(const key in responseData) {
            const coach = {
                id: key,
                firstName: responseData[key].firstName, // firstName je naziv atributa u firebase-u
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas,
            };
            coaches.push(coach);
        }

        context.commit('setCoaches', coaches);

        context.commit('setFetchTimestamp'); // timestamp za potrebe kesiranja Http response data
    }
};