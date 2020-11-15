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

    const currentPlayer = async function nameThisPlayer(name){
      await store.dispatch('addPlayer', name)
      store.dispatch('setStartToTrue')
    }

    function setBoard(){
        launch.value = true
      }
      

    return { launch, currentPlayer, setBoard }
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
