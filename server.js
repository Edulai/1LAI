const express=require("express")
const http=require("http")
const {Server}=require("socket.io")

const app=express()
const server=http.createServer(app)
const io=new Server(server)

app.use(express.static("public"))

let players=[]
let turn=0

const MAX_PLAYERS=10

io.on("connection",(socket)=>{

socket.on("join",(name)=>{

if(players.length>=MAX_PLAYERS) return

players.push({
id:socket.id,
name:name,
cards:[],
uno:false
})

io.emit("players",players)

})

socket.on("chat",(msg)=>{
io.emit("chat",msg)
})

socket.on("uno",(id)=>{

let p=players.find(x=>x.id===id)

if(p) p.uno=true

})

socket.on("endTurn",()=>{

turn++

if(turn>=players.length)
turn=0

io.emit("turn",turn)

})

socket.on("disconnect",()=>{

players=players.filter(p=>p.id!==socket.id)

io.emit("players",players)

})

})

server.listen(3000,()=>{
console.log("1LAI server running")
})