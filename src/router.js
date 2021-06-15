import { createRouter, createWebHistory } from 'vue-router';

import UserAuth from './pages/authentication/UserAuth.vue';
import NotFound from './pages/NotFound.vue';
import WebShop from './pages/webshop/WebShop.vue';
import UserRegistration from './pages/authentication/UserRegistration.vue';
import ArticleList from './pages/webshop/ArticleList.vue';
import ArticleDetail from './pages/webshop/ArticleDetail.vue';
import Cart from './pages/webshop/Cart.vue';
import NewCategory from './pages/webshop/NewCategory.vue';
import store from './store/index.js';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/',  redirect: '/articles' }, // ne treba redirect to auth posto je web shop pa ako zeli neka se loguje kako bih mogoa da kupuje
        { path: '/articles', component: WebShop},
        { path: '/articles/:category', component: ArticleList, 
        /*{ path: '/articles/kucanskiAparati', component: ArticleList,*/
           /* props: true, // da mogu da uzmem rutu i da njen dio iskoristim kao prop (npr. id rute)
            children: [
                { path: 'id', component:  ArticleDetail, props: true }
        ]*/},
        //{ path: '/articles/:category/:id', component: ArticleDetail },
        { path: '/articles/kucanskiAparati/1', component: ArticleDetail },
        //{ path: '/articles/:category/:' }
        { path: '/cart', component: Cart },
        { path: '/newCategory', component: NewCategory },
        { path: '/auth', component: UserAuth, meta: {requiresUnauth: true} }, // hvali koda
        { path: '/registration', component: UserRegistration, meta: {requiresUnauth: true} },
        { path: '/:notFound(.*)', component: NotFound },
    ],
 });

 // globalni navigation guard:
router.beforeEach(function(to, _, next) {
    if(to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/auth');
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
        next('/articles');
    } else {
        next();
    }
});

 export default router; // kako bismo mogli konstantu router da koristimo u drugim fajlovima :D

//  /When creating the router, you need to specify a history mode. You do this with factory methods from vue-router. In this example, I'm using 
//  createWebHistory, which just uses browser history mode. Then the URLs just look like any other Web address: