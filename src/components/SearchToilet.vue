<template>

  <div class="seaech-googlemap">
  <div class="hello">
    <gmap-map
      :center="center"
      :zoom="11"
      style="width: 100%; height: 300px"
    >
      <gmap-marker
        :key="index"
         v-for="(m, index) in toilet_markers"
        :position="{lat:Number(m.x_location), lng:Number(m.y_location)}"
        :icon="m.icon"
        :clickable="true"
      ></gmap-marker>
    </gmap-map>
  </div>
  <button @click="locationNew">update location</button>

</div>

</template>

<script>
import svg from '../configs/svg.js'
import { db } from './../configs/firebase.js'
export default {
  name: 'search-toilet',  
  firebase: {
    toilet_markers : {
      source: db.ref('toilet_markers')
    },
  },
  data () {
    return {
      center: {lat: 13.789, lng: 100.5880},
      toilet_markers : []
    }
  },
  methods: {
    locationNew : function() {
      if(navigator.geolocation) {
        var self = this;
       setInterval(function(){
         navigator.geolocation.getCurrentPosition(function(position){
          console.log("auto geolocation");
        self.markers = [{position: {lat: position.coords.latitude, lng: position.coords.longitude}, icon: svg.TOILET }];
self.center = {lat: position.coords.latitude, lng: position.coords.longitude};
       });
         console.log("update location")}, 1500);
      }
      //this.center = {lat: 5.0, lng: 5.0};
    },
    autoLocation : function() {
      //var startPos;
      //var nudge = document.getElementById("nudge");

      //var showNudgeBanner = function() {
      //  nudge.style.display = "block";
      //};

      //var hideNudgeBanner = function() {
      //  nudge.style.display = "none";
      //};

      var nudgeTimeoutId = setTimeout(showNudgeBanner, 5000);

      var geoSuccess = function(position) {
        //hideNudgeBanner();
        // We have the location, don't display banner
        clearTimeout(nudgeTimeoutId);

        // Do magic with location
        //startPos = position;
        console.log("new location");
        //document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        //document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      var geoError = function(error) {
        switch(error.code) {
          case error.TIMEOUT:
            // The user didn't accept the callout
            showNudgeBanner();
            break;
        }
      };

      navigator.geolocation.watchPosition(geoSuccess, geoError);
    }
  }
}
</script>


<style scoped>

  .seaech-googlemap{
    margin : 1%;
  }

</style>

