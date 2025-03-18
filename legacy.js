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
        let value = this.board[pos[0]][pos[1]]
        if(value % 2 == 0){
            return([value, "black"]);
        }else{
            return([value, "white"]);
        }
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

function F(pos, distance, color, jump, exception){
    let validMoves = [];
    let ypos = pos[1];
    let xpos = pos[0];

    if(color == "white"){
        if(exception){
            for(let i = 0; i < distance; i++){
                if(ypos + (i + 1) <= board_height - 1){
                    validMoves.push([xpos, ypos + (i + 1)]);
                };
            };
        }else{
            for(let i = 0; i < distance; i++){
                if(ypos + (i + 1) <= board_height - 1){
                    let move = [xpos, ypos + (i + 1)];
                    if(board.value(move)[0] == 0){
                        validMoves.push(move);
                    }else{
                        if(jump == false){
                            if(board.value(move)[1] == "white"){
                                return (validMoves);
                            }else{
                                validMoves.push(move);
                                return (validMoves);
                            };
                        }else{
                            if(board.value(move)[1] == "black"){
                                validMoves.push(move);
                            };
                        };
                    };
                };
            };
        };
    }else{
        if(exception){
            for(let i = 0; i < distance; i++){
                if(ypos - (i + 1) >= 0){
                    validMoves.push([xpos, ypos - (i + 1)]);
                };
            };
        }else{
            for(let i = 0; i < distance; i++){
                if(ypos - (i + 1) >= 0){
                    let move = [xpos, ypos - (i + 1)]
                    if(board.value(move)[0] == 0){
                        validMoves.push(move);
                    }else{
                        if(jump == false){
                            if(board.value(move)[1] == "black"){
                                return (validMoves);
                            }else{
                                validMoves.push(move);
                                return (validMoves);
                            };
                        }else{
                            if(board.value(move)[1] == "white"){
                                validMoves.push(move);
                            };
                        };
                    };
                };
            };
        };
    };

    return(validMoves);
};

function B(pos, distance, color, jump, exception){
    let validMoves = [];
    let ypos = pos[1];
    let xpos = pos[0];
    
    if(color == "white"){
        if(exception){
            for(let i = 0; i < distance; i++){
                if(ypos - (i + 1) >= 0){
                    validMoves.push([xpos, ypos - (i + 1)]);
                };
            };
        }else{
            for(let i = 0; i < distance; i++){
                if(ypos - (i + 1) >= 0){
                    let move = [xpos, ypos - (i + 1)];

                    if(board.value(move)[0] == 0){
                        validMoves.push(move);
                    }else{
                        if(jump == false){
                            if(board.value(move)[1] == "white"){
                                return (validMoves);
                            }else{
                                validMoves.push(move);
                                return (validMoves);
                            };
                        }else{
                            if(board.value(move)[1] == "black"){
                                validMoves.push(move);
                            };
                        };
                    };
                };
            };
    };
    }else{
        if(exception){
            for(let i = 0; i < distance; i++){
                if(ypos + (i + 1) <= board_height - 1){
                    validMoves.push([xpos, ypos + (i + 1)]);
                };
            };
        }else{
            for(let i = 0; i < distance; i++){
                if(ypos + (i + 1) <= board_height - 1){
                    let move = [xpos, ypos + (i + 1)];

                    if(board.value(move)[0] == 0){
                        validMoves.push(move);
                    }else{
                        if(jump == false){
                            if(board.value(move)[1] == "black"){
                                return (validMoves);
                            }else{
                                validMoves.push(move);
                                return (validMoves);
                            };
                        }else{
                            if(board.value(move)[1] == "white"){
                                validMoves.push(move);
                            };
                        };
                    };
                };
            };
        };
    };

    return(validMoves);
};

function R(pos, distance, color, jump, exception){
    let validMoves = [];
    let xpos = pos[0];
    let ypos = pos[1];

    if(color == "white"){
        if(exception){
            for(let i = 0; i < distance; i++){
                if(xpos - (i + 1) >= 0){
                    validMoves.push([xpos - (i + 1), ypos]);
                };
            };
        }else{
            for(let i = 0; i < distance; i++){
                if(xpos - (i + 1) >= 0){
                    let move = [xpos - (i + 1), ypos];

                    if(board.value(move)[0] == 0){
                        validMoves.push(move);
                    }else{
                        if(jump == false){
                            if(board.value(move)[1] == "white"){
                                return (validMoves);
                            }else{
                                validMoves.push(move);
                                return (validMoves);
                            };
                        }else{
                            if(board.value(move)[1] == "black"){
                                validMoves.push(move);
                            };
                        };
                    };
                };
            };
        };
    }else{
        if(exception){
            for(let i = 0; i < distance; i++){
                if(xpos + (i + 1) <= board_width - 1){
                    validMoves.push([xpos + (i + 1), ypos]);
                };
            };
        }else{
            for(let i = 0; i < distance; i++){
                if(xpos + (i + 1) <= board_width - 1){
                    let move = [xpos + (i + 1), ypos];

                    if(board.value(move)[0] == 0){
                        validMoves.push(move);
                    }else{
                        if(jump == false){
                            if(board.value(move)[1] == "black"){
                                return (validMoves);
                            }else{
                                validMoves.push(move);
                                return (validMoves);
                            };
                        }else{
                            if(board.value(move)[1] == "white"){
                                validMoves.push(move);
                            };
                        };
                    };
                };
            };
        };
    };

    return(validMoves);
};

