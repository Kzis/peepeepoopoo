<template>

  <div class="seaech-googlemap" style="height:100%;">

    <div class="row" style="margin:10px;">
        <div class="col-sm-12" style="background-color:#cccccc; height:300px;">
          
        <md-button class="md-fab" @click="test()">
            <md-icon>add</md-icon>
        </md-button>

        <md-button class="md-fab" @click="test2()">
            <md-icon>add</md-icon>
        </md-button>

        </div>
    </div>

    <div class="row" style="margin:10px;">
        <div class="col-sm-12" style="background-color:#cccccc; height:300px;">

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
    methods : {
        test : function(){
            this.$router.push('comment/'+ "-KnNlNJghqWLhMem91nh" )        
        },
        test2 : function(){
           this.$router.push('comment/'+ "-KnNlY_R43jWHMSsfJcz" )     
        }
    }

  }

</script>


<style scoped>

</style>

