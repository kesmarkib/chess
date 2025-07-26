import * as move from "./move.js";
import * as constant from "./constants.js";
import { visualize } from "./visualize.js";
import { piece, pieces } from "./pieces.js";
import { board } from "./board.js";

visualize();

globalThis.move = move;
globalThis.constant = constant;
globalThis.piece = piece;
globalThis.pieces = pieces;
globalThis.board = board;