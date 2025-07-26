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

    init(positions){
        for(let w = 0; w < width; w++){
            this.board.push([]);
            for(let h = 0; h < height; h++){
                this.board[w].push(0);
            };
        };
    }

    value(pos){
        return(this.board[pos[0]][pos[1]]);
    };

    highlightPos(positions){
        this.board_no_highlight = JSON.parse(util.strfy(this.board));

        for(let i = 0; i < positions.length; i++){
            this.board[positions[i][0]][positions[i][1]] = "■";
        };
        visualize();
    };

    get clear(){
        this.board = JSON.parse(util.strfy(this.board_no_highlight));
        visualize();
    };
};

let board = new Board(constant.board_width, constant.board_height);

export { board };