<template>

  <div class="seaech-googlemap" style="height:100%;">

    <div class="row" style="margin:10px;">
        <div class="col-sm-12" style="border: 2px solid #3f51b5; height:300px;">
         
        <h2>Toliet description</h2>

        <md-input-container>
          <md-icon>location_city</md-icon>
          <label>Place name</label>
          <md-textarea :readonly="true" v-model="poo.place_name"></md-textarea>
        </md-input-container>

        <md-input-container>
          <md-icon>attach_money</md-icon>
          <label>Price</label>
          <md-textarea :readonly="true" v-model="poo.price"></md-textarea>
        </md-input-container>

        <md-input-container>
          <md-icon>insert_comment</md-icon>
          <label>Description</label>
          <md-textarea :readonly="true" v-model="poo.description"></md-textarea>
        </md-input-container>

        </div>
    </div>

    <div class="row" style="margin:10px;" > 
      <div id="fb-1" style="border: 2px solid #73AD21;" class="fb-comments" :data-href="'https://peepeepoopoo-37225.firebaseapp.com/#/' + userId" data-width="560" data-numposts="5"></div>
    </div>

  </div>

</template>

<script>

import { db } from './../configs/firebase.js'

  export default {
    name: 'comment',
    data () {
      return {
        userId : null,
        poo: {
          creater_user : null,
          description : null,
          place_name : null,
          price : null,
          x_location : null,
          y_location : null,
        }
      }
    },
    created: function() {
      //Set Id from add
      this.userId = this.$route.params.userId;
      },
      mounted: function() {

        //SELECT * FROM toilet_markers WHERE key = 'usserId' 
        db.ref('toilet_markers/' + this.userId).once('value', (snap) => {
        this.poo = snap.val()
        console.log(this.poo) 
        })
   
      }
  }

</script>


<style scoped>

</style>

