<template lang="pug">

game
  
</template>

<script>

import Game from './views/Game.vue';


export default {
  
  name: 'App',
  
  components: {
    Game
  }
  
}
</script>
  
<style>
#app {
  font-family: 'Roboto', sans-serif;
}
#intro {
    padding: 15px;
    background-color: brown;
    color: white;
    margin: 20px auto;
}
input {
    display: block;
    width: 100%;
    border: solid 1px red;
    margin-bottom: 10px;
}
.center {
  width: 90%;
  margin: 10px auto;
}



</style>


