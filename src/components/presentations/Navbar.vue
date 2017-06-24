<template>
  <div>
    <md-toolbar>
        <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
        <md-icon>menu</md-icon>
        </md-button>

    <h2 class="md-title">{{title}}</h2>
    </md-toolbar>
    <md-sidenav class="md-left" ref="leftSidenav">
        <md-toolbar class="md-large">
        <div class="md-toolbar-container">
            <h3 class="md-title">{{title}}</h3>
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
  </div>
</template>

<script>
export default {
  name: 'navbar',
  data: function() {
    return {
      title: 'Pee Pee Poo Poo',
      routes: [
        { to: '/', title: 'Search' },
        { to: '/add-toilet', title: 'Add' },
        { to: '/comment', title: 'Comment' },
        { to: '/log-in', title: 'Log-in' }
      ]
    }
  },
  methods: {
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    },
    closeRightSidenav() {
      this.$refs.leftSidenav.close();
    }
  }
}
</script>

<style scoped>
  h3 {
      margin-left: 5%;
  }
</style>