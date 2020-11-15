/* eslint-disable */
export default {
    
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
        getRound(state, getters, rootState){
            console.log('QUEL STATE ?', state)
            console.log('QUEL rootState ?', rootState)
            return state.round
        },
        getPlayerRecentWinning(state, getters, rootState){
            if (!rootState.player.hasOwnProperty()) return false
            return rootState.player.recent_winning
        },
        getMachineRecentWinning(state, getters, rootState){
            if (!rootState.machine.hasOwnProperty()) return false
            return rootState.machine.recent_winning
        }
    },
    actions: {
        updateRound( { commit }) {
            commit('UPDATE_ROUND')
        },
        updateScore( { state, commit, rootState }, payload) {
            commit('UPDATE_SCORE', payload)
        }
    },
    mutations: {
        UPDATE_ROUND(state){
            state.round++
            console.log('UPDATE ROUND', state.round)
        }
        
    }
}