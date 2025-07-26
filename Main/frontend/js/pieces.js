import * as move from "./move.js";
import { board } from "./board.js";
import * as constant from "./constants.js";

class Piece{
    constructor(json, id, color, state){
        this.parameters = json;
        this.id = id;
        this.color = color;
        this.state = state;
        
        this.position = null;
    };

    //dependecy on move.js
    computeMoves(moveset){
        const moves = [];
        const move_params = this.parameters[moveset];

        const param_names = ["forward", "backward", "right", "left", "top_right", "top_left", "bottom_right", "bottom_left"];
        for(let parameter of param_names){
            const distance = move_params[parameter];
            if(distance != 0){
                moves.push(move.directionMatrixMove(this.position, distance, parameter, this.color, json["can_jump"]));
            }
        }

        moves.push(move.calculateSpecialMove(this.position, move_params.special_moves, this.color));

        moves = moves.flat();

        for(let position of move_params.ignore_spaces){
            const index = moves.indexOf(position);
            if(index > -1){
                array.splice(index, 1);
            }
        }

        return(moves)
    }

    //dependency on this class
    //dependency on the board
    //dependency on other pieces
    //dependecy on global variables
    //dependency on move.js
    //[dependent on basically anything in case its needed]
    executeSpecialFunctions(){

    }
}