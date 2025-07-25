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

export function executeMove(pos, distance, dx, dy, color, jump){
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


//Forward, Backward, Right, Left
export function F(pos, distance, color, jump){
    return executeMove(pos, distance, 0, 1, color, jump);
};

export function B(pos, distance, color, jump){
    return executeMove(pos, distance, 0, -1, color, jump);
};

export function R(pos, distance, color, jump){
    return executeMove(pos, distance, -1, 0, color, jump);
};

export function L(pos, distance, color, jump){
    return executeMove(pos, distance, 1, 0, color, jump);
};

// diagonal
export function RF(pos, distance, color, jump){
    return executeMove(pos, distance, -1, 1, color, jump);
};
export function RB(pos, distance, color, jump){
    return executeMove(pos, distance, -1, -1, color, jump);
};
export function LF(pos, distance, color, jump){
    return executeMove(pos, distance, 1, 1, color, jump);
};
export function LB(pos, distance, color, jump){
    return executeMove(pos, distance, 1, -1, color, jump);
};

export function D(pos, distance, color, jump){
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
    let index = (color == 0 ? whiteVision : blackVision).findIndex(arr => util.strfy(arr) === util.strfy(pos));

    return(index > -1 ? true : false);
};