import * as constant from "./constants.js";
import { board } from "./board.js";

const horizontal = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function visualize(){
    const table = document.getElementById("table");
    table.innerText = "";
    table.innerText += "<>";
    for(let z = 0; z < constant.board_width; z++){
        table.innerText += `_${horizontal[z]}`
    }
    table.innerText += "\n ";

    for(let y = 0; y < constant.board_height; y++){
        table.innerText += `${y+1}|`;
        for(let x = 0; x < constant.board_width; x++){
            table.innerText += ` ${board.board[x][y]}`;
        };
        table.innerText += "\n"; 
    };
};
