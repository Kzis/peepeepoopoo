import Vue from 'vue'
import Router from 'vue-router'

//Component
import AddToilet from '@/components/AddToilet'
import SearchToilet from '@/components/SearchToilet'
import Comment from '@/components/Comment'
import TestToComment from '@/components/TestToComment'

//firebase config
import { auth } from '../configs/firebase';

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
    },  
    {
      path: '/comment/:userId',
      name: 'Comment',
      component: Comment
    },
    {
      path: '/test-comment',
      name: 'TestToComment',
      component: TestToComment
    },
  ]
})
