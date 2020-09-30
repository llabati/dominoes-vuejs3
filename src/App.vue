<template lang="pug">
#app
  game
  
  
</template>

<script>

import Game from './views/Game.vue';


export default {
  
  name: 'App',
  
  components: {
    Game
  },
  
  setup(){
    
    /*const title = ref('Welcome')
    const name = ref('Pascal')
    const welcome = computed( () => `${title.value}, ${name.value}!`)
    provide('welcome', welcome)
    let counter = computed( () => store.getters.getInit )
    console.log('COUNTER', counter)

    const [ incrementCounter, decrementCounter ] = counterManagement()

    const alert = watch(counter, () => console.log('COUNTER CHANGES', counter.value))
    return { counter, incrementCounter, decrementCounter, alert }
    */
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


