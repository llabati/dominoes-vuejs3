

export default function swap(domino){
    // inverse la gauche et la droite du domino
    
        console.log('UTILS SWAP!!!', domino.value.value)
        let t = domino.value.value[0]
        domino.value.value[0] = domino.value.value[1]
        domino.value.value[1] = t
        domino.value.swap = true
        console.log('UTILS SWAP', domino.value.value)
   

}
