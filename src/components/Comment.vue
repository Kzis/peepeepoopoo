<template>

  <div class="seaech-googlemap" style="height:100%;">

    <div class="row" style="margin:10px;">
        <div class="col-sm-12" style="background-color:#cccccc; height:300px;">
           DIV 1
        </div>
    </div>

    <div class="row" style="margin:10px;">
        <div class="col-sm-12" style="background-color:#cccccc; height: 300px;"> 
             <div class="fb-comments" :data-href="'https://peepeepoopoo-37225.firebaseapp.com/#/' + xxx" data-width="560" data-numposts="5"></div>
             <div class="fb-comments" :data-href="'https://peepeepoopoo-37225.firebaseapp.com/#/' + yyy" data-width="560" data-numposts="5"></div>
        </div>
    </div>

  </div>

</template>

<script>
  export default {
    name: 'comment',
    data () {
      return {
        xxx : "111",
        yyy : "222",
      }
    },
    created: function() {
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/th_TH/sdk.js#xfbml=1&version=v2.9";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      }
  }

</script>


<style scoped>

</style>

