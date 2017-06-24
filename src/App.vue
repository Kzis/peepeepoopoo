<template>
  <div id="app">
    <header>
      <navbar></navbar>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/presentations/Navbar'
import { db } from './configs/firebase.js'

export default {
  name: 'app',
  components: {
    Navbar
  }
}
</script>

<style>
</style>
