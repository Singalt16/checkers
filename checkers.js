const canvas = document.getElementById('canvas');
const boardSize = 500;
canvas.width = boardSize;
canvas.height = boardSize;
const c = canvas.getContext("2d");
console.log(c);

let b = new Board();
b.setup('black');
b.draw(c, canvas.width);