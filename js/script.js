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

{/* <div class="grid">
    <div class="square-easy">
        <span>1</span>
    </div>
</div> */}

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
    console.log(listOfBombs)

    //funzione che crea le celle
    function createCell(numb, grid){
        const cell = addElementClassHTML('div', 'square', grid);
        cell.innerHTML = numb;
        cell.style.width = `calc(100% / ${Math.sqrt(numCell)})`;
        cell.style.height = `calc(100% / ${Math.sqrt(numCell)})`;
        if(listOfBombs.includes(numb)){
            cell.classList.add('bomb');
            cell.addEventListener('click', function(){
                const arrayBombs = document.querySelectorAll('.bomb');
                for (let i = 0; i < arrayBombs.length; i++){
                    arrayBombs[i].classList.add('bomb-exploded');
                }
            })
        }else{
            cell.addEventListener('click', function(){
                cell.classList.add('checked')
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