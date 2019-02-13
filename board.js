class Board {

    cells;
    size;

    constructor(size) {
        this.size = size;
        this.cells = Array(8);
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i] = Array(8);
            for (let j = 0; j < this.cells[i].length; j++) {
                if ((i + j) % 2 === 0) {
                    this.cells[i][j] = 'unplayable';
                }
            }
        }
    }

    setup(playerColor) {
        let opponentColor = playerColor === 'black' ? 'red' : 'black';
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                if (this.cells[i][j] !== 'unplayable') {
                    if (i < 3) this.cells[i][j] = new Piece(opponentColor);
                    else if (i > 4) this.cells[i][j] = new Piece(playerColor);
                    else this.cells[i][j] = 'vacant';
                }
            }
        }
    }

    draw(context) {
        let cellSize = this.size / 8;
        this.cells.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell === 'unplayable') {
                    context.fillStyle = '#f9e8cf';
                } else {
                    context.fillStyle = 'white';
                }
                context.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
                if (cell !== 'unplayable') {
                    context.beginPath();
                    context.fillStyle = cell.color;
                    let xpos = j * cellSize + cellSize / 2;
                    let ypos = i * cellSize + cellSize / 2;
                    let radius = cellSize / 2.5;
                    context.ellipse(xpos, ypos, radius, radius, 0, 0, Math.PI * 2);
                    context.fill();
                    if (cell.king) {
                        context.fillStyle = '#FFDF00';
                        let x = j * cellSize + cellSize / 3.5;
                        let y = i * cellSize + cellSize / 3.5;
                        let w = cellSize - (cellSize * 2 / 3.5);
                        context.fillRect(x, y, w, w);
                    }
                }
            });
        });
    }

    movePiece(playerColor, x1, y1, x2, y2) {
        const row1 = Math.floor((y1 / this.size) * 8);
        const row2 = Math.floor((y2 / this.size) * 8);
        const col1 = Math.floor((x1 / this.size) * 8);
        const col2 = Math.floor((x2 / this.size) * 8);
        let legalMoves = this.getLegalMoves(playerColor);
        if (!legalMoves.find(move =>
            move.piece.row === row1
            && move.piece.col === col1
            && move.nextPos.row === row2
            && move.nextPos.col === col2)
        ) {
            return;
        }
        let piece = this.cells[row1][col1];

        this.cells[row1][col1] = 'vacant';
        this.cells[row2][col2] = piece;
    }

    // Big and ugly method. Very temporary. Does not account for kings.
    getLegalMoves(playerColor) {
        let requiredMoves = [];
        let legalMoves = [];
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                let cell = this.cells[i][j];
                if (cell === 'unplayable' || cell === 'vacant' || cell.color !== playerColor) {
                    continue;
                }
                const optns = [{vert: -1, hor: 1}, {vert: -1, hor: -1}]; // direction options
                optns.forEach(o => {
                    let row = i + o.vert, col = j + o.hor;
                    if (row < 0 || col < 0 || row >= this.cells.length || col >= this.cells.length) return;
                    if (this.cells[row][col] === 'vacant') {
                        legalMoves.push({
                            piece: {row: i, col: j},
                            nextPos: {row, col}
                        })
                    } else if (this.cells[row][col].color !== playerColor
                        && row + o.vert >= 0
                        && col + o.hor >= 0
                        && row + o.vert < this.cells.length
                        && col + o.hor < this.cells.length
                        && this.cells[row + o.vert][col + o.hor] === 'vacant'
                    ) {
                        requiredMoves.push({
                            piece: {row: i, col: j},
                            nextPos: {row: row + o.vert, col: col + o.hor}
                        });
                    }
                });
            }
        }
        if (requiredMoves.length > 0) return requiredMoves;
        else return legalMoves;
    }
}