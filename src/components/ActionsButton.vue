<template lang="pug">
button.intro(:class="{ 'draw': draw, 'stop-drawing': stopDrawing, 'restart': restart }" @click="actions") 
    strong {{ name }}, 
    strong
        slot

</template>

<script>
import { inject } from 'vue'

export default {
    inject: [ 'name', 'message', 'start', 'draw', /*'restart', */'stopDrawing' ],
    setup (props, context) {
        let name = inject('name')
        //let message = inject('message')
        let start = inject('start')
        let draw = inject('draw')
        let stopDrawing = inject('stopDrawing')
        //let restart = inject('restart')
        console.log('START in ACTION', start)

        function actions(){
            if (start.value) context.emit('launch')
            if (draw.value) context.emit('drawing')
            //if (restart.value) context.emit('restarting')
            else context.emit('stop')
        }

        return {
            name, start, draw, /*restart, */stopDrawing, actions
        }
    }
}
</script>

<style>
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

</style>