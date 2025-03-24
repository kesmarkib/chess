import { piece, pieces } from "../pieces.js";
import * as move from "../move.js";

let a = new piece(
    "a", //name
    0, //color
    true, //jump
    [[move.B, 3], [move.F, 4], [move.R, 3], [move.L, 3], [move.D, 2], [move.M, [[1, 2], [-3, 1]]]], //moveset
    [false, [move.F, 2]], //attacks [0] = true/false -> [attack]
    [[[1, 1]],[]], //ignore
    [
        function isWatched(obj){
        return(move.visionOnPos(obj.color == 0 ? 1 : 0, obj.pos));
        }
    ], //other - functions that can check the board for different values and return true/false
    null, //state
    1, //value
    1 //id
);
