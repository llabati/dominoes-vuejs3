//import { ref } from 'vue'

import store from '../store/index'
export default function counterManagement(){

    function incrementCounter(){
        store.dispatch('increment')
        /*if (name.value === 'Pascal'){
          name.value = 'Tristan'
        }
        else name.value = 'Pascal'*/
        console.log('STORE DISPATCH I')

    }

    function decrementCounter(){
        store.dispatch('decrement')
        console.log('STORE DISPATCH D')
    }

    return [ incrementCounter, decrementCounter ]
  }