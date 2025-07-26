import * as constant from "./constants.js";
import { pieces } from "./pieces.js";
import { board } from "./board.js";

// standard movesets (forward = F; backward = B; right = R; left = L; combinations: FR, FL, BR, BL; + misc) - int(if infinite then input number equal to board length)

const directionMatrixObj = {
    "forward": [0, 1],
    "backward": [0, -1],
    "right": [1, 0],
    "left": [-1, 0],

    "top_left": [-1, 1],
    "bottom_left": [-1, -1],
    "top_right": [1, 1],
    "bottom_right": [1, -1]
};

export function executeMove(pos, distance, direction_array, color, jump){
    let validMoves = [];
    let runningPos = [pos[0], pos[1]];
    let dx = direction_array[0];
    let dy = direction_array[1];

    if(color == "black"){
        dx = dx * -1;
        dy = dy * -1;
    };

    for(let i = 0; i < distance; i++){
        runningPos[0] += dx;
        runningPos[1] += dy;
        
        for(let j = 0; j < 2; j++){
            if(runningPos[j] <= 0 || runningPos[j] >= (j == 0 ? constant.board_width - 1 : constant.board_height - 1)){
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

const direction_matrix_obj = {
    "forward": [0, 1],
    "backward": [0, -1],
    "right": [1, 0],
    "left": [-1, 0],

    "top_left": [-1, 1],
    "bottom_left": [-1, -1],
    "top_right": [1, 1],
    "bottom_right": [1, -1]
};
export function moveMatrixFunc(pos, distance, direction_string, color, jump){
    return executeMove(pos, distance, direction_matrix_obj[direction_string], color, jump);
};


export function M(pos, newPositions, color){
    let valid_moves = [];
    for(let i = 0; i < newPositions.length; i++){
        let new_pos = newPositions[i];
        valid_moves.push(executeMove(pos, 1, new_pos[0], new_pos[1], color, false));
    };

    return(valid_moves.flat());
};

export function vision(color){
    let all_positions = [];
    pieces.forEach(p => {
        if(p.color == color){
            all_positions.push(p.possibleAttacks);
        };
    });

    all_positions = all_positions.flat();

    return(all_positions);
};

export function visionOnPos(color, pos){    
    let index = (color == 0 ? whiteVision : blackVision).findIndex(arr => JSON.stringify(arr) === JSON.stringify(pos));

    return(index > -1 ? true : false);
};