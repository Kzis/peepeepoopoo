<template>
  <!--<div style="
  height:90vh;
  width:100vw;
  background-image: url('static/img/icons/bg-toilet-90.jpg');
  background-repeat:no-repeat;
  background-size:cover;
  background-position:center;
  ">-->
<div>

    <!--<div class="row" style="margin:0px; padding:0px 10%">-->
      <!--<div class="col-sm-12 card"  style="margin:1px; border: 2px solid #3f51b5; width:80vw;">-->
      <!--<div class="col-sm-12"  style="margin:1px; width:80vw;">

         <div style="display: flex; align-items: center; justify-content: center;">
            <img :src="images.LOGO_LARGE" alt="Pee Pee Poo Poo" height="140" width="120">
         </div>

      </div>-->
    <!--</div>-->

    <div class="row" style="margin:0px; padding:3% 10%">

      <!--<div class="col-sm-12"  style="margin:1px; width:80vw;">-->
      <div class="col-sm-12 card"  style="margin:1px; border: 2px solid #3f51b5; width:80vw;">

        <div style="display: flex; align-items: center; justify-content: center;">

            <md-button class="md-raised md-primary" @click.native="logIn">
              <div class="block-in-button ">
                <img class="icon" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg" >
                  <label class="text-in-btn">Sign in with Facebook</label>
              </div>
            </md-button>

        </div>

      </div>
    </div>

    <!-- CARD UI-->
    <!--<div style="position:absolute; top:20px; left: 1%;">
     <md-card>
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">Title goes here</div>
            <div class="md-subhead">Subtitle here</div>
          </md-card-header-text>

          <md-card-media>
            <img src="assets/avatar-2.jpg" alt="People">
          </md-card-media>
        </md-card-header>

        <md-card-actions>
          <md-button>Logout</md-button>
        </md-card-actions>
      </md-card>
    </div>-->
     
    
  </div>
</template>

<script>
import Firebase from 'firebase';
import Images from '../configs/images.js';
import { auth } from '../configs/firebase.js';
let provider = new Firebase.auth.FacebookAuthProvider();

export default {
  name: 'log-in',
  data: function() {
    return {
      user: auth.currentUser,
      provider: provider,
      images: Images
    }
  },
  created:function() {
      console.log(this.$router.push(''))
  },
  methods: {
    logIn: function() {
      //log in with popup
      auth.signInWithPopup(this.provider).then((result) => {
        //handler case log-in success 
          alert("log in success view in log");
          console.log("result: ", result)

        }).catch(function(error) {
          //handler case log-in not success
          console.log("error: ", error)

        });
      }

    //Now user

    //   logOut: function() {
    //     auth.signOut().then(() => {
    //       //handler case log-out success
    //       alert("log out success");
    //       console.log('log out success');

    //     }).catch(function(error) {
    //       //handler case log-out not success
    //       console.log('log out not success');

    //     });
    //   }
    }
}
</script>

<style>
  .block-in-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .icon {
    border: none;
    display: inline-block;
    height: 18px;
    width: 18px;
  }

  .text-in-btn {
    padding-left: 16px;
    margin: 0px;
  }
    .card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
  }

    .card:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }  

</style>


