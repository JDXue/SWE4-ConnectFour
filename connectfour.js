const stagewidth = 540
const stageheight = 300

const context = document.querySelector("canvas").getContext("2d")

context.canvas.height = stageheight;
context.canvas.width = stagewidth;

class connectFour{
    constructor(){
        this.board = [
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
        ]
        this.playerOne = {
        colour : "Red",
        win : false,
        isCurrentPlayer : true,
        numOfMoves : 0
        }

        this.playerTwo = {
        colour : "Yellow",
        win : false,
        isCurrentPlayer : false,
        numOfMoves : 0
        }

        this.isEndGame = false

        this.showPlayerColours()

    }


    showPlayerColours(){
        console.log(`Player one: ${this.playerOne.colour} | Player two: ${this.playerTwo.colour}`)
        return `Player one: ${this.playerOne.colour} | Player two: ${this.playerTwo.colour}`
    }


    getPlayerMove(playerMove){
        let validMove = false

        //if the game has already ended, the player will not be able to make any more moves
        if(this.isEndGame){
        return 'the game has ended, so you cannot make any more moves'
        }
        while (!validMove){
        if(this.isValidMove(playerMove)){
            validMove = true

        }
        else{
            console.log(`You can't go there! Please enter a number from 1 to ${this.board[0].length}`)
            playerMove = prompt("Enter a valid number")
        }
        }
        this.makeAMove(playerMove)

        console.log(this.board)
        //starts checking for wins or full board
        if(this.playerTwo.numOfMoves >= 3){
        if(this.isEndGame){
            this.showEndgameMessage()
        }
        }

        return parseInt(playerMove)
    }

    isValidMove(playerMove){
        playerMove -= 1 //for purpose of array indexing
        //console.log("column chosen: " + playerMove)
        //console.log(this.board)


        if((playerMove > -1) && (playerMove <= (this.board[0].length -1))){
        //then checks that the column is not already full
        if(this.board[0][playerMove] == 0){

            return true
        }
        else{
            return false
        }
        }
        else return false
    }

    makeAMove(playerMove){
        playerMove -= 1 //for purpose of array indexing
        //console.log(this.board)
        //adds player move to board in next available row

        let spaceFound = false
        let row = (this.board.length - 1) //finds the last row
        //console.log(row)
        //console.log("this the position I want to take: " + this.board[row][playerMove])
        while(!spaceFound){
        if(this.board[row][playerMove] == 0) {
            spaceFound = true
        }
        else{
            spaceFound = false
            row-- //go to check row above
        }
        }

        //checks which player's go it is
        if(this.playerOne.isCurrentPlayer == true){
        this.board[row].splice(playerMove,1,"R")
        this.playerOne.numOfMoves += 1
        this.playerOne.isCurrentPlayer = false
        this.playerTwo.isCurrentPlayer = true
        }
        else{
        this.board[row].splice(playerMove,1,"Y")
        this.playerOne.numOfMoves += 1
        this.playerTwo.isCurrentPlayer = false
        this.playerOne.isCurrentPlayer = true
        }

        //console.log(this.board)
        return this.board
    }

    //rest operator used for testing purposes, however be aware that rest operator encases args in an array
    checkForEndGame(...testBoard){
        let playerTwoWin = "RRRR"
        let playerOneWin = "YYYY"
        let isFull = false
        this.board = testBoard[0]
        let columnStr = ''
        //console.log(testBoard[0])
        //console.log(testBoard[1].join(''))

        //checking rows
        for(let i= 0 ; i < this.board.length; i++){
        if((this.board[i].join('').includes(playerOneWin)) || (this.board[i].join('').includes(playerTwoWin))){
            this.isEndGame = true
            return this.isEndGame
        }
        }

        //checking columns
        for(let i = 0; i < this.board[0].length; i++){
        columnStr = ''
        this.board.map((row) => {
            columnStr += row[i].toString()
        })

        //console.log(columnStr)
        if((columnStr.includes(playerOneWin)) || (columnStr.includes(playerTwoWin)) ){
            this.isEndGame = true
            return this.isEndGame
        }
        }

        //check diagonally in rows and columns
        //using this.board.length - 4 - 2 allows for loop to only iterate over rows and columns where possible to get four in a row

        //for left to right
        columnStr = ''
        for(let i = 0; i < this.board.length; i++){
            columnStr += this.board[i][i]
        }

        //console.log(columnStr)
        if((columnStr.includes(playerOneWin)) || (columnStr.includes(playerTwoWin)) ){
            this.isEndGame = true
            return this.isEndGame
        }

        //for right to left
        else{
            columnStr = ''
            for(let i = 0; i < this.board.length; i++){
            let reverseOrder = this.board.length - 1 - i
            columnStr += this.board[i][reverseOrder]
            }

            //console.log(columnStr)
            if((columnStr.includes(playerOneWin)) || (columnStr.includes(playerTwoWin)) ){
                this.isEndGame = true
                return this.isEndGame

            }


            //check if board is full
            else{

            for(let i = 0; i < this.board.length; i++){
                if(this.board[i].join('').includes('0')){
                isFull = false
                break
                }
                else{ isFull = true}
            }
            console.log(isFull)
            return isFull ? true : false
            }

        }
    }

    showEndgameMessage(winningLine, isFull){
    //console.log("winning line: "+ winningLine)
    let endgameMessage = ''
    isFull ? endgameMessage = 'No more goes, nobody has won': (winningLine.includes("R")) ? endgameMessage = 'Player 1 has won!' : endgameMessage = 'Player 2 has won!'
    console.log(endgameMessage)
    return endgameMessage
    }


    // playGame(){

    //   while(!this.isEndGame){
    //     let playerGo = prompt("enter a value from 1 to 3 to add a counter")
    //     this.getPlayerMove(playerGo)


    //   }
    //   console.log(this.board)
    // }

}


//recursive function for drawing board per frame must not be a method
const gameLoop = () => {
    context.fillStyle = "#202020";
    context.fillRect(0, 0, stagewidth, stageheight);// x, y, width, height


    window.requestAnimationFrame(gameLoop)

}

g = new connectFour()
window.requestAnimationFrame(gameLoop)