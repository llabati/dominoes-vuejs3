/* eslint-disable */
import { createStore } from 'vuex'
import Player from '../models/Player.js'
import Machine from '../models/Machine.js'
import Domino from '../models/Domino.js'
import swap from '../hooks/swap.js'
import _ from 'lodash'
import gameModule from './game/index.js'
import fullHand from '../hooks/fullHand.js'
import whoStarts from '../hooks/whoStarts.js'
import calculations from '../services/calculations.js'



const store = createStore({
    state() {
        return {
            start: false,
            round: 1,
            stuck: false,
            play: false,
            upto: false,
            message: '',
            dominoes: [],
            board: [],
            first: undefined,
            last: undefined,
            begin: [],
            left: [],
            leftOne: [],
            leftTwo: [],
            leftThree: [],
            top: [],
            right: [],
            rightOne: [],
            rightTwo: [],
            rightThree: [],
            bottom: [],
            endLeft: [],
            veryEndLeft: [],
            endRight: [],
            veryEndRight: [], 
            player: {
                name: '',
                hand: [],
                score: 0,
                victories: 0,
                recent_winning: false
            },
            machine: {
                hand: [],
                score: 0,
                victories: 0,
                recent_winning: false
            },
            /*player: Player,
            machine: Machine,*/
            machineChoices: [],
            playerChoices: [ [], [] ],
            draw: false,
            stopDrawing: false,
            locks: [],
            possibleLocks: [],
            lockChoices: [],
            alert: false,
            playerWins: false,
            machineWins: false,
            neitherWins: false
        }
    },
    getters: {
        getPlayer(state){
            return state.player
        },
        getMachine(state){
            return state.machine
        },
        getPlayerHand(state){
            return state.player.hand
        },
        getPlayerChoices(state){
            return state.playerChoices
        },
        getMachineHand(state){
            return state.machine.hand
        },
        getDominoes(state){
            return state.dominoes
        },
        getBoard(state){
            console.log('BOARD', state.board)
            return state.board
        },
        getFirst(state){
            if (!state.board.length) return state.first = undefined
            else return state.first = state.board[0].value[0]
        },
        getLast(state){
            if (!state.board.length) return state.last = undefined
            else return state.last = state.board[state.board.length - 1].value[1]
        },
        getBegin(state){
            return state.begin
        },
        getLeft(state){
            return state.left
        },
        getLeftOne(state){
            return state.leftOne
        },
        getLeftTwo(state){
            return state.leftTwo
        },
        getLeftThree(state){
            return state.leftThree
        },
        getTop(state){
            return state.top
        },
        getRight(state){
            return state.right
        },
        getRightOne(state){
            return state.rightOne
        },
        getRightTwo(state){
            return state.rightTwo
        },
        getRightThree(state){
            return state.rightThree
        },
        getBottom(state){
            return state.bottom
        },
        getEndLeft(state){
            return state.endLeft
        },
        getVeryEndLeft(state){
            return state.veryEndLeft
        },
        getEndRight(state){
            return state.endRight
        },
        getVeryEndRight(state){
            return state.veryEndRight
        },
        getStart(state){
            return state.start
        },
        getLocks(state){
            return state.locks
        },
        getPossibleLocks(state){
            return state.possibleLocks
        },
        getAlert(state){
            return state.alert
        },
        getPlayerWins(state){
            return state.playerWins
        },
        getMachineWins(state){
            return state.machineWins
        },
        getNeitherWins(state){
            return state.neitherWins
        },
        getPlayerVictories(state){
            return state.player.victories
        },
        getPlayerScore(state){
            return state.player.score
        },
        getMachineVictories(state){
            return state.machine.victories
        },
        getMachineScore(state){
            return state.machine.score
        },
        getPlay(state){
            return state.play
        },
        getMessage(state){
            return state.message
        },
        getUpto(state){
            return state.upto
        },
        getDraw(state){
            return state.draw
        },
        getStopDrawing(state){
            return state.stopDrawing
        }
    },
    actions: {
        addPlayer( { commit }, name ){
            commit('ADD_PLAYER', name)
            console.log('ADD_PLAYER')
        },
        setStartToTrue( { commit } ){ 
            commit('SET_START_TO_TRUE')
            console.log('ACTION START TRUE')
        },
        setStartToFalse( { commit } ){
            commit('SET_START_TO_FALSE')
        },
        setGame( { commit } ){
            commit('SET_GAME')
        },
        clearRound( { commit }){
            commit('CLEAR_ROUND')
        },
        updateDominoesAndHands( { commit }, payload ){
            commit('UPDATE_DOMINOES_AND_HANDS', payload)
        },
        setFirstValueForHead( { commit }, domino ){
            commit('SET_FIRST_VALUE_FOR_HEAD', domino)
        },
        setFirstValueForTail( { commit }, domino ){
            commit('SET_FIRST_VALUE_FOR_TAIL', domino)
        },
        evaluatePlayerChoices( { commit } ) {
            commit('EVALUATE_PLAYER_CHOICES')
        },
        addToBoard( { commit }, domino) {
            commit('ADD_TO_BOARD', domino)
        },
        addToLocks( { commit }, newLocks){
            commit('ADD_TO_LOCKS', newLocks)
        },
        updateLockChoices( { commit }, lockChoices){
            commit('UPDATE_LOCKCHOICES', lockChoices)
        },
        evaluatePossibleLocks( { commit } ) {
            commit('EVALUATE_POSSIBLE_LOCKS')
        },
        drawOne( { commit }, side ){
            commit('DRAW_ONE', side)
        },
        setAlert( { commit } ){
            commit('SET_ALERT')
        },
        unsetAlert( { commit } ){
            commit('UNSET_ALERT')
        },
        playerWinsIsTrue( { commit } ){
            commit('PLAYERWINS_IS_TRUE')
        },
        machineWinsIsTrue( { commit } ){
            commit('MACHINEWINS_IS_TRUE')
        },
        neitherWinsIsTrue( { commit } ){
            commit('NEITHERWINS_IS_TRUE')
        },
        resetBoard( { commit } ) {
            commit('RESET_BOARD')
        },
        resetAll( { commit } ){
            commit('RESET_ALL')
        },
        resetPlayerHand({ commit }){
            commit('RESET_PLAYER_HAND')
        },
        resetMachineHand({ commit }){
            commit('RESET_MACHINE_HAND')
        },
        resetPlayerChoices({ commit }){
            commit('RESET_PLAYER_CHOICES')
        },
        resetMachineChoices({ commit }){
            commit('RESET_MACHINE_CHOICES')
        },
        resetDominoes({ commit }){
            commit('RESET_DOMINOES')
        },
        resetLocks({ commit }){
            commit('RESET_LOCKS')
        },
        updatePlayerAndMachine( { commit } ){
            commit('UPDATE_PLAYER_AND_MACHINE')
        },
        setPlayToTrue( { commit } ){
            commit('SET_PLAY_TO_TRUE')
        },
        clearMessage( { commit } ){
            commit('CLEAR_MESSAGE')
        },
        async startGame({ dispatch, commit, state }){
             console.log('store, here we are')    
            // Nous commençons la première manche. 
            //Il faut déterminer qui va jouer en premier (celui qui a le double le plus élevé, ou à défaut, le domino le plus fort)
            dispatch('unsetAlert')
            dispatch('clearMessage')
            dispatch('setStartToFalse')
            dispatch('setPlayToTrue')
            
            console.log('store, stage 1')
            console.log('state', state)
            if (state.player.hand.length) {
                dispatch('resetPlayerHand')
                console.log('resetPlayerHand', state.playerHand.value)
            }
            if (state.machine.hand.length) {
                dispatch('resetMachineHand')
                console.log('resetMachineHand', state.machineHand.value)
            }
            dispatch('resetPlayerChoices')
            await dispatch('setGame')
            console.log('RESTPIECES BEFORE', state.dominoes.length, fullHand)
            let click = 0
            while (click < 6){
                fullHand(state.player, state.machine, state.dominoes)
                click++
            }
            console.log('store, stage 2')
            console.log('RESTPIECES AFTER', state.dominoes.length)
            console.log('TWO HANDS REFUELED')
            
            
            
            
            if (state.round === 1 || state.stuck) {
                console.log('stage 3a', whoStarts)
                let starter = whoStarts(state.player, state.machine, state.round, false, false)
                console.log('THE STARTER', starter)
                console.log('THE PLAYERS', state.player, state.machine, state.round, 'START', state.start)
                if (starter.name) {
                    console.log('C EST LE JOUEUR QUI COMMENCE', state.player)
                    state.playerStarts = true
                    let firstDomino = state.player.hand.find( d => d.value == state.player.start.value)
                    firstDomino.isStarter = true
                    state.message = `C'est vous qui commencez, ${state.player.name} ! Prenez votre double ou votre domino le plus élevé, >>> [${firstDomino.value}] <<<. Cliquez dessus, il se placera automatiquement sur le tapis.`
                    dispatch('setAlert')
                    }
                else {
                    console.log(state.round, 'C EST LA MACHINE QUI COMMENCE', state.machine)
                    state.machineStarts = true
                    state.message = `C'est la machine qui commence ! Pour jouer, cliquez sur le domino de votre choix; il se placera automatiquement sur le tapis.`
                    dispatch('setAlert')
                    dispatch('machinePlays')
                }
                
            }
        if (state.round > 1) {
            console.log('store, stage 3b')
            console.log('THIS ROUND', state.round)
            
            let machine_recent_winning = this.getters['gameModule/getMachineRecentWinning'] 
            let player_recent_winning = this.getters['gameModule/getPlayerRecentWinning']
            let starter = whoStarts(state.player, state.machine, state.round, machine_recent_winning, player_recent_winning)
            

            // afficher ici les résultats et la progression et le cumul des manches 
            console.log('stage 4b' + starter)
            console.log('board', state.board, 'playerHand', state.player.hand, 'playerChoices', state.playerChoices, 'dominoes', state.dominoes)
            if (machine_recent_winning) {
                state.message = `A la machine de commencer cette nouvelle manche !`
                dispatch('setAlert')
                console.log('machine_recent_winning ' + machine_recent_winning)
                console.log('machineWins ' + state.machineWins + 'playerWins ' + state.playerWins)
                commit('machinePlays')
            }
            if (player_recent_winning) {
                state.playerStarts = true
                state.message = "A vous de commencer cette nouvelle manche !"
                dispatch('setAlert')
                console.log('player_recent_winning ' + player_recent_winning)
                console.log('machineWins ' + state.machineWins + 'playerWins ' + state.playerWins)
            }
            
            
        }
        
    },

    // c'est le joueur qui joue'
    playerPlays({ dispatch, commit , state }, domino, side ){
        console.log('CHOOSE THIS DOMINO', domino.domino, side)
        if (!state.board.length && (state.round === 1 || state.stuck) && state.player.isStarting === true) {
            
            domino.domino.player = true
        }
        // marquer ce domino comme le domino du joueur (pour l'enlever de la main du joueur)
        domino.domino.player = true
        
        // si l'occasion se présente, choisir et placer comme on le souhaite un domino "gauche ou droite"
        domino.domino.left = side === "left" || undefined ? true : false
        if (state.sider) state.sider = false
        
        state.wrong = false

        
        // vérification que le domino choisi est bon
        console.log('BOARD LENGTH', state.board.length)
        if (state.board.length >= 1) {
            calculations.warningWrongDomino(domino.domino, state.first, state.last, state.wrong)
            console.log('WARNING PASSED!', state.wrong)
            if (state.wrong === true) {
                state.message = 'Vous ne pouvez pas jouer ce domino !'
                dispatch('setAlert')
                return
            }
        
        }
        

        console.log('MON DOMINO', domino.domino)
        dispatch('addToBoard', domino.domino)
        
        state.keepPlaying = true
        
        if (!state.player.hand.length && state.board.length) {
            dispatch('playerWinsIsTrue')
        }
        else state.upto = !state.upto
    },

    
    
    ////////////////////////////////////////////////////////////////


       // c'est la machine qui joue
    machinePlays({ dispatch, commit, state }){
        console.log('MACHINE IS PLAYING')
        if (!state.board.length && state.machine.isStarting === true){
            console.log(`Machine is starting with ${state.machine.start.value[0]} ${state.machine.start.value[1]}`)
            
            state.machine.start.player = false
            dispatch('addToBoard', state.machine.start)
            state.machine.isStarting = false
            dispatch('upToThePlayer')
        
        }
        else if (state.board.length && state.keepPlaying === true) {
            console.log('KEEP PLAYING!')
            
            // surveiller les valeurs qui vont bientôt manquer...
            let knownDominoes = state.machine.hand.concat(state.board)
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
            
            console.log('HEAD AND TAIL', state.first, state.last)

            let one = state.machine.hand.filter(d => d.value[0] === state.first)
            if (one) choices.push(one)

            let two = state.machine.hand.filter(d => d.value[1] === state.first)
            if (two) choices.push(two)

            let three = state.machine.hand.filter(d => d.value[0] === state.last)
            if (three) choices.push(three)

            let four = state.machine.hand.filter(d => d.value[1] === state.last)
            if (four) choices.push(four)

            let allChoices = choices.reduce( (acc, cur) => acc.concat(cur), [])
            allChoices = new Set(allChoices)
            state.machineChoices = [ ...allChoices ]
            
            console.log('MACHINECHOICES', state.machineChoices)
            

            // selon les résultats... pas de choix, un seul choix, plusieurs choix possibles
            // pas de domino à placer : la machine pioche...
            if (!state.machineChoices.length && state.board.length) {
                if (state.stopDrawing === true){
                    console.log('KEEPPLAYING MACHINE PLAYS NOCHOICE', state.keepPlaying)
                    dispatch('upToThePlayer')
                } 
                else if (state.dominoes.length === 0 && !state.playerChoices.length) {
                    dispatch('neitherWinsIsTrue')
                } 
                else {
                    state.continueDrawing = true
                    let d = 0
                    while (state.dominoes[d]){
                        dispatch('drawOne', 0)
                        let newPiece = state.machine.hand[state.machine.hand.length-1]
                        console.log('NEWPIECE', newPiece)
                        if (!newPiece.value.includes(state.first) && !newPiece.value.includes(state.last)) { 
                            state.continueDrawing = true
                            state.keepPlaying = true
                            console.log('MACHINECHOICES HAS NO SOLUION AFER DRAWIN', state.machineChoices)
                            
                            d++
                        }
                        //else if (newPiece.value[0] === first.value || newPiece.value[1] === first.value || newPiece.value[0] === last.value || newPiece.value[1] === last.value){
                        else {    
                            newPiece.player = false
                            state.machineChoices.push(newPiece)
                            state.continueDrawing = false
                            state.keepPlaying = false
                            console.log('MACHINECHOICES HAS A NEW SOLUION AFER DRAWIN', state.machineChoices)
                            dispatch('addToBoard', newPiece)
                            break
                            }
                    }
                    
                        }       
                        dispatch('upToThePlayer')
                    }
                    
                
            //la machine a un domino possible
            else if (state.machineChoices.length === 1){
                let piece = state.machineChoices[0]
                piece.player = false
                console.log("1 PIECE TO PLAY", piece, state.first, state.last)
                
                dispatch('addToBoard', piece)
                dispatch('upToThePlayer')
            }
            //la machine a un ou plusieurs dominos possibles : comment choisir le meilleur ?
            else if (state.machineChoices.length > 1) {
                console.log('BOARD FOR MAKECHOICE', state.board)
                console.log('machineChoices.value', state.machineChoices)
                dispatch('makeChoice')
                dispatch('upToThePlayer')
            }
        }
        
        
        else if (state.board.length && state.keepPlaying === false) {
            dispatch('upToThePlayer')
        }      
        
    },
    
    // passe la main au joueur
    upToThePlayer({ dispatch, commit, state }){
        commit('KEEP_PLAYING_TO_FALSE')
        
        console.log('MACHINE HAND AFTER MACHINE PLAYS', state.machine.hand)
        if (!state.machine.hand.length) {
            dispatch('machineWinsIsTrue')
        } else {
            console.log('BOARD', state.board)
            console.log('HEAD AND TAIL PLAYER', state.first, state.last)
            console.log('KEEPPLAYING MACHINEPLAYS END TO PLAYER', state.keepPlaying)
            //console.log('SIDER before EVALUAE', state.sider)
            console.log('restPieces', state.dominoes.length)
            dispatch('evaluatePlayerChoices')
            console.log('PLAYER CHOICES', state.playerChoices)

            
            if (!state.playerChoices[0].length && !state.playerChoices[1].length && !state.dominoes.length) {
                state.stopDrawing = true
            }
            else if (!state.playerChoices[0].length && !state.playerChoices[1].length && state.dominoes.length) {
                commit ('SET_DRAW_TO_TRUE')
            }
            else if (state.playerChoices[0].length) {
                state.sider = true
            }
            
        }
    },

    // pioche (illimitée, jusqu'à trouver le bon domino, ou à vider la réserve)
    drawAgain({ dispatch, commit, state }, side) {
        // si lapioche est vide
        if (state.dominoes.length === 0) {
            commit('SET_DRAW_TO_FALSE')
            //state.draw = false
            state.stopDrawing = true
            state.upto = !state.upto
        }
        else {
            // si c'est le joueur humain qui pioche (bouton 'DRAW')
            if (side === 1) {
                
                dispatch('drawOne', side)
                dispatch('evaluatePlayerChoices')
                
                console.log('PLAYERCHOICES VALUE', state.playerChoices.length)
                
                if (state.playerChoices.length) {
                    commit('SET_DRAW_TO_FALSE')
                    if (state.playerChoices.some(domino => domino.ambidextrous)) {
                        state.sider = true

                    }
                    return state.player.hand
                }
            }

            // si c'est la machine qui pioche
            if (side === 0) {
                if (state.stopDrawing === true) {
                    return
                }
                if (state.stopDrawing === false) {
                    dispatch('drawOne', 0)
                    console.log('DRAW ONE O HE SORE', state.machine.hand)
                    //return machine.value.hand
                }
            }
        }
    },

    makeChoice({ dispatch, commit, state }){
        
        console.log('PARAMS FOR LOCKPLAYER', 'MACGINE CHOICES', state.machineChoices, 'LOCKS', state.locks, 'NEWLOCKS', state.locks, 'POSSIBLELOCKS', state.possibleLocks)

        let actualLocks = [ ...state.locks]
        console.log('ACTUAL LOCKS', actualLocks)
        let stratLocks = actualLocks.filter( d => d === state.first || d === state.last ) 
        
        if (stratLocks.length) state.machineChoices = state.machineChoices.filter( d => !d.value.includes(stratLocks[0]) || !d.value.includes(stratLocks[1]) )
    
        
        console.log('machineChoices mae chces', state.machineChoices)
        // calcul du domino le plus élevé en points, dont il faut se débarrasser en premier
        let final = calculations.calculateBestChoice(state.machineChoices)
        console.log('LET FINAL', final)
        
        let piece = state.machineChoices.find(p => p.value[0] === final[0] && p.value[1] === final[1])

        piece.player = false
        console.log("PIECE TO PLAY", piece, state.first, state.last)
        

        dispatch('addToBoard', piece)

    },
    setMessage({ commit, payload }) {
        commit ('SET_MESSAGE', payload)
    },


    // afficher le résultat de la partie
    async claimVictory(){
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
    await store.dispatch('updateScore', victory)
    if (player.value.score >= 100){
        message.value += ` ******************************* Bravo, ${player.value.name} ! Vous avez gagné cette partie avec ${player.value.score}.` 
        store.dispatch('setAlert')           
        }
    else if (machine.value.score >= 100){
        message.value += ` ******************************* Cette fois, ${player.value.name}, c'est la machine qui gagne la partie, avec ${player.value.score}. Désolé...` 
        store.dispatch('setAlert')           
        }
    else {
        message.value += ` ******************************* MANCHE N°${round.value}   
        ${player.value.name} : ${player.value.score} -- MACHINE : ${machine.value.score}`
        }

    await store.dispatch('setAlert')
    reset.value = true
    
    
    },

    // conclure, avant de passer au tour suivant
    async nextRound(){
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
    },

    resetAll(){
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
    },

    async relaunch(){
        await resetAll()
        newRound.value = false
        message.value = ''
        store.dispatch('unsetAlert')
        console.log('relaunch' + ' player' + player.name + ' machine' + machine.hand)
        launchGame.value = true
    }
    
        

    },
    mutations: {
        ADD_PLAYER(state, name){
            state.player = new Player(name)
            state.machine = new Machine()
            console.log('STORE PLAYER', state.player, 'STORE MACHINE', state.machine)
            localStorage.setItem('player', JSON.stringify(state.player))
            localStorage.setItem('machine', JSON.stringify(state.machine))
            
          },
          SET_START_TO_TRUE(state){
              state.start = true
              console.log('MUTATION START TRUE', state.start)
              //return state.start
          },
          SET_START_TO_FALSE(state){
            state.start = false
            console.log('MUTATION START FALSE', state.start)
            //return state.start
        },
        // créer un jeu de 28 dominos et les disposer de manière aléatoire
        SET_GAME(state){
            let begin = 0
            let max = 7
            while ( begin < max ) {
            let end = begin
            while (end < max) {
                let domino = new Domino(begin, end)
                state.dominoes.push(domino)
                end ++
            }
            begin ++
            }
            state.dominoes = _.shuffle(state.dominoes)
            return state.dominoes
        },
            
        UPDATE_DOMINOES_AND_HANDS(state, payload){
            state.player.hand = payload.player.value.hand
            state.machine.hand = payload.machine.value.hand
            state.dominoes = payload.dominoes.value
            localStorage.setItem('player', JSON.stringify(state.player))
            localStorage.setItem('machine', JSON.stringify(state.machine))
        },
        
        SET_FIRST_VALUE_FOR_HEAD(state, domino){
            state.head = domino.value.value[0]
        },
        SET_FIRST_VALUE_FOR_TAIL(state, domino){
            state.tail = domino.value.value[1]
        },
        EVALUATE_PLAYER_CHOICES( state ){
            console.log('EVALUATE PLAYER CHOICES', state)
            state.playerChoices = state.player.hand.filter( d => d.value[0] === state.first || d.value[0] === state.last || d.value[1] === state.first || d.value[1] === state.last )
            let ambi = []
            let singles = []
            for (let domino of state.playerChoices){
                if (domino.ambidextrous === true) domino.ambidextrous = false
            }
            if (state.first === state.last) {
                for (let domino of state.playerChoices){
                    domino.ambidextrous = true
                    ambi.push(domino)
                }
                state.playerChoices[0] = ambi
                state.playerChoices[1] = []
                console.log('playerChoices amb', state.playerChoices)

            }
            else { 
                ambi = state.playerChoices.filter( domino => domino.value[0] === state.first && domino.value[1] === state.last || domino.value[0] === state.last && domino.value[1] === state.first)
                if (ambi.length) {
                    for (let domino of ambi){
                        domino.ambidextrous = true
                        }
                    } 
                singles = state.playerChoices.filter(domino => !domino.ambidextrous) 
                state.playerChoices[0] = ambi
                state.playerChoices[1] = singles
                console.log('playerChoices', state.playerChoices)
            }   

            // mise à jour du draw
            if (!state.board.length && !state.player.hand.length) {
                console.log('playerChoices at the start' )
                state.draw = false
            }
            if (state.board.length && !state.player.hand.length){
                state.draw = false
                state.playerWinsIsTrue = true
            }
            
            if (state.dominoes.length && (state.playerChoices[0].length || state.playerChoices[1].length)) state.draw = false
             
            else if (state.player.hand.length && !state.playerChoices[0].length && !state.playerChoices[1].length) {
                let newLocks = [ state.first, state.last ]
                console.log('addToLocks', newLocks)
                state.locks = [...state.locks, newLocks]
                
                if (state.dominoes.length ===  0){
                    state.draw = false
                    state.stopDrawing = true
                }
                else state.draw = true
            }
            
        },
        ADD_TO_BOARD(state, domino){
            console.log('STORE DOMINO ADD TO BOARD BEGINS', 'PIECE', domino, 'BOARD', state.board)
        if (!state.board.length) {
            
            domino.left = true
        }
        else { 

            console.log('COMPARING for left True or False', 'domino', domino, 'board', state.board, 'head', state.board[0].value[0])

            if (!domino.ambidextrous) {
                if ( domino.value[0] === state.board[0].value[0] || domino.value[1] === state.board[0].value[0] ) domino.left = true
                else domino.left = false
            }

            if (domino.left === true || domino.lefty === true) {
                if (domino.value[1] !== state.board[0].value[0]) {
                    console.log('DOMINO BEFORE SWAP L', domino)
                    swap(domino)
                    console.log('SWAP LEFT!', domino)
                }

            }

            if (domino.left === false || domino.lefty === false) {
                if (domino.value[0] !== state.board[state.board.length-1].value[1]){
                console.log('DOMINO BEFORE SWAP R', domino)  
                swap(domino)
                console.log('SWAP RIGHT!', domino)
                }
                
            }
        }
        // où placer le domino joué ?
        if (domino.left === true){
            if (state.board.length <= 8) {
                state.begin.unshift(domino)
                state.board.unshift(domino)
            }
            
            else if (state.begin.length > 8 && !state.leftOne.length){
                state.leftOne.push(domino)
                state.board.unshift(domino)
            }
            else if (state.begin.length > 8 && state.leftOne.length && !state.leftTwo.length){
                state.leftTwo.push(domino)
                state.board.unshift(domino)
            }
            
            else if (state.leftTwo.length && !state.leftThree.length){
                state.leftThree.push(domino)
                state.board.unshift(domino)
            }
            else if (state.leftThree.length && state.top.length <= 8) {
                state.top.push(domino)
                state.board.unshift(domino)
            }
            
            else if (state.top.length > 8 && state.endLeft.length <= 1) {
                state.endLeft.push(domino)
                state.board.unshift(domino)
            }
            else if (state.endLeft.length > 1){
                state.veryEndLeft.push(domino)
                state.board.unshift(domino)
            }
        } if (domino.left === false) {
            if (state.board.length <= 8) {
                state.begin.push(domino)
                state.board.push(domino)
            }
            
            else if (state.begin.length > 8 && !state.rightOne.length){
                state.rightOne.push(domino)
                state.board.push(domino)
            }
            else if (state.begin.length > 8 && state.rightOne.length && !state.rightTwo.length){
                state.rightTwo.push(domino)
                state.board.push(domino)
            }
            
            else if (state.rightTwo.length && !state.rightThree.length){
                state.rightThree.push(domino)
                state.board.push(domino)
            }
            else if (state.rightThree.length && state.bottom.length <= 8) {
                state.bottom.push(domino)
                state.board.push(domino)
            }
            
            else if (state.bottom.length > 8 && state.endRight.length <= 1) {
                state.endRight.push(domino)
                state.board.push(domino)
            }
            else if (state.endRight.length > 1){
                state.veryEndRight.push(domino)
                state.board.push(domino)
            }
        }
        
        // à quelle main enelever le domino joué (joueur ou machine) ?
            
        if (domino.player === true) {
            console.log('HAND OF PLAYER in STORE', state.player.hand, 'DOMINO', domino)
            console.log('DOMINO', domino.total, 'DOMINO VAL', domino.value)
            let domoP = state.player.hand.find(d => d.value.includes(domino.value[0]) && d.value.includes(domino.value[1]) )
            let indexP = state.player.hand.indexOf(domoP)
            console.log('DOMO PLAYER SPLICED FOM HAND', domoP, indexP)
            state.player.hand.splice(indexP, 1)
        }
        else {
            console.log('HAND OF MACHINE in STORE', state.machine.hand, 'DOMINO', domino)
            let domoM = state.machine.hand.find(d => (d.value[0] === domino.value[0] && d.value[1] === domino.value[1]) || (d.value[0] === domino.value[1] && d.value[1] === domino.value[0]))
            let indexM = state.machine.hand.indexOf(domoM)
            console.log('DOMO MACHINE SPLICED FROM HAND', domoM, indexM)
            state.machine.hand.splice(indexM, 1)
            }
        },
        ADD_TO_LOCKS(state, values){

            state.locks = [ ...state.locks, ...values ]
            state.locks = new Set(state.locks)
        }, 
        UPDATE_LOCKCHOICES(state, lockChoices){
            state.lockChoices = [ ...lockChoices ]
        },
        // piocher
        DRAW_ONE(state, side) {
            if (side === 1) state.player.hand.push(state.dominoes[0])
            if (side === 0) state.machine.hand.push(state.dominoes[0])
            state.dominoes.shift()
            console.log('STORE DRAWED!')
        },
        EVALUATE_POSSIBLE_LOCKS(state){
            let knownDominoes = state.machine.hand.concat(state.board)
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
            state.possibleLocks = Object.entries(stats).filter( d => d[1] > 4 )
            
            console.log('POSSIBLE LOCKS', state.possibleLocks)
        },
        SET_ALERT(state){
            state.alert = true
        },
        UNSET_ALERT(state){
            state.alert = false
        },
        PLAYERWINS_IS_TRUE(state){
            state.playerWins = true
        },
        MACHINEWINS_IS_TRUE(state){
            state.machineWins = true
        },
        NEITHERWINS_IS_TRUE(state){
            state.neitherWins = true
        },
        UPDATE_SCORE(state, payload){
            
            if (!payload.score) {
                state.gameModule.stuck = true
            }
            else if (payload.player) {
                state.gameModule.stuck = false
                state.player.score += payload.score
                state.player.victories += 1
                state.player.recent_winning = true
                state.machine.recent_winning = false
            }
            else if (payload.machine){
                state.gameModule.stuck = false
                state.machine.score += payload.score
                state.machine.victories += 1
                state.machine.recent_winning = true
                state.player.recent_winning = false
            }
            console.log('PA', state.player)
            console.log('MA', state.machine)
            console.log('game', state.gameModule)
        },
        RESET_BOARD(state){
            state.board = []
            state.begin = []
            
            state.leftOne = []
            state.leftTwo = []
            state.leftThree = []
            state.top = []
            
            state.rightOne = []
            state.rightTwo = []
            state.rightThree = []
            state.bottom = []
            state.endLeft = []
            state.veryEndLeft = []
            state.endRight = []
            state.veryEndRight = []
        },
        RESET_ALL(state){
            state.start = false
            state.dominoes = []
            //state.board = []
            state.first = undefined
            state.last = undefined
            //state.machineChoices = []
            state.playerChoices = []
            state.locks = []
            state.possibleLocks = []
            state.lockChoices = []
            state.playerWins = false
            state.machineWins = false
            state.neitherWins = false
            state.gameModule.stuck = false
            console.log('RESET stre  -- stc' + state.gameModule.stuck )
        },
        RESET_PLAYER_HAND(state){
            state.player.hand = []
        },
        RESET_MACHINE_HAND(state){
            state.machine.hand = []
        },
        RESET_MACHINE_CHOICES(state){
            state.machineChoices = []
        },
        RESET_DOMINOES(state){
            state.dominoes = []
        },
        RESET_LOCKS(state){
            state.locks = []
        },
        RESET_PLAYER_CHOICES(state) {
            state.playerChoices = [ [], [] ]
        },
        UPDATE_PLAYER_AND_MACHINE(state){
            console.log('RESET payer ' + state.player.name + ' hand ' + state.player.hand[0])
            /*state.player = Object.assign(state.player, { hand: [] })
            state.machine = Object.assign(state.machine, { hand: [] })*/
            state.player.hand = []
            state.machine.hand = []
            console.log('RESET payer ' + state.player + ' hand ' + state.player.hand[0])
        },
        SET_PLAY_TO_TRUE(state){
            state.play = true
        },
        CLEAR_MESSAGE(state){
            state.message = ''
        },
        KEEP_PLAYING_TO_FALSE(state){
            state.keepPlaying = false
        },
        SET_MESSAGE(state, payload){
            state.message = payload
        },
        SET_DRAW_TO_FALSE(state){
            state.draw = false
        },
        SET_DRAW_TO_TRUE(state){
            state.draw = true
        }
        
            
    },
    modules: {
        gameModule
    }
})

export default store