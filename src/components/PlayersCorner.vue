<template lang="pug">

.hand-board
    
    .hor.hand#player-hand
        
        ul.flex-list(v-if="player.hand")
            li(v-for="piece in player.hand" :key="piece.id")
                domino.domino-vert.active-domino(:value='piece.value' @chosen='chooseDomino(piece, undefined)')
        

    alertsDisplay(v-if='alert' @clear-message ="message=''" @go-next="nextRound" @next-please="launch")
    div(v-if="playerChoices[0].length" style="text-align: center;")
        button.btn-name(style="background: white; color: green; width: 100px; margin: 5px auto;" @click='sider=false') Autre domino
        ul.flex-list 
            selectDisplay(v-for="piece in playerChoices[0]" :key="piece.id" :piece="piece" v-on:choose-dom='chooseDomino(piece, undefined)' v-on:place-to-left='chooseAmbidextrousDomino(piece, "left")' v-on:place-to-right='chooseAmbidextrousDomino(piece, "right")') Ce domino peut être placé à gauche ou à droite.     

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
            watch(playerHand, function(){ 
                console.log('SIDER HAS CHANGED', sider.value)
            })

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
                }
                
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
            provide('playerChoices', playerChoices)

            watch(playerChoices, function() {
                console.log('playerChoices.value', playerChoices.value)
                if (!board.value.length) draw.value = false
                if (!playerHand.value.length){
                    draw.value = false
                    store.dispatch('playerWinsIsTrue')
                }
                
                else if (playerChoices.value[0].length || playerChoices.value[1].length) draw.value = false
                
                else if (!playerChoices.value[0].length && !playerChoices.value[1].length) {
                    let newLocks = [ first.value, last.value ]
                    console.log('addToLocks', newLocks)
                    store.dispatch('addToLocks', newLocks)
                    draw.value = true

                    if (!restPieces.value ===  0){
                    draw.value = false
                    stopDrawing = true
                }
                }
                
                
                console.log('PLAYER CHOICES HAS CHANGED', playerChoices.value, 'DRAW', draw.value) 
                
            })

            let machineChoices = ref([])

            let dominoes = computed(function(){
                return store.getters.getDominoes 
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
                if (!machineChoices.value.length && (playerChoices.value[0].length || playerChoices.value[1].length)) {
                    keepPlaying.value = false
                    message.value = `C'est à vous, ${name}, la machine ne pouvant placer de domino.`
                    store.dispatch('setAlert')
                    
                    console.log('KEEPPLAYING RESTPIECES machine no choices', keepPlaying.value)
                    
                }
                if (!machineChoices.value.length && !playerChoices.value[0].length && !playerChoices.value[1].length) {
                    keepPlaying.value = false
                    store.dispatch('neitherWinsIsTrue')
                    
                    console.log('KEEPPLAYING RESTPIECES', keepPlaying.value)
                    
                }
                if (machineChoices.value.length && !playerChoices.value[0].length && !playerChoices.value[1].length) {
                    keepPlaying.value = true
                    upto.value = !upto.value

                    //store.dispatch('neitherWinsIsTrue')
                    
                    console.log('KEEPPLAYING RESTPIECES payer n chces', keepPlaying.value)
                    
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
            provide('generalPlayerScore', generalPlayerScore)
            let generalMachineScore = computed( () => store.getters.getMachineScore)
            provide('generalMachineScore', generalMachineScore)

            let newRound = ref(false)
            provide('newRound', newRound)

            const [ whoStarts, fullHand ] = startingTheGame()


            const launch = async function letsPlay(){
                
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
                        message.value = `C'est vous qui commencez, ${name.value} ! Prenez votre double ou votre domino le plus élevé, >>> [${firstDomino.value}] <<<. Cliquez dessus, il se placera automatiquement sur le tapis.`
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
                await store.dispatch('setStartToFalse')
                let machine_recent_winning = store.getters['gameModule/getMachineRecentWinning'] 
                let player_recent_winning = store.getters['gameModule/getPlayerRecentWinning']
                let starter = whoStarts(player, machine, round, machine_recent_winning, player_recent_winning)
                context.emit('play')

                // afficher ici les résultats et la progression et le cumul des manches 
                
                if (machine_recent_winning) {
                    //let firstDomino = player.value.hand.find( d => d.value == player.value.start.value)
                    message.value = `A la machine de commencer cette nouvelle manche !`
                    store.dispatch('setAlert')
                    console.log('machine_recent_winning ' + machine_recent_winning)
                    machinePlays()
                }
                if (player_recent_winning) {
                    playerStarts.value = true
                    message.value = "A vous de commencer cette nouvelle manche !"
                    store.dispatch('setAlert')
                    console.log('player_recent_winning ' + player_recent_winning)
                }
                
            }
            
        }

        // c'est le joueur qui joue'
        function chooseDomino(domino, side){
            console.log('CHOOSE THIS DOMINO', 'SIDER', sider.value)
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
        function chooseAmbidextrousDomino(domino, side){
            console.log('CHOOSE AMBIDEXTROUS DOMINO', domino.value, side, 'SIDER', sider.value)
            
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
                console.log(`Machine is starting with ${machine.value.start.value[0]} ${machine.value.start.value[1]}`)
                
                
                machine.value.start.player = false
                store.dispatch('addToBoard', machine.value.start)
                machine.value.isStarting = false
                keepPlaying.value = false
            
            }
            if (keepPlaying.value === true) {
                console.log('KEEP PLAYING!')
                
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
                    
                    console.log('MACHINECHOICES', machineChoices.value)
                    //store.dispatch('actualizeMachineChoices', choicesNum)

                    // selon les résultats... pas de choix, un seul choix, plusieurs choix possibles
                    // pas de domino à placer : la machine pioche...
                    if (!machineChoices.value.length) {
                        if (stopDrawing.value === true){
                            keepPlaying.value = false
                            console.log('KEEPPLAYING MACHINE PLAYS NOCHOICE', keepPlaying.value)
                        } else {
                            continueDrawing.value = true
                            while (continueDrawing.value === true && dominoes.value.length > 0) {
                                machine.value.hand = drawAgain(0)
                                console.log('HAND', machine.value.hand)
                                let newPiece = machine.value.hand[machine.value.hand.length-1]
                                console.log('NEWPIECE', newPiece)
                                //fonction qui permet de calculer si possibilité de jouer ?
                                if (newPiece.value[0] === first.value || newPiece.value[1] === first.value || newPiece.value[0] === last.value || newPiece.value[1] === last.value){
                                    newPiece.player = false
                                    machineChoices.value.push(newPiece)
                                    continueDrawing.value = false

                                    console.log('MACHINECHOICES HAS A NEW SOLUION AFER DRAWIN', machineChoices.value)
                                    break
                                }
                                else drawAgain(0)
                            }
                        }
                        
                    }
                    //la machine a un domino possible
                    if (machineChoices.value.length === 1){
                        let piece = machineChoices.value[0]
                        piece.player = false
                        console.log("1 PIECE TO PLAY", piece, first.value, last.value)
                        
                        store.dispatch('addToBoard', piece)
                    }
                    //la machine a un ou plusieurs dominos possibles : comment choisir le meilleur ?
                    if (machineChoices.value.length > 1) {
                        console.log('BOARD FOR MAKECHOICE', board.value)
                        console.log('machineChoices.value', machineChoices.value)
                        makeChoice(machineChoices)
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
                if (!machineHand.value.length) {
                    store.dispatch('machineWinsIsTrue')
                } else {
                    console.log('BOARD', board.value)
                    console.log('HEAD AND TAIL PLAYER', first.value, last.value)
                    console.log('KEEPPLAYING MACHINEPLAYS END TO PLAYER', keepPlaying.value)
                    console.log('SIDER before EVALUAE', sider.value)
                    console.log('restPieces', restPieces.value)
                    store.dispatch('evaluatePlayerChoices')
                    console.log('PLAYER CHOICES', playerChoices.value, 'SIDER afer EVALUAE', sider.value)
                    //if (!playerChoices.value.length) draw.value = true
                    
                    //if (playerChoices.value.some(d => d.value[0] === first.value && d.value[1] === last.value || d.value[0] === last.value && d.value[1] === first.value)) {
                    if (playerChoices.value.length > 1 && playerChoices.value[0].length) {
                    sider.value = true
                    }
                    
                }
            
        }

        // pioche (illimitée, jusqu'à trouver le bon domino, ou à vider la réserve)
        function drawAgain(side) {
            // si lapioche est vide
            if (restPieces.value === 0) {
                draw.value = false
                stopDrawing = true
                upto.value = !upto.value
            }
            else {
                // si c'est le joueur humain qui pioche (bouton 'DRAW')
                if (side === 1) {
                    //locked.value = true
                    store.dispatch('drawOne', side)
                    console.log('SIDER in DRAW', sider.value)
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
                        console.log('DRAW ONE O HE SORE', machine.value.hand)
                        return machine.value.hand
                    }
                }
            }
        }

        function makeChoice(machineChoices){
            //console.log('MACHINE CHOICES INSIDE MAKECHOICE', machineChoices, locked.value, board.value, 'POSSIBLE LOCKS', possibleLocks.value)
            // locked = quand le joueur ne dispose manifestement pas de certaines valeurs...
            // ne pas jouer sur ces valeurs est un moyen de bloquer le joueur
            //if (locked.value === true){

                //////////
            console.log('PARAMS FOR LOCKPLAYER', 'MACGINE CHOICES', machineChoices.value, 'NEWLOCKS', newLocks, 'POSSIBLELOCKS', possibleLocks)

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
        
            
            console.log('machineChoices mae chces', machineChoices.value)
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
                victory.machine = true
                victory.score = finalTotal
            }
            if (finalTotal < 0) {
                message.value = 'Les deux joueurs sont bloqués, mais c\'est vous, '+ name.value + ', qui gagnez avec ' + Math.abs(finalTotal) + " points."
                victory.player = true
                victory.machine = false
                victory.score = finalTotal
            }
            if (finalTotal === 0) {
                message.value = 'Les deux joueurs sont bloqués. Pas de vainqueur pour cette manche.'
            }
        }
        if (playerWins.value === true && machineWins.value === false) {
            message.value = "Bravo, "+ name.value + ", vous gagnez avec " + finalTotal + " points !"
            victory.player = true
            victory.machine = false
            victory.score = finalTotal
        }
        if (machineWins.value === true && playerWins.value === false) {
            message.value = "C'est la machine qui gagne, avec "+ finalTotal + " points !"
            victory.player = false
            victory.machine = true
            victory.score = finalTotal
        }
        store.dispatch('setAlert')
        store.dispatch('updateScore', victory)
        reset.value = true
        console.log('ROUND #', round.value, 'PLAYER', player.value, 'MACHINE', machine.value)

        
        }

        // conclure, avant de passer au tour suivant
        async function nextRound(){
            await resetAll()
            await store.dispatch('updateRound')
            if (generalPlayerScore.value >= 100){
                message.value = `Bravo, ${player.value.name} ! Vous avez gagné cette partie avec ${generalPlayerScore.value}.` 
                store.dispatch('setAlert')           
                }
            else if (generalMachineScore.value >= 100){
                message.value = `Cette fois, ${player.value.name}, c'est la machine qui gagne la partie, avec ${generalMachineScore.value}. Désolé...` 
                store.dispatch('setAlert')           
                }
            else {
                message.value = `MANCHE N°${round.value}
                ${player.value.name} : ${generalPlayerScore.value} -- MACHINE : ${generalMachineScore.value}`
                store.dispatch('setAlert')
                reset.value = false
                newRound.value = true
                setTimeout(store.dispatch('unsetAlert'), 5000)
            }
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
            console.log('RESET A', reset.value)
        }
      

        

            return { 
                name, start, round, stuck, keepPlaying, draw, stopDrawing, continueDrawing, round, upto, sider,
                player, machine, playerHand, machineHand, board, newLocks, possibleLocks, 
                generalPlayerScore, generalMachineScore, 
                alert, select, message, reset, launch, whoStarts, fullHand, dominoes, restPieces, 
                playerChoices, machineChoices, playerWins, machineWins, neitherWins, 
                chooseDomino, chooseAmbidextrousDomino, machinePlays, makeChoice, drawAgain, claimVictory, nextRound, resetAll, calculations 
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
