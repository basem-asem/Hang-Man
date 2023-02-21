console.log("Hello Basem");

let el = document.querySelector(".scroller");
let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
window.addEventListener("scroll", () => {
    let scrollTop = document.documentElement.scrollTop;
    let pes = ((scrollTop / height) * 100);
    el.style.width = `${pes}%` ;
});

//letters
const letters = "abcdefghijklmnopqrstuvwxyz";
//Get Array from letters
let lettersArray = Array.from(letters);
//Select letters container
let lettersContainer = document.querySelector(".letters")

// Generate letters
lettersArray.forEach(letter => {
    //creat span
    let span = document.createElement("span");
    //create letter text node
    let theletter = document.createTextNode(letter)
    //apend the letters
    span.appendChild(theletter);
    //add class on span 
    span.className = 'letter-box';
    lettersContainer.appendChild(span);
});

// object of words + categories
const words = {
    programming:["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies:["prestige", "Inception", "Parasite", "Interstellar", "whiplash", "memento", "coco", "up"],
    people:["Albert Einstein", "Hitchcock", "Alexander", "cleopatra", "Mahata Ghandi"],
    countries:["Syria", "Palastine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}
// fetch("JS/hangman.json").then((result) => {
//     let word = result.json();
//     return word;
// }).then((word) => {
//     console.log(word);
//     return word
// }).then((words) => {

// Get random property 
let allKeys = Object.keys(words);
//random numberr depend on keys length
let randomNumber = Math.floor(Math.random() * allKeys.length);
//category
let randomPropName = allKeys[randomNumber];
// category words
let randomPropValue = words[randomPropName];
//random number depend on words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
// the chosen word
let randomWord = randomPropValue[randomValueNumber]; 
//set category info
document.querySelector(".game-info .category span").innerHTML = randomPropName ;

//select letters guess element 
let letterGuess = document.querySelector(".letters-guess");

// convert chosen word to arrray
let lettersAndSpace = Array.from(randomWord.toLowerCase());
//create span depend on word 
lettersAndSpace.forEach(letter => {
    //create Empty span
    let emptySpan = document.createElement("span");
    //if letter to space
    if (letter === ' ') {
        emptySpan.className = 'with-space';
    }
    //append span to letters geuss
    letterGuess.appendChild(emptySpan);
});

//select guess spans
let guessSpan = document.querySelectorAll(".letters-guess span");
//set right attempt
let rightAttempt =0;
//set wrong attempts
let wrongAttempt = 0;
//select the draw element
let theDraw = document.querySelector(".hangman-draw");

//handle clicking on letters
document.addEventListener("click", (e) => {
    //set the chose status
    let theStatus = false;
    if (e.target.className === 'letter-box') {
        e.target.classList.add("clicked");
        //get clicked letter
        let clickedLetter = e.target.innerHTML.toLowerCase();
        //chosen word
        lettersAndSpace.forEach((wordLetter, wordindex) => {
            //if the clicked letter equal to the chosen word
            if (clickedLetter == wordLetter) {
                rightAttempt++;
                //set Status to correct
                theStatus =true;
                
                //loop on all guess span
                guessSpan.forEach((span, spanIndex) => {
                    if (wordindex === spanIndex) {
                        span.innerHTML = clickedLetter;
                    }
                });
            }
        });
        //out the loop
        //console.log(rightAttempt);
        //if letter was wrong
        if (theStatus!==true) {
            //increase the wrong attempt 
            wrongAttempt++;
            //add class wrong on the draw element
            theDraw.classList.add(`wrong-${wrongAttempt}`);
            //play fail sound
            document.getElementById("fail").play();
            if(wrongAttempt === 8) {
                endGame();
                lettersContainer.classList.add("finished")
            }
        } else {
            document.getElementById("success").play();
        }
        if(lettersAndSpace.length === rightAttempt){
            winGame();
            lettersContainer.classList.add("finished")
        }
        //console.log(rightAttempt)
    }
});
//endGame function
function endGame() {
    //create popup div
    let div = document.createElement("div");
    //create text
    let divText = document.createTextNode(`Game Over, The Word Is ${randomWord}`);
    //append text to div
    div.appendChild(divText);
    //add class on div
    div.className = 'popup'
    //append to body
    document.body.appendChild(div);
}
function winGame(){
    //create popup div
    let div = document.createElement("div");
    //create text
    let divText = document.createTextNode(`Winner`);
    //append text to div
    div.appendChild(divText);
    //add class on div
    div.className = 'winner'
    //append to body
    document.body.appendChild(div);
}
// })