//VARIABLES Y CONSTANTES
const equipoLocal = "Argentina";
const equipoVisitante = "Francia";

const titularesArgentina = jugadoresArgentina.filter((jugador) => jugador.titular === true);

const titularesFrancia = jugadoresFrancia.filter((jugador) => jugador.titular === true);

const tarjetaArgentina = generarFormacion('Argentina', titularesArgentina);
const tarjetaFrancia = generarFormacion('Francia', titularesFrancia);



const goleadoresArgentina = [];
const goleadoresFrancia = [];

let golesArg = 0;
let golesFrancia = 0;
let minutosJugados = 0;



//FUNCIONES
//funciones de formacion
function generarFormacion(equipo, jugadores) {
  const tarjeta = document.createElement('div');
  tarjeta.className = 'card';

  const titulo = document.createElement('h2');
  titulo.className = 'texto';
  titulo.textContent = `Once inicial de ${equipo}`;
  tarjeta.appendChild(titulo);

  const listaJugadores = document.createElement('ul');
  jugadores.forEach((jugador) => {
      const elementoJugador = document.createElement('li');
      elementoJugador.textContent = `${jugador.dorsal} ${jugador.nombre} - ${jugador.posicion}`;
      listaJugadores.appendChild(elementoJugador);
  });

  tarjeta.appendChild(listaJugadores);

  return tarjeta;
}

function agregarFormacion(tarjeta) {
  const contenedor = document.getElementById('formaciones');
  contenedor.appendChild(tarjeta);
}


//funciones de juego
function jugando() {
  return (minutosJugados < 90 && golesArg < 5 && golesFrancia < 5)
}

function contarGoleadores(jugador, equipo) {
  if (equipo === "Argentina") {
    const goleador = goleadoresArgentina.find((g) => g.nombre === jugador);
    if (goleador) {
      goleador.goles++;
    }
  } else if (equipo === "Francia") {
    const goleador = goleadoresFrancia.find((g) => g.nombre === jugador);
    if (goleador) {
      goleador.goles++;
    }
  }
};

function agregarGoleador(equipo, jugador) {
  let goleadores;
  if (equipo === "Argentina") {
    goleadores = goleadoresArgentina;
  } else if (equipo === "Francia") {
    goleadores = goleadoresFrancia;
  }

  const jugadorExistente = goleadores.find((g) => g.nombre === jugador);
  if (jugadorExistente) {
    jugadorExistente.goles++;
  } else {
    goleadores.push({ nombre: jugador, goles: 1 });
  }
}



function relatoGol(equipo, minuto) {
  let jugador = prompt("Elija un jugador de " + equipo);
  console.log('Gol de ' + equipo + ' en el minuto ' + minuto + ". Lo hizo " + jugador);
  agregarGoleador(equipo, jugador);
}


//funciones de goleadores
function generarTarjetaGoleadores(equipo, goleadores) {
  const tarjetaGoleadores = document.createElement('div');
  tarjetaGoleadores.className = 'card';
  
  const titulo = document.createElement('h2');
  titulo.className = 'texto';
  titulo.textContent = `Goleadores de ${equipo}`;
  tarjetaGoleadores.appendChild(titulo);
  
  const listaGoleadores = document.createElement('ul');
  goleadores.forEach((goleador) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${goleador.nombre} - Goles: ${goleador.goles}`;
    listaGoleadores.appendChild(listItem);
  });
  
  tarjetaGoleadores.appendChild(listaGoleadores);
  
  return tarjetaGoleadores;
}



function mostrarTarjetasGoleadores() {
  const equipos = [
    { nombre: 'Argentina', goleadores: goleadoresArgentina },
    { nombre: 'Francia', goleadores: goleadoresFrancia },
  ];

  equipos.forEach((equipo) => {
    if (equipo.goleadores.length > 0) {
      const tarjetaGoleadores = generarTarjetaGoleadores(equipo.nombre, equipo.goleadores);
      const contenedor = document.getElementById(`goleadores-${equipo.nombre.toLowerCase()}-container`);
      contenedor.appendChild(tarjetaGoleadores);
    }
  });
}




//funcion de resultado
function resultadoFinal(equipo1, goles1, goles2, equipo2) {
  console.log('¡Terminó el partido! Resultado final: ' + equipo1 + ' ' + goles1 + ' - ' + goles2 + ' ' + equipo2);

  

  if (goles1 > goles2) {
    //MOSTRAR FESTEJOS ARG
    document.write('<div class="card"><img src="assets/campeon/arg-campeon.jpg" alt="argentina campeon"><h2 class="texto">¡Argentina Campeon de Mundo!</h2></div>');
    document.write('<div class="card"><img src="assets/campeon/arg-campeon-festejos.jpg" alt="argentina campeon"><h2 class="texto">¡Se festeja en las calles!</h2></div>');
    document.write('<div class="card"><img src="assets/campeon/arg-campeon-festejos.webp" alt="argentina campeon"><h2 class="texto">18-12-2022</h2></div>');

    console.log("¡" + equipo1 + " Campeón del mundo!");

    
    
  } else if (goles2 > goles1) {
    //FESTEJO FRANCIA
    document.write('<div class="card"><img src="assets/campeon/francia-campeon.jpg" alt="francia campeon"><h2 class="texto">¡Francia Campeon de Mundo!</h2></div>');

    
    console.log("¡" + equipo2 + " Campeón del mundo!");

    
  } else {
    //MOSTRAR PENALES
    document.write('<div class="card"><img src="assets/campeon/penales.jpg" alt="francia campeon"><h2 class="texto">¡Habrá penales!</h2></div>');

    console.log("¡Habrá penales en el Estadio Lusail!");

    

  }
  
 //MOSTRAR GOLEADORES
  mostrarTarjetasGoleadores();
  
};

//MOSTRAR FORMACIONES
agregarFormacion(tarjetaArgentina);
agregarFormacion(tarjetaFrancia);


//INICIO PARTIDO
console.log('Comienza el partido entre ' + equipoLocal + ' y ' + equipoVisitante);


//BUCLE PARTIDO
while (jugando()) {
  const minuto = minutosJugados + 1; 
  

  //PROB. GOL
  const probabilidadGolArg = Math.random();
  const probabilidadGolFrancia = Math.random();
  
  if (probabilidadGolArg < 0.02) {
    golesArg += 1;
    relatoGol(equipoLocal, minuto);
    
    

    //MOSTRAR GOL ARG
    document.write('<div class="card"><img src="assets/festejos-gol/gol-arg.webp" alt="gol argentina"><h2 class="texto">¡Gol de Argentina!</h2></div>');

  } else if (probabilidadGolFrancia < 0.02) {
    golesFrancia += 1;
    relatoGol(equipoVisitante, minuto);
    
    

    //MOSTRAR GOL FRANCIA
    document.write('<div class="card"><img src="assets/festejos-gol/gol-francia.webp" alt="gol francia"><h2 class="texto">¡Gol de Francia!</h2></div>');
    
  }

  minutosJugados = minuto;
}

//MOSTRAR RESULTADO
resultadoFinal(equipoLocal, golesArg, golesFrancia, equipoVisitante);



console.log('Tabla de goleadores de Argentina:')
console.table(goleadoresArgentina);
console.log('Tabla de goleadores de Francia:')
console.table(goleadoresFrancia);



