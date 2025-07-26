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

    computeMoves(moveset){
        const possible_moves = [];

        const param_names = ["forward", "backward", "right", "left", "top_right", "top_left", "bottom_right", "bottom_left"];
        const move_params = this.parameters[moveset]
        

        for(let i = 0; i < 8; i++){
            console.log(move_params[param_names[i]])
        }


    }
}