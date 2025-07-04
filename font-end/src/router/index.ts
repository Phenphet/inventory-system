import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ErrorView from '@/views/ErrorView.vue'
import ProductView from '@/views/ProductView.vue'
import LocationView from '@/views/LocationView.vue'
import StockViewIN from '@/views/StockViewIN.vue'
import StockViewTRANFER from '@/views/StockViewTRANFER.vue'
import StockViewINOUT from '@/views/StockViewOUT.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/404',
      name: '404notfound',
      component: ErrorView
    },
    {
      path: '/product',
      name: 'product',
      component: ProductView
    },
    {
      path: '/location',
      name: 'location',
      component: LocationView
    },
    {
      path: '/stock-in',
      name: 'stock',
      component: StockViewIN
    },
    {
      path: '/stock-out',
      name: 'stock',
      component: StockViewINOUT
    },
    {
      path: '/stock-tranfer',
      name: 'stock',
      component: StockViewTRANFER
    }
  ],
})

export default router
