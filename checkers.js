const canvas = document.getElementById('canvas');
const boardSize = 500;
canvas.width = boardSize;
canvas.height = boardSize;
const c = canvas.getContext("2d");
console.log(c);

function getMousePosition(canvas, e) {
    let bound = canvas.getBoundingClientRect();
    return {
        x: e.clientX - bound.left,
        y: e.clientY - bound.top
    };
}

let b = new Board(boardSize);
b.setup('black');
b.draw(c);

let pieceSelected = false;
window.addEventListener('click', e => {
    let pos = getMousePosition(canvas, e);
    if (pos.x > 0 && pos.y > 0 && pos.x < boardSize && pos.y < boardSize) {
        if (!pieceSelected) pieceSelected = pos;
        else {
            if (pos.x > 0 && pos.y > 0 && pos.x < boardSize && pos.y < boardSize)
                b.movePiece('black', pieceSelected.x, pieceSelected.y, pos.x, pos.y);
            pieceSelected = false;
            c.clearRect(0, 0, boardSize, boardSize);
            b.draw(c);
        }
    }
});