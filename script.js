let cases = document.querySelectorAll('.case')
let pjoueur = document.getElementById('tourjoueur')
let turnindic = document.getElementById('turnindic')
let victorymessage = document.getElementById('victorymessage')
let case1 = document.getElementById('0')
let case2 = document.getElementById('1')
let case3 = document.getElementById('2')
let case4 = document.getElementById('3')
let case5 = document.getElementById('4')
let case6 = document.getElementById('5')
let case7 = document.getElementById('6')
let case8 = document.getElementById('7')
let case9 = document.getElementById('8')

let casesRemplies = 0
let currentPlayer = 1
pjoueur.innerHTML = "Au tour du joueur 1</br><span id='turnindicX'>X</span>"

let partie = [0, 0, 0, 0, 0, 0, 0, 0, 0]

cases.forEach(element => {
    element.addEventListener("click", function(){
        if(currentPlayer == 1 && !element.classList.contains('locked'))
        {
            playCase(element.id, 1)
            pjoueur.innerHTML = "Au tour du joueur 2</br><span id='turnindicO'>O</span>"
            casesRemplies++;           
            isWin = testVictory()
            currentPlayer = 2
            if(!isWin){
                setTimeout(playAI, 1000)
            }
        }
    }); 
});


function playAI(){
    var availableCase = []
    for (let index = 0; index <= 8; index++) {
        if(partie[index] == 0){
            availableCase.push(index)          
        }        
    }
    console.log(availableCase)
    randomcase = Math.floor(Math.random() * availableCase.length);
    playCase(availableCase[randomcase], 2)
    pjoueur.innerHTML = "Au tour du joueur 1</br><span id='turnindicX'>X</span>"
    casesRemplies++;   
    testVictory()
    currentPlayer = 1
}

function clearGame(){
    cases.forEach(element => {            
            element.innerHTML = "";
            document.getElementById(element.id).style.color = "black";
            currentPlayer = 1;
            element.classList.remove("locked");
            pjoueur.innerHTML = "Au tour du joueur 1</br><span id='turnindicX'>X</span>"
            casesRemplies = 0
            partie = [0, 0, 0, 0, 0, 0, 0, 0, 0]
            victorymessage.innerHTML = ""
    })
}


function playCase(number, player){
    if(player == 1)
    {
        let playedCase = document.getElementById(number)
        playedCase.style.color = "red"
        playedCase.innerHTML = "X"
        playedCase.classList.add("locked")
        partie[number] = 1
    }
    else if(player == 2)
    {
        let playedCase = document.getElementById(number)
        partie[number] = 2
        console.log(playedCase)
        playedCase.style.color = "blue"
        playedCase.innerHTML = "O"
        playedCase.classList.add("locked")       
    }
}



function testVictory(){
    if((partie[0] == partie[1] && partie[1] == partie[2] && partie[0] > 0) || 
       (partie[3] == partie[4] && partie[4] == partie[5] && partie[3] > 0) ||
       (partie[6] == partie[7] && partie[7] == partie[8] && partie[6] > 0) ||
       (partie[0] == partie[3] && partie[3] == partie[6] && partie[0] > 0) ||
       (partie[1] == partie[4] && partie[4] == partie[7] && partie[1] > 0) ||
       (partie[2] == partie[5] && partie[5] == partie[8] && partie[2] > 0) ||
       (partie[0] == partie[4] && partie[4] == partie[8] && partie[0] > 0) ||
       (partie[2] == partie[4] && partie[4] == partie[6] && partie[2] > 0))
    {
        if(currentPlayer==1){
            victorymessage.innerHTML = `👤 Le joueur gagne la partie !`
        }
        else{
            victorymessage.innerHTML = `🖥️ L'IA gagne la partie !`
        }
        lockGame();
        return true
    } 
    else if(casesRemplies == 9){
        victorymessage.innerHTML = `Égalité !`;
        lockGame(); 
        return true       
    }
    return false
} 

function lockGame(){
    cases.forEach(element => {
            element.classList.add("locked");
    })
}

