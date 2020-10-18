<template lang="pug">
    
.board(v-if='launch')
    
    #top
        ul.flex-top-list
            li(v-for="piece in top" :key="piece.id" class="domino-mid")
                domino(:value='piece.value' :class='{ "domino-vert": piece.isDouble, "domino-swap": piece.swap }')
        
    #left
        ul.flex-left-list
            li(v-for="piece in left" :key="piece.id" style='margin: 30px' class="domino-vert domino-swap")
                domino(:value='piece.value' :class='{ "domino-vert": piece.isDouble, "domino-swap": piece.swap }')

    #end-left
        ul.flex-end-left-list
            li(v-for="piece in endLeft" :key="piece.id" style='margin: 30px' class="domino-vert domino-swap")
                domino(:value='piece.value' :class='{ "domino-vert": piece.isDouble, "domino-swap": piece.swap }')
    
    #end-end-left
        ul.flex-bottom-list
            li(v-for="piece in endEndLeft" :key="piece.id" class="domino-quart")
                domino(:value='piece.value' :class='{ "domino-vert": !piece.isDouble ,"domino-swap": piece.swap }')

    #begin
        ul.flex-list
            li(v-for="piece in begin" :key="piece.id")
                domino(:value='piece.value' :class='{ "domino-vert": piece.isDouble, "domino-swap": piece.swap }')
        
    #right
        ul.flex-right-list
            li(v-for="piece in right" :key="piece.id" style='margin: 30px' class='domino-vert domino-swap')
                domino(:value='piece.value' :class='{ "domino-vert": piece.isDouble, "domino-swap": piece.swap }')
        
    #bottom
        ul.flex-bottom-list
            li(v-for="piece in bottom" :key="piece.id" class="domino-quart")
                domino(:value='piece.value' :class='{ "domino-vert": !piece.isDouble ,"domino-swap": piece.swap }')

    #end-right
        ul.flex-end-right-list
            li(v-for="piece in endRight" :key="piece.id" style='margin: 30px' class="domino-vert domino-swap")
                domino(:value='piece.value' :class='{ "domino-vert": piece.isDouble, "domino-swap": piece.swap }')

    #end-end-right
        ul.flex-list
            li(v-for="piece in endEndRight" :key="piece.id")
                domino(:value='piece.value' :class='{ "domino-vert": piece.isDouble, "domino-swap": piece.swap }')
        

</template>

<script>
/* eslint-disable */
import store from '../store/index'
import Domino from './Domino.vue'
import { inject, computed, watch } from 'vue'

export default {
    store,
    components: {
        Domino
    },
    inject: [ 'launch' ],
    setup(){

        const launch = inject('launch')
        
        const begin = computed( function(){
            console.log('BEGIN', store.getters.getBegin)
            return store.getters.getBegin
        })

        const left = computed( function(){
            return store.getters.getLeft
        })

        const top = computed( function(){
            return store.getters.getTop
        })

        const endLeft = computed( function(){
            return store.getters.getEndLeft
        })

        const endEndLeft = computed( function(){
            return store.getters.getEndEndLeft
        })
        
        const right = computed( function(){
            return store.getters.getRight
        })

        const bottom = computed( function(){
            return store.getters.getBottom
        })

        const endRight = computed( function(){
            return store.getters.getEndRight
        })

        const endEndRight = computed( function(){
            return store.getters.getEndEndRight
        })
        
        const board = computed( function(){
            console.log('BOARD in BOARD', store.getters.getBoard)
            return store.getters.getBoard
        })
        watch(board, () => console.log('BOARD HAS ONE MORE!', board.value))

        return { launch, store, begin, left, top, endLeft, endEndLeft, right, bottom, endRight, endEndRight, board }
        
    }
    
        
    
       
    
}
</script>

<style>
.board {
    min-width: 1200px; 
    margin: 10px; 
    background-color: green; 
    padding: 30px;
    display: grid;
    grid-template-columns: repeat(8, 12.5%);
    grid-template-rows: repeat(11, 80px);
}

.flex-list {
    list-style-type: none;
    margin: none;
    padding: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
}
.flex-left-list {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
.flex-right-list {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
.flex-end-left-list{
    list-style-type: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
.flex-top-list {
    list-style-type: none;
    margin: none;
    padding: none;
    display: flex;
    flex-direction: row;
    justify-content: left;
    flex-wrap: wrap;
}
.flex-bottom-list {
    list-style-type: none;
    margin: none;
    padding: none;
    display: flex;
    flex-direction: row-reverse;
    justify-content: right;
    flex-wrap: wrap;
}
.flex-end-right-list {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
#end-left {
    grid-column: 7 / 8;
    grid-row: 2 / 5;
    border: solid 1px white;
}
#end-end-left {
    grid-column: 4 / 7;
    grid-row: 4 / 5;
    border: solid 1px white;
}
#top {
    grid-column: 2 / 8;
    grid-row: 1 / 2;
    border: solid 1px white;
    /*justify-items: start;*/
    
}
#left {
    /*justify-items: start;*/
    /*align-items: center;*/
    grid-column: 2 / 3;
    grid-row: 2 / 6;
    border: solid 1px white;

}
#begin {
    grid-column: 2 / 8;
    grid-row: 6 / 7;
    border: solid 1px white;
}
#right {
    grid-column: 7 / 8;
    grid-row: 7 / 11;
    border: solid 1px white;
}
#bottom {
    grid-column: 2 / 8;
    grid-row: 11 / 12;
    border: solid 1px white;
}
#end-right {
    grid-column: 2 / 3;
    grid-row: 8 / 11;
    border: solid 1px white;
}
.end-end-right {
    grid-column: 3 / 6;
    grid-row: 8 / 9;
    border: solid 1px white;
}
.piece {
    width: 80px;
    height: 40px;
    border: solid 1px blue;
    background: cadetblue;
}
.lefty {
    width: 40px;
    height: 80px;
}

.swap {
    transform: rotate(180deg);
}


@keyframes enterTheBoardRight {
    from {
        opacity: 0;
        transform: translateX(10px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
@keyframes enterTheBoardLeft {
    from {
        opacity: 0;
        transform: translateX(-10px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

</style>
