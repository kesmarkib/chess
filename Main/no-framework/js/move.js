import * as constant from "./constants.js";
import { pieces } from "./pieces.js";
import { board } from "./board.js";

// dependency: needs access to the board object

function getColor(id){
    return(id%2 == 0 ? "white" : "black")
}

function calculateMove(position, distance, direction_array, color, can_jump){
    const moves = [];
    const running_pos = [position[0], position[1]];
    let dx = direction_array[0];
    let dy = direction_array[1];

    if(color == "black"){
        dx = dx * -1;
        dy = dy * -1;
    };

    for(let i = 0; i < distance; i++){
        running_pos[0] += dx;
        running_pos[1] += dy;
        
        for(let j = 0; j < 2; j++){
            if(running_pos[j] <= 0 || running_pos[j] >= (j == 0 ? constant.board_width - 1 : constant.board_height - 1)){
                return(moves)
            };  
        };

        const board_value = board.getValue(running_pos);
        const board_value_color = getColor(board_value)

        if(board_value == 0){
            moves.push([...running_pos]);
        }else{
            if(can_jump){
                if(board_value_color != color){
                    moves.push([...running_pos]);
                }
            }else{
                if(board_value_color == color){
                    return(moves);
                }else{
                    moves.push([...running_pos]);
                    return(moves);
                }
            };
        };
    };
    return(moves);
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

export function directionMatrixMove(position, distance, direction, color, can_jump){
    return calculateMove(position, distance, direction_matrix_obj[direction], color, can_jump);
};

export function calculateSpecialMove(position, special_moves, color){
    let moves = [];
    for(let i = 0; i < special_moves.length; i++){
        moves.push(calculateMove(position, 1, special_moves, color, false));
    };

    return(moves.flat());
};