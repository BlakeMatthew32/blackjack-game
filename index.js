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

let playersCards = []
let dealersCards = []
let sum = 0
let hasBlackJack = false
let bust = true
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

// html buttons
const settingsBtn = document.getElementById("settings-btn")
const playBtn = document.getElementById("play-btn")
const incrementBtn = document.getElementById("increment-btn")
const decrementBtn = document.getElementById("decrement-btn")
const hitBtn = document.getElementById("hit-btn")
const stickBtn = document.getElementById("stick-btn")

// cards displays
const playerCardDiv = document.getElementById("player-cards")
const dealerCardDiv = document.getElementById("dealer-cards")

// player info 
let player = {
    name: "BLAKE",
    chips: 200
}

const playerName = document.getElementById("player-name")
const playerchips = document.getElementById("player-name")

// bet control
const minBet = 5;
const maxBet = 100;
let currentBet = 5;
const betAmount = document.getElementById("bet-amount")

incrementBtn.addEventListener("click", () => {
    if(currentBet < maxBet) {
        currentBet += 5;
    }
    betAmount.textContent = `Bet: ${currentBet}`
})

decrementBtn.addEventListener("click", () => {
    if(currentBet > minBet) {
        currentBet -= 5;
    }
    betAmount.textContent = `Bet: ${currentBet}`
})

// play game

playBtn.addEventListener("click", () => {
    playerCardDiv.innerHTML = ""
    bust = false
    let cardNum1 = getRandomCard()
    let cardNum2 = getRandomCard()
    playersCards = [cardsArray[cardNum1], cardsArray[cardNum2]]
    sum = cardValues(cardNum1) + cardValues(cardNum2)
    console.log(sum)
    renderGame()
})

// function startGame() {
//     bust = false
//     let cardNum1 = getRandomCard()
//     let cardNum2 = getRandomCard()
//     playersCards = [cardsArray[cardNum1], cardsArray[cardNum2]]
//     sum = cardValues(cardNum1) + cardValues(cardNum2)
//     renderGame()
// }

function renderGame() {
    for (let i = 0; i < playersCards.length; i++) {
        let img = document.createElement("img")
        img.src = playersCards[i]
        playerCardDiv.appendChild(img)
    }
}

function newCard() {
    if (bust === false && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        playersCards.push(card)
        renderGame()        
    }
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