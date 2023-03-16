// variables
let cardsArray = [
    "images/PNG-cards/ace_of_clubs.png",
    "images/PNG-cards/2_of_clubs.png",
    "images/PNG-cards/3_of_clubs.png",
    "images/PNG-cards/4_of_clubs.png",
    "images/PNG-cards/5_of_clubs.png",
    "images/PNG-cards/6_of_clubs.png",
    "images/PNG-cards/7_of_clubs.png",
    "images/PNG-cards/8_of_clubs.png",
    "images/PNG-cards/9_of_clubs.png",
    "images/PNG-cards/10_of_clubs.png",
    "images/PNG-cards/jack_of_clubs.png",
    "images/PNG-cards/queen_of_clubs.png",
    "images/PNG-cards/king_of_clubs.png",
    "images/PNG-cards/ace_of_hearts.png",
    "images/PNG-cards/2_of_hearts.png",
    "images/PNG-cards/3_of_hearts.png",
    "images/PNG-cards/4_of_hearts.png",
    "images/PNG-cards/5_of_hearts.png",
    "images/PNG-cards/6_of_hearts.png",
    "images/PNG-cards/7_of_hearts.png",
    "images/PNG-cards/8_of_hearts.png",
    "images/PNG-cards/9_of_hearts.png",
    "images/PNG-cards/10_of_hearts.png",
    "images/PNG-cards/jack_of_hearts.png",
    "images/PNG-cards/queen_of_hearts.png",
    "images/PNG-cards/king_of_hearts.png",
    "images/PNG-cards/ace_of_spades.png",
    "images/PNG-cards/2_of_spades.png",
    "images/PNG-cards/3_of_spades.png",
    "images/PNG-cards/4_of_spades.png",
    "images/PNG-cards/5_of_spades.png",
    "images/PNG-cards/6_of_spades.png",
    "images/PNG-cards/7_of_spades.png",
    "images/PNG-cards/8_of_spades.png",
    "images/PNG-cards/9_of_spades.png",
    "images/PNG-cards/10_of_spades.png",
    "images/PNG-cards/jack_of_spades.png",
    "images/PNG-cards/queen_of_spades.png",
    "images/PNG-cards/king_of_spades.png",
    "images/PNG-cards/ace_of_diamonds.png",
    "images/PNG-cards/2_of_diamonds.png",
    "images/PNG-cards/3_of_diamonds.png",
    "images/PNG-cards/4_of_diamonds.png",
    "images/PNG-cards/5_of_diamonds.png",
    "images/PNG-cards/6_of_diamonds.png",
    "images/PNG-cards/7_of_diamonds.png",
    "images/PNG-cards/8_of_diamonds.png",
    "images/PNG-cards/9_of_diamonds.png",
    "images/PNG-cards/10_of_diamonds.png",
    "images/PNG-cards/jack_of_diamonds.png",
    "images/PNG-cards/queen_of_diamonds.png",
    "images/PNG-cards/king_of_diamonds.png"
]

// player info 
let player = {
    name: "Player",
    chips: 200
}

// gameplay variables
const minBet = 5
const maxBet = 100
let currentBet = 5

// player variables 
let playersCards = []
let playerSum = 0
let playerBlackJack = false
let playerBust = false
let stick = false

// dealer variables
let dealersCards = []
let dealerSum = 0
let dealerBlackJack = false
let dealerBust = false

// html buttons
const settingsBtn = document.getElementById("settings-btn")
const playBtn = document.getElementById("play-btn")
const incrementBtn = document.getElementById("increment-btn")
const decrementBtn = document.getElementById("decrement-btn")
const hitBtn = document.getElementById("hit-btn")
const stickBtn = document.getElementById("stick-btn")

// html elements
const playerName = document.getElementById("player-name")
const playerChips = document.getElementById("player-chips")
const betAmount = document.getElementById("bet-amount")
const playerCardDiv = document.getElementById("player-cards")
const dealerCardDiv = document.getElementById("dealer-cards")
const winDisplay = document.getElementById("win-display")

// initial state

function initChips() {
    playerName.textContent = player.name
    playerChips.textContent = `Chips: ${player.chips}`
}

initChips()

// bet control
incrementBtn.addEventListener("click", () => {
    if(currentBet < maxBet) {
        currentBet += 5
    }
    betAmount.textContent = `Bet: ${currentBet}`
})

decrementBtn.addEventListener("click", () => {
    if(currentBet > minBet) {
        currentBet -= 5
    }
    betAmount.textContent = `Bet: ${currentBet}`
})

