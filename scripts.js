
var board = ["", "", "", "", "", "", "", "", ""];
var turn = true;
var over = false;
var winner = "none";
var cpu = 0;
var player = 0;
var tie = 0;

function reset(){
    if (winner === "player") {
        player++;
    }
    if (winner === "cpu") {
        cpu++;
    }
    winner = "none";
    board = ["", "", "", "", "", "", "", "", ""];
    turn = true;
    over = false;
    for (var x = 0; x < 9; x++) {
        document.getElementById(x).innerText = board[x];
    }
    document.getElementById("win").innerText = "No one has won!";
    document.getElementById("score").innerText = "Score: " + player + " - " + cpu + " - " + tie + " (W - L - T)";

}


function move(num) {
    console.log("hi");
    console.log(turn === true);
    console.log(over === false);
    var movea = 0;
    var moveb = 0;
    for (var x = 0; x < 9; x++) {
        if (board[x] === "O") {
            movea++;
        }
        if (board[x] === "X") {
            moveb++
        }
    }
    
    for (var x = 0; x < 9; x++) {
        document.getElementById(x).innerText = board[x];
    }
    console.log(board[num] == "");
    if (movea <= moveb && over === false) {
        console.log("hi");

        if (board[num] == "") {
            //Register move
            document.getElementById(num).innerText = "O";
            turn = false;
            board[num] = "O";
            winner = isOver();
            console.log("Player moved");

            //End if player wins
            if (winner === "player") {
                document.getElementById("win").innerText = "Player has won!";
                over = true;
                return;
            }

            //Check if a move exists?
            if (!(board[0] === "" || board[1] === "" || board[2] === "" || board[3] === "" || board[4] === "" || board[5] === "" || board[6] === "" || board[7] === "" || board[8] === "")) {
                document.getElementById("win").innerText = "It's a tie!";
                tie++;
                over = true;
                return;
            }
            for (var x = 0; x < 9; x++) {
                document.getElementById(x).innerText = board[x];
            }
            console.log("CPU move time")
            //CPU move
            cpuMove();

            for (var x = 0; x < 9; x++) {
                document.getElementById(x).innerText = board[x];
            }
            
            if (document.getElementById("win").innerText === "No one has won yet.") {
                turn = true;
            }


        }
        console.log("done");

    }
    return;
}


