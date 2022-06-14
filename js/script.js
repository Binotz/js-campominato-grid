// Consegna
// L'utente indica un livello di difficoltà (con un prompt) in base al quale decidiamo il range di numeri possibili del gioco:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.

// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito attraverso dei prompt l'utente inserisce un numero alla volta finche il gioco non è finito:
// se il numero è presente nella lista dei numeri generati, abbiamo calpestato una bomba, il gioco finisce con un messaggio di errore
// Altrimenti il gioco va avanti a meno di aver raggiunto il numero massimo di tentativi possibili. In questo caso il gioco finisce con un messaggio di vittoria.

// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha scelto un numero che non era una bomba.

//raccolta input e dichiarazione variabili
const numberOfBombs = 16;
const userDifficulty = prompt('Inserisci un livello di difficoltà (1-2-3)');
let minesMaxRange = 0;
let gameContinue = true;
let userInput = '';
let userInputHistory = [];
let attempts = 0;
let msg = '';

//imposto il numero di 'mine in base alla difficoltà scelta'
switch (userDifficulty){
    case '1':
        minesMaxRange = 100;
        break;
    case '2':
        minesMaxRange = 81;
        break;
    case '3':
        minesMaxRange = 49;
        break;
    // // debug case, per vittoria facile
    // case '4':
    //     minesMaxRange = 17;
    //     break;
    // // debug case, per vittoria facile        
    // case '5':
    //     minesMaxRange = 20;
    // break;        
    default:
        minesMaxRange = 100;        
}

const bombs = bombsGeneration(numberOfBombs, minesMaxRange);
attempts = minesMaxRange - numberOfBombs;

while(gameContinue){
    //utente inserisce un numero e lu metto nell'elenco dei tentativi, controllando che non abbia già inserito lo stesso valore
    do{
        userInput = parseInt(prompt('inserisci un numero'));
    }while( userInputHistory.includes(userInput) || userInput > minesMaxRange);
    
    //metto il numero in uno storico
    userInputHistory.push(userInput);
    
    // se l'utente inserisce un numero bomba, perde 
    if(bombs.includes(userInput)){
        msg = 'Uh oh! hai beccato una mina!'
        gameContinue = false;
        break;
    }
    // se il numero di tentativi è uguale al numero dei numeri 'non-minati', allora ha vinto
    if(attempts == userInputHistory.length){
        msg = 'Grande! le hai schivate tutte! :D '
        gameContinue = false;
        break;
    }   
}

alert(msg + `\nnumero di tentativi: ${userInputHistory.length}`);




// ----------------------------------------------------------------------------------------------------------------
// Funzioni

//genero la lista delle bombe
//parametri:
// numberOfBombs: int, numero delle bombe da generare
// bombMaxValue: int, valore massimo che una bomba può avere
//return:
// bombs: array con la lista delle bombe
function bombsGeneration(numberOfBombs, bombMaxValue){
    const bombs = [];
    let bomb = 0;
    //finché la lista non è completa, ciclo la lista delle bombe
    while(bombs.length < numberOfBombs){
        bomb = getRndInteger(1, bombMaxValue);
        //se la bomba non è presente nella lista, la inserisco, altrimenti riciclo generando una nuova bomba
        if( !bombs.includes(bomb)){
            bombs.push(bomb);
        }
    }

    return bombs
}


// TY w3school :)
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
