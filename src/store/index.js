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
            begin: [],
            left: [],
            top: [],
            right: [],
            bottom: [],
            player: {},
            machine: {},
            machineChoices: [],
            playerChoices: [],
            locks: []
        }
    },
    getters: {
        getPlayer(state){
            console.log('PLAYER in STORE', state.player)
            return state.player
        },
        getMachine(state){
            return state.machine
        },
        getPlayerHand(state){
            console.log('STORE PLAYERHAND', state.player.hand)
            return state.player.hand
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
        getBegin(state){
            console.log('BEGIN', state.begin)
            return state.begin
        },
        getLeft(state){
            console.log('LEFT', state.left)
            return state.left
        },
        getTop(state){
            console.log('TOP', state.top)
            return state.top
        },
        getRight(state){
            return state.right
        },
        getBottom(state){
            return state.bottom
        },
        getStart(state){
            localStorage.setItem('round', JSON.stringify(state.start))
            return state.start
        },
        getLocks(state){
            localStorage.setItem('locks', JSON.stringify(state.locks))
            return state.locks
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
        addToBoard( { commit }, domino) {
            commit('ADD_TO_BOARD', domino)
        },
        addToLocks( { commit }, newLocks){
            commit('ADD_TO_LOCKS', newLocks)
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
        // tout remettre à zéro pour une nouvelle partie
    CLEAR_ROUND(state){
        state.board = []
        state.player.hand = []
        state.machine.hand = []
        state.dominoes = []
        state.lock = []
        state.start = true
        state.begin = []
        state.left= []
        state.top = []
        state.right = []
        state.bottom = []
      
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
    ADD_TO_BOARD(state, domino){
        console.log('STORE DOMINO ADD TO BOARD BEGINS', 'PIECE', domino, 'BOARD', state.board)
      if (!state.board.length) {
        //state.begin.push(domino)
        //state.board.push(domino)
        domino.left = true
      }
      else { 

        console.log('COMPARING for left True or False', 'domino', domino, 'board', state.board, 'head', state.board[0].value[0])
        if ( domino.value[0] === state.board[0].value[0] || domino.value[1] === state.board[0].value[0] ) domino.left = true
        else domino.left = false

        if (domino.left === true) {
            if (domino.value[1] !== state.board[0].value[0]) {
                console.log('DOMINO BEFORE SWAP L', domino)
                swap(domino)
                console.log('SWAP LEFT!', domino)
            }

        }

        if (domino.left === false) {
            if (domino.value[0] !== state.board[state.board.length-1].value[1]){
            console.log('DOMINO BEFORE SWAP R', domino)  
            swap(domino)
            console.log('SWAP RIGHT!', domino)
            }
            
        }
    }
      if (state.board.length > 9) {
        if (domino.left === true) {
          if (state.left.length < 3) {
            state.left.unshift(domino)
            state.board.unshift(domino)
          }
          else {
            state.top.push(domino)
            state.board.unshift(domino)
          }
        }
        else {
          if (state.right.length < 3) {
            state.right.push(domino)
            state.board.push(domino)
          }
          else {
            state.bottom.push(domino)
            state.board.push(domino)
          }
        }
      }
        
      else {
        if (domino.left){
          state.begin.unshift(domino)
          state.board.unshift(domino)
        }
        else {
          state.begin.push(domino)
          state.board.push(domino)
        }
      }
        
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
        state.locks = [ ...newLocks ]
    }
        
    },
    modules: {
        gameModule
    }
})

export default store