<template>
    <div id="piece" @click="choose">
        <img v-if="value[0] === 1 && value[1] === 0" class="domino" src="../assets/0-1.png">
        <img v-if="value[0] === 2 && value[1] === 0" class="domino" src="../assets/0-2.png">
        <img v-if="value[0] === 3 && value[1] === 0" class="domino" src="../assets/0-3.png">
        <img v-if="value[0] === 4 && value[1] === 0" class="domino" src="../assets/0-4.png">
        <img v-if="value[0] === 5 && value[1] === 0" class="domino" src="../assets/0-5.png">
        <img v-if="value[0] === 6 && value[1] === 0" class="domino" src="../assets/0-6.png">
        <img v-if="value[0] === 2 && value[1] === 1" class="domino" src="../assets/1-2.png">
        <img v-if="value[0] === 3 && value[1] === 1" class="domino" src="../assets/1-3.png">
        <img v-if="value[0] === 4 && value[1] === 1" class="domino" src="../assets/1-4.png">
        <img v-if="value[0] === 5 && value[1] === 1" class="domino" src="../assets/1-5.png">
        <img v-if="value[0] === 6 && value[1] === 1" class="domino" src="../assets/1-6.png">
        <img v-if="value[0] === 3 && value[1] === 2" class="domino" src="../assets/2-3.png">
        <img v-if="value[0] === 4 && value[1] === 2" class="domino" src="../assets/2-4.png">
        <img v-if="value[0] === 5 && value[1] === 2" class="domino" src="../assets/2-5.png">
        <img v-if="value[0] === 6 && value[1] === 2" class="domino" src="../assets/2-6.png">
        <img v-if="value[0] === 4 && value[1] === 3" class="domino" src="../assets/3-4.png">
        <img v-if="value[0] === 5 && value[1] === 3" class="domino" src="../assets/3-5.png">
        <img v-if="value[0] === 6 && value[1] === 3" class="domino" src="../assets/3-6.png">
        <img v-if="value[0] === 5 && value[1] === 4" class="domino" src="../assets/4-5.png">
        <img v-if="value[0] === 6 && value[1] === 4" class="domino" src="../assets/4-6.png">
        <img v-if="value[0] === 6 && value[1] === 5" class="domino" src="../assets/5-6.png"> 
        <img v-if="value[0] === 0 && value[1] === 0" class="domino" src="../assets/0-0.png"> 
        <img v-if="value[0] === 0 && value[1] === 1" class="domino" src="../assets/0-1.png">
        <img v-if="value[0] === 0 && value[1] === 2" class="domino" src="../assets/0-2.png">
        <img v-if="value[0] === 0 && value[1] === 3" class="domino" src="../assets/0-3.png">
        <img v-if="value[0] === 0 && value[1] === 4" class="domino" src="../assets/0-4.png">
        <img v-if="value[0] === 0 && value[1] === 5" class="domino" src="../assets/0-5.png">
        <img v-if="value[0] === 0 && value[1] === 6" class="domino" src="../assets/0-6.png">
        <img v-if="value[0] === 1 && value[1] === 1" class="domino" src="../assets/1-1.png">
        <img v-if="value[0] === 1 && value[1] === 2" class="domino" src="../assets/1-2.png">
        <img v-if="value[0] === 1 && value[1] === 3" class="domino" src="../assets/1-3.png">
        <img v-if="value[0] === 1 && value[1] === 4" class="domino" src="../assets/1-4.png">
        <img v-if="value[0] === 1 && value[1] === 5" class="domino" src="../assets/1-5.png">
        <img v-if="value[0] === 1 && value[1] === 6" class="domino" src="../assets/1-6.png">
        <img v-if="value[0] === 2 && value[1] === 2" class="domino" src="../assets/2-2.png">
        <img v-if="value[0] === 2 && value[1] === 3" class="domino" src="../assets/2-3.png">
        <img v-if="value[0] === 2 && value[1] === 4" class="domino" src="../assets/2-4.png">
        <img v-if="value[0] === 2 && value[1] === 5" class="domino" src="../assets/2-5.png">
        <img v-if="value[0] === 2 && value[1] === 6" class="domino" src="../assets/2-6.png">
        <img v-if="value[0] === 3 && value[1] === 3" class="domino" src="../assets/3-3.png">
        <img v-if="value[0] === 3 && value[1] === 4" class="domino" src="../assets/3-4.png">
        <img v-if="value[0] === 3 && value[1] === 5" class="domino" src="../assets/3-5.png">
        <img v-if="value[0] === 3 && value[1] === 6" class="domino" src="../assets/3-6.png">
        <img v-if="value[0] === 4 && value[1] === 4" class="domino" src="../assets/4-4.png">
        <img v-if="value[0] === 4 && value[1] === 5" class="domino" src="../assets/4-5.png">
        <img v-if="value[0] === 4 && value[1] === 6" class="domino" src="../assets/4-6.png">
        <img v-if="value[0] === 5 && value[1] === 5" class="domino" src="../assets/5-5.png">
        <img v-if="value[0] === 5 && value[1] === 6" class="domino" src="../assets/5-6.png">
        <img v-if="value[0] === 6 && value[1] === 6" class="domino" src="../assets/6-6.png"> 
    </div>
