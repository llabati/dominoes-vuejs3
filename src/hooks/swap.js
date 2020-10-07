

export default function swap(domino){
    // inverse la gauche et la droite du domino
    
        console.log('UTILS SWAP!!!', domino)
        let t = domino.value[0]
        domino.value[0] = domino.value[1]
        domino.value[1] = t
        domino.swap = true
        console.log('UTILS SWAP', domino.value)
   

}
