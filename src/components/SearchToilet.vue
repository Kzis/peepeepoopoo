<template>
  <div class="hello">
    <gmap-map
      :center="center"
      :zoom="7"
      style="width: 100%; height: 300px"
    >
      <gmap-marker
        :key="index"
         v-for="(m, index) in markers"
        :position="m.position"
        :icon="m.icon"
        :clickable="true"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import svg from '../configs/svg.js'
export default {
  name: 'search-toilet',
  data () {
    return {
      center: {lat: 11.0, lng: 10.0},
      markers: [{
        position: {lat: 10.0, lng: 10.0},
       icon: svg.TOILET
      }, {
        position: {lat: 11.0, lng: 11.0},
        icon: svg.TOILET,
      }]
    }
  }
}
</script>


<style scoped>

</style>

