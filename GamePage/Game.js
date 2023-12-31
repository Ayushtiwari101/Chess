var inst = document.getElementById('inst')
var restart = document.getElementById('restart')
var exit = document.getElementById('exit')

inst.addEventListener('click', ()=>{
    clicksound()
    window.location.href = './../Instruction-Page/Instructions.html'
})

restart.addEventListener('click', ()=>{
    clicksound()
    var Time = localStorage.getItem('time')
    window.location.href = './Game.html'
})

exit.addEventListener('click', ()=>{
    clicksound()
    window.location.href = './../index.html'
})

var homebtn = document.getElementById('homebtn')
var replay = document.getElementById('replay')

homebtn.addEventListener('click', ()=>{
    clicksound()
    window.location.href = './../index.html'
})

replay.addEventListener('click', ()=>{
    clicksound()
    var Time = localStorage.getItem('time')
    window.location.href = './Game.html'
})

var moves = 0

movediv = document.getElementById('move')
movediv.innerHTML = `${moves}`


var p1name = localStorage.getItem('p1name')
var p1nick = localStorage.getItem('p1nick')

var p2name = localStorage.getItem('p2name')
var p2nick = localStorage.getItem('p2nick')


function gameover(){
    bgm.pause()
    var gover = document.getElementById('gameover')
    console.log(gover)
    gover.style.display = 'flex'
}

// Color codes
var yellow = 'rgb(247, 247, 105)'
var green = 'rgb(189, 204, 72)'
var red = 'rgb(241, 128, 126)'
var white = 'rgb(235, 215, 176)'
var brown = 'rgb(185, 135, 97)'
var aqua = 'aqua'

//colorBoxes
function colorBoxes() {
    const color = document.querySelectorAll('.box')
    color.forEach(color => {
        getId = color.id
        arr = Array.from(getId)
        arr.shift()
        aside = eval(arr.pop())
        aup = eval(arr.shift())
        a = aside + aup

        if (a % 2 == 0) {
            color.style.backgroundColor = brown
        }
        if (a % 2 !== 0) {
            color.style.backgroundColor = white
        }
    })
}
colorBoxes()

// Inserting the imgs
function insertimgs() {
    document.querySelectorAll('.box').forEach(img => {
        img.style.cursor = 'pointer'
        if (img.innerText.length !== 0) {
            if (img.innerText == 'Wpawn' || img.innerText == 'Bpawn') {
                img.innerHTML = `${img.innerText} <img class='allimg allpawn' src="./../assets/${img.innerText}.png" alt="">`
            }
            else {
                img.innerHTML = `${img.innerText} <img class='allimg' src="./../assets/${img.innerText}.png" alt="">`
            }
        }
    })
}
insertimgs()

//Remove borders
function removebdr(){
    document.querySelectorAll('.box').forEach(item =>{
        item.style.border = 'none'
    })
}

//function to not remove the same team element

function reddish() {
    document.querySelectorAll('.box').forEach(i1 => {
        if (i1.style.backgroundColor == yellow) {

            document.querySelectorAll('.box').forEach(i2 => {

                if (i2.style.backgroundColor == green && i2.innerText.length !== 0) {

                    violetText = i2.innerText
                    blueText = i1.innerText

                    blueColor = ((Array.from(blueText)).shift()).toString()
                    violetColor = ((Array.from(violetText)).shift()).toString()

                    getId = i2.id
                    arr = Array.from(getId)
                    arr.shift()
                    aside = eval(arr.pop())
                    aup = eval(arr.shift())
                    a = aside + aup

                    if (a % 2 == 0 && blueColor == violetColor) {
                        i2.style.backgroundColor = brown
                    }
                    if (a % 2 !== 0 && blueColor == violetColor) {
                        i2.style.backgroundColor = white
                    }

                    if (blueColor != violetColor) {
                        i2.style.backgroundColor = red
                        i2.style.border = '2px solid red'
                    }
                }
            })
        }
    })
}

