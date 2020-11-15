<template lang="pug">
.select.choose
    div(style='height: 20px; position: relative; top: 100;')
        p.lead 
            slot
    .hand(style="margin-top: 25px; position: relative; top: 200;")
        .flex-list
            button.btn-name(style="margin-top: 50px; width: 10%;" @click='left(piece)') &larr;
            domino.domino-vert.active-domino(:value='piece.value' @click='chooseDom(piece)')
            button.btn-name(style="margin-top: 50px; width: 10%;" @click='right(piece)') &rarr;

</template>

<script>
import Domino from './Domino.vue'
import { inject } from 'vue'
export default {
    props: [ 'piece' ],
    emits: [ 'place-to-left', 'place-to-right' ],
    components: {
            Domino
        },
    setup (props, context) {
        let playerChoices = inject('playerChoices')
        function chooseDom(piece){
            console.log('choose-dom', piece)
            context.emit('choose-dom', piece)
        } 
        function left(piece){
            console.log('place-to-left', piece)
            context.emit('place-to-left', piece)
        } 
        function right(piece){
            console.log('place-to-right', piece)
            context.emit('place-to-right', piece)
        }
 
        return { playerChoices, chooseDom, left, right }
    }
}
</script>

<style>
.select {
    position: relative; 
    /*top: -100px;*/
    margin: 20px auto;
    padding: 15px;
    border: solid 3px white;
    border-radius: 5px;
    box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, .3);
    z-index: 10;
    color: white;
    animation: GetVisible 3s ease;
}

</style>