let cases = document.querySelectorAll('.case')
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
let title = document.getElementById("grid")
let title4 = document.getElementById("grid4x4")
let resetBtn = document.getElementById("resetBtn")
let easyBtn = document.getElementById("easy")
let normalBtn = document.getElementById("normal")
let hardBtn = document.getElementById("hard")
let difficultyTitle = document.getElementById("diffTitle")

let casesRemplies = 0
let currentPlayer = 1
let gridSize = 3
let partie = [0, 0, 0, 0, 0, 0, 0, 0, 0]
let nbIndex = 0

let selectedDifficulty = "unselected"



cases.forEach(element => {
    element.addEventListener("click", function(){
        if(currentPlayer == 1 && !element.classList.contains('locked'))
        {
            playCase(element.id, 1)
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
    var randomCase = true
    if(gridSize == 3){
        nbIndexMin = 0
        nbIndexMax = 8
    }
    if(gridSize == 4){
        nbIndexMin = 9
        nbIndexMax = 24
    }
    for (let index = nbIndexMin; index <= nbIndexMax; index++) {
        if(gridSize == 3){
            if(partie[index] == 0){
                availableCase.push(index)          
            }
        }
        else{
            if(partie[index-9] == 0){
                availableCase.push(index)          
            }            
        }
        
    }
    if(selectedDifficulty == "hard" || selectedDifficulty == "normal"){
        if(casesRemplies == 1 && gridSize == 3 && selectedDifficulty == "hard"){
            if(partie[0] == 1 || partie[2] == 1 || partie[5] == 1 || partie[8] == 1){
                console.log("Jouer au milieu")
                randomCase = false
                winnable = 4
                playCase(winnable, 2)
            }
            else if(partie[4] == 1){
                console.log("Jouer dans le corner")
                randomCase = false
                winnable = 0
                playCase(winnable, 2)
            }
            else{
                console.log("Jouer dans le milieu car aucun contre")
                randomCase = false
                winnable = 4
                playCase(winnable, 2)
            }
        }

        if(casesRemplies == 0 && gridSize == 3 && selectedDifficulty == "hard"){
            console.log("Jouer au milieu")
            playCase(4, 2)
            randomCase = false
        }

        if(randomCase){
            if(gridSize == 4){
                winnable = simulateVictory4x4()
            }
            else{
                winnable = simulateVictory()
            }
            randomcase = Math.floor(Math.random() * availableCase.length);
            if(winnable == -1){
                playCase(availableCase[randomcase], 2)
            }
            else{
                playCase(winnable, 2)
            }
        }
        casesRemplies++; 
        randomCase = true
    }
    else{
        randomcase = Math.floor(Math.random() * availableCase.length);
        playCase(availableCase[randomcase], 2)
        casesRemplies++;
    }
    testVictory()
    currentPlayer = 1
}

function clearGame(){
    cases.forEach(element => {            
            element.innerHTML = "";
            document.getElementById(element.id).style.color = "black";
            document.getElementById(element.id).style.backgroundColor = "";
            currentPlayer = 1;
            element.classList.remove("locked");
            casesRemplies = 0
            if(gridSize == 3){partie = [0, 0, 0, 0, 0, 0, 0, 0, 0]}
            if(gridSize == 4){partie = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
            
            victorymessage.innerHTML = ""
    })
}


function playCase(number, player){
    if(gridSize == 3){
        if(player == 1)
        {
            let playedCase = document.getElementById(number)
            playedCase.style.color = "red"
            playedCase.style.backgroundColor = "rgba(255, 0, 0, 0.4)"
            playedCase.style.textShadow = "0 0 4px red, 0 0 2px red"
            playedCase.innerHTML = "X"
            playedCase.classList.add("locked")
            partie[number] = 1
        }
        else if(player == 2)
        {
            let playedCase = document.getElementById(number)
            partie[number] = 2
            playedCase.style.color = "blue"
            playedCase.style.backgroundColor = "rgba(0, 0, 255, 0.4)"
            playedCase.style.textShadow = "0 0 4px blue, 0 0 2px blue"
            playedCase.innerHTML = "O"
            playedCase.classList.add("locked")       
        }
    }
    if(gridSize == 4){
        if(player == 1)
        {
            let playedCase = document.getElementById(number)
            playedCase.style.color = "red"
            playedCase.style.backgroundColor = "rgba(255, 0, 0, 0.4)"
            playedCase.style.textShadow = "0 0 4px red, 0 0 2px red"
            playedCase.innerHTML = "X"
            playedCase.classList.add("locked")
            playnumber = number-9
            partie[playnumber] = 1
            console.log(partie)
        }
        else if(player == 2)
        {
            console.log(number)
            let playedCase = document.getElementById(number)
            playnumber = number-9
            partie[playnumber] = 2
            playedCase.style.color = "blue"
            playedCase.style.backgroundColor = "rgba(0, 0, 255, 0.4)"
            playedCase.style.textShadow = "0 0 4px blue, 0 0 2px blue"
            playedCase.innerHTML = "O"
            playedCase.classList.add("locked")
            console.log(partie)       
        }
    }

}


function simulateVictory(){
    var tempPartie = partie;
    var nb = 0
    var winnable = -1
    var priority = 0
    nonPlayed = []
    tempPartie.forEach(function callback(element, index){
        if(element == 0){
            nonPlayed.push(index)
        }
    })
    nonPlayed.forEach(element => {
        tempPartie[element] = 1
        if((tempPartie[0] == tempPartie[1] && tempPartie[1] == tempPartie[2] && tempPartie[0] == 1) || 
           (tempPartie[3] == tempPartie[4] && tempPartie[4] == tempPartie[5] && tempPartie[3] == 1) ||
           (tempPartie[6] == tempPartie[7] && tempPartie[7] == tempPartie[8] && tempPartie[6] == 1) ||
           (tempPartie[0] == tempPartie[3] && tempPartie[3] == tempPartie[6] && tempPartie[0] == 1) ||
           (tempPartie[1] == tempPartie[4] && tempPartie[4] == tempPartie[7] && tempPartie[1] == 1) ||
           (tempPartie[2] == tempPartie[5] && tempPartie[5] == tempPartie[8] && tempPartie[2] == 1) ||
           (tempPartie[0] == tempPartie[4] && tempPartie[4] == tempPartie[8] && tempPartie[0] == 1) ||
           (tempPartie[2] == tempPartie[4] && tempPartie[4] == tempPartie[6] && tempPartie[2] == 1))
        {
            if(priority != 3000){
                priority = 1000
                winnable = element
            }
            
        }
        
        tempPartie[element] = 2
        if((tempPartie[0] == tempPartie[1] && tempPartie[1] == tempPartie[2] && tempPartie[0] == 2) || 
           (tempPartie[3] == tempPartie[4] && tempPartie[4] == tempPartie[5] && tempPartie[3] == 2) ||
           (tempPartie[6] == tempPartie[7] && tempPartie[7] == tempPartie[8] && tempPartie[6] == 2) ||
           (tempPartie[0] == tempPartie[3] && tempPartie[3] == tempPartie[6] && tempPartie[0] == 2) ||
           (tempPartie[1] == tempPartie[4] && tempPartie[4] == tempPartie[7] && tempPartie[1] == 2) ||
           (tempPartie[2] == tempPartie[5] && tempPartie[5] == tempPartie[8] && tempPartie[2] == 2) ||
           (tempPartie[0] == tempPartie[4] && tempPartie[4] == tempPartie[8] && tempPartie[0] == 2) ||
           (tempPartie[2] == tempPartie[4] && tempPartie[4] == tempPartie[6] && tempPartie[2] == 2))
        {
            winnable = element
            priority = 3000
            tempPartie[element] = 1
        }
        tempPartie[element] = 0
    })

    if (winnable != -1){
        return winnable
    }
    else{
        return -1
    }
    
}






function simulateVictory4x4(){
    var tempPartie = partie;
    var nb = 0
    var winnable = -1
    var priority = 0
    nonPlayed = []
    tempPartie.forEach(function callback(element, index){
        if(element == 0){
            nonPlayed.push(index)
        }
    })
    nonPlayed.forEach(element => {
        tempPartie[element] = 1
        if((tempPartie[0] == tempPartie[1] && tempPartie[1] == tempPartie[2] && tempPartie[2] == tempPartie[3] && tempPartie[0] == 1) || 
        (tempPartie[4] == tempPartie[5] && tempPartie[5] == tempPartie[6] && tempPartie[6] == tempPartie[7] && tempPartie[4] == 1) ||
        (tempPartie[8] == tempPartie[9] && tempPartie[9] == tempPartie[10] && tempPartie[10] == tempPartie[11] && tempPartie[8] == 1) ||
        (tempPartie[12] == tempPartie[13] && tempPartie[13] == tempPartie[14] && tempPartie[14] == tempPartie[15] && tempPartie[12] == 1) ||
        (tempPartie[0] == tempPartie[4] && tempPartie[4] == tempPartie[8] && tempPartie[8] == tempPartie[12] && tempPartie[0] == 1) ||
        (tempPartie[1] == tempPartie[5] && tempPartie[5] == tempPartie[9] && tempPartie[9] == tempPartie[13] && tempPartie[1] == 1) ||
        (tempPartie[2] == tempPartie[6] && tempPartie[6] == tempPartie[10] && tempPartie[10] == tempPartie[14] && tempPartie[2] == 1) ||
        (tempPartie[3] == tempPartie[7] && tempPartie[7] == tempPartie[11] && tempPartie[11] == tempPartie[15] && tempPartie[3] == 1) ||
        (tempPartie[0] == tempPartie[5] && tempPartie[5] == tempPartie[10] && tempPartie[10] == tempPartie[15] && tempPartie[0] == 1) ||
        (tempPartie[3] == tempPartie[6] && tempPartie[6] == tempPartie[9] && tempPartie[9] == tempPartie[12] && tempPartie[3] == 1))
        {
            if(priority != 3000){
                priority = 1000
                winnable = element
            }
            
        }
        
        tempPartie[element] = 2
        if((tempPartie[0] == tempPartie[1] && tempPartie[1] == tempPartie[2] && tempPartie[2] == tempPartie[3] && tempPartie[0] == 2) || 
        (tempPartie[4] == tempPartie[5] && tempPartie[5] == tempPartie[6] && tempPartie[6] == tempPartie[7] && tempPartie[4] == 2) ||
        (tempPartie[8] == tempPartie[9] && tempPartie[9] == tempPartie[10] && tempPartie[10] == tempPartie[11] && tempPartie[8] == 2) ||
        (tempPartie[12] == tempPartie[13] && tempPartie[13] == tempPartie[14] && tempPartie[14] == tempPartie[15] && tempPartie[12] == 2) ||
        (tempPartie[0] == tempPartie[4] && tempPartie[4] == tempPartie[8] && tempPartie[8] == tempPartie[12] && tempPartie[0] == 2) ||
        (tempPartie[1] == tempPartie[5] && tempPartie[5] == tempPartie[9] && tempPartie[9] == tempPartie[13] && tempPartie[1] == 2) ||
        (tempPartie[2] == tempPartie[6] && tempPartie[6] == tempPartie[10] && tempPartie[10] == tempPartie[14] && tempPartie[2] == 2) ||
        (tempPartie[3] == tempPartie[7] && tempPartie[7] == tempPartie[11] && tempPartie[11] == tempPartie[15] && tempPartie[3] == 2) ||
        (tempPartie[0] == tempPartie[5] && tempPartie[5] == tempPartie[10] && tempPartie[10] == tempPartie[15] && tempPartie[0] == 2) ||
        (tempPartie[3] == tempPartie[6] && tempPartie[6] == tempPartie[9] && tempPartie[9] == tempPartie[12] && tempPartie[3] == 2))
        {
            winnable = element
            priority = 3000
            tempPartie[element] = 1
        }
        tempPartie[element] = 0
    })

    if (winnable != -1){
        console.log(winnable+9)
        return winnable+9
    }
    else{
        return -1
    }
    
}


function testVictory(){
    if(gridSize == 3){
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
                victorymessage.innerHTML = `Le joueur gagne la partie !`
                victorymessage.style.color = "lightgreen"
            }
            else{
                victorymessage.innerHTML = `L'IA gagne la partie !`
                victorymessage.style.color = "red"
            }
            lockGame();
            return true
        } 
        else if(casesRemplies == 9){
            victorymessage.innerHTML = `Égalité !`;
            victorymessage.style.color = "blue"
            lockGame(); 
            return true       
        }
        return false
    }

    else{
        if((partie[0] == partie[1] && partie[1] == partie[2] && partie[2] == partie[3] && partie[0] > 0) || 
        (partie[4] == partie[5] && partie[5] == partie[6] && partie[6] == partie[7] && partie[4] > 0) ||
        (partie[8] == partie[9] && partie[9] == partie[10] && partie[10] == partie[11] && partie[8] > 0) ||
        (partie[12] == partie[13] && partie[13] == partie[14] && partie[14] == partie[15] && partie[12] > 0) ||
        (partie[0] == partie[4] && partie[4] == partie[8] && partie[8] == partie[12] && partie[0] > 0) ||
        (partie[1] == partie[5] && partie[5] == partie[9] && partie[9] == partie[13] && partie[1] > 0) ||
        (partie[2] == partie[6] && partie[6] == partie[10] && partie[10] == partie[14] && partie[2] > 0) ||
        (partie[3] == partie[7] && partie[7] == partie[11] && partie[11] == partie[15] && partie[3] > 0) ||
        (partie[0] == partie[5] && partie[5] == partie[10] && partie[10] == partie[15] && partie[0] > 0) ||
        (partie[3] == partie[6] && partie[6] == partie[9] && partie[9] == partie[12] && partie[3] > 0)){
            
            if(currentPlayer==1){
                victorymessage.innerHTML = `👤 Le joueur gagne la partie !`
                victorymessage.style.color = "green"
            }
            else{
                victorymessage.innerHTML = `🖥️ L'IA gagne la partie !`
                victorymessage.style.color = "red"
            }
            lockGame();
            return true
        } 
        else if(casesRemplies == 16){
            victorymessage.innerHTML = `Égalité !`;
            victorymessage.style.color = "blue"
            lockGame(); 
            return true       
        }
        return false            
        }
    }


function lockGame(){
    cases.forEach(element => {
            element.classList.add("locked");
    })
}

function hideGame(){
    title.style.display = "none"
    resetBtn.style.display = "none"
    title4.style.display = "none"

}

function showGame(difficulty){
    selectedDifficulty = difficulty
    if(gridSize == 3){
        title.style.display = "grid"
    }
    else{
        title4.style.display = "grid"
    }
    
    easyBtn.style.display = "none"
    normalBtn.style.display = "none"
    hardBtn.style.display = "none"
    difficultyTitle.style.display = "none"
    whoBegin = document.getElementById("whoBegin")
    whoBeginTitle = document.getElementById("whoBeginTitle")
    selecsize = document.getElementById("sizeChange")
    selecsizetitle = document.getElementById("sizeTitle")
    selecsize.style.display = "none"
    selecsizetitle.style.display = "none"
    whoBegin.style.display = "none"
    whoBeginTitle.style.display = "none"
    resetBtn.style.display = "block"
    if(currentPlayer == 2){
        setTimeout(playAI, 1000)
    }
}

function changeFirstPlayer(playerSelected){
    let whobeginX = document.getElementById("whobeginX")
    let whobeginO = document.getElementById("whobeginO")
    if(playerSelected == 1){
        whobeginX.style.borderColor = "white"
        whobeginO.style.borderColor = "black"
        currentPlayer = 1
    }
    if(playerSelected == 2){
        whobeginX.style.borderColor = "black"
        whobeginO.style.borderColor = "white"
        currentPlayer = 2
    }
}

function changeGridSize(sizeSelected){
    let whobeginX = document.getElementById("size3")
    let whobeginO = document.getElementById("size4")
    if(sizeSelected == 3){
        whobeginX.style.borderColor = "white"
        whobeginO.style.borderColor = "black"
        gridSize = 3
    }
    if(sizeSelected == 4){
        whobeginX.style.borderColor = "black"
        whobeginO.style.borderColor = "white"
        gridSize = 4
        partie = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
}

hideGame()

