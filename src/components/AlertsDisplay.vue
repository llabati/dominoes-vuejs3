<template lang="pug">

//div(:class="{ 'intro': alert.value, 'alert': alert.value, 'hidden': !alert.value }")
.intro.alert
    p.lead {{ message }}
    div(style='width: 100%; margin: 10px;') 
        strong(style='float: right; cursor: pointer;' @click='closeAlert') FERMER  
</template>

<script>
import store from '../store/index.js'
import { inject } from 'vue'
import { computed } from 'vue'
export default {
    setup (props, context) {
        let alert = computed( () => store.getters.getAlert )
        let message = inject('message')

        function closeAlert(){
            store.dispatch('unsetAlert')
            context.emit('clear-message')
        }

        return { alert, message, closeAlert }
    }
}
</script>

<style>
.alert {
    background-color: blue;
    padding: 5px;
}
</style>