document.addEventListener("DOMContentLoaded", function() {
    let round = 1;
    const winningScore = 21;
    const cards = [6,7,8,9,10,2,3,4,11];

    const startGameButton = document.getElementById("startGame");
    const resultElement = document.getElementById("result");

    const playerCardElement = document.getElementById("playerCard");
    const computerCardElement = document.getElementById("computerCard");

    let playerScoreElement = document.getElementById("playerScore");
    let computerScoreElement = document.getElementById("computerScore");


    startGameButton.addEventListener("click", startGame);

    let playerName;
    do {
        playerName = prompt("Please enter your name", "Player1");
        if (!playerName) {
            alert("Name cannot be empty. Please enter a valid name.");
        }
    } while (!playerName)


    const playerNameElement = document.getElementById("playerName");
    playerNameElement.textContent = playerName;

    function startGame() {
        fadeTransition();
        document.getElementById("roundNum").textContent = "Round: " + round;
        if (round<=3){
        playerCardElement.src=getRandomImagePath();
        computerCardElement.src=getRandomImagePath();
        compare();
        round++;
        }
        else {
            endGame();
        }
    }
    function getRandomImagePath(){
        const randomIndex = Math.floor(Math.random() * cards.length);
        const randomCard = cards[randomIndex];
        return `imgs/${randomCard}.png`;
    }
    function compare() {
        let playerCardNumber = playerCardElement.src.match(/\/(\d+)\.png/);
        if (playerCardNumber){
            playerCardNumber=parseInt(playerCardNumber[1],10);
            playerScoreElement.textContent=parseInt(playerScoreElement.textContent,10) + playerCardNumber;
        }
        let computerCardNumber = computerCardElement.src.match(/\/(\d+)\.png/);
        if (computerCardNumber){
            computerCardNumber=parseInt(computerCardNumber[1],10);
            computerScoreElement.textContent=parseInt(computerScoreElement.textContent,10) + computerCardNumber;
        }
    }

    function endGame() {
        let winner;
        if (parseInt(playerScoreElement.textContent) >= parseInt(computerScoreElement.textContent)) {
            winner = 'player';
            document.getElementById('playerDiv').style.backgroundColor = "#45A049FF";
            document.getElementById('computerDiv').style.backgroundColor = "red";
            resultElement.textContent = "Congratulations! You win the game!";
            document.getElementById("roundNum").textContent = "Round: ";
        } else {
            winner = 'computer';
            document.getElementById('computerDiv').style.backgroundColor = "#45A049FF";
            document.getElementById('playerDiv').style.backgroundColor = "red";
            resultElement.textContent = "Computer wins the game. Try again!";
            document.getElementById("roundNum").textContent = "Round: ";
        }

        let compareArrow = document.getElementById('compareArrow');
        compareArrow.style.transform = winner === 'player' ? 'rotate(810deg)' : 'rotate(-810deg)';

        startGameButton.removeEventListener("click", startGame);
        startGameButton.disabled = true;
    }
    function fadeTransition() {
        playerCardElement.classList.add("fade-transition");
        computerCardElement.classList.add("fade-transition");


        setTimeout(() => {
            playerCardElement.classList.remove("fade-transition");
            computerCardElement.classList.remove("fade-transition");
        }, 300);
    }
});
