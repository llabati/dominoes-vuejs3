<template lang="pug">
    
.board(v-if='launch')
    //#top
        ul.flex-top-list
            li(v-for="piece in top" :key="piece.id" class="domino-mid")
                domino(:value='piece.value' :class='{ "domino-vert": piece.isDouble, "domino-swap": piece.swap }')
    #top.flex-top-list
        //domino(v-for="piece in top" :key="piece.id" :value='piece.value' class="domino-mid" :class='{ "domino-vert": piece.isDouble, "domino-swap": piece.swap }')
        domino(v-for="piece in top" :key="piece.id" :value='piece.value' class="domino-inverse" :class='{ "domino-vert": piece.isDouble, "domino-swap": piece.swap }')
    #left-3.flex-left-list    
        .vert(v-for="piece in leftThree" :key="piece.id" class="domino-vert domino-swap domino-righten")
            domino(:value='piece.value' :class='{ "domino-vert": piece.isDouble, "domino-swap": piece.swap }')
    #left-2.flex-left-list    
        .vert(v-for="piece in leftTwo" :key="piece.id" class="domino-vert domino-swap domino-righten")
            domino(:value='piece.value' :class='{ "domino-vert": piece.isDouble, "domino-swap": piece.swap }')
    #left-1.flex-left-list    
        .vert(v-for="piece in leftOne" :key="piece.id" class="domino-vert domino-swap domino-righten")
            domino(:value='piece.value' :class='{ "domino-vert": piece.isDouble, "domino-swap": piece.swap }')
    //#left    
        ul.flex-left-list
            li.vert(v-for="piece in left" :key="piece.id" class="domino-vert domino-swap")
                domino(:value='piece.value' :class='{ "domino-vert": piece.isDouble, "domino-swap": piece.swap }')


    #end-left
        ul.flex-end-left-list
            li.vert(v-for="piece in endLeft" :key="piece.id" class="domino-vert domino-swap")
                domino(:value='piece.value' :class='{ "domino-vert": piece.isDouble, "domino-swap": piece.swap }')
    
    #very-end-left
        ul.flex-bottom-list
            li(v-for="piece in veryEndLeft" :key="piece.id" class="domino-quart")
                domino(:value='piece.value' :class='{ "domino-vert": !piece.isDouble ,"domino-swap": piece.swap }')

    //#begin
        ul.flex-list
            li(v-for="piece in begin" :key="piece.id")
                domino(:value='piece.value' :class='{ "domino-vert": piece.isDouble, "domino-swap": piece.swap }')            
    #begin.flex-list
        domino(v-for="piece in begin" :key="piece.id" :value='piece.value' :class='{ "domino-vert": piece.isDouble, "domino-swap": piece.swap }')    
    //#right    
        ul.flex-right-list
            li.vert(v-for="piece in right" :key="piece.id" class='domino-vert domino-swap')
                domino(:value='piece.value' :class='{ "domino-vert": piece.isDouble, "domino-swap": piece.swap }')   
    #right-1.flex-right-list
        .vert(v-for="piece in rightOne" :key="piece.id" class='domino-vert domino-swap domino-heighten')
            domino(:value='piece.value' :class='{ "domino-vert": piece.isDouble, "domino-swap": piece.swap }')
    #right-2.flex-right-list
        .vert(v-for="piece in rightTwo" :key="piece.id" class='domino-vert domino-swap domino-heighten')
            domino(:value='piece.value' :class='{ "domino-vert": piece.isDouble, "domino-swap": piece.swap }')
    #right-3.flex-right-list
        .vert(v-for="piece in rightThree" :key="piece.id" class='domino-vert domino-swap domino-heighten')
            domino(:value='piece.value' :class='{ "domino-vert": piece.isDouble, "domino-swap": piece.swap }')     
    //#bottom
        ul.flex-bottom-list
            li(v-for="piece in bottom" :key="piece.id" class="domino-inverse")
                domino(:value='piece.value' :class='{ "domino-vert": piece.isDouble ,"domino-swap": piece.swap }')
    #bottom.flex-bottom-list
        //domino(v-for="piece in bottom" :key="piece.id" :value='piece.value' class="domino-inverse" :class='{ "domino-vert": piece.isDouble ,"domino-swap": piece.swap }')
        domino(v-for="piece in bottom" :key="piece.id" :value='piece.value' class="domino-reverse" :class='{ "domino-vert": piece.isDouble ,"domino-swap": piece.swap }')

    #end-right
        ul.flex-end-right-list
            li.vert(v-for="piece in endRight" :key="piece.id" class="domino-vert domino-swap")
                domino(:value='piece.value' :class='{ "domino-vert": piece.isDouble, "domino-swap": piece.swap }')

    #very-end-right
        ul.flex-list
            li(v-for="piece in veryEndRight" :key="piece.id")
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

        const leftOne = computed( function(){
            return store.getters.getLeftOne
        })

        const leftTwo = computed( function(){
            return store.getters.getLeftTwo
        })

        const leftThree = computed( function(){
            return store.getters.getLeftThree
        })

        const top = computed( function(){
            return store.getters.getTop
        })

        const endLeft = computed( function(){
            return store.getters.getEndLeft
        })

        const veryEndLeft = computed( function(){
            return store.getters.getVeryEndLeft
        })
        
        const right = computed( function(){
            return store.getters.getRight
        })

        const rightOne = computed( function(){
            return store.getters.getRightOne
        })

        const rightTwo = computed( function(){
            return store.getters.getRightTwo
        })

        const rightThree = computed( function(){
            return store.getters.getRightThree
        })

        const bottom = computed( function(){
            return store.getters.getBottom
        })

        const endRight = computed( function(){
            return store.getters.getEndRight
        })

        const veryEndRight = computed( function(){
            return store.getters.getVeryEndRight
        })
        
        const board = computed( function(){
            console.log('BOARD in BOARD', store.getters.getBoard)
            return store.getters.getBoard
        })
        watch(board, () => console.log('BOARD HAS ONE MORE!', board.value))

        return { launch, store, begin, left, leftOne, leftTwo, leftThree, top, endLeft, veryEndLeft, right, rightOne, rightTwo, rightThree, bottom, endRight, veryEndRight, board }
        
    }
    
        
    
       
    
}
</script>

