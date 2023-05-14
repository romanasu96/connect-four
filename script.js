const playerRed = "R", playerYellow = "Y";
let currPlayer = playerRed, currColumns;

const columns = 7, rows = 6;
let board;

window.onload = () => setGame();

const setGame = () => {
    board = [], currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; ++r) {
        const row = [];

        for (let c = 0; c < columns; ++c) {
            row.push(" ");
            const tile = document.createElement("div");

            tile.id = r + " " + c;
            tile.className = "tile";
            tile.onclick = setPiece;
            document.getElementById("bord").appendChild(tile);
        }

        board.push(row);
    }
};

let gameOver = false;

const setPiece = function() {
    if (gameOver) return;

    const coords = this.id.split(" ");
    let r = parseInt(coords[0]), c = parseInt(coords[1]);

    r = currColumns[c];
    if (r < 0) return;

    board[r][c] = currPlayer;
    const tile = document.getElementById(r + " " + c);

    tile.classList.add(currPlayer === playerRed ? "red-piece" : "yellow-piece");
    currPlayer = currPlayer === playerRed ? playerYellow : playerRed;
    currColumns[c] = --r;

    checkWinner();
};

const checkWinner = () => {
    for (let r = 0; r < rows; ++r) {
        for (let c = 0; c < columns - 3; ++c) {
            if (board[r][c] !== " " && board[r][c] === board[r][c + 1] &&
                board[r][c + 1] === board[r][c + 2] && board[r][c + 2] === board[r][c + 3]) {
                setWinner(r, c);
                return;
            }
        }
    }

    for (let c = 0; c < columns; ++c) {
        for (let r = 0; r < rows - 3; ++r) {
            if (board[r][c] !== " " && board[r][c] === board[r + 1][c] &&
                board[r + 1][c] === board[r + 2][c] && board[r + 2][c] === board[r + 3][c]) {
                setWinner(r, c);
                return;
            }
        }
    }

    for (let r = 0; r < rows - 3; ++r) {
        for (let c = 0; c < columns - 3; ++c) {
            if (board[r][c] !== " " && board[r][c] === board[r + 1][c + 1] &&
                board[r + 1][c + 1] === board[r + 2][c + 2] && board[r + 2][c + 2] === board[r + 3][c + 3]) {
                setWinner(r, c);
                return;
            }
        }
    }

    for (let r = 3; r < rows; ++r) {
        for (let c = 0; c < columns - 3; ++c) {
            if (board[r][c] != " ") {
                if (
                    board[r][c] == board[r - 1][c + 1] &&
                    board[r - 1][c + 1] == board[r - 2][c + 2] &&
                    board[r - 2][c + 2] == board[r - 3][c + 3]
                ) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winner.canvas = "Red Wins";
    } else {
        winner.canvas = "Yellow Wins";
    }
    gameOver = true;
}

function resetPage() {
    location.reload();
}