// play game

playBtn.addEventListener("click", () => {
    if (player.chips < minBet) {
        winDisplay.innerText = "Add more chips to play!"
    }
    else if (player.chips < currentBet) {
        winDisplay.innerText = "Not enough chips to play!"
    } else {
        player.chips -= currentBet
        initChips()
        winDisplay.textContent = ""  
        dealersCards = []
        bust = false
        stick = false
        let cardNum1 = getRandomCard()
        let cardNum2 = getRandomCard()
        playersCards = [cardsArray[cardNum1], cardsArray[cardNum2]]
        playerSum = cardValues(cardNum1) + cardValues(cardNum2)
        console.log(playerSum)
        playerRenderGame()
        dealerRenderGame()
    }   
})

function playerRenderGame() {
    playerCardDiv.innerHTML = ""
    for (let i = 0; i < playersCards.length; i++) {
        let img = document.createElement("img")
        img.src = playersCards[i]
        playerCardDiv.appendChild(img)
    }
    playerBust = playerSum > 21
    playerBlackJack = playerSum === 21

    if (playerBust) {
        playerLoses("Bust")
    }
}

function dealerRenderGame() {
    dealerCardDiv.innerHTML = ""
    for (let i = 0; i < dealersCards.length; i++) {
        let img = document.createElement("img")
        img.src = dealersCards[i]
        dealerCardDiv.appendChild(img)
    }
    dealerBust = dealerSum > 21
}

// new card function

hitBtn.addEventListener("click", () => {
    if (!playerBust && !playerBlackJack && !stick) {
        let cardNum = getRandomCard()
        playerSum += cardValues(cardNum)
        playersCards.push(cardsArray[cardNum])
        playerRenderGame()        
    }
})

stickBtn.addEventListener("click", () => {
    if (!playerBust && !stick) {
        stick = true
        dealerPlays()
    }
})

function dealerPlays() {
    let cardNum1 = getRandomCard()
    let cardNum2 = getRandomCard()
    dealersCards = [cardsArray[cardNum1], cardsArray[cardNum2]]
    dealerSum = cardValues(cardNum1) + cardValues(cardNum2)
    dealerRenderGame()
    while (dealerSum < 17) {
        let cardNum = getRandomCard()
        dealerSum += cardValues(cardNum)
        dealersCards.push(cardsArray[cardNum])
        dealerRenderGame()
    }
    console.log(dealerSum)
    winConditions()
}

// win conditions 

function winConditions() {
    if ((playerSum > dealerSum && !playerBust) || dealerBust) {
        playerWins() 
    }
    if (playerSum < dealerSum && !dealerBust) {
        playerLoses("Lost")
    }
    if (playerSum === dealerSum && !playerBust) {
        draw()
    }
}

function playerWins() {
    player.chips += (currentBet * 2)
    initChips()
    winDisplay.textContent = "You Won!"
}

function playerLoses(lostOrBust) {
    winDisplay.textContent = `You ${lostOrBust}!`
}

function draw() {
    player.chips += currentBet
    initChips()
    winDisplay.textContent = "Chips back!"
}


// utility functions

function getRandomCard() {
    return Math.floor( Math.random()*51 )
}

function cardValues(card) {
    if (card === 0  || card === 13 || card === 26 || card === 39) {
        return 11
    }
    if (card === 1  || card === 14 || card === 27 || card === 40) {
        return 2
    }
    if (card === 2  || card === 15 || card === 28 || card === 41) {
        return 3
    }
    if (card === 3  || card === 16 || card === 29 || card === 42) {
        return 4
    }
    if (card === 4  || card === 17 || card === 30 || card === 43) {
        return 5
    }
    if (card === 5  || card === 18 || card === 31 || card === 44) {
        return 6
    }
    if (card === 6  || card === 19 || card === 32 || card === 45) {
        return 7
    }
    if (card === 7  || card === 20 || card === 33 || card === 46) {
        return 8
    }
    if (card === 8  || card === 21 || card === 34 || card === 47) {
        return 9
    }
    if (card === 9  || card === 22 || card === 35 || card === 48) {
        return 10
    }
    if (card === 10  || card === 23 || card === 36 || card === 49) {
        return 10
    }
    if (card === 11  || card === 24 || card === 37 || card === 50) {
        return 10
    }
    if (card === 12  || card === 25 || card === 38 || card === 51) {
        return 10
    }
}