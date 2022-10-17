// Consegna
// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
// Bonus
// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// - con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// - con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// - con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;


const btn = document.querySelector('#btn');
btn.addEventListener('click',play);
const container = document.querySelector('.the-game');

function play(){
    //prendo e pulisco il container del gioco
    container.innerHTML = '';
    const difficulty = document.querySelector('#difficulty').value;

    //scelgo il numero di celle 
    let numCell;
    switch (difficulty) {
        case 'easy':
            numCell = 100
            break;
        case 'hard':
            numCell = 81
            break;
        case 'crazy':
            numCell = 49
            break;
        case 'impossible':
            numCell = 25
            break;
    }

    //genero la lista delle posizioni delle bombe
    let listOfBombs = [];
    const COUNT_BOMBS = 16;
    while(listOfBombs.length < COUNT_BOMBS){
        const random = Math.floor(Math.random() * numCell) + 1;
        if(!listOfBombs.includes(random)){
            listOfBombs.push(random);
        }
    }
    //contatore dei click dell'utente
    let count = 0;
    //funzione che crea le celle
    function createCell(numb, grid){
        //prendo e pulisco il campo dei risultati
        const result = document.querySelector('.result');
        result.innerHTML = ''
        //creo la cella con le classi e gli stili in funzione della difficoltà
        const cell = addElementClassHTML('div', 'square', grid);
        // cell.innerHTML = numb;
        cell.style.width = `calc(100% / ${Math.sqrt(numCell)})`;
        cell.style.height = `calc(100% / ${Math.sqrt(numCell)})`;
        cell.style.cursor = 'pointer';
        //inserisco una variabile che conta i click
        count = 0;
        //distinguo se la cella che vado a creare è o non è una bomba
        if(listOfBombs.includes(numb)){
            //aggiungo la classe bomba ad ogni cella bomba
            cell.classList.add('bomb');
            cell.addEventListener('click', function(){
                //controllo che l'utente non abbia vinto
                if (count != (numCell-COUNT_BOMBS)){
                    //al click aggiungo ad ogni elemento bomba la classe che colora di rosso il background
                    const arrayBombs = document.querySelectorAll('.bomb');
                    for (let i = 0; i < arrayBombs.length; i++){
                        arrayBombs[i].classList.add('bomb-exploded');
                    }
                    //inoltre rendo il colore delle altre celle immutabile in modo che l'utente non possa più giocare
                    //selezionando tutte le celle non ancora cliccate
                    const arrayNotBombs = document.querySelectorAll('.clickable');
                    for (let i = 0; i < arrayNotBombs.length; i++){
                        arrayNotBombs[i].classList.add('unclickable');
                    }
                    result.innerHTML = `Tentativi: ${count} Hai Perso!`
                }
            })
        }else{
            //assegno la classe clickable per distinguere le celle cliccabili dalle bombe
            cell.classList.add('clickable');
            cell.addEventListener('click', function(){
                //incremento il contatore dei click
                if (cell.classList.contains('clickable') && !cell.classList.contains('unclickable')){
                    count++;
                    result.innerHTML = `Tentativi: ${count}`
                }
                //al click rendo la cella cliccata e le rimuovo la classe clickable
                cell.classList.add('checked');
                cell.classList.remove('clickable');

                //condizione di vittoria
                if (count == (numCell-COUNT_BOMBS)){
                    const arrayBombs = document.querySelectorAll('.bomb');
                    for (let i = 0; i < arrayBombs.length; i++){
                        arrayBombs[i].classList.add('bomb-exploded');
                    }
                    result.innerHTML = `Tentativi: ${count} Hai Vinto!`
                }
            })
        }
        
    }

    //funzione che crea la griglia delle celle
    function drawGrid(){
        const grid = addElementClassHTML('div', 'grid', container);
        for (let i = 1; i <= numCell; i++){
            createCell(i,grid);
        }
    }
    
    drawGrid()

    

}