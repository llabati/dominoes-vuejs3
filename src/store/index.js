/* eslint-disable */
import { createStore } from 'vuex'
import Player from '../models/Player.js'
import Machine from '../models/Machine.js'
import Domino from '../models/Domino.js'
import swap from '../hooks/swap.js'
import _ from 'lodash'
import gameModule from './game/index.js'


const store = createStore({
    state() {
        return {
            start: false,
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
            //if (!state.player.hasOwnProperty(name)) return undefined
            return state.player.hand
        },
        getPlayerChoices(state){
            return state.playerChoices
        },
        getMachineHand(state){
            //if (!state.machine.hasOwnProperty()) return undefined
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
            console.log('BEGIN', state.begin)
            return state.begin
        },
        getLeft(state){
            console.log('LEFT', state.left)
            return state.left
        },
        getLeftOne(state){
            console.log('LEFT ONE', state.leftOne)
            return state.leftOne
        },
        getLeftTwo(state){
            return state.leftTwo
        },
        getLeftThree(state){
            return state.leftThree
        },
        getTop(state){
            console.log('TOP', state.top)
            return state.top
        },
        getRight(state){
            return state.right
        },
        getRightOne(state){
            console.log('RIGHT ONE', state.rightOne)
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
        updatePlayerAndMachine( { commit } ){
            commit('UPDATE_PLAYER_AND_MACHINE')
        }
        

    },
    mutations: {
        ADD_PLAYER(state, name){
            state.player = new Player(name)
            state.machine = new Machine()
            console.log('STORE PLAYER', state.player, 'STORE MACHINE', state.machine)
            localStorage.setItem('player', JSON.stringify(state.player))
            localStorage.setItem('machine', JSON.stringify(state.machine))
            /*let newPlayer = state.players.find(p => p.name === currentPlayer.name)
            if (!newPlayer) {
              state.players.push(currentPlayer)
            }*/
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
        EVALUATE_PLAYER_CHOICES(state){
            console.log('EVALUATE PLAYER CHOICES', state.player.hand)
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

            /*
            for (let domino of state.playerChoices){
                if ( (domino.value[0] === state.first && domino.value[1] === state.last) || (domino.value[0] === state.last && domino.value[1] === state.first) ){
                    domino.ambidextrous = true
                }
            } */
           // }
            
        },
        ADD_TO_BOARD(state, domino){
            console.log('STORE DOMINO ADD TO BOARD BEGINS', 'PIECE', domino, 'BOARD', state.board)
        if (!state.board.length) {
            //state.begin.push(domino)
            //state.board.push(domino)
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
            /*else if (state.begin.length > 8 && state.left.length <= 2){
                state.left.push(domino)
                state.board.unshift(domino)
            }*/
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
            /*
            else if (state.left.length > 2 && state.top.length <= 8) {
                state.top.push(domino)
                state.board.unshift(domino)
            } */
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
            /*else if (state.begin.length > 8 && state.right.length <= 2){
                state.right.push(domino)
                state.board.push(domino)
            }
            */
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
            
            /*else if (state.right.length > 2 && state.bottom.length <= 8) {
                state.bottom.push(domino)
                state.board.push(domino)
            } */
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
            let domoP = state.player.hand.find(d => (d.value[0] === domino.value[0] && d.value[1] === domino.value[1]) || (d.value[0] === domino.value[1] && d.value[1] === domino.value[0]))
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
        ADD_TO_LOCKS(state, newLocks){

            state.locks = [ ...state.locks, ...newLocks ]
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
        }
        
    },
    modules: {
        gameModule
    }
})

export default store