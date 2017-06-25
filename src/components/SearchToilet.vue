<template>

  <div class="seaech-googlemap">
<div id="snackbar">ไม่สามารถระบุตำแหน่งของคุณได้</div>
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
            by {{ m.creater_name }} | price : {{ m.price }} <span v-if="m.price!='FREE'">฿</span>
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
    <span class="md-title">Toilet List</span>
    </md-toolbar>

    <md-list>
      <template v-for="(item,index) in toilet_markers">
        <md-list-item @click="showInfoCard(index)">
          <span>{{item.place_name}}</span>
          <md-list-expand>
            <md-tabs md-right>
              <md-tab md-icon="info_outline">
                <md-card>
                  <!-- <md-card-media>
                    <img src="assets/card-image-1.jpg" alt="People">
                  </md-card-media> -->
                  <md-card-header>
                    <div class="md-subhead">
                      price : {{ item.price }}<span v-if="item.price!='FREE'">฿</span>
                    </div>
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
              </md-tab>
              <md-tab md-icon="mode_edit" v-if="user.uid==item.creater_id">
                <form novalidate @submit.stop.prevent="submit">
                  <md-input-container md-inline>
                    <label>Place Name</label>
                    <md-input v-model="item.place_name"></md-input>
                  </md-input-container>

                  <md-input-container md-inline>
                    <label>Price</label>
                    <md-input v-model="item.price"></md-input>
                  </md-input-container>
                  <md-input-container>
                    <label>Description</label>
                    <md-textarea v-model="item.description"></md-textarea>
                  </md-input-container>
                  <md-button class="md-raised md-primary" @click="editItem(item)">Save</md-button>
                </form>
              </md-tab>
              <md-tab md-icon="delete" v-if="user.uid==item.creater_id">
                <h3>Make sure you really want to delete this!</h3>
                <md-button class="md-raised md-warn" @click="deleteItem(item)">Delete!</md-button>
              </md-tab>
            </md-tabs>
          </md-list-expand>
        </md-list-item>
      </template>
    </md-list>
  </div>

  <md-dialog-alert
    md-title="Success!"
    :md-content="successMsg"
    md-ok-text="Ok!"
    @close="onClose"
    ref="successDialog">
  </md-dialog-alert>
</div>

</template>

<script>
import svg from '../configs/svg.js'
import { auth, db } from './../configs/firebase.js'
export default {
  name: 'search-toilet',  

  firebase: {
    toilet_markers : {
      source: db.ref('toilet_markers')
    },
  },
  data () {
    return {
      user : { 
        uid : this.$session.get('uid'),
        displayName : this.$session.get('displayName')
      },
      center: {lat: 13.789, lng: 100.5880},
      makerMe : {
        icon: svg.positionMe
      },
      zoomNumber : 15,
      intevalIdGeolocation : undefined,
      toilet_icon : svg.TOILET,
      toilet_markers : [],
      toilet_detail : {},
      successMsg: "Your action was successfully executed.",

    }
  },
  methods: {
    seeObj : function(item){
      // console.log(item)

    },
    setCenter : function(pos) {
      this.center = pos
    },
    showInfoCard : function(index){
      this.toilet_markers[index].showinfocard = true
      this.setCenter({lat:this.toilet_markers[index].x_location, lng : this.toilet_markers[index].y_location})
        // console.log( this.$firebaseRefs.toilet_markers['get database'] )

    },
    editItem : function(item) {
      const childKey = item['.key']
      delete item['.key']
      this.$firebaseRefs.toilet_markers.child(childKey).set(item, (err) => {
        if(err) {
          console.log("error :",err) 
          return
        }
        this.successMsg = "Your marker was updated."
        this.$refs['successDialog'].open()
      })
    },
    deleteItem : function(item) {
      const childKey = item['.key']
      this.$firebaseRefs.toilet_markers.child(childKey).remove((err) => {
        if(err) {
          console.log("error :",err) 
          return
        }
        this.successMsg = "Your marker was deleted."
        this.$refs['successDialog'].open()
      })
    },
    onClose(type) {
      this.$router.push('/search')
    },
    locationNew : function() {
        var self = this;
        var first = true;
        if(self.intevalIdGeolocation){
          clearInterval(self.intevalIdGeolocation);
          // console.log("clear interval");
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
          if(first){
            if(self.center.lat === crd.latitude && self.center.lng === crd.longitude){
              self.center = {lat: crd.latitude + 10.0, lng: crd.longitude + 10.0}
            }else{
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
          clearInterval(self.intevalIdGeolocation);
          // Get the snackbar DIV
          var x = document.getElementById("snackbar")

          // Add the "show" class to DIV
          x.className = "show";

          // After 3 seconds, remove the show class from DIV
          setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }
        navigator.geolocation.getCurrentPosition(success, error, options);
        self.intevalIdGeolocation = setInterval(function(){ 
          // console.log("geo loop");
          navigator.geolocation.getCurrentPosition(success, error, options);
        }, 10000);
      }
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

 /* The snackbar - position it at the bottom and in the middle of the screen */
#snackbar {
    visibility: hidden; /* Hidden by default. Visible on click */
    min-width: 250px; /* Set a default minimum width */
    margin-left: -125px; /* Divide value of min-width by 2 */
    background-color: #333; /* Black background color */
    color: #fff; /* White text color */
    text-align: center; /* Centered text */
    border-radius: 2px; /* Rounded borders */
    padding: 16px; /* Padding */
    position: fixed; /* Sit on top of the screen */
    z-index: 100; /* Add a z-index if needed */
    left: 50%; /* Center the snackbar */
    bottom: 30px; /* 30px from the bottom */
}

/* Show the snackbar when clicking on a button (class added with JavaScript) */
#snackbar.show {
    visibility: visible; /* Show the snackbar */

/* Add animation: Take 0.5 seconds to fade in and out the snackbar. 
However, delay the fade out process for 2.5 seconds */
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

/* Animations to fade the snackbar in and out */
@-webkit-keyframes fadein {
    from {bottom: 0; opacity: 0;} 
    to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
    from {bottom: 30px; opacity: 1;} 
    to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
    from {bottom: 30px; opacity: 1;}
    to {bottom: 0; opacity: 0;}
}
  .search-googlemap {
  }
</style>

