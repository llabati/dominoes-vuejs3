//import store from '../store'
//import utils from './utils'
//import calculations from './calculations'
//import _ from 'lodash'


export default {
  //distribue 6 dominos à chaque joueur (joueur et machine)
  /*startGame(board){
    console.log(store.state)
    
    //store.dispatch('setState')
    
  //return store.state.player.hand
  return store.state.player.hand
  }, */

  // Qui commence ?
        // La règle est que celui qui a le double 6, ou le double 5, ou le double 4... commence la première partie.
        // Sans doubles, celui qui a le domino à la valeur la plus élevée.
        // Pour les parties suivantes, c'est le gagnant de la partie précédente qui commence.

  /*whoStarts(player, machine, tour){
    console.log('WHO ?', player, tour)
    let starter
    if (tour === 0) {
      console.log('MACHINE HAND', machine.hand)
        let machineMax = 0

  // y a t il des doubles => filtrer le tableau et prendre le double le plus haut
  //si pas de double, prendre le "total" le plus élevé


          for (let dom of machine.hand) {
              dom.total = dom.value[0] + dom.value[1]
              dom.double = dom.value[0] == dom.value[1] ? true : false
          }
          let doublesM = machine.hand.filter(d => d.double)
          doublesM.sort( (a,b) => b.total - a.total)
          let machineFirst = doublesM.length ? doublesM[0] : machine.hand.sort ( (a,b) => b.total - a.total)[0]
          machine.start = machineFirst
          console.log('TOP MACHINE', machineFirst)
          console.log('PLAYER HAND', player.hand)
          for (let dom of player.hand) {
              dom.total = dom.value[0] + dom.value[1]
              dom.double = dom.value[0] == dom.value[1] ? true : false
          }
          let doublesP = player.hand.filter(d => d.double)
          doublesP.sort( (a,b) => b.total - a.total)
          let playerFirst = doublesP.length ? doublesP[0] : player.hand.sort ( (a,b) => b.total - a.total)[0]
          console.log('TOP PLAYER', playerFirst)
          player.start = playerFirst
          if (doublesM.length && doublesP.length) {
              starter = machineFirst.value[0] + machineFirst.value[1] > playerFirst.value[0] + playerFirst.value[1] ? machine : player
              if (starter === machine) {
                machine.isStarting = true
              }
              else {
                player.isStarting = true
              }
              console.log('WHO STARTS', starter)
          }
          if (doublesM.length && !doublesP.length) {
              starter = machine
              machine.isStarting = true
              console.log('WHO STARTS', starter)
          }
          if (!doublesM.length && doublesP.length) {
              starter = player
              player.isStarting = true
              console.log('WHO STARTS', starter)
              }
          if (!doublesM.length && !doublesP.length) {
              starter = machineFirst.value[0] + machineFirst.value[1] > playerFirst.value[0] + playerFirst.value[1] ? machine : player
              if (starter === machine) {
                machine.isStarting = true
              }
              else {
                player.isStarting = true
              }
              console.log('WHO STARTS', starter)
          }
              } else {
              if (player.wins) {
                starter = player
              }
              else {
                starter = machine
              }
          }
          console.log('STARTER IS ', starter)
          return starter */
      }