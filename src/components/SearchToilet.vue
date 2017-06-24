<template>

  <div class="seaech-googlemap">
  <div class="hello">
    <gmap-map
      :center="center"
      :zoom="15"
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
    }, 
  }
}
</script>


<style scoped>

</style>

