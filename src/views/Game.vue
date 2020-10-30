<template lang="pug">
div(ref='play' style='width: 100%;')
  prompt(@newName='currentPlayer')

  board(:class='{"hidden": !launch}')
  
  playersCorner(@play="setBoard")

</template>

<script>
import Prompt from '../components/Prompt.vue'
import Board from '../components/Board.vue'
import PlayersCorner from '../components/PlayersCorner.vue'
import store from '../store/index'
import { ref, provide } from 'vue'

export default {
  store,

  setup(){

    let launch = ref(false)
    provide('launch', launch)

    const currentPlayer = function nameThisPlayer(name){
      store.dispatch('addPlayer', name)
      console.log('NAME ADDED!', name)
      store.dispatch('setStartToTrue')
    }

    function setBoard(){
      
      try {
        launch.value = true
        console.log('LAUNCH VALUE', launch.value)
      }
      catch {
        console.error('Error is...')
      }
    }


    return { currentPlayer, setBoard }
  },

  
  components: {
    Prompt,
    Board,
    PlayersCorner
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


</style>
