import * as constant from "./constants.js";
import { pieces } from "./pieces.js";
import { board } from "./board.js";
import * as util from "./utils.js";

// standard movesets (forward = F; backward = B; right = R; left = L; combinations: FR, FL, BR, BL; + misc) - int(if infinite then input number equal to board length)

export function findColor(num){
    if(num%2 == 1){
        return(0);
    }else{
        return(1);
    };
};

export function executeMove(pos, distance, directionArray, color, jump){
    let validMoves = [];
    let runningPos = [pos[0], pos[1]];
    let dx = directionArray[0];
    let dy = directionArray[1];

    if(color == 1){
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
export function moveMatrixFunc(pos, distance, directionString, color, jump){
    return executeMove(pos, distance, directionMatrixObj[directionString], color, jump);
};


export function M(pos, newPositions, color){
    let validMoves = [];
    for(let i = 0; i < newPositions.length; i++){
        let newPos = newPositions[i];
        validMoves.push(executeMove(pos, 1, newPos[0], newPos[1], color, false));
    };

    return(validMoves.flat());
};

export function vision(color){
    let allPositions = [];
    pieces.forEach(p => {
        if(p.color == color){
            allPositions.push(p.possibleAttacks);
        };
    });

    allPositions = allPositions.flat();

    return(allPositions);
};

export function visionOnPos(color, pos){    
    let index = (color == 0 ? whiteVision : blackVision).findIndex(arr => util.JSON.stringify(arr) === util.JSON.stringify(pos));

    return(index > -1 ? true : false);
};