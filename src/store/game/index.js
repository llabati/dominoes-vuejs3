/* eslint-disable */
export default {
    //namespaced: true,
    state(){
        return {
            round: 1,
            stuck: false,
            player: {
                victories: 0,
                recent_winning: false,
                score: 0
            },
            machine: {
                victories: 0,
                recent_winning: false,
                score: 0
            }
        }
    },
    getters: {
        getStuck(state){
            return state.stuck
        },
        getRound(state){
            return state.round
        },
        getPlayerRecentWinning(state){
            return state.player.recent_winning
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
        getMachineRecentWinning(state){
            return state.machine.recent_winning
        },
        getMachineScore(state){
            return state.machine.score
        }
    },
    actions: {
        updateRound( { commit }) {
            commit('UPDATE_ROUND')
        },
        updateScore( { commit }, payload) {
            commit('UPDATE_SCORE', payload)
        }
    },
    mutations: {
        UPDATE_ROUND(state){
            state.round = state.round ++
        },
        UPDATE_SCORE(state, payload){
            if (!payload.score) {
                state.stuck = true
            }
            if (payload.player) {
                state.stuck = false
                state.player.score += payload.score
                state.player.recent_winning = true
                state.machine.recent_winning = false
            }
            else {
                state.stuck = false
                state.machine.score += payload.score
                state.machine.recent_winning = true
                state.player.recent_winning = false
            }
        }
    }
}