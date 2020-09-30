<template lang="pug">
div(ref='play' style='width: 100%;')
  prompt(@newName='currentPlayer')

  board
  
  playersCorner

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
    //const name = ref('')
    /*const start = computed( function(){
      console.log('THE REAL START', store.getters.getStart)
      store.getters.getStart
    })*/
    let start = ref(false)
    //provide('name', name)
    provide('start', start)

    const currentPlayer = function nameThisPlayer(name){
      //name = name
      start.value = true
      store.dispatch('setStartToTrue')
      store.dispatch('addPlayer', name)
      console.log('NAME ADDED!', name)
    }


    return { start, currentPlayer }
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
