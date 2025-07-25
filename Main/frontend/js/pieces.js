import * as move from "./move.js";
import * as util from "./utils.js";
import { board } from "./board.js";
import * as constant from "./constants.js";

let pieces = [];

export class piece{
    constructor(name, color, jump, standard_moveset, attacks, ignore, other, state, value, id){
        this.name = name;
        this.color = color;
        this.jump = jump;
        this.standard = standard_moveset;
        this.attacks = attacks;
        this.ignore = ignore;
        this.other = other;
        this.state = state;
        this.value = value;
        this.id = id;
        this.position = this.pos;

        pieces.push(this);
    };

    get pos(){
        for(let i = 0; i < constant.board_width; i++){
            let index = board.board[i].indexOf(this.id);
            if(index > -1){
                return([i, index]);
            };
        };
        return("position not found");
    };

    get possibleMoves(){
        let moves = [];

        for(let i = 0; i < this.standard.length; i++){
            moves.push(this.standard[i][0](this.position, this.standard[i][1], this.color, this.jump));
        };

        moves = moves.flat();
        
        for(let i = 0; i < this.ignore[0].length; i++){
            let p = this.ignore[0][i];
            let ignorePos = move.M(this.position, [p], this.color)[0];
            let index = moves.findIndex(arr => util.strfy(arr) === util.strfy(ignorePos));
            if(index > -1){
                moves.splice(index, 1);
            };
        };

        return(moves);
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
                attackMoves.push(this.attacks[i + 1][0](this.position, this.attacks[i + 1][1], this.color, this.attacks[i + 1][2]));
            }
        };

        attackMoves = attackMoves.flat();
        
        for(let i = 0; i < this.ignore[1].length; i++){
            let p = this.ignore[1][i];
            let ignorePos = move.M(this.position, [p], this.color)[0];
            let index = attackMoves.findIndex(arr => strfy(arr) === strfy(ignorePos));
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