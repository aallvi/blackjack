


(() => {
'use strict'

    




let deck           = [];
const tipos        = ['C','D','H','S'],
    especiales   = ['A','J','Q','K']


let puntosJugadores = [];

// Referencias del HTML


const divCartasJugadores = document.querySelectorAll('.divCarta'),
            puntosHTML = document.querySelectorAll('small');
  //divCartasComputadora = document.querySelector('#computadora-cartas');      
const btnPedir   = document.querySelector('#btnPedir'),                   
      btnDetener = document.querySelector('#btnDetener'),
      btnNuevo   = document.querySelector('#btnNuevo');

//esta funcion crea un nuevo deck


const inicializarjuego= (numJugadores = 2) => {
    deck = crearDeck();
    puntosJugadores = [];
    for (let i = 0; i< numJugadores; i++ ) {
        puntosJugadores.push(0);
    }
    
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    puntosHTML.forEach(elem => elem.innerText = 0 );
    divCartasJugadores.forEach(elem => elem.innerHTML= '');
}

const crearDeck = () => {
    deck = [];
    for ( let i = 2; i <=10; i++) {
        for ( let tipo of tipos) {
            deck.push (i + tipo);


        }
    }


    for (let tipo of tipos) {
        for( let esp of especiales){
            deck.push ( esp + tipo);
        }
    }

    
    
    return _.shuffle (deck);

}

     

// esta funcion me permite tomar una carta



const pedirCarta = () => {

    if (deck.length ===0 ) {
        throw 'no hay mas cartas'
    }
    
    return deck.pop();
}




const valorCarta = (carta) => {
    const valor = carta.substring(0,carta.length-1);
    return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 
                            : valor *1;
    
    

   // LO QUE HICE YO
   //     console.log({valor});

   //     puntos = (isNaN(valor)) && (valor === 'A') ? 11 : 
   //     (isNaN(valor)) && (valor === 'J','D','K','Q')  ?  10 : puntos = valor *1;

   //      console.log(puntos);
}

// turno pc

// turno 0 es primer jugador y el ultimo es compu

const acumularPuntos= (carta, turno) => {

    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];

}


const crearCarta = (carta,turno) => {
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugadores[turno].append(imgCarta);
   
}

const determinarGanador = () => {
    const[puntosMinimos, puntosComputadora ] = puntosJugadores;


    setTimeout(() => {


  

        if (puntosComputadora === puntosMinimos) {
           alert('Nadie Gano');
        } else if (puntosMinimos > 21) {
           alert('PERDISTE CTM')
        }  else if (puntosComputadora > 21) {
           alert('GANASTE ')
        } else {
           alert('PERDISTE CTM')
        }
       
       },1500 );



}





const turnoComputadora = (puntosMinimos) => {
    
    let puntosComputadora = 0;
   do {

    const carta = pedirCarta();
    puntosComputadora = acumularPuntos(carta, puntosJugadores.length-1);
    crearCarta(carta, puntosJugadores.length-1);



  } while ((puntosComputadora <puntosMinimos) && (puntosMinimos <=21)) ;

 determinarGanador();
 
  

}





// EVENTOS

btnPedir.addEventListener('click', () => {


    const carta = pedirCarta();
    const puntosJugador= acumularPuntos(carta,0);

     crearCarta(carta,0);


    

    // lo qe yo hice qe igual esta bien document.querySelector('small').innerHTML = puntosJugador
     
    if (puntosJugador >21 ) {
        console.warn('erai');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
    else if ( puntosJugador ===21 ) { 
        console.warn('21,genial!')
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
        
    }



});

btnDetener.addEventListener('click', () => {
    turnoComputadora(puntosJugadores[0]);
    btnPedir.disabled = true;
    btnDetener.disabled = true;

});


btnNuevo.addEventListener('click', () => {
    inicializarjuego();
  

});




})();


