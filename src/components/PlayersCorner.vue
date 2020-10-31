<template lang="pug">

.hand-board
    
    .hor.hand#player-hand
        
        ul.flex-list(v-if="player.hand")
            li(v-for="piece in player.hand" :key="piece.id")
                domino.domino-vert.active-domino(:value='piece.value' @chosen='chooseDomino(piece, undefined)')
        
    selectDisplay(v-if='sider' v-on:close='sider=false' v-on:place-to-left='chooseAmbidextrousDomino("left")' v-on:place-to-right='chooseAmbidextrousDomino("right")') Un de vos dominos peut être placé à gauche ou à droite. Pour ce domino seulement, utilisez les boutons ci-dessous.
    

    alertsDisplay(v-if='alert' @clear-message ="message=''" @go-next="nextRound" @next-please="launch")

    actionsButton(v-if='start' @launch='launch') démarrez le jeu
    actionsButton(v-if='draw' @drawing='drawAgain(1)') piochez
    actionsButton(v-if='stopDrawing' @stop='machinePlays') passez votre tour
    


</template>


<script>
/* eslint-disable */
    import { ref, computed, reactive, watch, provide, inject } from 'vue'
    import store from '../store/index.js'
    import startingTheGame from '../hooks/startingTheGame.js'
    import calculations from '../services/calculations.js'
    import Domino from './Domino.vue'
    import SelectDisplay from './SelectDisplay.vue'
    import AlertsDisplay from './AlertsDisplay.vue'
    import ActionsButton from './ActionsButton.vue'

    export default {
        store,
        components: {
            SelectDisplay,
            AlertsDisplay,
            ActionsButton,
            Domino
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
            let stuck = computed( () => store.getters.getStuck )

            let start = computed( () => store.getters.getStart )
            console.log('START in VUE', start)

            watch(start, () => {
                message.value = 'démarrez le jeu !'
            })
            provide('start', start)

            let keepPlaying = ref(true)

            let draw = ref(false)
            provide('draw', draw)

            watch( draw, function(){
                console.log('DRAW VIENT DE CHANGER !')
            })
            
            let stopDrawing = ref(false)
            provide('stopDrawing', stopDrawing)

            let reset = ref(false)
            provide('reset', reset)

            let continueDrawing = ref(false)

            let playerStarts = ref(false)

            let machineStarts = ref(false)
            watch(machineStarts, function(){
                return machinePlays()
            })

            let upto = ref(true)
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

            let message = ref('')
            provide('message', message)

            let wrong = ref(false)

            let sider = ref(false)

            let player = computed(function(){
                //console.log('PLAYER in PLAYERSCORNER', store.getters.getPlayer)
                return store.getters.getPlayer
            })

            let playerHand = computed( function(){
                console.log('PLAYERHAND in PLAYERSCORNER', store.getters.getPlayerHand)
                return store.getters.getPlayerHand  // Proxy
            })
            watch(playerHand, function(){
                if (!playerHand.value.length && board.value.length) {
                    console.log('PLAYER HAS NO PIECE!', playerHand)
                    store.dispatch('playerWinsIsTrue')
                    //message.value = name.value + ', vous avez gagné !'
                    //store.dispatch('setAlert')
                }
                /*else {
                    store.dispatch('evaluatePlayerChoices')
                    //if (playerChoices.value.some(d => d.value[0] === first.value && d.value[1] === last.value || d.value[0] === last.value && d.value[1] === first.value)) {
                    if (playerChoices.value.some(d => d.ambidextrous)) {
                        sider.value = true
                    }
                }*/
            })
            let machine = computed(function(){
                return store.getters.getMachine
            })

            let machineHand = computed(function(){
                return store.getters.getMachineHand
            })
            watch(machineHand, function(){
                if (!machineHand.value.length && board.value.length) {
                    console.log('MACHINE HAS NO PIECE!', machineHand)
                    store.dispatch('machineWinsIsTrue')

                }
            })

            let playerChoices = computed( () => store.getters.getPlayerChoices )
            watch(playerChoices, function() {
                if (!playerChoices.value.length && !board.value.length) {
                    draw.value = false
                    console.log('STARTING...')
                }
                else if (!playerChoices.value.length && playerHand.value.length) {
                    let newLocks = [ first, last ]
                    store.dispatch('addToLocks', newLocks)
                    draw.value = true
                }
                else if (!playerChoices.value.length && !playerHand.value.length && board.value.length) {
                    draw.value = false
                    store.dispatch('playerWinsIsTrue')
                }
                else if (playerChoices.value.length) draw.value = false
                
                console.log('PLAYER CHOICES HAS CHANGED', playerChoices.value, 'DRAW', draw.value) 
                
            })

            let machineChoices = ref([])

            let dominoes = computed(function(){
                //console.log('DOMINOES FOR STARTINGTHEGAME', store.getters.getDominoes)
                return store.getters.getDominoes // Proxy
            })

            let board = computed(function(){
                return store.getters.getBoard
            })
            watch(board, function(){
                console.log('BOARD IS CHANGED!')
                
            })
            let first = computed( () => store.getters.getFirst)
            watch( first, () => console.log('NEW FIRST', first))
            
            let last = computed( () => store.getters.getLast)
            watch(last, () => console.log('NEW LAST', last))
            
            let restPieces = computed(function(){
                return store.getters.getDominoes.length
            })
            watch(restPieces, function(){
                if (restPieces.value < 1){
                draw.value = false
                stopDrawing = true
                store.dispatch('evaluatePlayerChoices')
                console.log('WATCHING RESTPIECES', 'MACHINE CHOICES', machineChoices.value, 'PLAYER CHOICES', playerChoices.value)
                if (machineChoices.value.length < 1 && playerChoices.value.length < 1) {
                    keepPlaying.value = false
                    store.dispatch('neitherWinsIsTrue')
                    
                    console.log('KEEPPLAYING RESTPIECES', keepPlaying.value)
                    
                }
            }
            })
            

            let playerWins = computed( () => store.getters.getPlayerWins)
            watch(playerWins, ()=> {
                if (playerWins.value === true){

                    console.log('PLAYER HAS WON!')
                    claimVictory()
                }
            })

            let machineWins = computed( () => store.getters.getMachineWins)
            watch(machineWins, ()=> {
                if (machineWins.value === true){

                    console.log('MACHINE HAS WON!')
                    claimVictory()
                }
            })
            let neitherWins = computed( () => store.getters.getNeitherWins)
            watch(neitherWins, ()=> {
                console.log('The two players are stuck!')
                claimVictory()
            })

            let generalPlayerScore = computed( () => store.getters.getPlayerScore)
            let generalMachineScore = computed( () => store.getters.getMachineScore)

            let newRound = ref(false)
            provide('newRound', newRound)

            const [ whoStarts, fullHand ] = startingTheGame()


            const launch = async function letsPlay(){
                //store.dispatch('unsetAlert')
                //message.value = ''
                
                // Nous commençons la première manche. 
                //Il faut déterminer qui va jouer en premier (celui qui a le double le plus élevé, ou à défaut, le domino le plus fort)
                store.dispatch('unsetAlert')
                store.dispatch('setStartToFalse')
                
                await store.dispatch('setGame')
                console.log('RESTPIECES BEFORE', restPieces)
                let click = 0
                while (click < 6){
                    fullHand(player, machine, dominoes)
                    click++
                }
                console.log('RESTPIECES AFTER', restPieces)
                await store.dispatch('updateDominoesAndHands', { player, machine, dominoes })
                console.log('TWO HANDS REFUELED')
                console.log('ROUND', round.value, 'STUCK', stuck.value)
                
                if (round.value === 1 || stuck.value) {
                    let starter = whoStarts(player, machine, 1)
                    console.log('THE STARTER', starter)
                    console.log('THE PLAYERS', player, machine, round, 'START', start)
                    store.dispatch('setStartToFalse')
                    context.emit('play')
                    if (starter.value.name) {
                        console.log(round, 'C EST LE JOUEUR QUI COMMENCE', player)
                        playerStarts.value = true
                        let firstDomino = player.value.hand.find( d => d.value == player.value.start.value)
                        firstDomino.isStarter = true
                        message.value = `C'est vous qui commencez, ${name.value} ! Cliquez sur le domino de votre choix; il se placera automatiquement sur le tapis.`
                        store.dispatch('setAlert')
                        }
                    else {
                        console.log(round, 'C EST LA MACHINE QUI COMMENCE', machine)
                        machineStarts.value = true
                        message.value = `C'est la machine qui commence ! Pour jouer, cliquez sur le domino de votre choix; il se placera automatiquement sur le tapis.`
                        store.dispatch('setAlert')
                    }
                    
                }
            if (round.value > 1) {
                console.log('THIS ROUND', round.value)
                name.value = store.getters.getName
                await store.dispatch('setStartToFalse')
                let starter = whoStarts(player, machine, round.value)
                context.emit('play')
                
                let machine_recent_winning = store.getters['gameModule/getMachineRecentWinning'] 
                let player_recent_winning = store.getters['gameModule/getPlayerRecentWinning']


                // afficher ici les résultats et la progression et le cumul des manches avec response.player_score et response.machine.score
                //console.log('OU EN SOMMES NOUS ?', 'JOUEUR: ', response.player_score, 'MACHINE: ', response.machine_score)
                //this.start = false
                
                if (machine_recent_winning) {
                    message.value = `C'est à la machine de commencer !`
                    store.dispatch('setAlert')
                    machinePlays()
                }
                if (player_recent_winning) {
                    message.value = "C'est à vous de commencer !"
                    store.dispatch('setAlert')
                    console.log('C EST A VOUS !')
                }
                
            }
            
        }

        // c'est le joueur qui joue
        function chooseDomino(domino, side){
            console.log('CHOOSE THIS DOMINO')
            if (!board.value.length && player.value.isStarting === true) {
                player.value.start.player = true
            }
            // marquer ce domino comme le domino du joueur (pour l'enlever de la main du joueur)
            domino.player = true
            wrong.value = false
            
            // vérification que le domino choisi est bon
            console.log('BOARD LENGTH', board.value.length)
            if (board.value.length >= 1) {
                calculations.warningWrongDomino(domino, first, last, wrong)
                console.log('WARNING PASSED!', wrong.value)
                if (wrong.value === true) {
                    message.value = 'Vous ne pouvez pas jouer ce domino !'
                    store.dispatch('setAlert')
                    return
                }
            
            }
            

            console.log('MON DOMINO', domino)
            store.dispatch('addToBoard', domino)
            
            keepPlaying.value = true
            console.log('KEEPPLAYING CHOOSEDOMINO', keepPlaying.value, 'UPTO', upto.value)
            if (!playerHand.value.length && board.value.length) {
                store.dispatch('playerWinsIsTrue')
            }
            else upto.value = !upto.value
        }

        // choisir et placer comme on le souhaite un domino "gauche ou droite"
        function chooseAmbidextrousDomino(side){
            console.log('CHOOSE AMBIDEXTROUS DOMINO', side)

            let domino = playerChoices.value.find( d => d.ambidextrous)
            
            domino.player = true

            domino.left = side === "left" ? true : false
            
            console.log('MON DOMINO AMBIDEXTRE', domino)
            
            sider.value = false

            store.dispatch('addToBoard', domino)
            
            keepPlaying.value = true
            console.log('KEEPPLAYING CHOOSEDOMINO', keepPlaying.value, 'UPTO', upto.value)
            if (!playerHand.value.length && board.value.length) {
                store.dispatch('playerWinsIsTrue')
            }
            else upto.value = !upto.value

        }
        
        ////////////////////////////////////////////////////////////////


           // c'est la machine qui joue
        function machinePlays(){
            console.log('MACHINE IS PLAYING', keepPlaying.value)
            if (!board.value.length && machine.value.isStarting === true){
            console.log('MACHINE START', machine.value.start)
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
                    // surveiller les valeurs qui vont bientôt manquer...
                    
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
                    
                    console.log('HEAD AND TAIL', first.value, last.value)

                    let one = machine.value.hand.filter(d => d.value[0] === first.value)
                    if (one) choices.push(one)

                    let two = machine.value.hand.filter(d => d.value[1] === first.value)
                    if (two) choices.push(two)

                    let three = machine.value.hand.filter(d => d.value[0] === last.value)
                    if (three) choices.push(three)

                    let four = machine.value.hand.filter(d => d.value[1] === last.value)
                    if (four) choices.push(four)

                    let allChoices = choices.reduce( (acc, cur) => acc.concat(cur), [])
                    allChoices = new Set(allChoices)
                    machineChoices.value = [ ...allChoices ]
                    let choicesNum = machineChoices.value.length
                    console.log('MACHINECHOICES', machineChoices.value)
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
                                if (newPiece.value[0] === first.value || newPiece.value[1] === first.value || newPiece.value[0] === last.value || newPiece.value[1] === last.value){
                                newPiece.player = false
                                machineChoices.value.push(newPiece)
                                continueDrawing.value = false

                                console.log('MACHINECHOICES AFTER DRAWING', machineChoices.value)
                                }
                                else drawAgain(0)
                            }
                        }
                    }
                    //la machine a un ou plusieurs dominos possibles : comment choisir le meilleur ?
                    if (machineChoices.value.length > 0) {
                        console.log('BOARD FOR MAKECHOICE', board.value)
                        makeChoice(machineChoices, board)
                    }
                }
            }
                else {
                    if (restPieces.value === 0 && !playerChoices.value.length) {
                        store.dispatch('neitherWinsIsTrue')
                    }
                }
                
                keepPlaying.value = false
                console.log('MACHINE HAND AFTER MACHINE PLAYS', machineHand.value)
                if (!machineHand.value.length) store.dispatch('machineWinsIsTrue')
                else {

                    console.log('BOARD', board.value)
                    console.log('HEAD AND TAIL PLAYER', first.value, last.value)
                    console.log('KEEPPLAYING MACHINEPLAYS END TO PLAYER', keepPlaying.value)
                    store.dispatch('evaluatePlayerChoices')
                    console.log('PLAYER CHOICES', playerChoices.value)
                    if (!playerChoices.value.length) draw.value = true
                    else {
                        if (playerChoices.value.some(d => d.value[0] === first.value && d.value[1] === last.value || d.value[0] === last.value && d.value[1] === first.value)) {
                        sider.value = true
                        }
                    }
                }
            
        }

        // pioche (illimitée, jusqu'à trouver le bon domino, ou à vider la réserve)
        function drawAgain(side) {
            // si lapioche est vide
            if (dominoes.value.length === 0) {
                draw.value = false
                stopDrawing = true
                upto.value = !upto.value
            }
            // si c'est le joueur humain qui pioche (bouton 'DRAW')
            if (side === 1) {
                //locked.value = true
                store.dispatch('drawOne', side)
                store.dispatch('evaluatePlayerChoices')
                
                console.log('PLAYERCHOICES VALUE', playerChoices.value.length)
                
                if (playerChoices.value.length) {
                    draw.value = false
                    if (playerChoices.value.some(domino => domino.ambidextrous)) {
                        sider.value = true

                    }
                    return player.value.hand
                }
            }
            // si c'est la machine qui pioche
            if (side === 0) {
                if (stopDrawing.value === true) {
                    //store.dispatch('noMoreChoice') // ?
                    return
                }
                if (stopDrawing.value === false) {
                    store.dispatch('drawOne', side)
                    return machine.value.hand
                }
            }
        }

        function makeChoice(){
            //console.log('MACHINE CHOICES INSIDE MAKECHOICE', machineChoices, locked.value, board.value, 'POSSIBLE LOCKS', possibleLocks.value)
            // locked = quand le joueur ne dispose manifestement pas de certaines valeurs...
            // ne pas jouer sur ces valeurs est un moyen de bloquer le joueur
            //if (locked.value === true){

                //////////
            console.log('PARAMS FOR LOCKPLAYER', 'MACGINE CHOICES', machineChoices, 'NEWLOCKS', newLocks, 'POSSIBLELOCKS', possibleLocks)

            let actualLocks = [ ...newLocks.value]
            console.log('ACTUAL LOCKS', actualLocks)
            let stratLocks = actualLocks.filter( d => d.value === first.value || d.value === last.value ) 
            let stopChoice = stratLocks.find( d => d.value === [ first.value, last.value ] || d.value === [ last.value, first.value ] )

            if (stopChoice && newLocks.value.includes(first.value) && stopChoice.value === [ first.value, last.value ]){
                stopChoice = swap(stopChoice)
                stopChoice.lefty = true
            }
            if (stopChoice && newLocks.value.includes(last.value) && stopChoice.value === [ first.value, last.value ]){
                stopChoice = swap(stopChoice)
                stopChoice.lefty = false
            }

            if (actualLocks) machineChoices.value = machineChoices.value.filter( d => !d.value.includes(actualLocks[0]) || !d.value.includes(actualLocks[1]) )
        
            
            
                // calcul du domino le plus élevé en points, dont il faut se débarrasser en premier
            let final = calculations.calculateBestChoice(machineChoices)
            console.log('LET FINAL', final)
            let piece = stopChoice ? stopChoice : machineChoices.value.find(p => p.value[0] === final[0] && p.value[1] === final[1])

            piece.player = false
            console.log("PIECE TO PLAY", piece, first.value, last.value)
            //calculations.positionningTheChosenDomino(piece, this.head, this.tail)

            store.dispatch('addToBoard', piece)

        }


        // afficher le résultat de la partie
    function claimVictory(){
        console.log('ENTERING CLAIM VICTORY...', playerWins.value, machineWins.value, neitherWins.value)
        draw.value = false
        stopDrawing = false
        let results = { neitherWins: neitherWins.value, playerWins: playerWins.value, machineWins: machineWins.value, player: playerHand.value, machine: machineHand.value }
        let finalTotal = calculations.calculateScores(results)
        let victory = {}
        if (neitherWins.value === true) {
            if (finalTotal > 0) {
                message.value = 'Les deux joueurs sont bloqués, mais c\'est la machine qui gagne, avec ' + finalTotal + " points."
                victory.player = false
                victory.score = finalTotal
            }
            if (finalTotal < 0) {
                message.value = 'Les deux joueurs sont bloqués, mais c\'est vous, '+ name.value + ', qui gagnez avec ' + Math.abs(finalTotal) + " points."
                victory.player = true
                victory.score = finalTotal
            }
            if (finalTotal === 0) {
                message.value = 'Les deux joueurs sont bloqués. Pas de vainqueur pour cette manche.'
            }
        }
        if (playerWins.value === true && machineWins.value === false) {
            message.value = "Bravo, "+ name.value + ", vous gagnez avec " + finalTotal + " points !"
            victory.player = true
            victory.score = finalTotal
        }
        if (machineWins.value === true && playerWins.value === false) {
            message.value = "C'est la machine qui gagne, avec "+ finalTotal + " points !"
            victory.score = finalTotal
        }
        store.dispatch('setAlert')
        store.dispatch('updateRound')
        store.dispatch('updateScore', victory)
        reset.value = true
        console.log('ROUND #', round.value, 'PLAYER', player.value, 'MACHINE', machine.value)

        
        }

        // conclure, avant de passer au tour suivant
        async function nextRound(){
            await resetAll()
            message.value = `MANCHE N°${round.value} // ${player.name} : ${generalPlayerScore.value} -- MACHINE : ${generalMachineScore.value}`
            store.dispatch('setAlert')
            nextRound.value = true
            setTimeout(launch, 5000)
        }

        function resetAll(){
            //store.dispatch('setStartToTrue')
            store.dispatch('resetAll')
            keepPlaying.value = true
            draw.value = false
            stopDrawing = false
            reset.value = false
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
        }
      

        

            return { 
                name, start, round, stuck, keepPlaying, draw, stopDrawing, continueDrawing, round, upto, sider,
                player, machine, playerHand, machineHand, board, newLocks, possibleLocks, 
                generalPlayerScore, generalMachineScore, 
                alert, select, message, reset, launch, whoStarts, fullHand, dominoes, restPieces, 
                playerChoices, machineChoices, playerWins, machineWins, neitherWins, 
                chooseDomino, chooseAmbidextrousDomino, machinePlays, makeChoice, drawAgain, claimVictory, nextRound, calculations 
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
