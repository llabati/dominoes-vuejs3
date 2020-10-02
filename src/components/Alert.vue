<template lang="pug">
div(:class="{ 'intro': alert.value, 'hidden': !alert.value }")
    p.lead {{ message }}   
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