function cpuMove() {
    /* Win: If the player has two in a row, they can place a third to get three in a row.
    Block: If the opponent has two in a row, the player must play the third themselves to block the opponent.
    Fork: Create an opportunity where the player has two ways to win (two non-blocked lines of 2).
    Blocking an opponent's fork: If there is only one possible fork for the opponent, the player should block it. Otherwise, the player should block all forks in any way that simultaneously allows them to create two in a row. Otherwise, the player should create a two in a row to force the opponent into defending, as long as it doesn't result in them creating a fork. For example, if "X" has two opposite corners and "O" has the center, "O" must not play a corner move in order to win. (Playing a corner move in this scenario creates a fork for "X" to win.)
    Center: A player marks the center. (If it is the first move of the game, playing a corner move gives the second player more opportunities to make a mistake and may therefore be the better choice; however, it makes no difference between perfect players.)
    Opposite corner: If the opponent is in the corner, the player plays the opposite corner.
    Empty corner: The player plays in a corner square.
    Empty side: The player plays in a middle square on any of the 4 sides.
    */

    //Win
    console.log("Win");
    //Horizontal
    for (var i = 0; i < 6; i += 3) {
        if (board[i] === "X" && board[i + 1] === "X" && board[i + 2] === "") {
            board[i + 2] = "X";
            over = true;
        }
    }
    for (var i = 0; i < 6; i += 3) {
        if (board[i] === "X" && board[i + 1] === "" && board[i + 2] === "X") {
            board[i + 1] = "X";
            over = true;
        }
    }
    for (var i = 1; i < 6; i += 3) {
        if (board[i] === "X" && board[i + 1] === "X" && board[i - 1] === "") {
            board[i - 1] = "X";
            over = true;
        }
    }

    //Vertical
    for (var i = 0; i < 2; i += 1) {
        if (board[i] === "X" && board[i + 3] === "X" && board[i + 6] === "") {
            board[i + 6] = "X";
            over = true;
        }
    }
    for (var i = 3; i < 6; i += 1) {
        if (board[i] === "X" && board[i + 3] === "X" && board[i - 3] === "") {
            board[i - 3] = "X";
            over = true;
        }
    }

    //diagonal
    if (board[0] === "X" && board[4] === "X" && board[8] === "") {
        board[8] = "X";
        over = true;
    }
    if (board[8] === "X" && board[4] === "X" && board[0] === "") {
        board[0] = "X";
        over = true;
    }
    if (board[2] === "X" && board[4] === "X" && board[6] === "") {
        board[6] = "X";
        over = true;
    }
    if (board[6] === "X" && board[4] === "X" && board[2] === "") {
        board[2] = "X";
        over = true;
    }

    if (over === true) {
        document.getElementById("win").innerText = "CPU wins!";
        winner = "cpu";
        return;
    }


    //Block
    console.log("Block");

    //Horizontal
    for (var i = 0; i < 9; i += 3) {
        if (board[i] === "O" && board[i + 1] === "O" && board[i + 2] === "") {
            board[i + 2] = "X";
            return;
        }
    }
    for (var i = 1; i < 9; i += 3) {
        if (board[i] === "O" && board[i + 1] === "O" && board[i - 1] === "") {
            board[i - 1] = "X";
            return;
        }
    }
    for (var i = 1; i < 9; i += 3) {
        if (board[i-1] === "O" && board[i + 1] === "O" && board[i] === "") {
            board[i] = "X";
            return;
        }
    }

    //Vertical
    for (var i = 0; i < 2; i += 1) {
        if (board[i] === "O" && board[i + 3] === "O" && board[i + 6] === "") {
            board[i + 6] = "X";
            return;
        }
    }
    for (var i = 3; i < 6; i += 1) {
        if (board[i] === "O" && board[i + 3] === "O" && board[i - 3] === "") {
            board[i - 3] = "X";
            return;
        }
    }
    for (var i = 3; i < 6; i += 1) {
        if (board[i] === "" && board[i + 3] === "O" && board[i - 3] === "O") {
            board[i] = "X";
            return;
        }
    }

    //diagonal
    if (board[0] === "O" && board[4] === "O" && board[8] === "") {
        board[8] = "X";
        return;
    }
    if (board[8] === "O" && board[4] === "O" && board[0] === "") {
        board[0] = "X";
        return;
    }
    if (board[2] === "O" && board[4] === "O" && board[6] === "") {
        board[6] = "X";
        return;
    }
    if (board[6] === "O" && board[4] === "O" && board[2] === "") {
        board[2] = "X";
        return;
    }


    //Fork??
    console.log("Fork");
    var temp = Array.from(board);
    for (i = 0; i < 9; i++) {
        temp = Array.from(board);
        if (temp[i] === "") {
            temp[i] = "X";
            //console.log(i);
            var num = fork(temp, "X");
            //console.log(board);
            //console.log(num);
            //console.log(num > 1);
            if (num > 1) {
                board[i] = "X";
                return;
            }
            temp = board;
        }
    }


    //Block fork??
    console.log("Block Fork");
    var playerforks = 0;
    for (i = 0; i < 9; i++) {
        var temp = Array.from(board);;
        if (temp[i] === "") {
            temp[i] = "O";
            var num = fork(temp, "O");
            if (num > 1) {
                playerforks++;
            }
        }
    }
    console.log(playerforks);
    if (playerforks === 1) {
        for (i = 0; i < 9; i++) {
            var temp = Array.from(board);;
            if (temp[i] === "") {
                temp[i] = "O";
                var num = fork(temp, "O");
                if (num > 1) {
                    board[i] = "X";
                    return;
                }
            }
        }
    }
    if (playerforks >= 2) {
        for (i = 0; i < 9; i++) {
            var temp = Array.from(board);;
            if (temp[i] === "") {
                temp[i] = "X";
                console.log(temp);
                //console.log(fork(temp,"X"));
                console.log(nextFork(temp));
                /////////
                if (fork(temp, "X") > 0) {
                    if (!nextFork(temp)) {
                        board[i] = "X";
                        return;
                    }
                }
            }
        }
    }

    console.log("center");
    //Center
    if (board[4] === "") {
        board[4] = "X";
        return;
    }

    console.log("corner");
    //Opposite corner: If the opponent is in the corner, the player plays the opposite corner.
    if (board[0] === "O" && board[8] === "") {
        board[8] = "X";
        return;
    }
    if (board[8] === "O" && board[0] === "") {
        board[0] = "X";
        return;
    }
    if (board[2] === "O" && board[6] === "") {
        board[6] = "X";
        return;
    }
    if (board[6] === "O" && board[2] === "") {
        board[2] = "X";
        return;
    }
    //Empty corner: The player plays in a corner square.
    console.log("empty");
    var corner = [0, 2, 6, 8, 1, 3, 5, 7];
    for (i = 0; i < 8; i++) {
        if (board[corner[i]] === "") {
            board[i] = "X";
            return;
        }
    }
    //Empty side: The player plays in a middle square on any of the 4 sides.
    return;
}


