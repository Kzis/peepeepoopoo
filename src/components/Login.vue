<template>
  <div>
    <h1>Log In</h1>
    <md-button class="md-raised md-primary" @click.native="logIn">
        <div class="block-in-button">
            <img class="icon" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg" >
            <label class="text-in-btn">Sign in with Facebook</label>
        </div>
    </md-button>
  </div>
</template>

<script>
import Firebase from 'firebase';
import { auth } from '../configs/firebase.js';
let provider = new Firebase.auth.FacebookAuthProvider();

export default {
  name: 'log-in',
  data: function() {
    return {
      user: auth.currentUser,
      provider: provider
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
    

</style>


