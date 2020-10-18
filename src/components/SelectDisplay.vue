<template lang="pug">
p.lead {{ message }}
div
    button.btn-name(@click='left') Placez à gauche
    button.btn-name(@click='right') Placez à droite
    
</template>

<script>
export default {
    props: [ 'message' ],
    setup () {
        let lefty = true
        function left(){
            //context.emit('place-to-left')
            return lefty = true
        }
        function right(){
            //context.emit('place-to-right')
            return lefty = false
        }

        return { lefty, left, right }
    }
}
</script>

<style>

</style>