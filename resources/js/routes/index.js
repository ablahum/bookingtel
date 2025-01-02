import { createRouter, createWebHistory } from "vue-router";

import { Dashboard, Sign } from "../layouts";
import { Login, Register, Orders, Rooms } from "../views";
import { TableComponent, FormComponent } from "../components";

const routes = [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: "/",
        component: Sign,
        children: [
            {
                path: "login",
                name: "Login",
                component: Login,
                meta: { requiresGuest: true },
            },
            {
                path: "register",
                name: "Register",
                component: Register,
                meta: { requiresGuest: true },
            },
        ],
    },
    {
        path: "/",
        component: Dashboard,
        children: [
            {
                path: "orders",
                component: Orders,
                meta: { requiresAuth: true },
                children: [
                    {
                        path: "",
                        name: "OrdersList",
                        component: TableComponent,
                    },
                    {
                        path: "create",
                        name: "CreateOrder",
                        component: FormComponent,
                    },
                    {
                        path: "update",
                        name: "UpdateOrder",
                        component: FormComponent,
                    },
                ],
            },
            {
                path: "rooms",
                component: Rooms,
                meta: { requiresAuth: true },
                children: [
                    {
                        path: "",
                        name: "RoomsList",
                        component: TableComponent,
                    },
                    {
                        path: "create",
                        name: "CreateRoom",
                        component: FormComponent,
                    },
                    {
                        path: "update",
                        name: "UpdateRoom",
                        component: FormComponent,
                    },
                ],
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Tambahkan navigation guard
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("auth-token");

    // Cek jika route memerlukan autentikasi
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!token) {
            // Jika tidak ada token, redirect ke halaman login
            return next({
                path: "/login",
                query: { redirect: to.fullPath }, // Redirect kembali setelah login
            });
        }

        next();
    }
    // Cek jika route hanya untuk guest
    else if (to.matched.some((record) => record.meta.requiresGuest)) {
        if (token) {
            // Jika sudah login, redirect ke dashboard
            return next({ path: "/orders" });
        }

        next();
    }
    // Jika tidak ada kondisi khusus
    else {
        next();
    }
});

export default router;