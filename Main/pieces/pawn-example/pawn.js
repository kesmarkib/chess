function handleState(state) {
    switch (state) {
        case "first_move":
            state = "alive"
            break;
            
        case "end_of_board":
            break;


        default:
            break;
    }
}


// can alter the state of the given piece
// can alter parameters of the given piece 
// can invoke certain functions altering the board / pieces
// can alter global variables, states, etc...


