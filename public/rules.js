function canPlay(card,table){

if(card.color===table.color)
return true

if(card.value===table.value)
return true

if(card.color==="black")
return true

return false

}

function canWin(card){

let specials=["+4","swap","redistribute"]

return !specials.includes(card.value)

}