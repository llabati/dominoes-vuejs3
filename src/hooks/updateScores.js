export default function updateScores(array){
    return array.reduce((sum, a) => sum + a.value[0] + a.value[1], 0)
}