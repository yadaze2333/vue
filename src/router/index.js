import { createRouter, createWebHistory } from 'vue-router'
import GoodsList from '@/components/GoodsList.vue'
import Login from  '@/components/Login.vue'
import Shopping from '@/components/Shopping.vue'
import ShoppingList from "@/components/ShoppingList.vue"
import address from "@/components/adderss.vue"
import addresslist from "@/components/addresslist.vue"
import user from "@/components/user.vue"
import logout from "@/components/logout.vue"
import addressdetail from "@/components/addressdetail.vue"
import orderlist from "@/components/orderlist.vue"
import  register  from "@/components/register.vue"
const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/goodslist',
    component: GoodsList
  },
  {
    path :'/login',
    component: Login
  },
  {
    path :'/shopping',
    component:Shopping
  },
  {
    path :'/shoppinglist',
    component:ShoppingList
  },
  {
    path :'/address',
    component:address
  },
  {
    path :'/addresslist',
    component: addresslist
  },
  {
    path :'/user',
    component:  user
  },
  {
    path:'/logout',
    component:logout
  },
  {
    path :'/addressdetail',
    component:  addressdetail
  },
  {
    path :'/orderlist',
    component: orderlist
  },
  {
    path :'/register',
    component: register
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
