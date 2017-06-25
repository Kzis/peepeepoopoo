<template>
  <div>
	<div id="snackbar">ไม่สามารถระบุตำแหน่งของคุณได้</div>
    <md-toolbar>
	    <h1 class="md-title">Add New Restroom You Just Found!</h1>
			<md-input-container >
	      <gmap-autocomplete :value="description"
	        @place_changed="setPlace">
	      </gmap-autocomplete>
      </md-input-container>
		</md-toolbar>
	<md-button class="md-icon-button md-raised md-primary background-grey btn-location" @click="locationNew">
      <md-icon>room</md-icon>
    </md-button>
		<gmap-map :center="mapCenter" :zoom="12" style="width: 100%; height: 300px" @center_changed="updateCenter">
	    <gmap-marker
        :position="mapCenter"
        :clickable="true"
      ></gmap-marker>
    </gmap-map>
		<md-input-container >
			<label for="price">Place Name</label>
			<md-input type="text" id="place-name" v-model="placeName"></md-input>
		</md-input-container>
		<md-input-container :md-inline="true" >
			<label for="loc-lat">Lat</label>
			<md-input type="text" id="loc-lat" v-model.number.lazy="mapCenter.lat"></md-input>
		</md-input-container>
		<md-input-container :md-inline="true">
			<label for="loc-lng">Long</label>
			<md-input type="text" id="loc-lng" v-model.number.lazy="mapCenter.lng"></md-input>
		</md-input-container>
		<md-input-container >
			<label for="price">Price</label>
			<md-input type="text" id="price" v-model="price"></md-input>
		</md-input-container>
		<md-input-container >
			<label for="desc">Desc</label>
			<md-input type="text" id="desc" v-model="desc"></md-input>
		</md-input-container>

		<md-button class="md-raised md-primary" @click="addItem">Add item</md-button>

	  <md-dialog-alert
	  	md-title="Success!"
		  md-content="Your marker has been saved."
		  md-ok-text="Ok!"
		  @close="onClose"
		  ref="successDialog">
		</md-dialog-alert> 
  </div>
</template>

<script>

import {  auth, db } from './../configs/firebase.js'
export default {
  name: 'add-toilet',
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
      description: 'Bangkok',
    	toilet_markers : [],
			mapCenter: { lat: 13.7563309, lng: 100.50176510000006 },
			newMarker : {        
				position: {
          lat:  13.7563309,
          lng:  100.50176510000006
        },
      },
      placeName: '',
			price: 'FREE',
			desc: '',
			saveError : {}
    }
  },
  methods: {
  	setDescription(description) {
      this.description = description;
    },
    setPlace(place) {
      this.mapCenter = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
    },
    addItem () {
      this.$firebaseRefs.toilet_markers.push({
      	'place_name': this.placeName,
        'x_location': this.mapCenter.lat,
        'y_location': this.mapCenter.lng,
        'price': this.price,
        'description': this.desc,
        'creater_name': auth.currentUser.displayName,
        'creater_id' : auth.currentUser.uid,
      }, (err) => {
      	if(err) {
      		console.log("error :",err)
      		return
      	}
      	this.$refs['successDialog'].open()
      })
    },
    onClose(type) {
    	this.$router.push('/')
    },
    updateCenter (newCenter) {
	    this.mapCenter = {
	      lat: newCenter.lat(),
	      lng: newCenter.lng(),
	    }
	  },
		locationNew : function() {
			var self = this;
      if(navigator.geolocation) {
        var options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
        function success(pos) {
          var crd = pos.coords;
          //var point = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
console.log(self.mapCenter.lat);
            if(self.mapCenter.lat === crd.latitude && self.mapCenter.lng === crd.longitude){
              self.mapCenter = {lat: crd.latitude + 10.0, lng: crd.longitude + 10.0}
            }else{
              self.mapCenter = {lat: crd.latitude, lng: crd.longitude};
            }
            
            setTimeout(function(){
              self.mapCenter = {lat: crd.latitude, lng: crd.longitude};
            }, 10);
          
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
      }
    }
	}
}
</script>


<style scoped>
.md-toolbar {
	background-color: #6770dc
}
.md-input-container>input {
	font-size: 14px !important
}

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
</style>