function L(pos, distance, color, jump, exception){
    let validMoves = [];
    let xpos = pos[0];
    let ypos = pos[1];

    if(color == "white"){
        if(exception){
            for(let i = 0; i < distance; i++){
                if(xpos + (i + 1) <= board_width - 1){
                    validMoves.push([xpos + (i + 1), ypos]);
                };
            };
        }else{
            for(let i = 0; i < distance; i++){
                if(xpos + (i + 1) <= board_width - 1){
                    let move = [xpos + (i + 1), ypos];

                    if(board.value(move)[0] == 0){
                        validMoves.push(move);
                    }else{
                        if(jump == false){
                            if(board.value(move)[1] == "white"){
                                return (validMoves);
                            }else{
                                validMoves.push(move);
                                return (validMoves);
                            };
                        }else{
                            if(board.value(move)[1] == "black"){
                                validMoves.push(move);
                            };
                        };
                    };
                };
            };
        };
    }else{
        if(exception){
            for(let i = 0; i < distance; i++){
                if(xpos - (i + 1) >= 0){
                    validMoves.push([xpos - (i + 1), ypos]);
                };
            };
        }else{
            for(let i = 0; i < distance; i++){
                if(xpos - (i + 1) >= 0){
                    let move = [xpos - (i + 1), ypos];

                    if(board.value(move)[0] == 0){
                        validMoves.push(move);
                    }else{
                        if(jump == false){
                            if(board.value(move)[1] == "black"){
                                return (validMoves);
                            }else{
                                validMoves.push(move);
                                return (validMoves);
                            };
                        }else{
                            if(board.value(move)[1] == "white"){
                                validMoves.push(move);
                            };
                        };
                    };
                };
            };
        };
    };

    return(validMoves);
};

function D(pos, distance, color, jump){
    let validMoves = [];


    function RF(actualDistance){
        let rPos = R(pos, actualDistance, color, true, "all");
        let fPos = F(pos, actualDistance, color, true, "all");
        let rLength = rPos.length;

        for(let j = 0; j < ((rLength < fPos.length) ? rLength : fPos.length); j++){
            
            let move = [rPos[j][0],fPos[j][1]];

            if(board.value(move)[0] == 0){
                validMoves.push(move);
            }else{
                if(jump == false){
                    if(board.value(move)[1] == (color == "white" ? "white" : "black")){
                        return (validMoves);
                    }else{
                        validMoves.push(move);
                        return (validMoves);
                    };
                }else{
                    if(board.value(move)[1] == (color == "white" ? "black" : "white")){
                        validMoves.push(move);
                    };
                };
            };
        };
    }

    function RB(actualDistance){
        let rPos = R(pos, actualDistance, color, true, "all");
        let bPos = B(pos, actualDistance, color, true, "all");  
        let rLength = rPos.length;

        for(let j = 0; j < ((rLength < bPos.length) ? rLength : bPos.length); j++){

            let move = [rPos[j][0],bPos[j][1]];

            if(board.value(move)[0] == 0){
                validMoves.push(move);
            }else{
                if(jump == false){
                    if(board.value(move)[1] == (color == "white" ? "white" : "black")){
                        return (validMoves);
                    }else{
                        validMoves.push(move);
                        return (validMoves);
                    };
                }else{
                    if(board.value(move)[1] == (color == "white" ? "black" : "white")){
                        validMoves.push(move);
                    };
                };
            };
        };
    }

    function LF(actualDistance){
        let lPos = L(pos, actualDistance, color, true, "all");
        let fPos = F(pos, actualDistance, color, true, "all");
        let lLength = lPos.length;


        for(let j = 0; j < ((lLength < fPos.length) ? lLength : fPos.length); j++){

            let move = [lPos[j][0],fPos[j][1]];

            if(board.value(move)[0] == 0){
                validMoves.push(move);
            }else{
                if(jump == false){
                    if(board.value(move)[1] == (color == "white" ? "white" : "black")){
                        return (validMoves);
                    }else{
                        validMoves.push(move);
                        return (validMoves);
                    };
                }else{
                    if(board.value(move)[1] == (color == "white" ? "black" : "white")){
                        validMoves.push(move);
                    };
                };
            };
        };
    }

    function LB(actualDistance){
        let lPos = L(pos, actualDistance, color, true, "all");
        let bPos = B(pos, actualDistance, color, true, "all");  
        let lLength = lPos.length;

        for(let j = 0; j < ((lLength < bPos.length) ? lLength : bPos.length); j++){

            let move = [lPos[j][0],bPos[j][1]];

            if(board.value(move)[0] == 0){
                validMoves.push(move);
            }else{
                if(jump == false){
                    if(board.value(move)[1] == "black"){
                        return (validMoves);
                    }else{
                        validMoves.push(move);
                        return (validMoves);
                    };
                }else{
                    if(board.value(move)[1] == "white"){
                        validMoves.push(move);
                    };
                };
            };
        };
    }
    
    if(distance.length == 1){
    // every direction (RF, RB, LF, LB)
        RF(distance[0]);
        RB(distance[0]);
        LF(distance[0]);
        LB(distance[0]);

    }else{
    //one by one
        if(distance.includes("RF")){
            RF(distance[distance.indexOf("RF") + 1]);
        };
        if(distance.includes("RB")){
            RB((distance[distance.indexOf("RB") + 1]));
        };
        if(distance.includes("LF")){
            LF((distance[distance.indexOf("LF") + 1]));
        }
        if(distance.includes("LB")){
            LB((distance[distance.indexOf("LB") + 1]));
        } 
    };
    
    return(validMoves);
};

