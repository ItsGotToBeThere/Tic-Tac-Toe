const smallgrids = document.querySelectorAll('.smallgrid');
let activesquares = document.querySelectorAll('.smallgrid.active > div')
const directiontext = document.querySelector('#direction-text')
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
        square.addEventListener('click',function(){
            const board = getBoard(square);
            const x = getX(square);
            const y = getY(square);
            const playerid = (count%2)+1
            directiontext.textContent = count;

            clicksquare(square,x,y,board,playerid);
            if (win(x,y,board,playerid)){
                square.parentNode.classList.add('won')
            }
            newActiveSquares(square);
        })
    })
}
choosesquare(activesquares)

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

function newActiveSquares(square){
    document.querySelectorAll(".smallgrid").forEach(function(smallgrid){
        smallgrid.classList.remove("active")
    })
    smallgrids[b3tob10(parseInt(square.classList[0]))].classList.add('active')
    activesquares = document.querySelectorAll('.smallgrid.active > div')
    choosesquare(activesquares)
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



let color1 = "red"
let color2 = "blue"

function clicksquare(square,x,y,board,playerid){
    if (playerid===1) square.style.background = color1
    else if (playerid===2) square.style.background = color2
    matrix[board][x][y]=playerid;
    count++;
}




function win(x,y,board,playerid){
    let row = true;
    let column = true;
    let diagup = true;
    let diagdown = true;
    for (let i = 0;i<3;i++){
        row&=matrix[board][x][i]===playerid;
        column&=matrix[board][i][y]===playerid;
        diagup&=matrix[board][2-i][i]===playerid;
        diagdown&=matrix[board][i][i]===playerid
    }
    return row || column || diagup || diagdown
}


