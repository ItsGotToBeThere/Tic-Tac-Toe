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

document.addEventListener('click',function(event){
    if (event.target.parentElement.classList.contains('active')){
        const square = event.target;
        smallgrids.forEach(function(smallgrid){
            smallgrid.classList.remove('hover-state')
        })
        if (!(square.classList.contains('clicked'))){
            square.classList.add('clicked')
            let background = ""
            let playerid = 0
            const board = getBoard(square)
            const x = getX(square)
            const y = getY(square)
            directiontext.textContent = "this part is working"
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
                winningtext.textContent = `The ${y}${x} square has been won!`
                winningtext.style.color=background
                square.parentElement.classList.add('won')
                const largegridx = square.parentElement.id.charAt(1);
                const largegridy = square.parentElement.id.charAt(0);
                largegrid[largegridy][largegridx]=playerid
                directiontext.textContent = largegrid
                document.querySelectorAll('.smallgrid.active > div').forEach(function(square){
                    square.parentElement.style.background = background;
                    square.style.background=background;
                    square.classList.add('clicked')
                })
            }
            document.querySelectorAll(".smallgrid").forEach(function(smallgrid){
                smallgrid.classList.remove("active")
            })
            nextgrid = smallgrids[b3tob10(parseInt(square.classList[0]))]
            if (!nextgrid.classList.contains('won')){
                smallgrids[b3tob10(parseInt(square.classList[0]))].classList.add('active')
            }
            else {
                PickAnyBoard()
            }
        }
    }
})



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



function PickAnyBoard(){
    smallgrids.forEach(function(smallgrid){
        smallgrid.classList.add('hover-state')
        if (!smallgrid.classList.contains('won')){
        hover(smallgrid)
        unhover(smallgrid)
        }
    });
    
    function hover(smallgrid){
        smallgrid.addEventListener('mouseenter',function(){
            if (smallgrid.classList.contains('hover-state')&&!smallgrid.classList.contain('won')){
            smallgrid.classList.add('active')
            }
        })
    }
    
    function unhover(smallgrid){
        smallgrid.addEventListener('mouseleave',function(){
            if (smallgrid.classList.contains('hover-state')&&!smallgrid.classList.contain('won')){
                smallgrid.classList.remove('active')
                }
        })
    }
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

PickAnyBoard()