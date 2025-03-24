import * as util from "./utils.js";
import * as constant from "./constants.js";
import { visualize } from "./visualize.js";

class chessboard{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.board = [];
        this.board_no_highlight = [];

        for(let w = 0; w < width; w++){
            this.board.push([]);
            for(let h = 0; h < height; h++){
                this.board[w].push(0);
            };
        };

        this.board[3][4] = 1;
        this.board[7][5] = 2;
        /*
        this.board[3][3] = 5;
        this.board[4][4] = 7;
        this.board[3][5] = 9;
        this.board[1][2] = 3;
        this.board[4][5] = 5
 */
    };

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

let board = new chessboard(constant.board_width, constant.board_height);

export {board}