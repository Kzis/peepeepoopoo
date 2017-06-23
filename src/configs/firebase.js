import Firebase from 'firebase'

//configuration firebase
let firebaseApp = Firebase.initializeApp({ 
    apiKey: "AIzaSyBdMkcwEOmWvwVvpltZQ83ZlwirTwf9K-M",
    authDomain: "peepeepoopoo-37225.firebaseapp.com",
    databaseURL: "https://peepeepoopoo-37225.firebaseio.com",
    projectId: "peepeepoopoo-37225",
    storageBucket: "peepeepoopoo-37225.appspot.com",
    messagingSenderId: "367107050861"
})

export let db = firebaseApp.database()//realtime database
export let auth = firebaseApp.auth()//authen
export default firebaseApp//all config