function nextFork(temp) {
    var test = Array.from(temp);
    var moved = false;
    var turncount = 0;
    var emptycount = 0;
    var nextmove = 0;
    loop:
    for (var i = 0; i < 9; i += 3) {
        turncount = 0;
        emptycount = 0;
        for (var x = 0; x < 3; x += 1) {
            if (test[i + x] === "X") { // &&  && board[i + 2] === "O") {
                turncount++;
            } else if (test[i + x] === "") { // &&  && board[i + 2] === "O") {
                emptycount++;
                nextmove = i + x;
            }
        }
        console.log("Turncount: " + turncount + " emptyCount: " + emptycount);
        if (turncount === 2 && emptycount === 1) {
            test[nextmove] = "O";
            moved = true;
            break loop;
        }
    }
    console.log(moved);
    //Vertical
    loop:
    if (moved === false) {
        for (var i = 0; i < 3; i += 1) {
            turncount = 0;
            emptycount = 0;
            for (var x = 0; x < 9; x += 3) {
                if (test[i + x] === turn) { // &&  && board[i + 2] === "O") {
                    turncount++;
                } else if (test[i + x] === "") { // &&  && board[i + 2] === "O") {
                    emptycount++;
                    nextmove = i + x;
                }
            }
            if (turncount === 2 && emptycount === 1) {
                test[nextmove] = "O";
                moved = true;
                break loop;
            }
        }
    }

    //Diagonal
    loop:
    if (moved === false) {
        if (test[0] === "X" && test[4] === "X" && test[8] === "") {
            test[8] = "O";
            moved = true;
            break loop;
        }
        if (test[8] === "X" && test[4] === "X" && test[0] === "") {
            test[0] = "O";
            moved = true;
            break loop;
        }
        if (test[2] === "X" && test[4] === "X" && test[6] === "") {
            test[6] = "O";
            moved = true;
            break loop;
        }
        if (test[6] === "X" && test[4] === "X" && test[2] === "") {
            test[2] = "O";
            moved = true;
            break loop;
        }
    }
    console.log("Test: " + test);
    return(fork(test, "O") > 1);
}

function fork(temp, turn) {
    //console.log("Start fork");
    var two = 0;
    var turncount = 0;
    var emptycount = 0;

    //Horizontal
    //console.log("Horizontal Fork");
    for (var i = 0; i < 9; i += 3) {
        //console.log("i: " + i);
        turncount = 0;
        emptycount = 0;
        for (x = 0; x < 3; x += 1) {
            //console.log("x: " + x);
            if (temp[i + x] === turn) { // &&  && board[i + 2] === "O") {
                turncount++;
            } 
            //console.log("turncount checked");
            if (temp[i + x] === "") { // &&  && board[i + 2] === "O") {
                emptycount++;
            }
            //console.log("emptycount checked");
        }
        if (turncount === 2 && emptycount === 1) {
            two++;
        }
    }

    //Vertical
    //console.log("Vertical Fork");
    for (var i = 0; i < 3; i += 1) {
        turncount = 0;
        emptycount = 0;
        for (var x = 0; x < 9; x += 3) {
            if (temp[i + x] === turn) { // &&  && board[i + 2] === "O") {
                turncount++;
            } else if (temp[i + x] === "") { // &&  && board[i + 2] === "O") {
                emptycount++;
            }
        }
        if (turncount === 2 && emptycount === 1) {
            two++;
        }
    }

    //Diagonal
    
    if (temp[0] === turn && temp[4] === turn && temp[8] === "") {
        two++;
    }
    if (temp[8] === turn && temp[4] === turn && temp[0] === "") {
        two++;
    }
    if (temp[2] === turn && temp[4] === turn && temp[6] === "") {
        two++;
    }
    if (temp[6] === turn && temp[4] === turn && temp[2] === "") {
        two++;
    }

    return (two);

}


function isOver() {

    for (var i = 0; i < 9; i += 3) {
        if (board[i] === "O" && board[i + 1] === "O" && board[i + 2] === "O") {
            return ("player");
        }
    }
    for (var i = 0; i < 3; i += 1) {
        if (board[i] === "O" && board[i + 3] === "O" && board[i + 6] === "O") {
            return ("player");
        }
    }
    if (board[0] === "O" && board[4] === "O" && board[8] === "O") {
        return ("player");
    }
    if (board[2] === "O" && board[4] === "O" && board[6] === "O") {
        return ("player");
    }
    return;
}