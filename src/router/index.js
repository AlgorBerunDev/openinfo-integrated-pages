import { createRouter, createWebHistory } from 'vue-router'
import PageNotFound from '../components/404/PageNotFound.vue'
import MainLayout from '../views/MainLayout.vue'
import { factsRoutes } from './factsRoutes'
// import { announcementRoutes } from './announcementRoutes'
// import { emissionRoutes } from './emissionsRoutes'
// import { reportsRoutes } from './reportsRoutes'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          redirect: 'facts',
        },
        ...factsRoutes,
        // ...announcementRoutes,
        // ...emissionRoutes,
        // ...reportsRoutes,
        {
          name: 'PageNotFound',
          path: '/:pathMatch(.*)*',
          component: PageNotFound,
        },
      ],
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    if (Object.keys(to.query).length !== 0) {
      return savedPosition
    }
    // if (to.path === from.path) {
    //   return savedPosition;
    // }
    return { top: 0 }
  },
})

export default router
