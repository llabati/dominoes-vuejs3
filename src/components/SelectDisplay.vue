<template lang="pug">
.intro.choose
    p.lead 
        slot
    div(style='display: flex; flex-direction: row; justify-content: center;')
        button.btn-name(style="background: white; color: green;" @click='close') Autre domino
    div
        button.btn-name(style='float: left; padding: 5px;' @click='left') Placez à gauche
        button.btn-name(style='float: right; padding: 5px;' @click='right') Placez à droite
    
</template>

<script>
export default {
    props: [],
    emits: [ 'place-to-left', 'place-to-right', 'close' ],
    setup (props, context) {
        
        function left(){
            context.emit('place-to-left')
        }
        function right(){
            context.emit('place-to-right')
        }
        function close(){
            context.emit('close')
        }

        return { left, right, close }
    }
}
</script>

<style>

</style>