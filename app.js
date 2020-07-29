const { Chess } = require('chess.js');
const readline = require('readline');


const chess = new Chess();

while (!chess.game_over()) {
    chess.move(MostControllingMove(chess.moves()));
    console.log(chess.ascii());
    makeMove();
}

function promptUserForMove(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

async function makeMove() {
    const move = await promptUserForMove("your move");
    console.log(chess.ascii());
}

// Input: the current list of available moves
// Output: the move from that list which results in the most available moves next turn
function MostControllingMove(moves) {
    let controlledSquares = -1;
    let mostControllingMove = moves[0];
    moves.forEach(move => {
        chess.move(move);
        chess.move(chess.moves()[0]);
        if (chess.moves().length > controlledSquares) {
            controlledSquares = chess.moves().length;
            mostControllingMove = move;
        }
        chess.undo();
        chess.undo();
    });
    return mostControllingMove;
}