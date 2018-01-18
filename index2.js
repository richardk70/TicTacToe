// globals
var isMyMove = true;
var vsHuman = true;
var board = document.getElementsByTagName('TABLE')[0];
const squares = document.getElementsByClassName('square');
const next = document.getElementById('next');
let theBoard = [0,1,2,3,4,5,6,7,8];
var xWin = false, oWin = false;
const lines = document.getElementsByClassName('winLine');
const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const line3 = document.getElementById('line3');
const line4 = document.getElementById('line4');
const line5 = document.getElementById('line5');
const line6 = document.getElementById('line6');
const line7 = document.getElementById('line7');
const line8 = document.getElementById('line8');

function isAvailable(sq){
    if (theBoard[sq] == 'X' || theBoard[sq] == 'O')
        return 0;
    else
        return 1;
}

function humanMove(e){
    const sq = e.target.id;
    if (isMyMove && isAvailable(sq)){
        theBoard[sq] = 'X';
        squares[sq].textContent = 'X';
        next.innerHTML = "O's move"
        isMyMove = false;
        checkWinner('X');
    }
    if (vsHuman) {
        if (!isMyMove && isAvailable(sq)){
            theBoard[sq] = 'O';
            squares[sq].textContent = 'O';
            next.innerHTML = "X's move";
            isMyMove = true;
            checkWinner('O');
        }
    } else if (xWin == false) {
        // else you are playing against the computer
        setTimeout(compMove, 1000);
    }
}

function compMove(){
    var compMove = whereToGo();
    if (squares[compMove] == 'O' || squares[compMove] == 'X')
        compMove = randomMove();
    theBoard[compMove] = 'O';
    squares[compMove].textContent = 'O';
    next.innerHTML = "X's move";
    isMyMove = true;
    checkWinner('O');
    
}

// AI for computer move
function whereToGo(){
    if ( theBoard[4] != 'X' && isAvailable(4))
        return 4;
    else if ( 
        (theBoard[0] == 'X' && theBoard[1] == 'X' && isAvailable(2)) ||
        (theBoard[6] == 'X' && theBoard[4] == 'X' && isAvailable(2)) ||
        (theBoard[8] == 'X' && theBoard[5] == 'X' && isAvailable(2)) 
    ) return 2;
    else if ( 
        (theBoard[0] == 'X' && theBoard[2] == 'X' && isAvailable(1)) ||
        (theBoard[4] == 'X' && theBoard[7] == 'X' && isAvailable(1))  
    ) return 1;
    else if ( 
        (theBoard[1] == 'X' && theBoard[2] == 'X' && isAvailable(0)) ||
        (theBoard[4] == 'X' && theBoard[8] == 'X' && isAvailable(0)) ||
        (theBoard[3] == 'X' && theBoard[6] == 'X' && isAvailable(0)) 
    ) return 0;
    else if ( 
        (theBoard[0] == 'X' && theBoard[6] == 'X' && isAvailable(3)) ||
        (theBoard[4] == 'X' && theBoard[5] == 'X' && isAvailable(3)) 
    ) return 3;
    // middle square
    else if ( 
        (theBoard[0] == 'X' && theBoard[8] == 'X' && isAvailable(4)) ||
        (theBoard[1] == 'X' && theBoard[7] == 'X' && isAvailable(4)) ||
        (theBoard[2] == 'X' && theBoard[6] == 'X' && isAvailable(4)) ||
        (theBoard[3] == 'X' && theBoard[5] == 'X' && isAvailable(4)) 
    ) return 4;
    else if ( 
        (theBoard[2] == 'X' && theBoard[8] == 'X' && isAvailable(5)) ||
        (theBoard[3] == 'X' && theBoard[4] == 'X' && isAvailable(5)) 
    ) return 5;
    else if ( 
        (theBoard[0] == 'X' && theBoard[3] == 'X' && isAvailable(6)) ||
        (theBoard[2] == 'X' && theBoard[4] == 'X' && isAvailable(6)) ||
        (theBoard[7] == 'X' && theBoard[8] == 'X' && isAvailable(6)) 
    ) return 6;
    else if ( 
        (theBoard[6] == 'X' && theBoard[8] == 'X' && isAvailable(7)) ||
        (theBoard[1] == 'X' && theBoard[4] == 'X' && isAvailable(7)) 
    ) return 7;
    else if ( 
        (theBoard[0] == 'X' && theBoard[4] == 'X' && isAvailable(8)) ||
        (theBoard[6] == 'X' && theBoard[7] == 'X' && isAvailable(8)) ||
        (theBoard[2] == 'X' && theBoard[5] == 'X' && isAvailable(8)) 
    ) return 8;
    else   
        return randomMove();  
}

function updateAvailableSpaces(){
    let availableSpaces = theBoard.filter( (e) => {
        if (Number.isInteger(e))
            return e;
    });
    return availableSpaces;
}

function randomMove(){
    let availableSpaces = updateAvailableSpaces();
    
    // get a random index for the available spaces left
    var compMove = availableSpaces[Math.floor(Math.random() * availableSpaces.length )];
    return compMove;
}

