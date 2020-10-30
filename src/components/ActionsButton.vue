<template lang="pug">
button.intro(:class="{ 'draw': draw, 'stop-drawing': stopDrawing }" @click="actions") 
    strong {{ name }}, 
    strong
        slot

</template>

<script>
import { inject } from 'vue'

export default {
    inject: [ 'name', 'start', 'draw', 'stopDrawing' ],
    setup (props, context) {
        let name = inject('name')
        let start = inject('start')
        let draw = inject('draw')
        let stopDrawing = inject('stopDrawing')
        console.log('STOP DRAWING', stopDrawing, 'VALUE', stopDrawing.value)

        function actions(){
            if (start.value) context.emit('launch')
            if (draw.value) context.emit('drawing')
            if (stopDrawing.value) context.emit('stop')
        }

        return {
            name, start, draw, stopDrawing, actions
        }
    }
}
</script>

<style>
.center {
    width: 20%;
    margin: 0 auto;
}
.draw {
    background: orange;
    color: black;
}
.restart{
    background: green;
}

.stop-drawing {
    background: yellow;
    color: black;
}
.choose {
    background: purple;
}

</style>