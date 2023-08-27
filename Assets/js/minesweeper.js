
var board = [];
var rows = 10;
var columns = 10;

var minesCount = 5;
var minesLocation = [];

var tilesClicked = 0;
var flagEnabled = false;

var gameOver = false;

window.onload = function () {
    startGame();
}

function setMines() {

    let minesLeft = minesCount;

    //redominze the tile and mines
    while (minesLeft > 0) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();

        if (!minesLocation.includes(id)) {
            minesLocation.push(id);
            minesLeft -= 1;
        }
    }
}


function startGame() {
    document.getElementById("mines-count").innerText = minesCount;
    document.getElementById("flag-button").addEventListener("click", setFlag);
    setMines();

    //populate div
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.addEventListener("click", clickTile);
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }

    // console.log(board);
}

function setFlag() {
    //set flag into box
    if (flagEnabled) {
        flagEnabled = false;
        document.getElementById("flag-button").style.backgroundColor = "#81d672";
    }

    //flag button clicking color
    else {
        flagEnabled = true;
        document.getElementById("flag-button").style.backgroundColor = "#3f9e25";
    }
}

function clickTile() {
    if (gameOver || this.classList.contains("tile-click")) {
        return;
    }


    //put flag in tile 
    let tile = this;

    //if button enable put flag icon
    if (flagEnabled) {
        if (tile.innerText == "") {
            tile.innerText = "🚩";
        }

        //else button diseble put flag icon
        else if (tile.innerText == "🚩") {
            tile.innerText = "";
        }
        return;
    }

    if (minesLocation.includes(tile.id)) {
        // alert("GAME OVER");math

        gameOver = true;
        revealMines();
        return;
    }


    let coords = tile.id.split("-"); // "0-0" -> ["0", "0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    checkMine(r, c);

}

function revealMines() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = board[r][c];
            if (minesLocation.includes(tile.id)) {
                tile.innerText = "💣";
                tile.classList.add("tile-boom");
                // tile.style.backgroundColor = "red";k
                // tile.style.box-shadow = "-3px -3px 2px rgba(0, 0, 0, 0.2)inset";
            }
        }
    }
}

function checkMine(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return;
    }
    if (board[r][c].classList.contains("tile-click")) {
        return;
    }

    board[r][c].classList.add("tile-click");
    tilesClicked += 1;

    let minesFound = 0;

    //top 3
    minesFound += checkTile(r - 1, c - 1);
    minesFound += checkTile(r - 1, c);
    minesFound += checkTile(r - 1, c + 1);

    //left and right
    minesFound += checkTile(r, c - 1);
    minesFound += checkTile(r, c + 1);

    //bottom 3
    minesFound += checkTile(r + 1, c - 1);
    minesFound += checkTile(r + 1, c);
    minesFound += checkTile(r + 1, c + 1);

    if (minesFound > 0) {
        board[r][c].innerText = minesFound;
        board[r][c].classList.add("x" + minesFound.toString());
    }
    else {
        //top 3
        checkMine(r - 1, c - 1);
        checkMine(r - 1, c);
        checkMine(r - 1, c + 1);

        //left 1 and right 1
        checkMine(r, c - 1);
        checkMine(r, c + 1);

        //bottom 3
        checkMine(r + 1, c - 1);
        checkMine(r + 1, c);
        checkMine(r + 1, c + 1);
    }

    if (tilesClicked == rows * columns - minesCount) {
        document.getElementById("mines-count").innerText = "All Mines Cleared , You win";
        gameOver = true;
    }

}


function checkTile(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return 0;
    }
    if (minesLocation.includes(r.toString() + "-" + c.toString())) {
        return 1;
    }
    return 0;
}



function init() {
    document.getElementById("test").onclick = alert("hello");
    window.onload = init;
}


document.addEventListener('contextmenu', event => event.preventDefault());


