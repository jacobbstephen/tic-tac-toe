// first access the 9 buttons and reset button
let boxes =  document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newbtn = document.querySelector("#newgame");
let msgContainer = document.querySelector(".result");
let msg = document.querySelector("#msg");
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
const resetGame = () => {
    turnO = true;
    enableBox();
    msgContainer.classList.add("hide");
}
// add event listener to each box
boxes.forEach((box) => {
    box.addEventListener("click",() =>{
        console.log("Block was clicked");
        if(turnO){
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
       box.disabled = true;// to prevent changing of the box after clicking
       box.style.backgroundColor = "rgba(50, 50, 50,0.3)";
       checkWinner();
    })
})
const enableBox = () => {
    for (let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "rgb(50, 50, 50)";
    }
}
const disableBox = () => {
    for (let box of boxes){
        box.disabled = true;
    }
}
const showWinner = (winner) => {
    msg.innerText = `Congratulations the winner is ${winner}`;
    msgContainer.classList.remove("hide");
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
            }
        }

    }
}
newbtn.addEventListener("click",resetGame);
reset.addEventListener("click",resetGame);

