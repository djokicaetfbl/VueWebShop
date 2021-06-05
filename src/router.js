import { createRouter, createWebHistory } from 'vue-router';

import UserAuth from './pages/authentication/UserAuth.vue';
import NotFound from './pages/NotFound.vue';
import WebShop from './pages/webshop/WebShop.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/',  redirect: '/webshop' }, // ne treba redirect to auth posto je web shop pa ako zeli neka se loguje kako bih mogoa da kupuje
        { path: '/webshop', component: WebShop},
        { path: '/auth', component: UserAuth, /*meta: {requiresUnauth: true}*/ }, // hvali koda
        { path: '/:notFound(.*)', component: NotFound },
    ],
 });

 export default router; // kako bismo mogli konstantu router da koristimo u drugim fajlovima :D

//  /When creating the router, you need to specify a history mode. You do this with factory methods from vue-router. In this example, I'm using 
//  createWebHistory, which just uses browser history mode. Then the URLs just look like any other Web address: