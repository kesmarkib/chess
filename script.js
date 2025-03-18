// creates an array that contains every position of the pieces in a 2D array (adjustable a x b)

const horizontal = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const board_width = 8;
const board_height = 8;

class chessboard{
    constructor(widht, height){
        this.widht = widht;
        this.height = height;
        this.board = [];
        this.board_no_highlight = [];

        for(let w = 0; w < widht; w++){
            this.board.push([]);
            for(let h = 0; h < height; h++){
                this.board[w].push(0);
            };
        };

        this.board[3][4] = 1
        this.board[2][4] = 3;
        this.board[3][3] = 5;
        this.board[4][4] = 7;
        this.board[3][5] = 9;
        this.board[1][2] = 3;
        this.board[4][5] = 5

    };

    value(pos){
        return(this.board[pos[0]][pos[1]]);
    };

    highlightPos(positions){
        this.board_no_highlight = JSON.parse(JSON.stringify(this.board));

        for(let i = 0; i < positions.length; i++){
            this.board[positions[i][0]][positions[i][1]] = "■";
        };
        visualise();
    };

    get clear(){
        this.board = JSON.parse(JSON.stringify(this.board_no_highlight));
        visualise();
    };
};

let board = new chessboard(board_width, board_height);

visualise();

// standard movesets (forward = F; backward = B; right = R; left = L; combinations: FR, FL, BR, BL; + misc) - int(if infinite then input number equal to board length)

function findColor(num){
    if(num%2 == 1){
        return(0);
    }else{
        return(1);
    };
};

function executeMove(pos, distance, dx, dy, color, jump){
    let validMoves = [];
    let runningPos = [pos[0], pos[1]];

    if(color == 1){
        dx = dx * -1;
        dy = dy * -1;
    };

    for(let i = 0; i < distance; i++){
        runningPos[0] += dx;
        runningPos[1] += dy;
        
        for(let j = 0; j < 2; j++){
            if(runningPos[j] <= 0 || runningPos[j] >= (j == 0 ? board_width - 1 : board_height - 1)){
                continue;
            };  
        };

        let boardValue = board.value(runningPos);

        if(boardValue == 0){
            validMoves.push([...runningPos]);
        }else{
            if(jump){
                if(findColor(boardValue) != color){
                    validMoves.push([...runningPos]);
                }
            }else{
                if(findColor(boardValue) == color){
                    return(validMoves);
                }else{
                    validMoves.push([...runningPos]);
                    return(validMoves);
                }
            };
        };
    };
    return (validMoves);
};


//Forward, Backward, Right, Left
function F(pos, distance, color, jump){
    return executeMove(pos, distance, 0, 1, color, jump);
};

function B(pos, distance, color, jump){
    return executeMove(pos, distance, 0, -1, color, jump);
};

function R(pos, distance, color, jump){
    return executeMove(pos, distance, -1, 0, color, jump);
};

function L(pos, distance, color, jump){
    return executeMove(pos, distance, 1, 0, color, jump);
};
//---
// diagonal
function RF(pos, distance, color, jump){
    return executeMove(pos, distance, -1, 1, color, jump);
};
function RB(pos, distance, color, jump){
    return executeMove(pos, distance, -1, -1, color, jump);
};
function LF(pos, distance, color, jump){
    return executeMove(pos, distance, 1, 1, color, jump);
};

function LB(pos, distance, color, jump){
    return executeMove(pos, distance, 1, -1, color, jump);
};

function D(pos, distance, color, jump){
    let validMoves = [];

    const directions = [RF, RB, LF, LB];

    if(typeof distance == "number"){
        for(let i = 0; i < 4; i++){
            validMoves.push(directions[i](pos, distance, color, jump));
        };
    }else{
        for(let i = 0; i < distance.length; i++){
            let set = distance[i]
            validMoves.push(set[0](set[1], set[2], color, jump));
        };
    };

    return(validMoves.flat());
};

// move
function M(pos, newPositions, color){
    let validMoves = [];
    for(let i = 0; i < newPositions.length; i++){
        let newPos = newPositions[i];
        validMoves.push(executeMove(pos, 1, newPos[0], newPos[1], color, false));
    };

    return(validMoves.flat());
};

// a way to create pieces + corresponding functions

class piece{
    constructor(name, color, jump, standard_moveset, attacks, other, state, value, id){
        this.name = name;
        this.color = color;
        this.jump = jump;
        this.standard = standard_moveset;
        this.attacks = attacks;
        this.other = other;
        this.state = state;
        this.value = value;
        this.id = id;
    };

    get pos(){
        for(let i = 0; i < board_width; i++){
            let index = board.board[i].indexOf(this.id);
            if(index != -1){
                return([i, index]);
            };
        };
        return("position not found");
    };

    get possibleMoves(){
        let moves = [];

        for(let i = 0; i < this.standard.length; i++){
            moves.push(this.standard[i][0](this.pos, this.standard[i][1], this.color, this.jump));
            
        };

        return(moves.flat());
    };

    get possibleAttacks(){
        let attackMoves = [];

        if(this.attacks.length == 0){
            return (this.possibleMoves);
        }else{
            if(this.attacks[0] == true){
                attackMoves.push(this.possibleMoves);
            };

            for(let i = 0; i < this.attacks.length - 1; i++){
                attackMoves.push(this.attacks[i + 1][0](this.pos, this.attacks[i + 1][1], this.color, this.attacks[i + 1][2]));
            }
        };

        return(attackMoves.flat());
    };
};
// name, color (0 = white, 1 = black), jump, move, attack, other, state, value, id
let a = new piece("a", 0, true, [[B, 3], [F, 4], [R, 3], [L, 3], [D, 2], [M, [[1, 2], [-3, 1]]]], [], [], null, 1, 1);

//visualise table
function visualise(){
    const table = document.getElementById("table");
    table.innerText = "";
    table.innerText += " -";
    for(let z = 0; z < board_width; z++){
        table.innerText += `  ${horizontal[z]}`
    }
    table.innerText += "\n ";

    for(let y = 0; y < board_height; y++){
        table.innerText += y+1;
        for(let x = 0; x < board_width; x++){
            table.innerText += ` ${board.board[x][y]}`;
        };
        table.innerText += "\n";
    };
};
//TODO: misc for leaving out spaces
//TODO: implement en passant, castling, and other weird shit

// current best avg 15ms