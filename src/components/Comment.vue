<template>

  <div class="seaech-googlemap" style="height:100%;">

    <div class="row" style="margin:10px;">
        <div class="col-sm-12" style="border: 2px solid #73AD21; height:300px;">
         
         <md-input-container>
          <label>Location Name</label>
          <md-input maxlength="20"></md-input>
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
  export default {
    name: 'comment',
    data () {
      return {
        userId : null,
        yyy : "222",
        test: 0,
      }
    },
    created: function() {
      //Set Id from add
      this.userId = this.$route.params.userId;
      },
      mounted: function() {
        ///TODO
      }
  }

</script>


<style scoped>

</style>

