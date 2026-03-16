const socket=io()

let playerName=""
let deck=[]
let hand=[]
let tableCard=null

let timer=10
let interval

function join(){

playerName=document.getElementById("name").value

socket.emit("join",playerName)

deck=createDeck()

hand=deck.splice(0,7)

tableCard=deck.pop()

render()

startTimer()

}

function render(){

let handDiv=document.getElementById("hand")

handDiv.innerHTML=""

hand.forEach((card,i)=>{

let div=document.createElement("div")

div.className="card "+card.color

div.innerText=card.value

div.onclick=()=>play(i)

handDiv.appendChild(div)

})

let table=document.getElementById("table")

table.innerHTML=""

let t=document.createElement("div")

t.className="card "+tableCard.color

t.innerText=tableCard.value

table.appendChild(t)

}

function play(i){

let card=hand[i]

if(!canPlay(card,tableCard)) return

tableCard=card

hand.splice(i,1)

render()

}

function uno(){

socket.emit("uno",playerName)

alert("UNO!")

}

function passTurn(){

socket.emit("endTurn")

startTimer()

}

function startTimer(){

clearInterval(interval)

timer=10

interval=setInterval(()=>{

timer--

document.getElementById("timer").innerText=timer

if(timer<=0){

passTurn()

}

},1000)

}

function send(){

let msg=document.getElementById("msg").value

socket.emit("chat",playerName+": "+msg)

}

socket.on("chat",(msg)=>{

let chat=document.getElementById("chat")

chat.innerHTML+="<div>"+msg+"</div>"

})

socket.on("players",(players)=>{

let html=""

players.forEach(p=>{

html+=p.name+"<br>"

})

document.getElementById("players").innerHTML=html

})