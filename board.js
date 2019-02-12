class Board {

    constructor() {
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
        let i = 0;
        for (let row of this.cells) {
            for (let cell of row) {
                if (cell !== 'unplayable') {
                    if (i < 3) cell = new Piece(opponentColor);
                    else if (i > 4) cell = new Piece(playerColor);
                }
            }
        }
    }

    draw(context, size) {
        let cellSize = size / 8;
        this.cells.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell === 'unplayable') {
                    context.fillStyle = '#f9e8cf';
                } else {
                    context.fillStyle = cell.color;
                }
                context.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            });
        });
    }
}