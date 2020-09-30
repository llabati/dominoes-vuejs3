import { createStore } from 'vuex'
import Player from '../models/Player.js'
import Machine from '../models/Machine.js'
import Domino from '../models/Domino.js'
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
            player: {
                name: '',
                hand: [],
                recent_winning: false,
                score: 0,
                victories: 0
            },
            machine: {
                hand: [],
                recent_winning: false,
                score: 0,
                rounds_won: 0,
                victories: 0
            },
            machineChoices: [],
            playerChoices: [],
            lock: []
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
        state.player.hand = payload.playerHand
        state.machine.hand = payload.machineHand
        state.dominoes = payload.dominoes
        localStorage.setItem('player', JSON.stringify(state.player))
        localStorage.setItem('machine', JSON.stringify(state.machine))
    }
        
    },
    modules: {
        gameModule
    }
})

export default store