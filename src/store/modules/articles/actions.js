export default {

    async addCategory(context, data) {
            //console.log("USAO U ADD CATEGORY");
            //console.log("CONTEXT: "+context);
            console.log("DATA: "+JSON.stringify(data));
            //console.log("RANDOM ID: "+this.uuidv4());
            //console.log("IMAGE URL: "+data.imageUrl);
        
        //const userId = context.rootGetters.categoryId;
        const categoryData = {
           // id: context.rootGetters.userId,
            id: data.id,
            categoryName: data.categoryName,
            imageUrl: data.imageUrl
        };

        const response = await fetch('https://webshopvuediplomski-default-rtdb.europe-west1.firebasedatabase.app/categories/.json', {
            method: 'PUT',
            body: JSON.stringify(categoryData)
        });

        const responseData = await response.json();
        
        //POVEZI Sa nekim key ili id sta vec da dohvatis SLIKU

        console.log("REPSONSE: "+JSON.stringify(responseData));
       
       // const key = response.key;

        if(!response.ok) {
            console.log("ERROR!");
        }

        context.commit('newCategory', { // newCategory u mutations.js
            ...categoryData, // ... (tri tacke ) radimo sa kopijom categoryData
            //id: userId
        });
    },

    async fetchCategories(context) {
        //const coachId = context.rootGetters.userId;
        //const token = context.rootGetters.token;
        const response = await fetch(`https://webshopvuediplomski-default-rtdb.europe-west1.firebasedatabase.app/categories.json`);
        // samo autentikovani korisnici mogu da vide svoje zahtjeve json?auth=` + token
        const responseData = await response.json();

        //console.log("RESPONSE DATA LEBTH: "+JSON.stringify(responseData));

        if(!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch.');
            throw error;
        }

        const categories = [];
        let category;

        for(const key in responseData){
            //console.log("KEY: "+key);
             category = {
                //id: key,
                id: responseData[key].id,
                categoryName: responseData.categoryName,
                imageUrl: responseData.imageUrl,
            };
            //console.log("PROCITANA KATEGORIJA (KEY): "+JSON.stringify(key));
            //console.log("PROCITANA KATEGORIJA: "+category.id);
            
        }
        categories.push(category);

        console.log("CATEGORIES LENGTH: "+categories.length);


        context.commit('setCategories',categories) // ovo kreiramo u mutations.js
    }

};