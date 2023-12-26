const body = document.querySelector('body')
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
        directiontext.textContent = ""
        const square = event.target;
        smallgrids.forEach(function(smallgrid){
            smallgrid.classList.remove('hover-state')
        })
        if (!(square.classList.contains('clicked'))){
            square.classList.add('clicked')
            const playerid = (count%2)+1
            const board = getBoard(square)
            const x = getX(square)
            const y = getY(square)
            square.classList.add(`player${playerid}`)
            
            matrix[board][y][x]=playerid
            count++
            if (win(x,y,board,playerid)){
                square.parentElement.classList.add('won')
                const largegridx = square.parentElement.id.charAt(1);
                const largegridy = square.parentElement.id.charAt(0);
                largegrid[largegridy][largegridx]=playerid
                document.querySelectorAll('.smallgrid.active > div').forEach(function(square){
                    square.parentElement.classList.add(`player${playerid}`)
                    square.classList.remove(`player${(count%2)+1}`)
                    square.classList.add(`player${playerid}`);
                    square.classList.add('clicked')
                })
                if (largewin(largegridx,largegridy,largegrid,playerid)){
                    winningtext.classList.add('wonstate')
                    winningtext.textContent = `Player ${playerid} Wins!`
                    
                    smallgrids.forEach(function(smallgrid){
                        body.classList.add(`player${playerid}`)
                        smallgrid.style.border = `2px solid var(--square-background-color)`
                        smallgrid.classList.add('won')
                    })
                }
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

function largewin(x,y,board,playerid){
    let row = true;
    let column = true;
    let diagup = true;
    let diagdown = true;
    for (let i = 0;i<3;i++){
        row&=board[y][i]===playerid;
        column&=board[i][x]===playerid;
        diagup&=board[2-i][i]===playerid;
        diagdown&=board[i][i]===playerid
    }
    return row || column || diagup || diagdown
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
    if (!winningtext.classList.contains('wonstate')) directiontext.textContent = "Pick any square from the active board!"
    smallgrids.forEach(function(smallgrid){
        if (!smallgrid.classList.contains('won')){
        smallgrid.classList.add('hover-state')
        hover(smallgrid)
        unhover(smallgrid)
        }
    });
    
    function hover(smallgrid){
        smallgrid.addEventListener('mouseenter',function(){
            if (smallgrid.classList.contains('hover-state')){
            smallgrid.classList.add('active')
            }
        })
    }
    
    function unhover(smallgrid){
        smallgrid.addEventListener('mouseleave',function(){
            if (smallgrid.classList.contains('hover-state')){
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


// color themes!
const docEl = document.documentElement;
const themeSelectors = document.querySelectorAll('#themes > p')

function chooseTheme(colorTheme){
    const themeAttributes = colorTheme.split(' ')
    const bgcolor = themeAttributes[0];
    const smallgridcolor = themeAttributes[1];
    const squarecolor = themeAttributes[2];
    const player1color = themeAttributes[3];
    const player2color = themeAttributes[4];
    changeTheme(bgcolor,smallgridcolor,squarecolor,player1color,player2color)    
}


function changeTheme(bgcolor,smallgridcolor,squarecolor,player1color,player2color){
    docEl.style.setProperty('--full-background-color', bgcolor)
    docEl.style.setProperty('--smallgrid-background-color', smallgridcolor)
    docEl.style.setProperty('--square-background-color', squarecolor)
    docEl.style.setProperty('--player1-color', player1color)
    docEl.style.setProperty('--player2-color', player2color)
}


themeSelectors.forEach(function(theme){
    theme.addEventListener('click',function(){
        localStorage.setItem("currentTheme",theme.dataset.colorThemes)
        chooseTheme(theme.dataset.colorThemes)
    })
})

let currentTheme = localStorage.getItem("currentTheme")

if (currentTheme){
    chooseTheme(currentTheme)
}


PickAnyBoard()