<style>
.board {
    min-width: 900px; 
    margin: 10px; 
    background-color: green; 
    padding: 30px;
    display: grid;
    grid-template-columns: repeat(16, 6.25%);
    grid-template-rows: repeat(10, 80px);
}
ul {
    margin: 0px;
    padding: 0px;
    margin-block-start: 0px;
    margin-block-end: 0px;
}
li {
    
    margin: 0px;
    padding: 0px;
}
/*.hor {
    width: 96px;
    height: 45px;
}*/
.vert {
    width: 45px;
    height: 96px;
}

.flex-list {
    list-style-type: none;
    margin: 0px;
    padding: 0px;
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
    margin: 0px;
    padding: 0px;
    display: flex;
    flex-direction: row;
    justify-content: left;
    flex-wrap: wrap;
}
.flex-bottom-list {
    list-style-type: none;
    margin: 0px;
    padding: 0px;
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
    grid-row: 2 / 4;
}
#very-end-left {
    grid-column: 4 / 7;
    grid-row: 3 / 4;
}
#top {
    grid-column: 4 / 15;
    grid-row: 1 / 2;
    border: solid 1px white;
    margin: 0px;
    padding: 0px;
    
}
#left-1 {
    grid-column: 3 / 5;
    grid-row: 4 / 5;
    border: solid 1px white;
    margin: 0px;
    padding: 0px;

}
#left-2 {
    /*justify-items: end;*/
    /*align-items: center;*/
    grid-column: 3 / 5;
    grid-row: 3 / 4;
    border: solid 1px white;
    margin: 0px;
    padding: 0px;

}
#left-3 {
    /*justify-items: end;*/
    /*align-items: center;*/
    grid-column: 3 / 5;
    grid-row: 2 / 3;
    border: solid 1px white;
    margin: 0px;
    padding: 0px;

}
#left {
    /*justify-items: end;*/
    /*align-items: center;*/
    grid-column: 2 / 3;
    grid-row: 2 / 5;
    border: solid 1px white;
    margin: 0px;
    padding: 0px;
}
#begin {
    grid-column: 2 / 15;
    grid-row: 5 / 6;
    border: solid 1px white;
    margin: 0px;
    padding: 0px;
}
#right-1 {
    grid-column: 12 / 14;
    grid-row: 6 / 7;
    border: solid 1px white;
    margin: 0px;
    padding: 0px;
}
#right-2 {
    grid-column: 12 / 14;
    grid-row: 7 / 8;
    border: solid 1px white;
    margin: 0px;
    padding: 0px;
}
#right-3 {
    grid-column: 12 / 14;
    grid-row: 8 / 9;
    border: solid 1px white;
    margin: 0px;
    padding: 0px;
}

#right {
    grid-column: 7 / 8;
    grid-row: 6 / 9;
    border: solid 1px white;
    margin: 0px;
    padding: 0px;
}
#bottom {
    grid-column: 2 / 13;
    grid-row: 9 / 10;
    border: solid 1px white;
    margin: 0px;
    padding: 0px;
}
#end-right {
    grid-column: 2 / 3;
    grid-row: 8 / 9;
}
.very-end-right {
    grid-column: 3 / 6;
    grid-row: 8 / 9;
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
