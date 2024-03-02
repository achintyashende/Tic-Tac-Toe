const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//lets create a function to initialize the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // ui pr empty bhi karna hoga boxes ko
    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all"; 
        //green ko remove
        box.classList = `box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

// game winner
function checkGameOver()
{
    let answere = "";

    winningPositions.forEach((position) =>{

        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !=="") 
        && (gameGrid[position[0]] === gameGrid[position[1]]) &&(gameGrid[position[1]] === gameGrid[position[2]]))
    {
        if(gameGrid[position[0]] === "X")
            answere = "X";
        else
            answere = "O";
        // disable pointer
        boxes.forEach((box) =>{
            box.style.pointerEvents = "none";
        });

        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
    }
    });

    if(answere !== "")
    {
        gameInfo.innerText = `Winner Player- ${answere}`;
        newGameBtn.classList.add("active");
        return;
    }
    // when draw tie
    let fillCount = 0;
    gameGrid.forEach((box) =>{
        if(box !=="")
        {
            fillCount++;
        }
    });

    if(fillCount === 9)
    {
        gameInfo.innerText = "Game Tied !!";
        newGameBtn.classList.add("active");
    }

};


//swap turn
function swapTurn()
{
    if(currentPlayer === "X")
    {
        currentPlayer = "O";
    }
    else
    {
        currentPlayer = "X";
    }
    //ui change
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function handleClick(index)
{
    if(gameGrid[index] === "")
    {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap tern
        swapTurn();
        // check winer
        checkGameOver();
    }
}

boxes.forEach((box, index) =>{
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);