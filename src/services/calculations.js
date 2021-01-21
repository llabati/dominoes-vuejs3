/* eslint-disable */

import setScores from '../hooks/setScores.js'
import swap from '../hooks/swap.js'
//import updateScores from '../hooks/updateScores.js'
export default {
    
    // évalue les choix du joueur
    evaluatePlayerChoices: function(player, first, last){
        console.log('EVALUATE PLAYER CHOICES', 'FIRST', first, 'LAST', last, 'PLAYER', player)
        let selection = player.hand.filter( d => d.value.includes(first) || d.value.includes(last) )
        let ambi = []
        for (let domino of selection){
            if (domino.ambidextrous === true) domino.ambidextrous = false
        }
        if (first === last) {
            for (let domino of selection){
                domino.ambidextrous = true
                ambi.push(domino)
            }
            
        }
        else {
            for (let domino of selection){
                if ( domino.value.includes(first) && domino.value.includes(last) ){
                    domino.ambidextrous = true
                    ambi.push(domino)
                }
            }
        }
        let singles = selection.filter(domino => !domino.ambidextrous)
        selection = [ ambi, singles ]
        return selection
    },

    // empêche la mise par le joueur sur le tapis de jeu d'un domino inadéquat
    warningWrongDomino: function(domino, first, last, wrong) {
        console.log('DOMINO in CALCULATIONS.WARNING', domino.value, 'FIRSTE ET LAST', first, last, 'FIRST ET LAST', first, last)
        if(!domino.value.includes(first) && !domino.value.includes(last) ) {
            console.log('WRONG DOMINO!')
            wrong = true
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
    lockPlayer(machineChoices, newLocks, first, last, possibleLocks){
        
        //console.log('MACHINECHOICES in LOCKPLAYER', machineChoices, newLocks.value, possibleLocks.value)
        let actualLocks = newLocks.filter( d => d.value.includes(first) || d.value.includes(last) )
        let stopChoice = actualLocks.find( d => d.value === [ first, last ] || d.value === [ last, first ] )

        if (stopChoice && newLocks.includes(first.value) && stopChoice === [ first, last ]){
            stopChoice = swap(stopChoice)
        }
        if (stopChoice && newLocks.includes(last) && stopChoice === [ first, last ]){
            stopChoice = swap(stopChoice)
        }

        if (stopChoice) machineChoices = [ stopChoice ]
        if (actualLocks) machineChoices = machineChoices.filter( d => !d.value.includes(actualLocks[0]) || !d.value.includes(actualLocks[1]) )
        
        //let lockChoices = []
        //let stopChoice = doubleLockPlayer(first, last, newLocks, machineChoices)
        
        // d'abord, filtrer les machineChoices avec les newLocks
        // sinon, filtrer les machineChoices avec les possibleLocks
        //if (newLocks.value.length > 0){
            //console.log('NEW LOCKS', newLocks, 'MACHINE CHOICES', machineChoices)
           /* for (let piece of machineChoices.value) {
                console.log('MACHINE CHOICES', machineChoices, 'THIS PIECE', piece)
                if (newLocks.value.includes(piece.value[0]) || newLocks.value.includes(piece.value[1])) {
                    lockChoices.push(piece)
                }
            }
        }*/
        /*else if (possibleLocks.value.length) {
            for (let piece of machineChoices.value) {
                if (possibleLocks.value.includes(piece.value[0]) || possibleLocks.value.includes(piece.value[1])) {
                    lockChoices.push(piece)
                }
            }
        }
        else lockChoices = []
        //let lockChoices = Array.from(new Set([ ...possibleLocks, ...newLocks ]))
        console.log('LOCKCHOICES', lockChoices)*/
        
        return machineChoices
    },

    doubleLockPlayer(first, last, newLocks, machineChoices){
        
        if (newLocks.value.includes(first.value) || newLocks.value.includes(last.value)){
            let stopChoice = machineChoices.find( d => d.value === [ last.value, first.value ] || d.value === [ first.value, last.value ])
        }
        if (stopChoice && newLocks.value.includes(first.value) && stopChoice.value === [ first.value, last.value ]){
            stopChoice = swap(stopChoice)
        }
        if (stopChoice && newLocks.value.includes(last.value) && stopChoice.value === [ first.value, last.value ]){
            stopChoice = swap(stopChoice)
        }
        return stopChoice
        
    },

    //calculer le score final
    calculateScores(results){
        console.log('RESULTATS : QUI GAGNE ?', results)
        let playerTotal = setScores(results.player)
        let machineTotal = setScores(results.machine)
        console.log('PLAYER TOTAL', playerTotal, 'MACHINE TOTAL', machineTotal)
        if (results.neitherWins) {
            return playerTotal - machineTotal
        }
        if (results.playerWins) {
            return machineTotal
        }
        if (results.machineWins){
            return playerTotal
        }
    }


}
