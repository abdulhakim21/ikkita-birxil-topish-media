const cards = document.querySelectorAll(".card"),
    modal = document.querySelector(".modal"),
    modal1 = document.querySelector(".modal1"),
    playAgain = document.querySelector(".play-again"),
    playAgain1 = document.querySelector(".play-again1"),
    dont = document.querySelector(".details b"),
    refresh = document.querySelector(".details button");

let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;
let i = 0;

function flipCard(e) {
    let clickedCard = e.target;
    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;

        let cardOneImg = cardOne.querySelector("img").src,
            cardTwoImg = cardTwo.querySelector("img").src;
        matchCards(cardOneImg, cardTwoImg)
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matchedCard++;
        if (matchedCard == 8) {
            setTimeout(() => {
                modal.style.display = "block";
            }, 500);

            return shuffleCard();
        }
        cardOne.removeEventListener("click", flipCard)
        cardTwo.removeEventListener("click", flipCard)
        cardOne = cardTwo = "";
        return disableDeck = false;
    } else if (img1 !== img2) {
        i++;
        dont.innerText = i;
        if (i === 10) {
            setTimeout(() => {
                modal1.style.display = "block";
            }, 1400);
        }
        setTimeout(() => {
            cardOne.classList.add("shake"),
                cardTwo.classList.add("shake");
        }, 400);

        setTimeout(() => {
            cardOne.classList.remove("shake", 'flip'),
                cardTwo.classList.remove("shake", 'flip');
            cardOne = cardTwo = "";
            disableDeck = false;
        }, 1200);
        console.log(i);
    }
}


function shuffleCard() {
    matchedCard = 0;
    cardOne = cardTwo = "";
    disableDeck = false;
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, ]
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = `img/img-${arr[index]}.png`
        card.addEventListener('click', flipCard)
    })
}

shuffleCard()

playAgain.addEventListener('click', () => {
    // shuffleCard
    location.reload();

    modal.style.display = "none";
})

playAgain1.addEventListener('click', () => {
    // shuffleCard
    location.reload();

    modal1.style.display = "none";
})
console.log(modal1);

cards.forEach(card => {
    setTimeout(() => {
        card.classList.add("flip");
    }, 300);

    setTimeout(() => {
        card.classList.remove("flip");
    }, 1000);

    card.addEventListener('click', flipCard)
})

refresh.addEventListener('click', () => location.reload())