export class pawnFunctions {
    constructor(){
        this.functionHandler = {
            "first_move": this.firstMove,
            "alive": this.onMove,
            "end_of_board": this.onBoardEnd
        }
    }
    
    firstMove(){
        
    }

    onMove(){

    }

    onBoardEnd(){

    }

    
}


pawnFunctions.functionHandler[pawn["state"]]