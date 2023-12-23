// first access the 9 buttons and reset button
let boxes =  document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let msgContainer = document.querySelector(".result");
let msg = document.querySelector("#msg");
let heading = document.querySelector("#heading");
// find whose turn X OR Y
// so we use a turnO variable
let turnO = true;
const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]
];
var audioWin =  new Audio('./audio/appaluse.wav');
const resetGame = () => {
    turnO = true;
    enableBox();
    msgContainer.classList.add("hide");
    reset.innerText = "RESET";
    heading.classList.remove("hide");
    reset.classList.remove("hide");
    audioWin.pause();
    audioWin.currentTime = 0;
}
// add event listener to each box
boxes.forEach((box) => {
    box.addEventListener("click",() =>{
        var audioClick = new Audio('./audio/airTrim.wav');
        audioClick.play();
        console.log("Block was clicked");
        if(turnO){
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
       box.disabled = true;// to prevent changing of the box after clicking
       box.style.backgroundColor = "#02080c";
       let check= checkWinner();
       if (check) checkFull();
    })
})
const checkFull = () =>{
    let state = true;
    for (let box of boxes) {
        if (box.disabled === false) state = false;
    }
    if (state === true){
        msg.innerText = "A tough fight ended in a draw!!";
        //reset.innerHTML = "RESTART";
        reset.classList.add("hide");
        msgContainer.classList.remove("hide");
        heading.classList.add("hide");
        setTimeout(resetGame,2500);
    }
}
const enableBox = () => {
    for (let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "#99a6b0";
        box.style.border = "none";
    }
}
const disableBox = () => {
    for (let box of boxes){
        box.disabled = true;
    }
}
const showWinner = (winner) => {
    msg.innerText = `Congratulations the winner is ${winner}`;
    reset.innerHTML = "RESTART";
    msgContainer.classList.remove("hide");
    heading.classList.add("hide");
    disableBox();
} 
const checkWinner = () => {
    //console.log(winPatterns[0],winPatterns[1],winPatterns[2]);
    for (let pattern of winPatterns){
        //console.log(pattern[0],pattern[1],pattern[2]);
        /*console.log(
            boxes[pattern[0]].innerText,
            boxes[pattern[1]].innerText,
            boxes[pattern[2]].innerText
            );*/
        let pos1value = boxes[pattern[0]].innerText;
        let pos2value = boxes[pattern[1]].innerText;
        let pos3value = boxes[pattern[2]].innerText;
        //  we need to check if and only if the value is not empty in each box

        if(pos1value != '' && pos2value != '' && pos3value != '' ){
            if(pos1value === pos2value && pos2value === pos3value ){
                console.log("Winner is: ",pos1value );
                showWinner(pos1value);
                boxes[pattern[0]].style.border = "5px solid #000080";
                boxes[pattern[1]].style.border = "5px solid #000080";
                boxes[pattern[2]].style.border = "5px solid #000080";
                audioWin.volume = 0.5;
                audioWin.play();
                return false;
            }
        }

    }
    return true;
}
reset.addEventListener("click",resetGame);

