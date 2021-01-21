<template lang="pug">

.hand-board
    
    .hor.hand#player-hand
        
        ul.flex-list(v-if="playerHand")
            li(v-for="piece in player.hand" :key="piece.id")
                domino.domino-vert.active-domino(:value='piece.value' @chosen='chooseDomino(piece, undefined)')
        

    alertsDisplay(v-if='alert' @clear-message ="clearMessage" @go-next="nextRound")
    
    //start-the-game(v-if='launchGame')
    //end-of-the-game(v-if='machineWins || neitherWins || playerWins')

    div(v-if="playerChoices && playerChoices[0].length" style="text-align: center;")
        ul.flex-list 
            selectDisplay(v-for="piece in playerChoices[0]" :key="piece.id" :piece="piece" v-on:choose-dom='chooseDomino(piece, undefined)' v-on:place-to-left='chooseDomino(piece, "left")' v-on:place-to-right='chooseDomino(piece, "right")') Ce domino peut être placé à gauche ou à droite.     

    //actionsButton(v-if='start' @launch='launchGame=true') démarrez le jeu
    actionsButton(v-if='start' @launch='launch') démarrez le jeu
    actionsButton(v-if='draw' @drawing='playerDraws') piochez
    actionsButton(v-if='stopDrawing' @stop='machinePlays') passez votre tour

</template>


