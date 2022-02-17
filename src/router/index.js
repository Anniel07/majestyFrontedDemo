// using routes

import { createWebHistory, createRouter } from "vue-router";
import Stories from "@/views/Stories.vue";
import Movies from "@/views/Movies.vue";
const routes = [
   
    {
        path: "/",
        name: "Stories",
        component: Stories,
    },
    {
        path: "/movies",
        name: "Movies",
        component: Movies,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
