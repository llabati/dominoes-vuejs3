
import store from '../store/index.js'
import display from './display.js'
export default {
    //state: store.state,

    // désigne la valeur gauche du domino placé à l'extrémité gauche du tapis de jeu
    //calculateHead: function(){
        
    //    return store.state.board[0].value[0]
    //},
    // désigne la valeur droite du domino placé à l'extrémité droite du tapis
    //calculateTail: function(){
         
     //   return store.state.board[store.state.board.length-1].value[1]
    //},

    // évalue les choix du joueur
    evaluatePlayerChoices: function(){
      console.log('EVALUATE PLAYER CHOICES')
      return player.value.hand.filter( d => d.value.value[0] === board.value[0].value[0] || d.value.value[0] === board.value[store.state.board.length-1].value[1] || d.value.value[1] === board.value[0].value[0] || d.value.value[1] === board.value[store.state.board.length-1].value[1] )

    },

    // empêche la mise par le joueur sur le tapis de jeu d'un domino inadéquat
    warningWrongDomino: function(domino, head, tail, wrong) {
        if(domino.value[0] !== head.value && domino.value[0] !== tail.value && domino.value[1] !== head.value && domino.value[1] !== tail.value) {
        console.log('WRONG DOMINO!')
        wrong.value = true
        //return this.chooseDomino(domino)
        }
    },
    
    // détermine le meilleur domino à jouer (nombre de points le plus élevé), parmi les choix possibles
    // favorise le choix des doubles
    calculateBestChoice: function(machineChoices){
        console.log('MACHINECHOICES ENTERING CALCULEBEST CHOICE', machineChoices)
            let computedChoices = machineChoices.map(e => [ e.value[0], e.value[1], e.value[0] + e.value[1] ])
                console.log('COMPUTEDCHOICES', computedChoices)

            let finalChoices = (computedChoices.find( e => e[0] === e[1])) ? computedChoices.filter(a => a[0] === a[1]).sort((a,b) => b[2] - a[2]) : computedChoices.sort((a,b) => b[2] - a[2])
            console.log('FINAL CHOICES', finalChoices)

            let final = finalChoices[0]
            console.log('FINAL CHOICE', final)
            //this.double = false
            return final
    },

    // déterminer les possibilités que la machine a de bloquer le joueur et de le forcer à piocher
    lockPlayer(machineChoices, head, tail, newLocks, possibleLocks){
        
        console.log('MACHINECHOICES in LOCKPLAYER', machineChoices)
        
        //let lockHead = machineChoices.filter (d => d.value[0] === head.value || d.value[1] === head.value)
        //let lockTail = machineChoices.filter (d => d.value[0] === tail.value || d.value[1] === tail.value)

        // d'abord, filtrer les machineChoices avec les newLocks
        // sinon, filtrer les machineChoices avec les possibleLocks
        let lockChoices = []
        if (newLocks.length){
            for (piece of machineChoices) {
                if (newLocks.includes(piece.value[0]) || newLocks.includes(piece.value[1])) {
                    lockChoices.push(piece)
                }
            }
        }
        else if (possibleLocks.length) {
            for (piece of machineChoices) {
                if (possibleLocks.includes(piece.value[0]) || possibleLocks.includes(piece.value[1])) {
                    lockChoices.push(piece)
                }
            }
        }
        else lockChoices = []
        //let lockChoices = Array.from(new Set([ ...possibleLocks, ...newLocks ]))
        console.log('LOCKCHOICES', lockChoices)
        //let locksNow = lockChoices.filter(d => d === head.value || d === tail.value)
        //console.log('LOCKSNOW', locksNow)
        return lockChoices
    }


}
