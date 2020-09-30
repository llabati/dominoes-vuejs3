<template lang="pug">
.intro
    p(:class="{ 'show': alert.value, 'hidden': !alert.value }")    
</template>

<script>
import { inject } from 'vue'
export default {
    setup () {
        let alert = inject('alert')
        let message = inject('message')

        return { alert, message }
    }
}
</script>

<style>

</style>