//castling
tog = 1
whiteCastleChance=true
blackCastleChance=true
var container = document.getElementById('container')
document.querySelectorAll('.box').forEach(item => {

    item.addEventListener('click', function () {

        if (item.style.backgroundColor == green && item.innerText.length == 0) {
            tog = tog + 1
            moves += 1
            movesound()
        }
        else if (item.style.backgroundColor == 'aqua' && item.innerText.length == 0) {
            tog = tog + 1
            moves += 1
            movesound()
        }
        // To delete the opposite element
        else if (item.style.backgroundColor == red && item.innerText.length !== 0) {

            killsound()

            document.querySelectorAll('.box').forEach(i => {
                if (i.style.backgroundColor == yellow) {
                    blueId = i.id
                    blueText = i.innerText

                    document.getElementById(blueId).innerText = ''
                    item.innerText = blueText
                    colorBoxes()
                    insertimgs()
                    removebdr()
                    tog = tog + 1
                    moves += 1
                }
            })
        }
        movediv.innerHTML = `${moves}`

        getId = item.id
        arr = Array.from(getId)
        arr.shift()
        aside = eval(arr.pop())
        arr.push('0')
        aup = eval(arr.join(''))
        a = aside + aup

        // Function to display the available paths for all pieces
        function whosTurn(toggle) {

            // PAWN
            if (item.innerText == `${toggle}pawn`) {
                item.style.backgroundColor = yellow

                if (tog % 2 !== 0 && aup < 800) {

                    if (aup == 200 && document.getElementById(`b${a + 100}`).innerText.length == 0) {
                        document.getElementById(`b${a + 100}`).style.backgroundColor = green
                        if (aup == 200 && document.getElementById(`b${a + 200}`).innerText.length == 0) {
                            document.getElementById(`b${a + 200}`).style.backgroundColor = green
                        }
                    }

                    if (aup !== 200 && document.getElementById(`b${a + 100}`).innerText.length == 0) {
                        document.getElementById(`b${a + 100}`).style.backgroundColor = green
                    }

                    if (aside < 8 && document.getElementById(`b${a + 100 + 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a + 100 + 1}`).style.backgroundColor = green
                    }

                    if (aside > 1 && document.getElementById(`b${a + 100 - 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a + 100 - 1}`).style.backgroundColor = green

                    }
                    if (aup == 800) {
                        document.getElementById(`b${a}`).innerText = 'Wqueen'
                        colorBoxes()
                        insertimgs()
                        removebdr()
                    }
                    if (aside < 8 && document.getElementById(`b${a + 100 + 1}`).innerText.length == 0 && document.getElementById(`b${a + 100}`).innerText.length == 0) {
                        document.getElementById(`b${a + 100}`).style.backgroundColor = green
                    }

                    if (aside > 1 && document.getElementById(`b${a + 100 - 1}`).innerText.length == 0 && document.getElementById(`b${a + 100}`).innerText.length == 0) {
                        document.getElementById(`b${a + 100}`).style.backgroundColor = green

                    }
                }

                if (tog % 2 == 0 && aup > 100) {

                    if (aup == 700 && document.getElementById(`b${a - 100}`).innerText.length == 0) {
                        document.getElementById(`b${a - 100}`).style.backgroundColor = green
                        if (aup == 700 && document.getElementById(`b${a - 200}`).innerText.length == 0) {
                            document.getElementById(`b${a - 200}`).style.backgroundColor = green
                        }
                    }

                    if (aup !== 700 && document.getElementById(`b${a - 100}`).innerText.length == 0) {
                        document.getElementById(`b${a - 100}`).style.backgroundColor = green
                    }
                    if (aside < 8 && document.getElementById(`b${a - 100 + 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a - 100 + 1}`).style.backgroundColor = green
                    }
                    if (aside > 1 && document.getElementById(`b${a - 100 - 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a - 100 - 1}`).style.backgroundColor = green

                    }
                }
            }

            // KING

            if (item.innerText == `${toggle}king`) {

                if (aside < 8) {
                    document.getElementById(`b${a + 1}`).style.backgroundColor = green
                }
                if (aside > 1) {
                    document.getElementById(`b${a - 1}`).style.backgroundColor = green
                }
                if (aup < 800) {
                    document.getElementById(`b${a + 100}`).style.backgroundColor = green
                }
                if (aup > 100) {
                    document.getElementById(`b${a - 100}`).style.backgroundColor = green
                }
                if (aup > 100 && aside < 8) {
                    document.getElementById(`b${a - 100 + 1}`).style.backgroundColor = green
                }

                if (aup > 100 && aside > 1) {
                    document.getElementById(`b${a - 100 - 1}`).style.backgroundColor = green
                }
                if (aup < 800 && aside < 8) {
                    document.getElementById(`b${a + 100 + 1}`).style.backgroundColor = green
                }
                if (aup < 800 && aside > 1) {
                    document.getElementById(`b${a + 100 - 1}`).style.backgroundColor = green
                }
                
                if(whiteCastleChance==true && a==105 && document.getElementById('b106').innerText== '' && document.getElementById('b107').innerText== '' && document.getElementById('b108').innerText== 'Wrook'){
                    document.getElementById(`b107`).style.backgroundColor = 'aqua'
                }
                if(whiteCastleChance==true && a==105 && document.getElementById('b104').innerText== '' && document.getElementById('b103').innerText== '' && document.getElementById('b102').innerText== '' && document.getElementById('b101').innerText== 'Wrook'){
                    document.getElementById(`b103`).style.backgroundColor = 'aqua'
                }
                if(blackCastleChance==true && a==805 && document.getElementById('b806').innerText== '' && document.getElementById('b807').innerText== '' && document.getElementById('b808').innerText== 'Brook'){
                    document.getElementById(`b807`).style.backgroundColor = 'aqua'
                }
                if(blackCastleChance==true && a==805 && document.getElementById('b804').innerText== '' && document.getElementById('b803').innerText== '' && document.getElementById('b802').innerText== '' && document.getElementById('b801').innerText== 'Brook'){
                    document.getElementById(`b803`).style.backgroundColor = 'aqua'
                }
                item.style.backgroundColor = yellow
            }

            // ROOK

            if (item.innerText == `${toggle}rook`) {

                for (let i = 1; i < 9; i++) {

                    if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText == 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = green
                    }
                    else if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = green
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText == 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = green
                    }
                    else if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = green
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText == 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = green
                    }
                    else if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText !== 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = green
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText == 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = green
                    }
                    else if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText !== 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = green
                        break
                    }
                }

                item.style.backgroundColor = yellow
            }

            // KNIGHT

            if (item.innerText == `${toggle}knight`) {

                if (aside < 7 && aup < 800) {
                    document.getElementById(`b${a + 100 + 2}`).style.backgroundColor = green
                }
                if (aside < 7 && aup > 200) {
                    document.getElementById(`b${a - 100 + 2}`).style.backgroundColor = green
                }
                if (aside < 8 && aup < 700) {
                    document.getElementById(`b${a + 200 + 1}`).style.backgroundColor = green
                }
                if (aside > 1 && aup < 700) {
                    document.getElementById(`b${a + 200 - 1}`).style.backgroundColor = green
                }
                if (aside > 2 && aup < 800) {
                    document.getElementById(`b${a - 2 + 100}`).style.backgroundColor = green
                }
                if (aside > 2 && aup > 100) {
                    document.getElementById(`b${a - 2 - 100}`).style.backgroundColor = green
                }
                if (aside < 8 && aup > 200) {
                    document.getElementById(`b${a - 200 + 1}`).style.backgroundColor = green
                }
                if (aside > 1 && aup > 200) {
                    document.getElementById(`b${a - 200 - 1}`).style.backgroundColor = green
                }

                item.style.backgroundColor = yellow

            }

            // BISHOP

            if (item.innerText == `${toggle}bishop`) {

                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = green
                    }
                    else if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = green
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = green
                    }
                    else if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = green
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = green
                    }
                    else if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = green
                        break
                    }

                }

                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = green
                    }
                    else if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = green
                        break
                    }
                }

                item.style.backgroundColor = yellow

            }

            // QUEEN

            if (item.innerText == `${toggle}queen`) {

                for (let i = 1; i < 9; i++) {

                    if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText == 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = green
                    }
                    else if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = green
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText == 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = green
                    }
                    else if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = green
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText == 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = green
                    }
                    else if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText !== 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = green
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText == 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = green
                    }
                    else if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText !== 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = green
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = green
                    }
                    else if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = green
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = green
                    }
                    else if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = green
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = green
                    }
                    else if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = green
                        break
                    }

                }

                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = green
                    }
                    else if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = green
                        break
                    }
                }

                item.style.backgroundColor = yellow
            }

        }

        // Toggling the turn
        if (tog % 2 !== 0) {
            document.getElementById('tog').innerText = `${p1nick}'s Turn`
            whosTurn('W')
        }
        if (tog % 2 == 0) {
            document.getElementById('tog').innerText = `${p2nick}'s Turn`
            whosTurn('B')
        }
        reddish()

        // winning()
        numOfKings = 0
        document.querySelectorAll('.box').forEach(win => {
            if (win.innerText == 'Wking' || win.innerText == 'Bking') {
                numOfKings += 1
            }
        })

        if (numOfKings == 1) {
            setTimeout(() => {
                // console.log(`${toggle}`) 
                if (tog % 2 == 0) {
                    var winner = document.getElementById('winner')
                    winner.textContent = `${p1nick} Won the Game`
                    gameover()
                }
                else if (tog % 2 !== 0) {
                    var winner = document.getElementById('winner')
                    winner.textContent = `${p2nick} Won the Game`
                    gameover() 
                }
            }, 100)
        }
    })
})

