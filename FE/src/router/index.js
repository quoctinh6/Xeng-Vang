import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/components/home.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/components/About.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("@/components/Cart.vue"),
  },
  {
    path: "/checkout",
    name: "checkout",
    component: () => import("@/components/checkout.vue"),
  },
  {
    path: "/order-history",
    name: "order-history",
    component: () => import("@/components/order-history.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/components/Contact.vue"),
  },
  {
    path: "/detail",
    name: "detail",
    component: () => import("@/components/Detail.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/Login.vue"),
  },
  {
    path: "/product",
    name: "product",
    component: () => import("@/components/Product.vue"),
  },
  {
    path: "/product/:id",
    name: "ProductDetail",
    component: () => import("@/components/Detail.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/components/Register.vue"),
  },
  {
    path: "/sale",
    name: "sale",
    component: () => import("@/components/Sale.vue"),
  },
  // Admin routes (layout + child pages)
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/components/admin/AdminLayout.vue"),
    meta: { layout: "admin" },
    children: [
      {
        path: "",
        name: "admin-dashboard",
        component: () => import("@/components/admin/Dashboard.vue"),
      },
      {
        path: "orders",
        name: "admin-orders",
        component: () => import("@/components/admin/Orders.vue"),
      },
      {
        path: "products",
        name: "admin-products",
        component: () => import("@/components/admin/Products.vue"),
      },
      {
        path: "users",
        name: "admin-users",
        component: () => import("@/components/admin/Users.vue"),
      },
      {
        path: "vouchers",
        name: "admin-vouchers",
        component: () => import("@/components/admin/Vouchers.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
