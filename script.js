let boxes=document.querySelectorAll(".box")
let reset=document.querySelector("#reset")
let msg=document.querySelector('#msg')
let newgame=document.querySelector('#new')
let turn1=true;
let gameOver=false;

const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [3,4,5],
    [6,7,8],
];
boxes.forEach((box)=> {
    box.addEventListener("click",()=>{
        if(turn1){
            box.innerText='O'
            turn1=false
        }
        else{
        box.innerText='X'
        turn1=true
        }
     box.disabled=true;
     checkWinner();
    })
})
const checkWinner=()=>{
    for(let pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if(pos1val!='' && pos2val!='' && pos3val!=''){
            if(pos1val===pos2val && pos2val===pos3val){
                showWinner(pos1val);
            }
        }

    }
    if(!gameOver){
        const allFilled = Array.from(boxes).every(b => b.innerText !== '');
        if(allFilled){
            showTie();
        }
    }
};
const showTie = () => {
    msg.innerText = "It's a tie!";
    disableBoxes();
    gameOver = true;
}
const showWinner=(winner)=>{
    if(winner==='O'){
        msg.innerText='Player 1 wins!';
    }
    else{
        msg.innerText='Player 2 wins!';
    }
    disableBoxes();
    gameOver = true;
}
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
reset.addEventListener('click',function(){
    for(let box of boxes){
        box.innerText='';
        box.disabled = gameOver ? true : false;
    }
    turn1=true;
})

newgame.addEventListener('click', function(){
    for(let box of boxes){
        box.innerText='';
        box.disabled=false;
    }
    turn1=true;
    gameOver=false;
    msg.innerText='';
})