export default function startingTheGame(){
  //console.log('PLAYER in HOOK', player)

  function whoStarts(player, machine, round){

    console.log('WHO ?', player, round)
    let starter
    if (round === 0) {
        // y a t il des doubles => filtrer le tableau et prendre le double le plus haut
        // si pas de double, prendre le "total" le plus élevé
        console.log('MACHINE HAND', machine.value.hand)

          for (let dom of machine.value.hand) {
              dom.total = dom.value[0] + dom.value[1]
              dom.double = dom.value[0] == dom.value[1] ? true : false
              console.log('DOM in STARTINGTHEGAME', dom) // dom est un Proxy
          }
          let doublesM = machine.value.hand.filter(d => d.double)
          doublesM.sort( (a,b) => b.total - a.total)

          let machineFirst = doublesM.length ? doublesM[0] : machine.value.hand.sort ( (a,b) => b.total - a.total )[0]
          machine.value.start = machineFirst
          console.log('TOP MACHINE', machine.value.start)
          
          console.log('PLAYER HAND', player.value.hand)
          for (let dom of player.value.hand) {
              dom.total = dom.value[0] + dom.value[1]
              dom.double = dom.value[0] == dom.value[1] ? true : false
          }
          let doublesP = player.value.hand.filter(d => d.double)
          doublesP.sort( (a,b) => b.total - a.total)
          
          let playerFirst = doublesP.length ? doublesP[0] : player.value.hand.sort ( (a,b) => b.total - a.total )[0]
          player.value.start = playerFirst
          console.log('TOP PLAYER', player.value.start)
          if (doublesM.length && doublesP.length) {
              starter = machineFirst.value[0] + machineFirst.value[1] > playerFirst.value[0] + playerFirst.value[1] ? machine : player
              if (starter === machine) {
                machine.value.isStarting = true
                player.value.isStarting = false
              }
              else {
                player.value.isStarting = true
                machine.value.isStarting = false
              }
              console.log('WHO STARTS', starter)
          }
          if (doublesM.length && !doublesP.length) {
              starter = machine
              machine.value.isStarting = true
              player.value.isStarting = false
          }
          if (!doublesM.length && doublesP.length) {
              starter = player
              player.value.isStarting = true
              machine.value.isStarting = false
              }
          if (!doublesM.length && !doublesP.length) {
              starter = machineFirst.value[0] + machineFirst.value[1] > playerFirst.value[0] + playerFirst.value[1] ? machine : player
              if (starter === machine) {
                machine.value.isStarting = true
                player.value.isStarting = false
              }
              else {
                player.value.isStarting = true
                machine.value.isStarting = false
              }
            }
            
        } else {
              if (player.value.recent_winning) {
                starter = player
                player.value.isStarting = true
                machine.value.isStarting = false
              }
              else {
                starter = machine
                machine.value.isStarting = true
                player.value.isStarting = false

              }
          }
          console.log('STARTER IS ', starter)
          return starter
      }

      function fullHand(player, machine, dominoes){
        console.log('FULL HAND', 'PLAYERHAND', player.value.hand, 'MACHINEHAND', machine.value.hand, 'DOMINOES', dominoes.value)
        player.value.hand.push(dominoes.value[0])
        dominoes.value.shift()
        machine.value.hand.push(dominoes.value[0])
        dominoes.value.shift()
        
      }
  /*function fullHand(playerHand, machineHand, dominoes){
    console.log('FULL HAND', 'PLAYERHAND', playerHand, 'MACHINEHAND', machineHand, 'DOMINOES', dominoes)
    playerHand.value.push(dominoes.value[0])
    dominoes.value.shift()
    machineHand.value.push(dominoes.value[0])
    dominoes.value.shift()
    
  }*/

  return [ whoStarts, fullHand ]

}

      
     