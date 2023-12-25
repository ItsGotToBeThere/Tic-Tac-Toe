const winningtext = document.getElementById('winning-text')
const jsboard = document.getElementById('jsboard')
let count = 0
let board = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]

document.querySelectorAll('.square').forEach(function(square){
    square.addEventListener('click',function(){
        if (!(square.classList.contains('clicked'))){
            square.classList.add('clicked')
            let background = ""
            let playerid = 0
            let x = 0
            let y = 0
            if (count%2) {
                background= "#d62828"
                playerid = 2
                x = parseInt(square.id.charAt(0))
                y = parseInt(square.id.charAt(1))
            }
            else {
                background = "#fcbf49"
                playerid =  1
                x = parseInt(square.id.charAt(0))
                y = parseInt(square.id.charAt(1))
            }
            square.style.background=background
            board[x][y]=playerid
            count++
            if (win(x,y,board,playerid)){
                winningtext.textContent = `Player ${playerid} Wins!`
                winningtext.style.color=background
                winningtext.classList.add('winningstate')
                document.querySelectorAll('.square').forEach(function(square){
                    square.style.background=background;
                    square.classList.add('clicked')
                })
            }
        }
    })
})



function win(x,y,board,playerid){
    let row = true;
    let column = true;
    let diagup = true;
    let diagdown = true;
    for (let i = 0;i<3;i++){
        row&=board[x][i]===playerid;
        column&=board[i][y]===playerid;
        diagup&=board[2-i][i]===playerid;
        diagdown&=board[i][i]===playerid
    }
    return row || column || diagup || diagdown
}

