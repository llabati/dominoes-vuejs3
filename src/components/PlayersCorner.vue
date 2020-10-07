<template lang="pug">

.hand-board
    
    .hor.hand#player-hand
        //strong(v-if="start") Start is {{ start }} --- {{ playerHand }} --- {{ player }} / {{ player.name }} -- {{ player.hand }}
        
        //h1(v-else) No start in sight! /// {{ player.hand }} /// {{ player.name }}
        ul.flex-list(v-if="playerHand")
            li(v-for="piece in playerHand" :key="piece.id")
                domino.domino-vert.active-domino(:value='piece.value' @chosen='chooseDomino(piece)')
        btn.intro.start(v-if="start" @click="launch") Let's play!
    //select(v-if='chooseSide' :message='message' v-on:chosenSide='selectSide(side)')
    
    //transition(name='fade' mode='in-out')
    alert

    //transition(name='fade' mode='in-out')
        //action(:name='name' :action='action' :start='start' :draw='draw' :stopDrawing='stopDrawing')
    action(v-show="displayBtn")
    


</template>


<script>
/* eslint-disable */
    import { ref, computed, reactive, watch, provide, inject } from 'vue'
    import store from '../store/index.js'
    import startingTheGame from '../hooks/startingTheGame.js'
    import calculations from '../services/calculations.js'
    import Domino from './Domino.vue'
    import Select from './Select.vue'
    import Alert from './Alert.vue'
    import Action from './Action.vue'

    export default {
        store,
        components: {
            Select,
            Alert,
            Action,
            Domino
        },

        setup(props, context){
            const name = computed(function(){
                //console.log('NAME TO PROVIDE', store.getters.getPlayer.value.name)
                return store.getters.getPlayer.name
            })
            provide('name', name)

            let start = computed( () => store.getters.getStart )
            console.log('START in VUE', start)

            watch(start, () => console.log('START IS CHANGED!'))
            //provide('start', start.value)

            let keepPlaying = ref(true)

            let draw = ref(false)
            provide('draw', draw.value)

            let stopDrawing = ref(false)
            provide('stopDrawing', stopDrawing.value)

            let continueDrawing = ref(false)

            let round = ref(0)

            let playerStarts = ref(false)

            let machineStarts = ref(false)
            watch(machineStarts, function(){
                return machinePlays()
            })

            let upto = ref(true)
            watch(upto, () => {
                console.log('UPTO IS CHANGED!')
                machinePlays()
            })

            let locked = ref(false)
            watch(locked, (board) => {
                if (locked.value === true){
                newLocks.value.push(board.value[0].value[0], board.value[board.value.length-1].value[1])
                newLocks.value = new Set(newLocks.value)
                console.log('COINCE AVEC...', newLocks.value)
                store.dispatch('addToLock', newLocks)
                }
            })

            let newLocks = computed( function(){
                return store.getters.getLocks
            })

            let alert = ref(false)
            provide('alert', alert)

            let select = ref(false)
            provide('select', select)

            let action = ref('')
            provide('action', action)

            let message = ref('')
            provide('message', message)

            let wrong = ref(false)

            let chooseSide = ref(false)

            let player = computed(function(){
                //console.log('PLAYER in PLAYERSCORNER', store.getters.getPlayer)
                return store.getters.getPlayer
            })

            let playerHand = computed( function(){
                //console.log('PLAYERHAND in PLAYERSCORNER', store.getters.getPlayerHand)
                return store.getters.getPlayerHand  // Proxy
            })
            let machine = computed(function(){
                return store.getters.getMachine
            })

            let machineHand = computed(function(){
                return store.getters.getMachineHand
            })

            let dominoes = computed(function(){
                //console.log('DOMINOES FOR STARTINGTHEGAME', store.getters.getDominoes)
                return store.getters.getDominoes // Proxy
            })

            let board = computed(function(){
                return store.getters.getBoard
            })
            watch(board, function(){
                console.log('BOARD IS CHANGED!', board.value[0].value[0])
                
            })
            /*watch(board, function(){
                console.log('BOARD IS CHANGED 2', board.value)
                let tail = board[board.length-1].value[1]
                return tail
            })
            // ou : c'est le watch board qui retourne les varianles head et tail...
            /*
            watch(board, () => {
                let head = board[0].value[0]
                let tail = board[board.length-1].value[1]
            })

            peut-on retourner un objet ou un array "borders" contenant les deux variables ?
            */
            /*let head = computed(function(domino){
                if (board.length){
                    return board[0].value[0]
                    }
                })
            let tail = computed(function(){
                if(board.length){
                    return board[board.length-1].value[1]
                }
            })
            */
            let restPieces = computed(function(){
                return store.getters.getDominoes.length
            })
            watch(restPieces, function(){
                if (restPieces.value < 1){
                draw.value = false
                stopDrawing.value = true
                if (machineChoices < 1 && playerChoices < 1) {
                    keepPlaying.value = false
                    neitherWins.value = true
                    //this.claimVictory()
                    //this.$store.dispatch('setStartToTrue')
                    //this.start = true
                    console.log('KEEPPLAYING RESTPIECES', keepPlaying.value)
                    
                }
            }
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

            let playerWins = ref(false)

            let machineWins = ref(false)

            let neitherWins = ref(false)

            const [ whoStarts, fullHand ] = startingTheGame()


            const launch = async function letsPlay(){
                console.log('NAME', name.value)
                console.log('PLAYER', player.value)
                console.log('MACHINE', machine.value)
                console.log('PLAYERHAND', playerHand.value)
                console.log('MACHINEHAND', machineHand.value)
                console.log('BOARD', board.value)
                console.log('DOMINOES', dominoes.value)
                console.log('MESSAGE', message.value)
                console.log('RESTPIECES', restPieces.value)
                // Nous commençons la première manche. 
                //Il faut déterminer qui va jouer en premier (celui qui a le double le plus élevé, ou à défaut, le domino le plus fort)
                if (round.value === 0) {
                    console.log('START in LAUNCH', start)
                    store.dispatch('setStartToFalse')
                    
                    await store.dispatch('setGame')
                    console.log('RESTPIECES BEFORE', restPieces)
                    let click = 0
                    while (click < 6){
                        //console.log('PLAYERHAND IS BEING REFUELED', playerHand)
                        console.log('FULL HAND', 'PLAYERHAND', player.value.hand, 'MACHINEHAND', machine.value.hand, 'DOMINOES', dominoes.value)
     
                        fullHand(player, machine, dominoes)
                        //console.log('FULL HAND', playerHand, machineHand)
                        /*playerHand.value.push(dominoes.value[0])
                        dominoes.value.shift()
                        console.log('ESSAYONS AVEC CET OBJT PLAYERHAND VALUE DOMINOES VALUE', playerHand, dominoes)
                        machineHand.value.push(dominoes.value[0])
                        dominoes.value.shift()
                        console.log('ESSAYONS AVEC LA VALUE', machineHand, dominoes)*/
                        click++
                    }
                    console.log('RESTPIECES AFTER', restPieces)
                    await store.dispatch('updateDominoesAndHands', { player, machine, dominoes })
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
                    store.dispatch('setStartToFalse')
                    context.emit('play')
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

        // c'est le joueur qui joue
        function chooseDomino(domino){
            console.log('CHOOSE THIS DOMINO', domino.value)
            domino.value.player = true
            if (wrong.value) wrong.value = false
            

                // vérification que le domino choisi est bon
                if (board.length > 1) {
                    calculations.warningWrongDomino(domino.value, board.value[0].value[0], board.value[board.value.length-1].value[1], wrong.value)
                    if (wrong.value === true) return
                /*else{
                    // lorsqu'on a un domino qui peut être placé à gauche ou à droite*/
                if ((domino.value[0] === board.value[0].value[0] && domino.value[1] === board.value[board.value.length-1].value[1]) || (domino.value[1] === board.value[0].value[0] && domino.value[0] === board.value[board.value.length-1].value[1])) {
                    message.value = 'Vous pouvez placer votre domino à gauche ou à droite. Choisissez !'
                    chooseSide.value = true
                    }
                }
                    
                

            console.log('MON DOMINO', domino)
            store.dispatch('addToBoard', domino)
            
            keepPlaying.value = true
            console.log('KEEPPLAYING CHOOSEDOMINO', keepPlaying.value, 'UPTO', upto.value)
            upto.value = !upto.value
        }
        
            
        
        ////////////////////////////////////////////////////////////////
/*
      machinePlays(){
        let machineTurn = progression.machinesTurn(this.keepPlaying, this.stopDrawing, this.upto)
        console.log('AFTER MACHINE PLAYS', machineTurn)
      },
            */

           // c'est la machine qui joue
        function machinePlays(){
            console.log('MACHINE IS PLAYING', keepPlaying.value)
            if (!board.value.length && machine.value.isStarting === true){
            console.log(`Machine is starting with ${machine.value.start.value[0]} ${machine.value.start.value[1]}`)
            //this.board = new Board(this.machine.start.value[0], this.machine.start.value[1])
            //display.addAPiece(this.machine.start, null)
            //let head = calculations.calculateHead(board, machine.value.start)
            //let tail = calculations.calculateTail(board, machine.value.start)
            
            machine.value.start.player = false
            store.dispatch('addToBoard', machine.value.start)
            machine.value.isStarting = false
            keepPlaying.value = false
            
            }
            if (keepPlaying.value === true) {
                console.log('KEEP PLAYING!')
                //////// ATTENTION ! Pas de getters, plutot ?
                if (board.value.length > 0){
                    //let head = calculations.calculateHead(board)
                    //let tail = calculations.calculateTail(board)
                    
                    let knownDominoes = machine.value.hand.concat(board.value)
                    console.log('KNOWNDOMINOES', knownDominoes)
                    let valuedDominoes = knownDominoes.map( d => d.value )
                    console.log('VALUED DOMS', valuedDominoes)
                    let allValues = valuedDominoes.reduce( (acc, cur) => acc.concat(cur), [])
                    console.log('ALL VALUES', allValues)
                    let stats = allValues.reduce( (acc, cur) => {
                        if (!acc[cur]) acc[cur] = 1
                        else acc[cur]++
                        return acc
                        }, {}) 
                        console.log('WHERE ARE WE?', stats)
                    let possibleLocks = Object.entries(stats).filter( d => d[1] > 4 )
                    
                    console.log('POSSIBLE LOCKS', possibleLocks)
                    // détermination des choix possibles pour la machine
                    let choices = []
                    //this.board.head = calculations.calculateHead()
                    //this.board.tail = calculations.calculateTail()
                    //let head = this.calculateHead()
                    //let tail = this.calculateTail()
                    console.log('HEAD AND TAIL', board.value[0].value[0], board.value[board.value.length-1].value[1])

                    let one = machine.value.hand.filter(d => d.value[0] === board.value[0].value[0])
                    if (one) choices.push(one)

                    let two = machine.value.hand.filter(d => d.value[1] === board.value[0].value[0])
                    if (two) choices.push(two)

                    let three = machine.value.hand.filter(d => d.value[0] === board.value[board.value.length-1].value[1])
                    if (three) choices.push(three)

                    let four = machine.value.hand.filter(d => d.value[1] === board.value[board.value.length-1].value[1])
                    if (four) choices.push(four)

                    let allChoices = choices.reduce( (acc, cur) => acc.concat(cur), [])
                    allChoices = new Set(allChoices)
                    let machineChoices = [ ...allChoices ]
                    let choicesNum = machineChoices.length
                    console.log('MACHINECHOICES', machineChoices)
                    //store.dispatch('actualizeMachineChoices', choicesNum)

                    // selon les résultats... pas de choix, un seul choix, plusieurs choix possibles
                    // pas de domino à placer : la machine pioche...
                    if (choicesNum === 0) {
                        if (stopDrawing.value === true){
                            keepPlaying.value = false
                            console.log('KEEPPLAYING MACHINE PLAYS NOCHOICE', keepPlaying.value)
                        } else {
                            continueDrawing.value = true
                            while (continueDrawing.value && dominoes.value.length > 0) {
                                drawAgain(0)

                                let newPiece = machine.value.hand[machine.value.hand.length-1]
                                console.log('NEWPIECE', newPiece)
                                //fonction qui permet de calculer si possibilité de jouer ?
                                if (newPiece.value[0] === board.value[0].value[0] || newPiece.value[1] === board.value[0].value[0] || newPiece.value[0] === board.value[board.value.length-1].value[1] || newPiece.value[1] === board.value[board.value.length-1].value[1]){
                                newPiece.player = false
                                machineChoices.push(newPiece)
                                continueDrawing.value = false

                                console.log('MACHINECHOICES AFTER DRAWING', machineChoices)
                                }
                                else drawAgain(0)
                            }
                        }
                    }
                    //la machine a un ou plusieurs dominos possibles : comment choisir le meilleur ?
                    if (machineChoices.length > 0) return makeChoice(machineChoices, board.value[0].value[0], board.value[board.value.length-1].value[1], board.value)
                }
            }
                else {
                    if (restPieces.value === 0 && playerChoices.value.length) {
                        neitherWins.value = true
                    }
                }
                //this.upto = !this.upto
                keepPlaying.value = false
                console.log('BOARD', board.value)
                console.log('HEAD AND TAIL PLAYER', board.value[0].value[0], board.value[board.value.length-1].value[1])
                console.log('KEEPPLAYING MACHINEPLAYS END TO PLAYER', keepPlaying.value)
                let playerChoices = calculations.evaluatePlayerChoices(player, board.value[0].value[0], board.value[board.value.length-1].value[1])
                console.log('PLAYER CHOICES', playerChoices)
                if (!playerChoices.length) draw.value = true
            
        }

        // pioche (illimitée, jusqu'à trouver le bon domino, ou à vider la réserve)
        function drawAgain(player) {
            // si lapioche est vide
            if (dominoes.value.length === 0) {
                draw.value = false
                stopDrawing.value = true
                upto.value = !upto.value
            }
            // si c'est le joueur humain qui pioche (bouton 'DRAW')
            if (player === 1) {
                locked.value = true
                store.dispatch('drawOne', player)
                calculations.evaluatePlayerChoices()
                return player.value.hand
            }
            // si c'est la machine qui pioche
            if (player === 0) {
                if (stopDrawing.value === true) {
                    //store.dispatch('noMoreChoice') // ?
                    return
                }
                if (stopDrawing.value === false) {
                    store.dispatch('drawOne', player)
                    return machine.value.hand
                }
            }
        }

        function makeChoice(machineChoices, board){
            console.log('MACHINE CHOICES INSIDE MAKECHOICE', machineChoices, locked.value, board.value)
            // locked = quand le joueur ne dispose manifestement pas de certaines valeurs...
            // ne pas jouer sur ces valeurs est un moyen de bloquer le joueur
            //if (locked.value === true){
                let lockChoices = calculations.lockPlayer(machineChoices, board.value[0].value[0], board.value[board.value.length-1].value[1], possibleLocks)
                if (lockChoices.length && locked.value || lockChoices.length && restPieces.length < 10) {
                    machinesChoices = machineChoices.filter( d => lockChoices.includes(d.value[0]) || lockChoices.includes(d.value[1]))
                }
                
            // calcul du domino le plus élevé en points, dont il faut se débarrasser en premier
            let final = calculations.calculateBestChoice(machineChoices)
            console.log('MACHINE HAND NOW', machine.value.hand)
            console.log('LET FINAL', final)
            let piece = machine.value.hand.find(p => p.value.value[0] === final[0] && p.value.value[1] === final[1])
            console.log("PIECE TO PLAY", piece, board.value[0].value[0], board.value[board.value.length-1].value[1])
            piece.value.player = false
            //calculations.positionningTheChosenDomino(piece, this.head, this.tail)

            store.dispatch('addToBoard', piece)
            keepPlaying.value = false
            console.log('HEAD AND TAIL PLAYER AFTER MACHINE MAKING CHOICE AND PLAYING', board.value[0].value[0], board.value[board.value.length-1].value[1])
            console.log('KEEPPLAYING MAKECHOICE TO PLAYER', keepPlaying.value)
            playerChoices = calculations.evaluatePlayerChoices()
            console.log('PLAYER CHOICES', playerChoices.value)
            if (!playerChoices.value.length) draw.value = true

        }


      

        

            return { name, start, keepPlaying, draw, stopDrawing, continueDrawing, round, upto, player, machine, playerHand, machineHand, alert, select, action, message, launch, whoStarts, fullHand, displayBtn, dominoes, restPieces, playerWins, machineWins, neitherWins, chooseDomino, machinePlays, makeChoice, calculations }
        
        
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
