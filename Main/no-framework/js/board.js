import * as constant from "./constants.js";
import { visualize } from "./visualize.js";

class Board{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.board_values = [];
        this.board_no_highlight = [];

    };

    // empty board
    generateEmpty(){
        for(let w = 0; w < this.width; w++){
            this.board_values.push([]);
            for(let h = 0; h < this.height; h++){
                this.board_values[h].push(0);
            };
        };
    }

    // color index 0===>white, 1====>black
    // ID ===> white even, black odd
    initialize(pointers, color){
        is_valid_to_replace = false;
        color_num = color == "white" ? 0 : color == "black" ? 1 : null;
        let piece_id = color_num
        for(let pointer of pointers[color_num]){

            let x = horizontal.indexOf(pointer[1]) - 1;
            let y = pointer[2] - 1;

            replaceSquare(board, [x, y], pointer, is_valid_to_replace);

            piece_id += 2;
        }
    };

    // get a value of a given position [x, y]
    getValue(position){
        return(this.board_values[position[0]][position[1]]);
    };

    replaceSquare(position, pointer, is_valid_to_replace){
        const x = position[0];
        const y = position[1];

        if(isOccupied([x, y]) && !is_valid_to_replace){
            //function
            throw new Error("You have already placed a piece on that square!");
        }

        this.board_values[x][y] = pointer[0];
        return;
    }

    isOccupied(position){
        const x = position[0];
        const y = position[1];

        if(this.board_values[x][y] === 0){
            return false;
        }else{
            return true;
        }
    }

    highlightPos(pointers){
        this.board_no_highlight = JSON.parse(JSON.stringify(this.board_values));

        for(let i = 0; i < pointers.length; i++){
            this.board_values[pointers[i][0]][pointers[i][1]] = "■";
        };
        visualize();
    };

    get clear(){
        this.board_values = JSON.parse(JSON.stringify(this.board_no_highlight));
        visualize();
    };
};

let testPointers = [["PD2", "KF3"], ["KA7"]];

let testPointer2 = {
    "white": ["PD2", "KF3"],
    "black": ["KA7"]
};
// color index 0===>white, 1====>black

//dependency on constants
let board = new Board(constant.board_width, constant.board_height);
board.generateEmpty().initialize(testPointers, "white").initialize(testPointers, "black");

export { board };