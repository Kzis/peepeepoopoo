<template>

<div class="login" style="height:100vh;">

      <div class="content">
        <!--Echo out errors here. See example-->
        <!--<p class=error>Error, wrong username or password used. Please, try again.-->

        <div class="title"><h1>Login</h1></div>

        <div style="height:200px;"><img :src="images.LOGO_LARGE" style="padding-left:23%;" alt="Pee Pee Poo Poo"></div>

        <div style="flex:1; "></div>

        <md-button style="width:90%; margin-top:10%; align-self:center; display:flex; justify-content:space-between; align-items:center;" class="md-raised md-primary" @click.native="logIn">
          <div class="block-in-button ">
            <img style="padding-bottom:5px;" class="icon" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg" >
            <label class="text-in-btn">Sign in with Facebook</label>
          </div>
        </md-button>

      </div>


      <div class="bg-boxes">
        <svg width="300px" height="100%" id="col1">
          <rect width="150px" height="150px" x="75px" y="45px" class="bubble" id="bub1" />
        </svg>
        <svg width="200px" height="100%" id="col2">
          <rect width="100px" height="100px" x="50px" y="20px" class="bubble" id="bub2" />
        </svg>
        <svg width="260px" height="100%" id="col3">
            <rect width="130px" height="130px" x="65px" y="35px" class="bubble" id="bub3" />
        </svg>
        <svg width="160px" height="100%" id="col4">
            <rect width="80px" height="80px" x="40px" y="10px" class="bubble" id="bub4" />
        </svg>
        <svg width="240px" height="100%" id="col5">
            <rect width="120px" height="120px" x="60px" y="30px" class="bubble" id="bub5" />
        </svg>
        <!--Here is a triangle-->
        <svg width="200px" height="100%" id="col6">
            <polygon points="50,150 100,50 150,150" class="bubble" id="bub6" />
        </svg>
        <svg width="200px" height="100%" id="col7">
            <rect width="100px" height="100px" x="50px" y="20px" class="bubble" id="bub7" />
        </svg>
        <svg width="200px" height="100%" id="col8">
            <rect width="100px" height="100px" x="50px" y="20px" class="bubble" id="bub8" />
        </svg>
        <svg width="200px" height="100%" id="col9">
            <rect width="100px" height="100px" x="50px" y="20px" class="bubble" id="bub9" />
        </svg>
        <svg width="200px" height="100%" id="col10">
            <rect width="100px" height="100px" x="50px" y="20px" class="bubble" id="bub10" />
        </svg>
        <svg width="100px" height="100%" id="col11">
            <rect width="50px" height="50px" x="25px" y="25px" class="bubble" id="bub11" />
        </svg>
      </div>


    
  </div>
</template>

<script>
import Firebase from 'firebase';
import Images from '../configs/images.js';
import { auth, db } from '../configs/firebase.js';
let provider = new Firebase.auth.FacebookAuthProvider();

