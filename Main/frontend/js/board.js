import * as util from "./utils.js";
import * as constant from "./constants.js";
import { visualize } from "./visualize.js";

class Board{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.board = [];
        this.board_no_highlight = [];

    };

    // empty board
    generateEmpty(){
        for(let w = 0; w < this.width; w++){
            this.board.push([]);
            for(let h = 0; h < this.height; h++){
                this.board[h].push(0);
            };
        };
    }

    // color index 0===>white, 1====>black
    // ID ===> white páros, black páratlan
    initialize(pointers, color){
        is_valid_to_replace = false;
        let pieceId = color;
        for(let pointer of pointers[color]){

            let x = horizontal.indexOf(pointer[1]) - 1;
            let y = pointer[2] - 1;

            replaceSquare(board, x, y, pointer, is_valid_to_replace);

            pieceId += 2;
        }
    };

    replaceSquare(board, x, y, pointer, is_valid_to_replace){
        if(isOccupied(board, x, y) && !is_valid_to_replace){
            //function
            throw new Error("You have already placed a piece on that square!");
        }

        return board[x][y] = pointer[0];
    }

    isOccupied(board, x, y){
        if(board[x][y] === 0){
            return false;
        }else{
            return true;
        }
    }

    // get a value of a given position [x, y]
    value(pos){
        return(this.board[pos[0]][pos[1]]);
    };

    highlightPos(pointers){
        this.board_no_highlight = JSON.parse(JSON.stringify(this.board));

        for(let i = 0; i < pointers.length; i++){
            this.board[pointers[i][0]][pointers[i][1]] = "■";
        };
        visualize();
    };

    get clear(){
        this.board = JSON.parse(JSON.stringify(this.board_no_highlight));
        visualize();
    };
};

let testPointers = [["PD2", "KF3"], ["KA7"]];

let testPointer2 = {
    "white": ["PD2", "KF3"],
    "black": ["KA7"]
};
// color index 0===>white, 1====>black

let board = new Board(constant.board_width, constant.board_height);
board.generateEmpty().initialize(testPointers, 0).initialize(testPointers, 1);

export { board };