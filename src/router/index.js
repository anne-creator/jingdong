import { createRouter, createWebHashHistory } from "vue-router";
// import Home from "../views/home/Home";
// import Login from "../views/login/Login";
// import Register from "../views/register/Register";
// import Shop from "../views/shop/Shop";

const routes = [
    {
        path: "/",
        name: "Home",
        component: () =>
            import(/* webpackChunkName: "Shop" */ "../views/home/Home"),
    },
    {
        path: "/login",
        name: "Login",
        component: () =>
            import(/* webpackChunkName: "Shop" */ "../views/login/Login"),

        beforeEnter(to, from, next) {
            const isLogin = localStorage.isLogin;
            isLogin ? next({ name: "Home" }) : next();
        },
    },
    {
        path: "/register",
        name: "Register",
        component: () =>
            import(/* webpackChunkName: "Shop" */ "../views/register/Register"),

        beforeEnter(to, from, next) {
            const isLogin = localStorage.isLogin;
            isLogin ? next({ name: "Home" }) : next();
        },
    },
    {
        // 跳到对应id的页面
        path: "/shop/:id",
        name: "Shop",
        component: () =>
            import(/* webpackChunkName: "Shop" */ "../views/shop/Shop"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
// to logged the full path of /login
// from logged the full path of home page
// beforeEach 是全局路由守卫
router.beforeEach((to, from, next) => {
    const { isLogin } = localStorage;
    const { name } = to;
    const isLoginOrRegister = name === "Login" || name === "Register";

    // const isLogin = localStorage.isLogin;
    isLogin || isLoginOrRegister ? next() : next({ name: "Login" });
    // next();
});

export default router;
