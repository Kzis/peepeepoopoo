<template>

  <div class="seaech-googlemap">
  <div class="hello">
    <gmap-map
      :center="center"
      :zoom="zoomNumber"
      style="width: 100%; height: 300px"
    >
      <gmap-marker
        :key="index"
         v-for="(m, index) in markers"
        :position="m.position"
        :icon="m.icon"
        :clickable="true"
      ></gmap-marker>
      <gmap-marker
        :position="makerMe.position"
        :icon="makerMe.icon"
        :clickable="true"
      ></gmap-marker>
    </gmap-map>
  </div>
<md-button class="md-icon-button md-raised md-primary" @click="locationNew">
  <md-icon>add</md-icon>
</md-button>

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
      }],
      makerMe : {
        icon: svg.positionMe
      },
      zoomNumber : 7,
      intevalIdGeolocation : undefined,
    }
  },
  methods: {
    locationNew : function() {
        var self = this;
        var first = true;
        if(self.intevalIdGeolocation){
          clearInterval(self.intevalIdGeolocation);
          console.log("clear interval");
        }

      if(navigator.geolocation) {
        var options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
        function success(pos) {
          var crd = pos.coords;
          //var point = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
          console.log('Your current position is:');
          console.log(`Latitude : ${crd.latitude}`);
          console.log(`Longitude: ${crd.longitude}`);
          console.log(`More or less ${crd.accuracy} meters.`);
          console.log(`Latitude : ${self.center.lat}`);
          console.log(`Longitude : ${self.center.lng}`);
          if(first){
            if(self.center.lat === crd.latitude && self.center.lng === crd.longitude){
              console.log("equal positon");
              self.center = {lat: crd.latitude + 10.0, lng: crd.longitude + 10.0}
            }else{
              console.log("not equal positon");
              self.center = {lat: crd.latitude, lng: crd.longitude};
            }
            
            setTimeout(function(){
              self.center = {lat: crd.latitude, lng: crd.longitude};
              self.zoomNumber = 16;
            }, 10);
            first = false;
          }

          self.makerMe.position = {lat: crd.latitude, lng: crd.longitude};
        }
        function error(err) {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        }
        navigator.geolocation.getCurrentPosition(success, error, options);
        self.intevalIdGeolocation = setInterval(function(){ 
          navigator.geolocation.getCurrentPosition(success, error, options);
        }, 10000);
      }
      //this.center = {lat: 5.0, lng: 5.0};
    },
    changeLocation : function() {
      var self = this;
      self.center = {lat: 11.0, lng: 10.0};
    }
  }
}


</script>


<style scoped>

  .seaech-googlemap{
    margin : 1%;
  }

</style>

