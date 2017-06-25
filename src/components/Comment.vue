<template>

  <div class="seaech-googlemap" style="height:100%;">

    <div class="row" style="margin:10px; padding:0px 10%">

        <div class="col-sm-12 card"  style="border: 2px solid #3f51b5; height:350px; width:80vw;">
         
        <h2 align="center">Toliet Description</h2>

        <div class= "col-lg-offset-3 col-lg-8">
          <md-input-container style="width:80%;">
            <md-icon>location_city</md-icon>
            <label>Place name</label>
            <md-textarea :readonly="true" v-model="poo.place_name"></md-textarea>
          </md-input-container>
        </div>

        <div class= "col-lg-offset-3 col-lg-8">
          <md-input-container style="width:80%;">
            <md-icon>attach_money</md-icon>
            <label>Price</label>
            <md-textarea :readonly="true" v-model="poo.price"></md-textarea>
          </md-input-container>
        </div>

        <div class= "col-lg-offset-3 col-lg-8">
          <md-input-container style="width:80%; height:100px;">
            <md-icon>insert_comment</md-icon>
            <label>Description</label>
            <md-textarea :readonly="true" v-model="poo.description"></md-textarea>
          </md-input-container>
        </div>

        </div>
    </div>

    <div class="row" style="margin:10px; padding:0px 10%">
      <div class="col-sm-12 card"  style="margin:1px; border: 2px solid #3f51b5; width:80vw;">
        <div id="fb-1" style="" class="fb-comments" :data-href="'https://peepeepoopoo-37225.firebaseapp.com/#/' + userId" data-width="100%" data-numposts="5"></div>
      </div>
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
          creater_id : null,
          creater_name : null,
          description : null,
          place_name : null,
          price : null,
          showinfocard : null,
          x_location : null,
          y_location : null,
        }
      }
    },
    beforeCreate: function() {
   
      let x = localStorage.getItem("comment_flag");
       
        if(!x || x == "false"){
   
          localStorage.setItem("comment_flag", true);

          location.reload();
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
        // console.log(this.poo);
        })
   
      },
      beforeDestroy: function() {
        //  localStorage.setItem("comment_flag", false);
        localStorage.removeItem("comment_flag");
      }
  }

</script>


<style scoped>
  .card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
}

.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}


</style>

