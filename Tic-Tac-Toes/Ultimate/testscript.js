const smallgrids = document.querySelectorAll('.smallgrid');
let activesquares = document.querySelectorAll('.smallgrid.active > div')
const directiontext = document.querySelector('#direction-text')
const winningtext = document.getElementById('winning-text')
let count = 0
let matrix = [
    [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ],
    [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ],
    [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ],
    [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ],
    [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ],
    [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ],
    [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ],
    [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ],
    [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]
]
let largegrid = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]

function choosesquare(activesquares){
    activesquares.forEach(function(square){
        square.removeEventListener('click', handleClick)
    })

    activesquares.forEach(function(square){
        square.addEventListener('click', handleClick)
    })

    activesquares = document.querySelectorAll('.smallgrid.active > div')
    choosesquare(activesquares)
}
choosesquare(activesquares)



function handleClick(square){
    if (!(square.classList.contains('clicked'))){
        square.classList.add('clicked')
        let background = ""
        let playerid = 0
        const board = getBoard(square)
        const x = getX(square)
        const y = getY(square)
        if (count%2) {
            background= "#d62828"
            playerid = 2
        }
        else {
            background = "#fcbf49"
            playerid =  1
        }
        square.style.background=background
        matrix[board][y][x]=playerid
        count++
        directiontext.textContent=count
        if (win(x,y,board,playerid)){
            winningtext.textContent = `Player ${playerid} Wins!`
            winningtext.style.color=background
            winningtext.classList.add('winningstate')
            document.querySelectorAll('.smallgrid.active > div').forEach(function(square){
                square.parentElement.style.background = background;
                square.style.background=background;
                square.classList.add('clicked')
            })
        }
    }
    document.querySelectorAll(".smallgrid").forEach(function(smallgrid){
        smallgrid.classList.remove("active")
    })
    smallgrids[b3tob10(parseInt(square.classList[0]))].classList.add('active')
}


function getBoard(square){
    const board = b3tob10(parseInt(square.parentNode.id))
    return board
}

function getX(square){
    const x = parseInt(square.classList[0].charAt(1))
    return x
}

function getY(square){
    const y = parseInt(square.classList[0].charAt(0))
    return y
}


function win(x,y,board,playerid){
    let row = true;
    let column = true;
    let diagup = true;
    let diagdown = true;
    for (let i = 0;i<3;i++){
        row&=matrix[board][y][i]===playerid;
        column&=matrix[board][i][x]===playerid;
        diagup&=matrix[board][2-i][i]===playerid;
        diagdown&=matrix[board][i][i]===playerid
    }
    return row || column || diagup || diagdown
}










function b3tob10(num){
    let output = 0
    let index = 0
    while (num!=0){
        let lastdigit = num%10
        output+=(lastdigit)*(3**index)
        num = Math.floor(num/10)
        index++
    }
    return output
}


