/* eslint-disable */
/*export default function startingTheGame(){
  //console.log('PLAYER in HOOK', player)
  */

   
export default function whoStarts(player, machine, round, machine_recent_winning, player_recent_winning){

    console.log('WHO ?')
    let starter
    if (round === 1) {
        // y a t il des doubles => filtrer le tableau et prendre le double le plus haut
        // si pas de double, prendre le "total" le plus élevé
        console.log('MACHINE HAND')

          for (let dom of machine.hand) {
              dom.total = dom.value[0] + dom.value[1]
              dom.double = dom.value[0] == dom.value[1] ? true : false
          }
          let doublesM = machine.hand.filter(d => d.double)
          doublesM.sort( (a,b) => b.total - a.total)

          let machineFirst = doublesM.length ? doublesM[0] : machine.hand.sort ( (a,b) => b.total - a.total )[0]
          machine.start = machineFirst
          console.log('TOP MACHINE', machine.start)
          
          console.log('PLAYER HAND', player.hand)
          for (let dom of player.hand) {
              dom.total = dom.value[0] + dom.value[1]
              dom.double = dom.value[0] == dom.value[1] ? true : false
          }
          let doublesP = player.hand.filter(d => d.double)
          doublesP.sort( (a,b) => b.total - a.total)
          
          let playerFirst = doublesP.length ? doublesP[0] : player.hand.sort ( (a,b) => b.total - a.total )[0]
          player.start = playerFirst
          console.log('TOP PLAYER', player.start)
          if (doublesM.length && doublesP.length) {
              starter = machineFirst.value[0] + machineFirst.value[1] > playerFirst.value[0] + playerFirst.value[1] ? machine : player
              if (starter === machine) {
                machine.isStarting = true
                player.isStarting = false
              }
              else {
                player.isStarting = true
                machine.isStarting = false
              }
              console.log('WHO STARTS', starter)
          }
          if (doublesM.length && !doublesP.length) {
              starter = machine
              machine.isStarting = true
              player.isStarting = false
          }
          if (!doublesM.length && doublesP.length) {
              starter = player
              player.isStarting = true
              machine.isStarting = false
              }
          if (!doublesM.length && !doublesP.length) {
              starter = machineFirst.value[0] + machineFirst.value[1] > playerFirst.value[0] + playerFirst.value[1] ? machine : player
              if (starter === machine) {
                machine.isStarting = true
                player.isStarting = false
              }
              else {
                player.isStarting = true
                machine.isStarting = false
              }
            }
            
        } else {
              if (player.recent_winning) {
                starter = player
                player.isStarting = true
                machine.isStarting = false
              }
              else {
                starter = machine
                machine.isStarting = true
                player.isStarting = false
                for (let dom of machine.hand) {
                  dom.total = dom.value[0] + dom.value[1]
                  dom.double = dom.value[0] == dom.value[1] ? true : false
              }
              let doublesM = machine.hand.filter(d => d.double)
              doublesM.sort( (a,b) => b.total - a.total)
    
              let machineFirst = doublesM.length ? doublesM[0] : machine.hand.sort ( (a,b) => b.total - a.total )[0]
              machine.start = machineFirst
              console.log('STARTER machne ', machine.start)
              }
          }
          console.log('STARTER IS ', starter)
          return starter
      }

/*
  return [ whoStarts, fullHand ]

} */

      
     