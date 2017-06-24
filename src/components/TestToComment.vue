<template>

  <div class="seaech-googlemap" style="height:100%;">

    <div class="row" style="margin:10px;">
        <div class="col-sm-12" style="background-color:#cccccc; height:300px;">
          
        <md-button class="md-fab" @click="test()">
            <md-icon>add</md-icon>
        </md-button>

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

            // this.$router.push({ path: 'comment', params: { userId: 123 }})

        }
    }

  }

</script>


<style scoped>

</style>

