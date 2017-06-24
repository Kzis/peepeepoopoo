<template>

  <div class="seaech-googlemap">

  <div class="hello">
    <md-button class="md-icon-button md-raised md-primary background-grey btn-location" @click="locationNew">
      <md-icon>room</md-icon>
    </md-button>
    <gmap-map
      :center="center"
      :zoom="zoomNumber"
      style="width: 100%; height: 300px"
    >
      <gmap-marker 
        :key="index"
         v-for="(m, index) in toilet_markers"
        :position="{lat:Number(m.x_location), lng:Number(m.y_location)}"
        :icon="toilet_icon"
        :clickable="true"
        @click="showInfoCard(index)"
      >
        <gmap-info-window :opened="m.showinfocard || false">
          <div>
            <h5> {{ m.place_name }} </h5>
            by {{ m.create_user }} | price : {{ m.price }} <span v-if="m.price!='FREE'">฿</span>
            <hr>
            <button class="btn-default">See Comments</button>
          </div>
        </gmap-info-window>
      </gmap-marker>
      <gmap-marker
        :position="makerMe.position"
        :icon="makerMe.icon"
      ></gmap-marker>
    </gmap-map>
    
  </div>
  <div class="phone-viewport">
    <md-toolbar md-theme="white">
    <span class="md-title">Single Expand</span>
    </md-toolbar>

    <md-list>
      <template v-for="(item,index) in toilet_markers">
        <md-list-item @click="showInfoCard(index)">
          <span>{{item.place_name}}</span>

          <md-list-expand>
            <md-card>
                <!-- <md-card-media>
                  <img src="assets/card-image-1.jpg" alt="People">
                </md-card-media> -->
              <md-card-header>
                <!-- <div class="md-title">Title goes here</div> -->
                <div class="md-subhead">price : {{ item.price }} <span v-if="item.price!='FREE'">฿</span></div>
              </md-card-header>
              <md-card-content>
                <p>{{item.description}}</p>
              </md-card-content>
              <md-card-actions>
                <md-button> 
                <router-link :to="'/comment/'+item['.key']">See comment </router-link>
                </md-button>
              </md-card-actions>
            </md-card>
          </md-list-expand>
        </md-list-item>
      </template>
    </md-list>
  </div>

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
      makerMe : {
        icon: svg.positionMe
      },
      zoomNumber : 15,
      intevalIdGeolocation : undefined,
      toilet_icon : svg.TOILET,
      toilet_markers : [],
      toilet_detail : {}
    }
  },
  methods: {
    seeObj : function(item){
      console.log(item)
    },
    setCenter : function(pos) {
      this.center = pos
    },
    showInfoCard : function(index){
      this.toilet_markers[index].showinfocard = true
      this.setCenter({lat:this.toilet_markers[index].x_location, lng : this.toilet_markers[index].y_location})
      console.log(index, this.toilet_markers[index].showinfocard)
    },
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
 .btn-location{
    position: absolute;
    right: 0;
    margin: 6px;
    z-index: 1;
 }
</style>

