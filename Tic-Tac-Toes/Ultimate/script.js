const smallgrids = document.querySelectorAll('.smallgrid');
let count = 0;
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
] // I'm sure there's a better way to do this :)



smallgrids.forEach(function(smallgrid){
    hover(smallgrid)
    unhover(smallgrid)
});

function hover(smallgrid){
    smallgrid.addEventListener('mouseenter',function(){
        smallgrid.classList.add('hovered')
        activateSquares()
    })
}

function unhover(smallgrid){
    smallgrid.addEventListener('mouseleave',function(){
        smallgrid.classList.remove('hovered')
    })
}

function activateSquares(){
    document.querySelectorAll(".hovered > div").forEach(function(square){
        square.addEventListener('click',function(){
            document.querySelectorAll(".smallgrid").forEach(function(smallgrid){
                smallgrid.classList.remove("hovered")
            })
            smallgrids[b3tob10(parseInt(square.classList[0]))].classList.add('hovered')
        })
    })
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


