<template lang="pug">

.hand-board
    
    .hor.hand#player-hand
        strong(v-if="start") Start is {{ start }} --- {{ playerHand }} --- {{ player }} / {{ player.name }} -- {{ player.hand }}
        h1(v-else) No start in sight! /// {{ playerHand }} /// {{ player.name }}
        ul.flex-list(v-if="playerHand")
            li(v-for="piece in playerHand" :key="piece.id")
                domino.domino-vert.active-domino(:value='piece.value')
        btn.intro.start(v-if="start" @click="launch") Let's play!
    //select(v-if='chooseSide' :message='message' v-on:chosenSide='selectSide(side)')
    
    //transition(name='fade' mode='in-out')
    alert(v-if='alert')

    //transition(name='fade' mode='in-out')
        //action(:name='name' :action='action' :start='start' :draw='draw' :stopDrawing='stopDrawing')
    action(v-show="displayBtn")
    


</template>


<script>
/* eslint-disable */
    import { ref, computed, reactive, watch, provide, inject } from 'vue'
    import store from '../store/index.js'
    import startingTheGame from '../hooks/startingTheGame.js'

    import Select from './Select.vue'
    import Alert from './Alert.vue'
    import Action from './Action.vue'

    export default {
        store,
        components: {
            Select,
            Alert,
            Action
        },

        setup(){
            const name = computed(function(){
                console.log('NAME TO PROVIDE', store.getters.getPlayer.value.name)
                return store.getters.getPlayer.value.name
            })
            provide('name', name)

            let start = inject('start')
            console.log('START in VUE', start)
            //provide('start', start.value)

            let draw = ref(false)
            provide('draw', draw.value)

            let stopDrawing = ref(false)
            provide('stopDrawing', stopDrawing.value)

            let round = ref(0)

            let playerStarts = ref(false)

            let machineStarts = ref(false)

            let upto = ref(true)

            let alert = ref(false)
            provide('alert', alert)

            let select = ref(false)

            let action = ref('')
            provide('action', action)

            let message = ref('')
            provide('message', message)

            /*let player = reactive({
                name: store.getters.getPlayer.name,
                hand: store.getters.getPlayer.hand
            })*/
            let player = computed(function(){
                console.log('PLAYER in PLAYERSCORNER', store.getters.getPlayer)
                return store.getters.getPlayer
            })

            let playerHand = computed( function(){
                console.log('PLAYERHAND in PLAYERSCORNER', store.getters.getPlayerHand)
                return store.getters.getPlayerHand
            })
            let machine = computed(function(){
                return store.getters.getMachine
            })

            let machineHand = computed(function(){
                return store.getters.getMachineHand
            })

            let dominoes = computed(function(){
                console.log('DOMINOES FOR STARTINGTHEGAME', store.getters.getDominoes)
                return store.getters.getDominoes
            })

            let board = computed(function(){
                return store.getters.getBoard.value
            })
            let head = computed(function(){
                return board.value[0][0]
            })
            let tail = computed(function(){
                return board.value[board.value.length-1][1]
            })
            let displayBtn = watch(start, function(){
                    
                    if (start.value === true){
                        console.log('START IS TRUE', start)
                        return true

                    }
                    if (start.value === false){
                        console.log('START IS FALSE', start)
                        return false
                    }
                    else console.log('START IS UNDEFINED', start)
                })
            provide('displayBtn', displayBtn)

            const [ whoStarts, fullHand ] = startingTheGame()


            const launch = async function letsPlay(){
                // Nous commençons la première manche. 
                //Il faut déterminer qui va jouer en premier (celui qui a le double le plus élevé, ou à défaut, le domino le plus fort)
                if (round.value === 0) {
                    console.log('START in LAUNCH', start)
                    store.dispatch('setStartToFalse')
                    
                    await store.dispatch('setGame')
                    let click = 0
                    while (click < 6){
                        //console.log('PLAYERHAND IS BEING REFUELED', playerHand)
                        fullHand(playerHand, machineHand, dominoes)
                        //console.log('FULL HAND', playerHand, machineHand)
                        /*playerHand.value.push(dominoes.value[0])
                        dominoes.value.shift()
                        console.log('ESSAYONS AVEC CET OBJT PLAYERHAND VALUE DOMINOES VALUE', playerHand, dominoes)
                        machineHand.value.push(dominoes.value[0])
                        dominoes.value.shift()
                        console.log('ESSAYONS AVEC LA VALUE', machineHand, dominoes)*/
                        click++
                    }
                    await store.dispatch('updateDominoesAndHands', { playerHand, machineHand, dominoes })
                    console.log('TWO HANDS REFUELED')
                    
                    //this.start = false
                    let starter = whoStarts(player, machine, 0)
                    console.log('THE STARTER', starter)
                    round.value = 1
                    console.log('THE PLAYERS', player, machine, round, 'START', start)
                    if (starter.value.name) {
                        console.log(round, 'C EST LE JOUEUR QUI COMMENCE', player)
                        playerStarts.value = true
                        message.value = `C'est vous qui commencez ! L'application vient de jouer pour vous, mais ensuite, pour jouer vous devrez cliquer sur le domino de votre choix; il se placera automatiquement sur le tapis.`
                        alert.value = true
                        }
                    else {
                        console.log(round, 'C EST LA MACHINE QUI COMMENCE', machine)
                        machineStarts.value = true
                        message.value = `C'est la machine qui commence ! Pour jouer, cliquez sur le domino de votre choix; il se placera automatiquement sur le tapis.`
                        alert.value = true
                    }
                }
            /*if (round.value === 1) {
                console.log('START 1', this.start, 'STORE START 1', this.$store.state.start)
                let name = this.$store.state.player.name
                //await this.$store.dispatch('setStartToTrue')
                //await progression.startGame()
                let response = this.getFromDatabase(name)
                let machine_recent_winning = response.machine_recent_winning 
                let player_recent_winning = response.player_recent_winning


                // afficher ici les résultats et la progression et le cumul des manches avec response.player_score et response.machine.score
                //console.log('OU EN SOMMES NOUS ?', 'JOUEUR: ', response.player_score, 'MACHINE: ', response.machine_score)
                //this.start = false
                
                if (machine_recent_winning) {
                    this.message = `C'est à la machine de commencer !`
                    this.alert = true
                    this.machinePlays()
                }
                if (player_recent_winning) {
                    this.message = "C'est à vous de commencer !"
                    console.log('C EST A VOUS !')
                    this.alert = true
                }
                
            }
            if (round > 1) {
                console.log('START N', this.start, 'STORE START N', this.$store.state.start)
                
                
            }*/
        }
        

            return { name, start, draw, stopDrawing, round, upto, player, machine, playerHand, machineHand, head, tail, alert, select, action, message, launch, whoStarts, fullHand, displayBtn, dominoes }
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

.flex-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
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