</template>

<script>
export default {
    props: {
        value: Array
    },
    setup(props, context){
        function choose(){
            context.emit('chosen')
        }
        return { choose }

    },
    /*methods: {
        chooseForLeft(){
            this.$emit('chosen-left')
        },
        chooseForRight(){
            this.$emit('chosen-right')
        }
    }*/
}
</script>

<style>
#piece {
    width: 82px;
    height: 42px;
    margin: 0px;
    padding: 0px;
}
.domino {
    height: 40px;
    width: 80px;
    margin: 0px;
    padding: 0px;
    border: solid 1px black;
    box-shadow: 1px 1px 1px 1px black;
}
.domino-heighten {
    position: relative;
    top: -20px;
    left: 10px;
}
.domino-righten {
    position: relative;
    top: -10px;
    left: 20px;
}
.domino-lower {
    position: relative;
    top: 30px;
    
}
.domino-leften {
    position: relative;
    left: -40px;
}
.domino-vert {
    transform: rotate(0.25turn);
}
.domino-swap {
    transform: rotate(0.5turn);
}
.domino-reverse {
    transform: rotate(0.75turn);
}
.domino-inverse {
    transform: rotate(0.50turn);
}
.mandatory {
    border: solid 1px red;
    background-color: rgba(245, 0, 145, .2);
    box-shadow: 1px 1px 1px red;
}
.domino-begin {
    animation: GetPlaced 3s ease;
}
.domino-top {
    animation: GetToPPlaced 3s ease;
}
.domino-left {
    animation: GetLeftPlaced 3s ease;
}
.domino-right {
    animation: GetRightPlaced 3s ease;
}
.domino-bottom {
    animation: GetBottomPlaced 3s ease;
}

@keyframes GetPlaced {
    from {
        opacity: 0;
        /*transform: scale(0.8);*/
    }
    to {
        opacity: 1;
        /*transform: scale(1);*/
    }
}
@keyframes GetTopPlaced {
    from {
        opacity: 0;
        /*transform: scale(0.8);*/
        /*transform: translateX(20px);*/
    }
    to {
        opacity: 1;
        /*transform: scale(1);*/
        /*transform: translateX(0);*/
    }
}
@keyframes GetLeftPlaced {
    from {
        opacity: 0;
        /*transform: scale(0.8);
        transform: translateY(-20px);*/
    }
    to {
        opacity: 1;
       /* transform: scale(1);
        transform: translateY(0);*/
    }
}
@keyframes GetRightPlaced {
    from {
        opacity: 0;
        /*transform: scale(0.8);
        transform: translateY(20px);*/
    }
    to {
        opacity: 1;
        /*transform: scale(1);
        transform: translateY(0);*/
    }
}
@keyframes GetBottomPlaced {
    from {
        opacity: 0;
        /*transform: scale(0.8);
        transform: translateX(-20px);*/
    }
    to {
        opacity: 1;
        /*transform: scale(1);
        transform: translateX(0);*/
    }
}


</style>