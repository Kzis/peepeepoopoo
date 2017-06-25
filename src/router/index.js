import Vue from 'vue'
import Router from 'vue-router'

//Component
import AddToilet from '@/components/AddToilet'
import SearchToilet from '@/components/SearchToilet'
import Comment from '@/components/Comment'
import TestToComment from '@/components/TestToComment'
import Login from '@/components/Login'

//firebase config
import { auth } from '../configs/firebase';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/search',
      name: 'SearchToilet',
      component: SearchToilet,
    },
    {
      path: '/add-toilet',
      name: 'AddToilet',
      component: AddToilet,
      beforeEnter: (to, from, next) => {
        if (!auth.currentUser) {
          next('/log-in');
          // return;
        }
        
        next();
      }
    },  
    {
      path: '/comment/:userId',
      name: 'Comment',
      component: Comment,
      beforeEnter: (to, from, next) => {
        // if (!auth.currentUser) {
        //   next('/log-in');
        // }
        next();

      }
    },
    // {
    //   path: '/test-comment',
    //   name: 'TestToComment',
    //   component: TestToComment,
    //   beforeEnter: (to, from, next) => {
    //     if (!auth.currentUser) {
    //       next('/log-in');
    //     }

    //     next();

    //   }
    // },
    {
      path: '/log-in',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: '',
      redirect: function() {
        // if (!auth.currentUser) {
        return '/log-in'
        // }

        // return '/search'
      }
    }
  ]
})
