function createDeck(){

let colors=["red","blue","green","yellow"]

let deck=[]

colors.forEach(color=>{

for(let i=0;i<=9;i++){

deck.push({color,value:i})

}

deck.push({color,value:"+2"})
deck.push({color,value:"skip"})

})

deck.push({color:"black",value:"+4"})
deck.push({color:"black",value:"swap"})
deck.push({color:"black",value:"redistribute"})

return shuffle(deck)

}

function shuffle(array){

for(let i=array.length-1;i>0;i--){

let j=Math.floor(Math.random()*(i+1))

[array[i],array[j]]=[array[j],array[i]]

}

return array

}