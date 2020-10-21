<template lang="pug">
p.lead {{ message }}
div
    button.btn-name(@click='left') Placez à gauche
    button.btn-name(@click='right') Placez à droite
    
</template>

<script>
export default {
    props: [ 'message' ],
    setup (props, context) {
        let side = ''
        function left(){
            context.emit('place-to-left')
            
        }
        function right(){
            context.emit('place-to-right')
            
        }

        return { side, left, right }
    }
}
</script>

<style>

</style>