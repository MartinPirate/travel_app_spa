import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import CountryView from "../views/CountryView";
import MYLISTView from "../views/MYLISTView";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Country/:countryCode",
    name: "Country",
    component: CountryView,
  },

  {
    path: "/my",
    name: "My_List",
    component: MYLISTView,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