<script>
/* eslint-disable */
    import { ref, computed, reactive, watch, provide, inject } from 'vue'
    import store from '../store/index.js'
    //import startingTheGame from '../hooks/startingTheGame.js'
    //import calculations from '../services/calculations.js'
    import Domino from './Domino.vue'
    import SelectDisplay from './SelectDisplay.vue'
    import AlertsDisplay from './AlertsDisplay.vue'
    import ActionsButton from './ActionsButton.vue'
    /*import StartTheGame from './startTheGame'
    import EndOfTheGame from './endOfTheGame'*/

    export default {
        store,
        components: {
            SelectDisplay,
            AlertsDisplay,
            ActionsButton,
            Domino,
            //StartTheGame,
            //EndOfTheGame
        },

        setup(props, context){
            console.log('LE STORE TOUT LE STORE', store)
            const name = computed(function(){
                //console.log('NAME TO PROVIDE', store.getters.getPlayer.value.name)
                return store.getters.getPlayer.name
            })
            provide('name', name)

            //let round = computed( () => store.modules['gameModule/getRound'])
            let round = computed( () => store.getters.getRound )
            provide('round', round)
            let stuck = computed( () => store.getters.getStuck )
            watch( stuck, function(){
                console.log(' stuck VIENT DE CHANGER !' + stuck.value)
            })
            

            let start = computed( () => store.getters.getStart )
            console.log('START in VUE', start)

            watch(start, () => {
                store.dispatch('setMessage', 'démarrez le jeu !')
            })
            provide('start', start)
            
            let launchGame = ref(false)
            watch( launchGame, ()=> {
                console.log('launch!')
                return launch
            })

            let play = computed( () => store.getters.getPlay )
            watch(play, () => context.emit('play'))
            
            let keepPlaying = ref(true)

            let draw = computed( () => store.getters.getDraw)
            provide('draw', draw)

            watch( draw, function(){
                console.log('DRAW VIENT DE CHANGER !')
            })
            
            let stopDrawing = computed( () => store.getters.getStopDrawing)
            provide('stopDrawing', stopDrawing)

            let reset = ref(false)
            provide('reset', reset)

            let continueDrawing = ref(false)

            let playerStarts = ref(false)
            provide('playerStarts', playerStarts)

            let machineStarts = ref(false)
            watch(machineStarts, function(){
                return machinePlays()
            })
            provide('machineStarts', machineStarts)

            let upto = computed( () => store.getters.getUpto)
            watch(upto, () => {
                setTimeout(machinePlays, 1500)
            })

            let locked = ref(false)
            watch(locked, function() {
                if (locked.value === true){
                store.dispatch('addToLocks')
                }
            })

            let newLocks = computed( function(){
                return store.getters.getLocks
            })

            let possibleLocks = computed( function() {
                return store.getters.getPossibleLocks
            })

            let lockChoices = computed( function(){
                return store.getters.getLockChoices
            })

            let alert = computed( ()=> {
                return store.getters.getAlert
            })

            let select = ref(false)
            provide('select', select)

            let message = computed( () => store.getters.getMessage)
            provide('message', message)

            let wrong = ref(false)

            let sider = computed( () => store.getters.getSider)
            watch(sider, function(){ 
                console.log('SIDER HAS CHANGED', sider.value)
            })

            let player = computed(function(){
                console.log('PLAYER in PLAYERSCORNER', store.getters.getPlayer)
                return store.getters.getPlayer
            })
            

            let playerHand = computed( function(){
                console.log('PLAYERHAND in PLAYERSCORNER', store.getters.getPlayerHand)
                return store.getters.getPlayerHand  
            })
            watch(playerHand, function(){
                if (playerHand === undefined) playerhand.value = []
                if (!playerHand.value.length && board.value.length) {
                    console.log('PLAYER HAS NO PIECE!', playerHand)
                    store.dispatch('playerWinsIsTrue')
                } 
                
            })
            provide('playerHand', playerHand)
            let machine = computed(function(){
                return store.getters.getMachine
            })
            provide('machine', machine)

            let machineHand = computed(function(){
                console.log('machineHAND in PLAYERSCORNER', store.getters.getMachineHand)
                return store.getters.getMachineHand
            })
            watch(machineHand, function(){
                if (!machineHand.value.length && board.value.length) {
                    console.log('MACHINE HAS NO PIECE!', machineHand)
                    store.dispatch('machineWinsIsTrue')

                }
            })
            provide('machineHand', machineHand)

            let playerChoices = computed( () => store.getters.getPlayerChoices )
            provide('playerChoices', playerChoices)

            watch(playerChoices, function() {
                console.log('playerChoices.value and ', 'board.value' )
                console.log('board.value', board.value )
                console.log('playerChoices.value', playerChoices.value, 'board.value' , board.value )

                
                console.log('PLAYER CHOICES HAS CHANGED', playerChoices.value, 'DRAW', draw.value) 
                
            }) 

            let machineChoices = ref([])

            let dominoes = computed(function(){
                return store.getters.getDominoes 
            })
            provide('dominoes', dominoes)

            let board = computed(function(){
                return store.getters.getBoard
            })
            watch(board, function(){
                if (board === undefined) board.value = []
                console.log('BOARD IS CHANGED!')
                
            })
            provide('board', board)
            let first = computed( () => store.getters.getFirst)
            watch( first, () => console.log('NEW FIRST', first))
            
            let last = computed( () => store.getters.getLast)
            watch(last, () => console.log('NEW LAST', last))
            
            let restPieces = computed(function(){
                return store.getters.getDominoes.length
            })
            watch(restPieces, function(){
                if (board.value.length){
                    if (restPieces.value === 0){
                    draw.value = false
                    //stopDrawing = true
                    store.dispatch('evaluatePlayerChoices')
                    console.log('WATCHING RESTPIECES', 'MACHINE CHOICES', machineChoices.value, 'PLAYER CHOICES', playerChoices.value)
                    if (!machineChoices.value.length && (playerChoices.value[0].length || playerChoices.value[1].length)) {
                        keepPlaying.value = false
                        message.value = `C'est à vous, ${name.value}, la machine ne pouvant placer de domino.`
                        store.dispatch('setAlert')
                        
                        console.log('KEEPPLAYING RESTPIECES machine no choices', keepPlaying.value)
                        
                    }
                    if (!machineChoices.value.length && !playerChoices.value[0].length && !playerChoices.value[1].length && board.value.length) {
                        keepPlaying.value = false
                        store.dispatch('neitherWinsIsTrue')
                        
                        console.log('KEEPPLAYING RESTPIECES', keepPlaying.value)
                        
                    }
                    if (machineChoices.value.length && !playerChoices.value[0].length && !playerChoices.value[1].length) {
                        keepPlaying.value = true
                        upto.value = !upto.value
    
                        console.log('KEEPPLAYING RESTPIECES payer n chces', keepPlaying.value)
                        
                    }
                }

                }
            })
            provide('restPieces', restPieces)

            let playerWins = computed( () => store.getters.getPlayerWins)
            watch(playerWins, ()=> {
                if (playerWins.value === true){

                    console.log('PLAYER HAS WON!')
                    claimVictory()
                }
            })
            provide('playerWins', playerWins)

            let machineWins = computed( () => store.getters.getMachineWins)
            watch(machineWins, ()=> {
                if (machineWins.value === true){
                    console.log('MACHINE HAS WON!')
                    claimVictory()
                }
            })
            provide('machineWins', machineWins)

            let neitherWins = computed( () => store.getters.getNeitherWins)
            watch(neitherWins, ()=> {
                console.log('The two players are stuck!')
                claimVictory()
            })
            provide('neitherWins', neitherWins)

            let generalPlayerScore = computed( () => store.getters.getPlayerScore)
            provide('generalPlayerScore', generalPlayerScore)
            let generalMachineScore = computed( () => store.getters.getMachineScore)
            provide('generalMachineScore', generalMachineScore)

            let newRound = ref(false)
            provide('newRound', newRound)

            


            const launch = async function letsPlay(){
                
                // Nous commençons la première manche. 
                //Il faut déterminer qui va jouer en premier (celui qui a le double le plus élevé, ou à défaut, le domino le plus fort)
                console.log('LAUNCH')
                store.dispatch('unsetAlert')
                store.dispatch('setStartToFalse')
                store.dispatch('startGame')
            }
        // c'est le joueur qui joue'
        function chooseDomino(domino, side){
            console.log('CHOOSE THIS DOMINO', 'SIDER', sider.value)
            store.dispatch('playerPlays', {domino, side})
        }

        function playerDraws(){
            store.dispatch('drawAgain', 1)
        }
        
        
        ////////////////////////////////////////////////////////////////


           // c'est la machine qui joue
        function machinePlays(){
            store.dispatch('machinePlays')
        }
        // afficher le résultat de la partie
    async function claimVictory(){
        console.log('ENTERING CLAIM VICTORY...', playerWins.value, machineWins.value, neitherWins.value)
        store.dispatch('claimVictory')
        
        
        
        }

        // conclure, avant de passer au tour suivant
        async function nextRound(){
            reset.value = false
            machineChoices = []
            await store.dispatch('resetBoard')
            await store.dispatch('resetPlayerHand')
            await store.dispatch('resetMachineHand')
            await store.dispatch('resetMachineChoices')
            await store.dispatch('resetDominoes')
            await store.dispatch('resetLocks')
            
            
            await store.dispatch('updateRound')
            //await resetAll()
            await store.dispatch('setStartToTrue')
            console.log('nextRnd' + ' player ' + player.value.name + ' machine ' + machine.value.score)
        }

      function resetAll(){
            //await store.dispatch('updatePlayerAndMachine')
            keepPlaying.value = true
            draw.value = false
            stopDrawing = false
            
            continueDrawing.value = false
            playerStarts.value = false
            machineStarts.value = false
            upto.value = false
            locked.value = false
            select.value = false
            message.value = ''
            wrong.value = false
            sider.value = false
            newRound.value = false
            machineChoices.value = []
            
            
            store.dispatch('resetAll')
            console.log('RESET A', reset.value)
        }

        async function relaunch(){
            await resetAll()
            newRound.value = false
            message.value = ''
            store.dispatch('unsetAlert')
            console.log('relaunch' + ' player' + player.name + ' machine' + machine.hand)
            launchGame.value = true
        }

        function clearMessage(){
            store.dispatch('clearMessage')
        }
      

        

            return { 
                name, start, launchGame, round, stuck, keepPlaying, draw, stopDrawing, continueDrawing, round, upto, sider,
                player, machine, playerHand, machineHand, board, newLocks, possibleLocks, 
                generalPlayerScore, generalMachineScore, 
                alert, select, message, reset, launch, playerDraws, dominoes, restPieces, 
                playerChoices, machineChoices, playerWins, machineWins, neitherWins, 
                chooseDomino, machinePlays, claimVictory, nextRound, resetAll, relaunch, clearMessage
                }
        
          
    }
}
</script>
<style>
.hand-board {
    background-color: green;
    border: solid 5px brown;
    width: 100%;
    margin: 10px auto;
    padding: 10px;
}

.btn-play {
    margin: 10px;
    padding: 1%;
    background-color: green;
    color: white;
    font-size: 2rem;
    font-weight: 800;
    border-radius: 5%;
    border: solid 1px red;
    box-shadow: 2px 5px 5px rgba(0, 0, 0, .3);
}

.active-domino {
    padding: 0;
    cursor: pointer;
}
.game-item {
    display: inline-block;
    padding: 0;
    margin: 15px 5px;
    box-shadow: 1px 1px 1px 1px black;
    cursor: pointer;
    animation: enterTheHand 1s;
}
.hand {
    justify-content: center;
}
/*.commands {
    animation: GetVisible 2s ease;
} */
.fade-leave-active {
    transition: opacity 2s ease;
}
.fade-leave-to {
    opacity: 0;
}

.end-enter {
    opacity: 0;
    transform: translateX(30px);
}
.end-enter-active {
    transition: all 3s ease;
}
.end-enter-to {
    opacity: 1;
    transform: translateX(0px);
}
@keyframes enterTheHand {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}





</style>
