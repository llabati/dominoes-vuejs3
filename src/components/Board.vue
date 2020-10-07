<template lang="pug">
    
.board(v-if='launch')
    
    #top(v-if='top.length')
        ul.flex-top-list
            li(v-for="piece in top" :key="piece.id" class="domino-mid")
                domino(:value='piece.value' :class='{ "domino-vert": piece.isDouble, "domino-swap": piece.swap }')
        
    #left(v-if='left.length')
        ul.flex-left-list
            li(v-for="piece in left" :key="piece.id" style='margin: 30px' class="domino-vert domino-swap")
                domino(:value='piece.value' :class='{ "domino-vert": piece.isDouble, "domino-swap": piece.swap }')
        
    #begin(v-if='begin.length')
        ul.flex-list
            li(v-for="piece in begin" :key="piece.id")
                domino(:value='piece.value' :class='{ "domino-vert": piece.isDouble, "domino-swap": piece.swap }')
        
    #right(v-if='right.length')
        ul.flex-right-list
            li(v-for="piece in right" :key="piece.id" style='margin: 30px' class='domino-vert domino-swap')
                domino(:value='piece.value' :class='{ "domino-vert": piece.isDouble, "domino-swap": piece.swap }')
        
    #bottom(v-if='bottom.length')
        ul.flex-bottom-list
            li(v-for="piece in bottom" :key="piece.id" class="domino-quart")
                domino(:value='piece.value' :class='{ "domino-vert": !piece.isDouble ,"domino-swap": piece.swap }')

</template>

<script>
/* eslint-disable */
import store from '../store/index'
import Domino from './Domino.vue'
import { inject, computed } from 'vue'

export default {
    store,
    components: {
        Domino
    },
    inject: [ 'launch' ],
    setup(){
/*
        const pieces = computed( function(){
            return store.getters.getBoard().length
        })
        
        //let piece = {}
        */
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
        
        const right = computed( function(){
            return store.getters.getRight
        })

        const bottom = computed( function(){
            return store.getters.getBottom
        })
        
        const board = computed( function(){
            return store.getters.getBoard
        })

        return { launch, store, begin, left, top, right, bottom, board }
        
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
    /*position: relative;
    left: 80%;
    justify-content: flex-start; */
    grid-column: 7 / 8;
    grid-row: 7 / 11;
    border: solid 1px white;
}
#bottom {
    grid-column: 2 / 8;
    grid-row: 11 / 12;
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
