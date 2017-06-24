<template>
  <div>
    <md-toolbar>
	    <h1 class="md-title">Add New Restroom You Just Found!</h1>
			<md-input-container >
	      <gmap-autocomplete :value="description"
	        @place_changed="setPlace">
	      </gmap-autocomplete>
      </md-input-container>
		</md-toolbar>
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
</style>
