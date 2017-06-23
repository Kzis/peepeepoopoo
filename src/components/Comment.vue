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
    }
  }

</script>


<style scoped>

</style>

