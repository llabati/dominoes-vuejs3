<template lang="pug">
div(:class="{ intro: show, hidden: !show }")
    p.lead(for='name') Entrez votre prénom
    form.input-zone
        input.input-name(type='text' name='name' ref='name' v-focus v-model="name")
        button.btn-name(@click='close') Envoyez
    
</template>

<script>
/* eslint-disable */

export default {
    props: [],
    emits: [ 'newName' ],
    data(){
        return {
            show: true,
            name: ''
        }
    },
    methods: {
        close(e){
            e.preventDefault()
            this.$emit('newName', this.name)
            this.show = false
        }
    },
    directives: {
        focus(el){
            el.focus()
        }
    }
    
     
    
}
</script>

<style>
.intro {
    width: 30%;
    margin: 20px auto;
    padding: 15px;
    border: solid 3px white;
    border-radius: 5px;
    box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, .3);
    z-index: 10;
    background-color: brown;
    color: white;
    animation: GetVisible 3s ease;
}
.lead {
    margin: 5px auto;
    text-align: center;
}
.input-zone {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 80%;
    background-color: white;
    border: solid 2px red;
    margin: 10px auto;
}
.input-name {
    width: 66%;
    margin: 0;
    border: 1px;
    height: 100%;
    font-size: 20px;
    padding: 5px;
}
.btn-name {
    display: inline-block;
    width: 33%;
    margin: 0;
    padding: 2px 10px;
    border-radius: 5px;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, .3);
    background-color: green;
    color: white;
    font-weight: 400;
    text-transform: uppercase;
    cursor: pointer;
}
.hidden {
    display: none;
}
@keyframes GetVisible {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
@keyframes GetInvisible {
    0% {
        /*transform: scale(1);*/
        opacity: 1;
        z-index: 10;
    }
    /*20% {
        transform: scale(1.4);
        opacity: 0.9;
    }*/
    100% {
        /*transform: scale(0);*/
        opacity: 0;
        z-index: -5;
    }
}





</style>
