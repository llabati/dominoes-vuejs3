<template lang="pug">
.intro.alert
    p.lead {{ message }}
    //progressDomino(v-if='restart')
    div(style='width: 100%; height: 20px; margin-top: 10px;') 
        //domino.domino-vert.active-domino(:value='firstDomino.value' style='float: left;')
        strong(style='float: right; cursor: pointer; margin-top: 5px;' @click='closeAlert') FERMER  

</template>

<script>
import store from '../store/index.js'
//import Domino from './Domino.vue'
import { inject } from 'vue'
import { computed } from 'vue'
export default {
    /*components: {
            ProgressDomino
        },*/
    setup (props, context) {
        let alert = computed( () => store.getters.getAlert )
        let message = inject('message')
        let reset = inject('reset')
        let newRound = inject('newRound')

        function closeAlert(){
            store.dispatch('unsetAlert')
            context.emit('clear-message')
            if (reset.value) {
                context.emit('go-next')
            }
            if (newRound.value) {
                context.emit('next-please')
            }
        }

        return { alert, message, closeAlert }
    }
}
</script>

<style>
.alert {
    background-color: blue;
    padding: 15px;
}
</style>