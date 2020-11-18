import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "@/views/Login.vue"
import Project from "@/views/Project.vue"
import Repository from "@/views/Repository.vue"
import GithubAuthorize from "@/components/GithubAuthorize.vue"

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/oauth-callback/github",
    component: GithubAuthorize
  },
  {
    path: "/project",
    name: "Project",
    component: Project
  },
  {
    path: "/project/:id",
    name: "Repository",
    component: Repository
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
