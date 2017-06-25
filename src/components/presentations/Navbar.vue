<template>
  <div>
    <md-toolbar>

      <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
        <md-icon>menu</md-icon>
      </md-button>

      <h2 class="md-title"  style="flex: 1">{{title}}</h2>

      <md-button class="md-icon-button" style="" @click="boxUserToggle">
        <md-icon>more_vert</md-icon>
      </md-button>
      
    </md-toolbar>

    <md-sidenav class="md-left" ref="leftSidenav">
        <md-toolbar class="md-large">
        <div class="md-toolbar-container">
            <h3 class="md-title">{{title}}</h3><br>
            <img :src="images.LOGO_NAVBAR" style="padding-left:5%; height=48px; width=48px;" alt="Pee Pee Poo Poo">
        </div>
        </md-toolbar>
        <!--all link to page-->
        <span v-for="(route, index) in routes" :key="index">
          <h3>
          <span @click="closeRightSidenav()">
            <router-link :to="route.to">{{route.title}}</router-link>
          </span>
          </h3>
          <hr>
        </span>
    </md-sidenav>

      <!-- CARD UI-->
    <div class="card-logout" v-if="!isHidden && user">
     <md-card>
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">{{user.displayName}}</div>
            <div class="md-subhead"></div>
          </md-card-header-text>

          <md-card-media>
            <img :src="user.photoURL" alt="People">
          </md-card-media>
        </md-card-header>

        <md-card-actions>
          <md-button @click="logOut">Logout</md-button>
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>

<script>

import Images from '../../configs/images.js';
import { auth } from '../../configs/firebase.js';

export default {
  name: 'navbar',
  data: function() {
    return {
      title: 'Pee Pee Poo Poo',
      routes: [
        { to: '/search', title: 'Search' },
        { to: '/add-toilet', title: 'Add' }
        // { to: '/comment', title: 'Comment' },
        // { to: '/test-comment', title: 'TestToComment' },
        // { to: '/log-in', title: 'Log-in' }
      ],
      images: Images,
      isHidden: true,
      user: auth.currentUser,
    }
  },
  methods: {
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    },
    closeRightSidenav() {
      this.$refs.leftSidenav.close();
    },
    boxUserToggle: function(){
      this.user = auth.currentUser;
      if(this.user){
       this.isHidden = !this.isHidden;
      }else{
        this.$router.replace('/log-in');
      }
    },

    logOut: function() {
      auth.signOut().then(() => {
        //handler case log-out success
        this.$router.replace('/log-in');
        this.$session.destroy()
        console.log('log out success');
        this.isHidden = true;
      }).catch(function(error) {
        //handler case log-out not success
        console.log('log out not success');
      });
    }
  }
}
</script>

<style scoped>
  h3 {
      margin-left: 5%;
  }
  .card-logout{
    position: absolute;
    right: 0px;
    z-index: 9999;
    width:300px;
  }
</style>