const winLines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function drawLine(line){
    line.style.display = 'block';
}

function checkWinner(turn) {
    if ( theBoard[0] == turn && theBoard[1] == turn && theBoard[2] == turn){
        turn == 'X' ? xWin = true : oWin = true;
        drawLine(line1);
    }
    if ( theBoard[3] == turn && theBoard[4] == turn && theBoard[5] == turn){
        turn == 'X' ? xWin = true : oWin = true;
        drawLine(line2)
    }
    if ( theBoard[6] == turn && theBoard[7] == turn && theBoard[8] == turn){
        turn == 'X' ? xWin = true : oWin = true;
        drawLine(line3)
    }
    if ( theBoard[0] == turn && theBoard[3] == turn && theBoard[6] == turn){
        turn == 'X' ? xWin = true : oWin = true;
        drawLine(line4)
    }
    if ( theBoard[1] == turn && theBoard[4] == turn && theBoard[7] == turn){
        turn == 'X' ? xWin = true : oWin = true;
        drawLine(line5)
    }
    if ( theBoard[2] == turn && theBoard[5] == turn && theBoard[8] == turn){
        turn == 'X' ? xWin = true : oWin = true;
        drawLine(line6)
    }
    if ( theBoard[0] == turn && theBoard[4] == turn && theBoard[8] == turn){
        turn == 'X' ? xWin = true : oWin = true;
        drawLine(line7)
    }
    if ( theBoard[2] == turn && theBoard[4] == turn && theBoard[6] == turn){
        turn == 'X' ? xWin = true : oWin = true;
        drawLine(line8)
    }
    
    if (xWin) {
        next.innerHTML = 'X wins!';
        disable();
        setTimeout(playAgain, 2000);
    }
    if (oWin) {
        next.innerHTML = 'O wins!';
        disable();
        setTimeout(playAgain, 2000);
    }
    const squaresLeft = updateAvailableSpaces();
    if (xWin == false && oWin == false && squaresLeft.length == 0) {
        next.innerHTML = 'Cats game';
        disable();
        setTimeout(playAgain, 2000);
    }
}

// RESET ALL VARIABLES, etc.
function playAgain(){
    xWin = false, oWin = false;
    disable();
    // reset the board and the array of moves
    theBoard = [0,1,2,3,4,5,6,7,8];
    for (square of squares){
        square.textContent = '';
    }
    // reset all line widths to 0
    for (line of lines){
        line.style.display = 'none';
    }
    
    modal.style.display = 'block';
}

// EVENT LISTENER MAINTENANCE  //////////////
function enable() {
    board.addEventListener('click', humanMove);
}

function disable() {
    board.removeEventListener('click', humanMove);
}

///////////////////////////////////
// PLAY GAME? MODAL
const modal = document.getElementById('modal');
const vComp = document.getElementById('vComp');
const radioComp = document.getElementsByName('oppo')[0];
vComp.addEventListener('click', () => {
    radioComp.checked=true;
    vsHuman = false;
});
const vHum = document.getElementById('vHum');
const radioHum = document.getElementsByName('oppo')[1];
vHum.addEventListener('click', () => {
    radioHum.checked=true;
    vsHuman = true;
});

// make modal drag and drop
var isMouseDown = false,
mouseX,
mouseY,
modalTop,
modalLeft,
diffX,
diffY,
newModalTop,
newModalLeft,
rightEdge,
bottomEdge;

var modalWidth = modal.clientWidth/2,
    modalHeight = modal.clientHeight/2;

function mouseDown(e){
    isMouseDown = true;
    mouseX = e.clientX;
    mouseY = e.clientY;

    modalTop = modal.offsetTop;
    modalLeft = modal.offsetLeft;

    diffX = mouseX - modalLeft;
    diffY = mouseY - modalTop;
}

function mouseUp(){
    isMouseDown = false;
}

function mouseMove(e){
    
    if (!isMouseDown)
        return;

    var newMouseX = e.clientX;
    var newMouseY = e.clientY;

    newModalTop = newMouseY - diffY;
    newModalLeft = newMouseX - diffX;

    rightEdge = window.innerWidth - modalWidth;
    bottomEdge = window.innerHeight - modalHeight;

    if (newModalLeft < 0)
        newModalLeft = modalWidth;
    if (newModalTop < 0)
        newModalTop = modalHeight;
    if (newModalLeft > window.innerWidth - modalWidth)
        newModalLeft = window.innerWidth - modalWidth;
    if (newModalTop > window.innerHeight - modalHeight)
        newModalTop = window.innerHeight - modalHeight;

    modal.style.top = newModalTop + 'px';
    modal.style.left = newModalLeft + 'px';
}

document.addEventListener('mousemove', mouseMove);

modal.addEventListener('mouseup', mouseUp);
modal.addEventListener('mousedown', mouseDown);

// event listener for button
function game() {

    modal.style.display = 'none';
    enable(); // turns the board on
    // clear the board of all moves
    next.innerHTML = 'X move';
    isMyMove = true;
}
////////////////////////////////////