export default {
  name: 'log-in',
  data: function() {
    return {
      user: auth.currentUser,
      provider: provider,
      images: Images,
      isLogin: false,
    }
  },
  // created:function() {
  //     console.log(this.$router.push(''))
  // },
  methods: {
    logIn: function() {
      //log in with popup
      auth.signInWithPopup(this.provider).then((result) => {
        let user = result.user;
        //handler case log-in success 
          // alert("log in success view in log");
          console.log("result: ", user);

          let name = user.displayName;
          let email = user.email;
          let photoUrl = user.photoURL;
          let uid = user.uid;
          this.$session.start()
          this.$session.set('uid', user.uid)
          this.$session.set('displayName', user.displayName)

          db.ref('users/' + uid).set({
            name: name,
            email: email,
            photoUrl: photoUrl
          });

          this.$router.replace('/search');
        }).catch(function(error) {
          //handler case log-in not success
          console.log("error: ", error)

        });
      }

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
    height: 25;
    width: 25px;
  }

  .text-in-btn {
    padding-left: 45px;
    margin: -5px;
  }
    .card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
  }

  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }

  .card-logout{
    position: absolute;
    right: 0px;
    z-index: 2;
  }

  .title {
	text-align: center;
  background-color: #3f51b5;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
	color: #ddd;
	font-size: 55px;
	text-transform: uppercase;
	text-shadow: -2px 0px 5px 0px rgba(0,0,0,0.4);
	margin: 0 0 10px;
	padding: 0;
  }

  @import url(https://fonts.googleapis.com/css?family=Roboto:300);

  .login{
    background: #50a3a2;
    background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
    background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    height: 100%; /*Allow spacing based on window height*/
    margin: 0;
    min-height: 240px;
  }

  /*The form part*/
  .content {
  /*A box that the form resides in - centered vertically and horizontally based on the window. The max-width and % width combo allow it to resize for small devices*/  
    background: #FFF;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    left: 50%;
    max-width: 360px;
    position: absolute;
    top: 50%;
    -ms-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 90%;
    height: 250px;
    z-index: 2;
    flex-direction: column;
    justify-content: center;
  }

  form {
    display: block;
    margin: auto;
    padding: 27px 0;
    width: 85%;
  }

  /*Error Messages*/
  .error {
    color: #F44336;
    margin: 16px auto 0;
    text-align: center;
    width: 90%;
  }

  /*The Background Part - Each svg element will act as a column that rises. Within each svg column will be a rect element that rotates. Due to an error FF regarding the transform-origin of objects in an svg, the transform-orgin must be explicitly given without percents*/

  .bg-boxes{
  /*Set the container for the svg elements to take up the whole window and hide objects outside of the window*/
    height: 100vh;
    min-height: 240px;
    position: absolute;
    overflow: hidden;
    width: 100%;
    z-index: 1;
  }

  svg{
  /*Set defaults for svg columns. Opacity set to 0 so the elements are invisible before the animation begins and will not show up on browsers without animation*/
    -webkit-animation: riser 20s infinite;
    animation: riser 20s infinite;
    opacity: 0;
    overflow: visible;
    position: absolute;
  }

  .bubble{
  /*Set the defaults for the "bubbles". transform-origin should always be the center-point of the object including blank-space within the svg. Since the object should be centered, this is equal to the width of the object. The default bubble is 100px by 100px in an svg object with a width of 200px*/
    -webkit-animation: rotator 20s linear infinite;
    animation: rotator 20s linear infinite;
    fill: #FFF;
    -webkit-transform-origin: 100px 100px;
    transform-origin: 100px 100px;
  }
  #col1{
  /*Since this element is larger than the set default, I want it to rise a little faster to give a subtle sense of depth*/
    -webkit-animation-duration: 15s;
    animation-duration: 15s;
  }
  #bub1{
  /*The transform-origin has to be redefined because this bubble is not the set default size*/
    -webkit-transform-origin: 150px 150px;
    transform-origin: 150px 150px;
  }

  #col2{
  /*To offset the columns, adjust their left attribute and add an animation-delay*/
    left: 15%;
    -webkit-animation-delay: 18s;
    animation-delay: 18s;
  }

  #col3{
    left: 30%;
    -webkit-animation-delay: 14s;
    animation-delay: 14s;
    -webkit-animation-duration: 17s;
    animation-duration: 17s;
  }

  #bub3{
    -webkit-animation-delay: 14s;
    animation-delay: 14s;
    -webkit-transform-origin: 130px 130px;
    transform-origin: 130px 130px;
  }

  #col4{
    left: 45%;
    -webkit-animation-delay: 8s;
    animation-delay: 8s;
    -webkit-animation-duration: 22s;
    animation-duration: 22s;
  }

  #bub4{
    -webkit-animation-delay: 8s;
    animation-delay: 8s;
    -webkit-transform-origin: 80px 80px;
    transform-origin: 80px 80px;
  }

  #col5{
    left: 60%;
    -webkit-animation-delay: 15s;
    animation-delay: 15s;
    -webkit-animation-duration: 18s;
    animation-duration: 18s;
  }

  #bub5{
    -webkit-animation-delay: 15s;
    animation-delay: 15s;
    -webkit-transform-origin: 120px 120px;
    transform-origin: 120px 120px;
  }

  #col6{
    left: 75%;
    -webkit-animation-delay: 19s;
    animation-delay: 19s;
  }

  #col7{
    left: 90%;
    -webkit-animation-delay: 4s;
    animation-delay: 4s;
  }

  #col8{
    left: -5%;
    -webkit-animation-delay: 11s;
    animation-delay: 11s;
  }

  #col9{
    left: 25%;
    -webkit-animation-delay: 5s;
    animation-delay: 5s;
  }

  #col10{
    left: 50%;
    -webkit-animation-delay: 12s;
    animation-delay: 12s;
  }

  #col11{
    left: 67%;
    -webkit-animation-delay: 1s;
    animation-delay: 1s;
    -webkit-animation-duration: 25s;
    animation-duration: 25s;
  }

  #bub11{
    -webkit-animation-delay: 1s;
    animation-delay: 1s;
    -webkit-transform-origin: 50px 50px;
    transform-origin: 50px 50px;
  }

  /*Rotation Animation - Should be set to a factor of 360 to prevent jumpiness*/ 
  @-webkit-keyframes rotator{
    to{
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes rotator{
    to{
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes riser{
    0%{
      opacity: 0.2;
      -webkit-transform: translateY(100%);
      transform: translateY(100%);
    }
    100%{
      opacity: 0.2;
      -webkit-transform: translateY(-250px);
      transform: translateY(-250px);
    }
  }

  @keyframes riser{
    0%{
      opacity: 0.2;
      -webkit-transform: translateY(100%);
      transform: translateY(100%);
    }
    100%{
      opacity: 0.2;
      -webkit-transform: translateY(-250px);
      transform: translateY(-250px);
    }
  }

</style>


