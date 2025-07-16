import Default from "@/layouts/default.vue"
import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    component: Default,
    children: [
      {
        path: "",
        name: "home",
        component: () => import('@/pages/home.vue')
      },
      {
        path: "/create-post",
        name: "post",
        component: () => import('@/pages/createPost.vue')
      },
      {
        path: "update-post/:postId",
        name: "update-post",
        component: () => import('@/pages/updatePost.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router