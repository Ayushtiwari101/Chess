// Geting values from localStorage
function getvalues(){
    var p1name = document.getElementById('p1name').value
    var p1nick = document.getElementById('p1nick').value
    var p2name = document.getElementById('p2name').value
    var p2nick = document.getElementById('p2nick').value

    localStorage.setItem('p1name',p1name)
    localStorage.setItem('p1nick',p1nick)
    localStorage.setItem('p2name',p2name)
    localStorage.setItem('p2nick',p2nick)
}

// Time from localStorage
function gettime(){
    var time = document.getElementById('time').value
    localStorage.setItem('time', time)
}
var time = document.getElementById('time').value
localStorage.setItem('time', time)

//Sound Effects on clicking
function playsound(){
    let click = new Audio('./../assets/clicksound.wav')
    click.play()
}




