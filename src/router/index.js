import Vue from 'vue'
import Router from 'vue-router'

//Component
import AddToilet from '@/components/AddToilet'
import SearchToilet from '@/components/SearchToilet'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SearchToilet',
      component: SearchToilet
    },
    {
      path: '/add-toilet',
      name: 'AddToilet',
      component: AddToilet
    }
  ]
})
