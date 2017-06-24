<template>

  <div class="seaech-googlemap" style="height:100%;">

    <div class="row" style="margin:10px;">
        <div class="col-sm-12" style="border: 2px solid #73AD21; height:300px;">
         
          <label>{{poo.creater_user}}</label> &nbsp;&nbsp;
          <label>{{poo.description}}</label> &nbsp;&nbsp;
          <label>{{poo.place_name}}</label> &nbsp;&nbsp;
          <label>{{poo.price}}</label> &nbsp;&nbsp;
          <label>{{poo.x_location}}</label> &nbsp;&nbsp;
          <label>{{poo.y_location}}</label> &nbsp;&nbsp;

         <md-input-container>
          <label>Location Name</label>

          <md-input maxlength="20" v-model="poo.place_name"></md-input>
        </md-input-container>

        </div>
    </div>

    <div class="row" style="margin:10px;" > 
        <div class="col-sm-12" style="border: 2px solid #73AD21; height: 300px;"> 
             <div id="fb-1" class="fb-comments" :data-href="'https://peepeepoopoo-37225.firebaseapp.com/#/' + userId" data-width="560" data-numposts="5"></div>
             <div class="fb-comments" :data-href="'https://peepeepoopoo-37225.firebaseapp.com/#/' + yyy" data-width="560" data-numposts="5"></div>
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
        yyy : "222",
        test: 0,
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

