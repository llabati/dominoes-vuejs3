/* eslint-disable */
/*export default function startingTheGame(){
  //console.log('PLAYER in HOOK', player)
  */
 export default function fullHand(player, machine, dominoes){
    console.log('FULL HAND', 'PLAYERHAND', player.hand, 'MACHINEHAND', machine.hand, 'DOMINOES', dominoes)
    player.hand.push(dominoes[0])
    dominoes.shift()
    machine.hand.push(dominoes[0])
    dominoes.shift()
    
  }