/* eslint-disable */
export default {
    //namespaced: true,
    state(){
        return {
            round: 1,
            stuck: false,
            
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
        getMachineRecentWinning(state){
            return state.machine.recent_winning
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
            state.round++
            console.log('UPDATE ROUND', state.round)
        },
        UPDATE_SCORE(state, payload, rootState){
            console.log('QUEL STATE ?', state)
            if (!payload.score) {
                state.stuck = true
            }
            else if (payload.player) {
                state.stuck = false
                rootState.player.score += payload.score
                rootState.player.victories += 1
                rootState.player.recent_winning = true
                rootState.machine.recent_winning = false
            }
            else if (payload.machine){
                state.stuck = false
                rootState.machine.score += payload.score
                rootState.machine.victories += 1
                rootState.machine.recent_winning = true
                rootState.player.recent_winning = false
            }
            console.log('PA', rootState.player)
            console.log('MA', rootState.machine)
        }
    }
}