// Moving the element
document.querySelectorAll('.box').forEach(item => {

    item.addEventListener('click', function () {

        if (item.style.backgroundColor == yellow) {
            
            clicksound()

            item.style.border = '2px solid #7F4EE2'
            blueId = item.id
            blueText = item.innerText

            document.querySelectorAll('.box').forEach(item2 => {

                item2.addEventListener('click', function () {

                    getId = item2.id
                    arr = Array.from(getId)
                    arr.shift()
                    aside = eval(arr.pop())
                    arr.push('0')
                    aup = eval(arr.join(''))
                    a = aside + aup

                    if (item2.style.backgroundColor == green || item2.style.backgroundColor == red) {
                        if (blueText == 'Wpawn' && aup == 800) {
                            item2.innerText = 'Wqueen'
                            colorBoxes()
                            insertimgs()
                            removebdr()
                        }
                        else if (blueText == 'Bpawn' && aup == 100) {
                            document.getElementById(`b${a}`).innerText = 'Bqueen'
                            document.getElementById(blueId).innerText = ''
                            colorBoxes()
                            insertimgs()
                            removebdr()
                        }
                        else {
                            document.getElementById(blueId).innerText = ''
                            item2.innerText = blueText
                            colorBoxes()
                            insertimgs()
                            removebdr()
                        }
                    }

                    else if (item2.style.backgroundColor == 'aqua') {
                        if(item2.id=='b103'){
                            document.getElementById('b101').innerText = ''
                            document.getElementById('b102').innerText = ''
                            document.getElementById('b103').innerText = 'Wking'
                            document.getElementById('b104').innerText = 'Wrook'
                            document.getElementById('b105').innerText = ''
                            document.getElementById(blueId).innerText = ''
                            whiteCastleChance=false
                            colorBoxes()
                            insertimgs()
                            removebdr()
                        }
                        else if(item2.id=='b107'){
                            document.getElementById('b105').innerText = ''
                            document.getElementById('b106').innerText = 'Wrook'
                            document.getElementById('b107').innerText = 'Wking'
                            document.getElementById('b108').innerText = ''
                            document.getElementById(blueId).innerText = ''
                            whiteCastleChance=false
                            colorBoxes()
                            insertimgs()
                            removebdr()
                        }
                        else if(item2.id=='b803'){
                            document.getElementById('b801').innerText = ''
                            document.getElementById('b802').innerText = ''
                            document.getElementById('b803').innerText = 'Bking'
                            document.getElementById('b804').innerText = 'Brook'
                            document.getElementById('b805').innerText = ''
                            document.getElementById(blueId).innerText = ''
                            blackCastleChance=false
                            colorBoxes()
                            insertimgs()
                            removebdr()
                        }
                        else if(item2.id=='b807'){
                            document.getElementById('b805').innerText = ''
                            document.getElementById('b806').innerText = 'Brook'
                            document.getElementById('b807').innerText = 'Bking'
                            document.getElementById('b808').innerText = ''
                            document.getElementById(blueId).innerText = ''
                            blackCastleChance=false
                            colorBoxes()
                            insertimgs()
                            removebdr()
                        }
                    }
                })
            })
        }
    })
})

// Prvents from selecting multiple elements
z = 0
document.querySelectorAll('.box').forEach(ee => {
    ee.addEventListener('click', function () {
        z = z + 1
        if (z % 2 == 0 && ee.style.backgroundColor !== green && ee.style.backgroundColor !== 'aqua') {
            colorBoxes()
            removebdr()
        }
    })
})

// time
let interval
var Time = localStorage.getItem('time')
var timer = document.getElementById('time') 
time.textContent = Time
interval = setInterval(()=>{
    Time--;
    timer.textContent = Time

    if (Time == 0){
        clearInterval(interval)
        var winner = document.getElementById('winner')
        winner.textContent = `Draw Time up`
        gameover()
    }
},60000)

// background music
let bgm = new Audio('./../assets/backgroundmusic1.mp3')

bgm.play()
bgm.loop = true

// background sounds on clicking
function clicksound(){
    let music = new Audio('./../assets/clicksound.wav')
    music.pause()
    music.play()
}
function killsound(){
    let music = new Audio('./../assets/killsound.wav')
    music.pause()
    music.play()
}
function movesound(){
    let music = new Audio('./../assets/movesound.wav')
    music.pause()
    music.play()
}
