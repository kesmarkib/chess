import * as move from "./move.js";
import * as util from "./utils.js";
import { board } from "./board.js";
import * as constant from "./constants.js";

export class Piece{
    constructor(json, id, color, state){
        this.object = json
        this.id = id;
        this.color = color;
        this.state = state;
        

        this.position = null;
    };

    updatePos(pos){
        this.position = pos;
    }

    get pos(){
        for(let i = 0; i < constant.board_width; i++){
            let index = board.board[i].indexOf(this.id);
            if(index > -1){
                this.position = [i, index]
                return([i, index]);
            };
        };
        return(new Error("Position not found"));
    };

    get getLegalMoves(){
        
    };

    get getLegalAttacks(){
        let attackMoves = [];
        if(this.attacks.length == 0){
            return (this.possibleMoves);
        }else{
            if(this.attacks[0] == true){
                attackMoves.push(this.possibleMoves);
            };

            for(let i = 0; i < this.attacks.length - 1; i++){
                attackMoves.push(this.attacks[i + 1][0](this.position, this.attacks[i + 1][1], this.color, this.attacks[i + 1][2]));
            }
        };

        attackMoves = attackMoves.flat();
        
        for(let i = 0; i < this.ignore[1].length; i++){
            let p = this.ignore[1][i];
            let ignorePos = move.M(this.position, [p], this.color)[0];
            let index = attackMoves.findIndex(arr => JSON.stringify(arr) === JSON.stringify(ignorePos));
            if(index > -1){
                attackMoves.splice(index, 1);
            };
        };

        return(attackMoves);
    };

    get customRules(){
        for(let i = 0; i < this.other.length; i++){
            if(this.other[i](this) == false){
                return(false);
            };
        };
        return(true)
    };
};


export { pieces };
