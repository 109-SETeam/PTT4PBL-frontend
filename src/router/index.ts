import Vue from "vue";
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from "vue-router";
import Login from "@/views/Login.vue"
import Project from "@/views/Project.vue"
import Repository from "@/views/Repository.vue"
import GithubAuthorize from "@/components/GithubAuthorize.vue"
import RepoInfo from '@/views/RepoInfo.vue'
import store from '@/store';

Vue.use(VueRouter);

const checkAuth = (isNeedAuth: boolean, isNotMatchTo: string, next: NavigationGuardNext<Vue>) => {
  const isMatch = isNeedAuth ? store.getters.isAuthenticated : !store.getters.isAuthenticated;
  if (isMatch) next()
  else next({ name: isNotMatchTo })
}

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Login",
    component: Login,
    beforeEnter: (to, from, next) => checkAuth(false, "Project", next)
  },
  {
    path: "/oauth-callback/github",
    component: GithubAuthorize
  },
  {
    path: "/project",
    name: "Project",
    component: Project,
    beforeEnter: (to, from, next) => checkAuth(true, "Login", next)
  },
  {
    path: "/project/:id",
    name: "Repository",
    component: Repository
  },
  {
    path: "/repoinfo",
    name: "RepoInfo",
    component: RepoInfo
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
