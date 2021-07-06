export default {

    async addArticle(context, data) {
        var articleDataCreate = {};
        var articleDataUpdate = {};

        if (data.childrenKey != "" && data.childrenKey != undefined) {
            console.log("DA UPDATE !" + data.childrenKey);
            var childrenKey = data.childrenKey;
            articleDataUpdate = {
                childrenKey: data.childrenKey,
                id: data.id,
                name: data.name,
                imageUrl: data.imageUrl,
                describe: data.describe,
                price: data.price,
                category: data.category,
                active: true
            };
            const response = await fetch(`https://webshopvuediplomski-default-rtdb.europe-west1.firebasedatabase.app/articles/${childrenKey}/.json`, {
                method: 'PUT',
                body: JSON.stringify(articleDataUpdate)
            }); 
            if (!response.ok) {
                console.log("ERROR!");
            }

        } else {

            articleDataCreate = {
                // id: context.rootGetters.userId,
                id: data.id,
                name: data.name,
                imageUrl: data.imageUrl,
                describe: data.describe,
                price: data.price,
                category: data.category,
                active: true
            };

            const response = await fetch('https://webshopvuediplomski-default-rtdb.europe-west1.firebasedatabase.app/articles/.json', {
                method: 'POST',
                body: JSON.stringify(articleDataCreate)
            });

            //const responseData = await response.json();
            //console.log("REPSONSE: " + JSON.stringify(responseData));

            if (!response.ok) {
                console.log("ERROR!");
            }

            context.commit('newArticle', { // newCategory u mutations.js
                ...articleDataCreate, // ... (tri tacke ) radimo sa kopijom categoryData
                //id: userId
            });
        }
    },

    async addCategory(context, data) {

        var categoryDataCreate = {};
        var categoryDataUpdate = {};

        if (data.childrenKey != "" && data.childrenKey != undefined) {
            console.log("DA UPDATE !" + data.childrenKey);
            var childrenKey = data.childrenKey;
            categoryDataUpdate = {
                // id: context.rootGetters.userId,
                childrenKey: data.childrenKey,
                id: data.id,
                categoryName: data.categoryName,
                imageUrl: data.imageUrl,
                active: true
            };
            const response = await fetch(`https://webshopvuediplomski-default-rtdb.europe-west1.firebasedatabase.app/categories/${childrenKey}/.json`, {
                // fetch is function built in in browser :D , ovo .json na kraju je u vezi firebase-a , nema veze sa Vue-om 
                // za autetikaciju koristnika . tj pirlikom registracije dodjeli mu token json?auth=` + token
                method: 'PUT',
                body: JSON.stringify(categoryDataUpdate)
            }); // PAZI KORISTE SE `` ,da bi se dodao USER ID u string,
            //const responseData = await response.json();
            //console.log("REPSONSE: " + JSON.stringify(responseData));

            if (!response.ok) {
                console.log("ERROR!");
            }

            //context.commit('setCategories',requests)
            //updateCategories(state, number, payload)
            //context.commit('updateCategories',0,categoryDataUpdate);

        } else {
            console.log("DA CREATE !");
            categoryDataCreate = {
                // id: context.rootGetters.userId,
                id: data.id,
                categoryName: data.categoryName,
                imageUrl: data.imageUrl,
                active: true
            };

            const response = await fetch('https://webshopvuediplomski-default-rtdb.europe-west1.firebasedatabase.app/categories/.json', {
                method: 'POST',
                body: JSON.stringify(categoryDataCreate)
            });

            //const responseData = await response.json();
            //console.log("REPSONSE: " + JSON.stringify(responseData));

            if (!response.ok) {
                console.log("ERROR!");
            }

            context.commit('newCategory', { // newCategory u mutations.js
                ...categoryDataCreate, // ... (tri tacke ) radimo sa kopijom categoryData
                //id: userId
            });
        }
    },

    async deleteCategory(context, data) {
        //const categoryId = data.id
        //-McjnnKu-RNWMBjIVgw8
        //const categoryId = '-McjnnKu-RNWMBjIVgw8';
        const childrenKey = data.childrenKey;
        //console.log("CHILDREN KEY: "+childrenKey);
        const categoryData = {
            childrenKey: data.childrenKey,
            id: data.id,
            categoryName: data.categoryName,
            imageUrl: data.imageUrl,
            active: data.active
        };

        //console.log("CATEOGRY DATA ACTION: " + categoryData);

        //const response =await fetch(`https://vue-http-demo-d9003-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=` + token, { 
        const response = await fetch(`https://webshopvuediplomski-default-rtdb.europe-west1.firebasedatabase.app/categories/${childrenKey}/.json`, {
            // fetch is function built in in browser :D , ovo .json na kraju je u vezi firebase-a , nema veze sa Vue-om 
            // za autetikaciju koristnika . tj pirlikom registracije dodjeli mu token json?auth=` + token
            method: 'PUT',
            body: JSON.stringify(categoryData)
        }); // PAZI KORISTE SE `` ,da bi se dodao USER ID u string, 

        if (!response.ok) {
            //error ...
            console.log("ERRORR!!!")
        }

        /*
        context.commit('newCategory', { // newCategory u mutations.js // zakomentarisoa da mi ga opet ne doda odma u red :D
            ...categoryData, // ... (tri tacke ) radimo sa kopijom categoryData
            //id: userId
        });*/
    },

    async deleteArticle(context, data) {
        const childrenKey = data.childrenKey;
        const articleData = {
            childrenKey: data.childrenKey,
            id: data.id,
            category: data.category,
            imageUrl: data.imageUrl,
            active: data.active,
            describe: data.describe,
            name: data.name,
            price: data.price
        };

        const response = await fetch(`https://webshopvuediplomski-default-rtdb.europe-west1.firebasedatabase.app/articles/${childrenKey}/.json`, {
            method: 'PUT',
            body: JSON.stringify(articleData)
        });
        if (!response.ok) {
            //error ...
            console.log("ERRORR!!!")
        }
    },


    async fetchCategories(context) {
        //const coachId = context.rootGetters.userId;
        //const token = context.rootGetters.token;
        const response = await fetch('https://webshopvuediplomski-default-rtdb.europe-west1.firebasedatabase.app/categories.json');
        // samo autentikovani korisnici mogu da vide svoje zahtjeve json?auth=` + token
        const responseData = await response.json();

        if (responseData) {

            //console.log("DJORDJE PALAVESTRA!");
            //console.log("RESPONSE DATA: " + JSON.stringify(responseData));

            if (!response.ok) {
                const error = new Error(responseData.message || 'Failed to fetch.');
                throw error;
            }

            //console.log("BBBBB");
            let categories = [];
            //categories = this.$store.getters["article/categories"];
            let category;


            for (const key in responseData) {
                //console.log("KEY: "+key);
                category = {
                    //id: key,
                    childrenKey: key, // potreban za update, da znam kako da pristupim children-u u stablu na firebase-u
                    id: responseData[key].id,
                    categoryName: responseData[key].categoryName,
                    imageUrl: responseData[key].imageUrl,
                    active: responseData[key].active
                };
                //console.log("CATEGORY: " + JSON.stringify(category));
                //console.log("PROCITANA KATEGORIJA: "+category.id);
                if (category.active) {
                    // console.log("DA");
                    categories.push(category);
                }
            }
            //categories.push(category);

            //console.log("CATEGORIES LENGTH: " + categories[0].id);


            context.commit('setCategories', categories) // ovo kreiramo u mutations.js
        } else {
            //console.log("JBG");
            return;
        }
    },

    async fetchArticles(context, categoryName) {

         //console.log("CATEGORY NAME: "+categoryName.toString().trim());

        const response = await fetch('https://webshopvuediplomski-default-rtdb.europe-west1.firebasedatabase.app/articles.json');
        // samo autentikovani korisnici mogu da vide svoje zahtjeve json?auth=` + token
        const responseData = await response.json();

        if (responseData) {
            if (!response.ok) {
                const error = new Error(responseData.message || 'Failed to fetch.');
                throw error;
            }

            let articles = [];
            let article;

            for (const key in responseData) {
                //console.log("JEDAN");
                article = {
                    childrenKey: key, // potreban za update, da znam kako da pristupim children-u u stablu na firebase-u
                    id: responseData[key].id,
                    name: responseData[key].name,
                    imageUrl: responseData[key].imageUrl,
                    active: responseData[key].active,
                    price: responseData[key].price,
                    describe: responseData[key].describe,
                    category: responseData[key].category
                };
                //console.log("CATEGORY: " + JSON.stringify(article.category));
                //console.log("PROCITANA KATEGORIJA: "+category.id);
                //console.log("HH: "+article.category);
                //console.log("ACTIVE: "+article.active);
                //console.log("CATEGORY: "+article.category.toString().trim());
               // console.log("CATEGORY NAME: "+categoryName.toString().trim());
                if (article.active && article.category.toString().trim()
                    === categoryName.toString().trim()) {
                    console.log("DA");
                    articles.push(article);
                }
            }
            //categories.push(category);

            //console.log("CATEGORIES LENGTH: " + categories[0].id);


            context.commit('setArticles', articles) // ovo kreiramo u mutations.js

        }
    }

};
