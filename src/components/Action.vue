<template lang="pug">
button.intro(:class="{ 'intro': displayBtn || start || draw || stopDrawing, 'draw': draw, 'stop-drawing': stopDrawing }" @click="{ start: 'launch', draw: 'drawAgain(1)', stopDrawing: 'upto=!upto' }") 
    strong {{ name }}, {{ action }}

</template>

<script>
import { inject } from 'vue'

export default {
    //inject: [ 'name', 'action', 'start', 'draw', 'stopDrawing' ],
    setup () {
        let name = inject('name')
        let displayBtn = inject('displayBtn')
        let action = inject('action')
        let start = inject('start')
        let draw = inject('draw')
        let stopDrawing = inject('stopDrawing')
        console.log('START in ACTION', start)
        return {
            name, action, start, draw, stopDrawing, displayBtn
        }
    }
}
</script>

<style>
.draw {
    background: brown;
}

.stop-drawing {
    background: yellow;
    color: black;
}

</style>