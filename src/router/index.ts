import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "@/views/Login.vue"
import Project from "@/views/Project.vue"
import GetOAuthFromGithub from "@/components/GetOAuthFromGithub.vue"

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/oauth-callback/github",
    component: GetOAuthFromGithub
  },
  {
    path: "/project",
    component: Project
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
