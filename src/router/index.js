import Vue from 'vue'
import Router from 'vue-router'
import Homes from '@/components/homes/Homes'
import Goods from '@/components/goods/Goods'
import Ratings from '@/components/ratings/Ratings'
import Seller from '@/components/seller/Seller'


Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/homes/goods' },
    {
      path: '/homes',
      component: Homes,
      children: [
        { path: 'goods', component: Goods },
        { path: 'ratings', component: Ratings },
        { path: 'seller', component: Seller }
      ]
    },
  ]
})
export default router
