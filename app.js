document.addEventListener('DOMContentLoaded', () =>{
    const grid = document.querySelector('.grid') //looking for element having grid class
    let squares = Array.from(document.querySelectorAll('.grid div')) //used to collect all the divs inside of .grid
    const width = 10
    let timerID
    let score = 0
    const scoreDisplay = document.getElementById('score')
    const startBtn = document.getElementById('start-button')
    // console.log(squares)
    const lTetromino = [//referring the positions of divs inside the .grid container
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [width, width*2, width*2+1, width*2+2],
        [1, width+1, width*2+1, width*2]
    ]

    const zTetromino = [
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2+1, width*2],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2+1, width*2]
    ]

    const tTetromino = [
        [1,width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width+1, width+2, width*2+1]
    ]

    const oTetromino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ]

    const iTetromino = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ]

    const theTetrominoes = [ lTetromino, tTetromino, zTetromino,
    oTetromino, iTetromino]

    let currentPosition = 1
    let currentRotation = 0
    let random = Math.floor(Math.random()*theTetrominoes.length)
    // console.log(random)
    let current = theTetrominoes[random][currentRotation]
    // console.log(theTetrominoes)
    //drawing the first rotation in first tetromino
    function draw(){
        current.forEach(index =>{ //for each item in the array, we are adding a class of tetromino which is a div with grid class
            squares[currentPosition+index].classList.add('tetromino')
        })

        
    }
    // draw()
    function undraw(){
        current.forEach(index =>{ 
            squares[currentPosition+index].classList.remove('tetromino')
        })
    }
    
    //timerID = setInterval(moveDown, 300)
    function control(e){
        if(e.keyCode === 37){
            moveLeft()
        }
        if(e.keyCode === 39){
            moveRight()
        }
        if(e.keyCode === 38){
            rotate()
        }
    }
    document.addEventListener('keyup', control)
    function moveDown(){
        undraw()
        currentPosition = currentPosition+width
        draw() 
        freeze()
    }   

    function freeze(){
        if(current.some(index => squares[currentPosition+index+width].classList.contains('taken'))){
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            
            random = Math.floor(Math.random()*theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            addScore()
        }
    }

    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
        if(!isAtLeftEdge) currentPosition -=1
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
          currentPosition +=1
        }
        draw()
      }
    
    function moveRight(){
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width-1)
        if(!isAtRightEdge) currentPosition +=1
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -=1
        }
        draw()
    }

    function rotate(){
        undraw()
        currentRotation++
        if(currentRotation === current.length){
            currentRotation = 0
        }
        current = theTetrominoes[random][currentRotation]
        draw()
    }

    startBtn.addEventListener('click', ()=>{
        if(timerID){
            clearInterval(timerID)
            timerID = null
        }else{
            draw()
            timerID = setInterval(moveDown,300)
            displayShape()
        }
    })
    
    function addScore(){
        for(let i =0; i<199; i+=width){
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
            if(row.every(index => squares[index].classList.contains('taken'))){
                score +=10
                scoreDisplay.innerHTML = score
                row.forEach(index=>{
                    squares[index].classList.remove('taken')
                })
                const squaresRemoved = squares.splice(i,width)
            }
        }
    }
})//works when the html file has been completely loaded and passed