// miscellanious movesets/attacks

// move
function M(pos, move, color){

    let validMoves = [];
    let xPos = pos[0];
    let yPos = pos[1];

    if(color == "white"){
        for(let i = 0; i < move.length; i++){
            if(xPos - move[0] >= 0 && yPos + move[1] < board_height){
                if(board.value([xPos - move[0], yPos + move[1]])[1] == "black" || board.value([xPos - move[0], yPos + move[1]])[0] == 0){
                    validMoves.push([xPos - move[0], yPos + move[1]]);
                };
            };
        };
    }else{
        for(let i = 0; i < move.length; i++){
            if(xPos + move[0] < board_width && yPos - move[1] >= 0){
                if(board.value([xPos + move[0], yPos - move[1]])[1] == "white" || board.value([xPos + move[0], yPos - move[1]])[0] == 0){
                    validMoves.push([xPos + move[0], yPos - move[1]]);
                };
            };
        };
    };
    return(validMoves);
};               

// a way to create pieces + corresponding functions

class piece{
    constructor(name, color, jump, standard_moveset, misc_moveset, other, attack, state, value, id){
        this.name = name;
        this.color = color;
        this.jump = jump;
        this.standard = standard_moveset;
        this.misc = misc_moveset;
        this.other = other;
        this.attack = attack;
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
        for(let j = 0; j < this.misc.length; j++){
            moves.push(this.misc[j][0](this.pos, this.misc[j][1], this.color, this.jump));
        };


        return(moves.flat());
    };

    get possibleAttacks(){
        let attacks = [];
        if(this.attack.length == 0){
            return (this.possibleMoves);
        }else{
            if(this.attack[0] == true){
                attacks.push(this.possibleMoves);
            };

            for(let i = 0; i < this.attack.length - 1; i++){
                attacks.push(this.attack[i + 1][0](this.pos, this.attack[i + 1][1], this.color, this.attack[i + 1][2]));
            }
        };

        return(attacks.flat());
    };
};

//standard moves: (F, B, R, L) , integer - diagonal (D), [(specific direction), int for that direction, ...]
//misc: (M) - give the coordinate the piece should be offset by (the forward direction is positive Y direction) [M, [[int, int], [int, int], ...]]
//jump: true if a piece doesn't get stopped by other pieces, false if it does
//id: all white pieces have odd numbered id-s while all blacks have even numbered
//attacks: leave empty if attacks = movesets, else attacks[0] = true/false for whether it should include existing movesets -> [moveset, move, jump]

//let name = new piece(name, color, jump, standard moveset, misc moveset, other, attacks, state, value, id); - 10 params

//let rook = new piece("rook", "white", false, [[F, board_height], [B, board_height], [R, board_width], [L, board_width], [D, [board_width]]], [], [], null, 1, 1);
let a = new piece("a", "black", true, [[F, 3], [B, 3], [R, 3], [L, 3], [D, [3]]], [], [], [false, [F, 3, true], [D, [3], false]], null, 1, 1);
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
//TODO: rewrite entirely to fix this slop