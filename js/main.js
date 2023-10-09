// VARIABLES Y CONSTANTES
const equipoLocal = "Argentina";
const equipoVisitante = "Francia";

const titularesArgentina = jugadoresArgentina.filter((jugador) => jugador.titular === true);

const titularesFrancia = jugadoresFrancia.filter((jugador) => jugador.titular === true);

const goleadoresArgentina = [];
const goleadoresFrancia = [];

let golesArg = 0;
let golesFrancia = 0;
let minutosJugados = 0;


let goleadoresMostrados = false;


let goleadoresSeleccionadosArg = 0;
let goleadoresSeleccionadosFra = 0;

//FORMACIONES
document.getElementById('teamsButton').addEventListener('click', function () {
  mostrarFormaciones();
});


function mostrarFormaciones() {
  const tarjetaArgentina = generarFormacion('Argentina', titularesArgentina);
  agregarFormacion(tarjetaArgentina);

  const tarjetaFrancia = generarFormacion('Francia', titularesFrancia);
  agregarFormacion(tarjetaFrancia);

  const teamsButton = document.getElementById('teamsButton');
  teamsButton.textContent = 'OCULTAR FORMACIONES';

  teamsButton.addEventListener('click', function () {
    const contenedorFormaciones = document.querySelector('.contenedor-formaciones');
    contenedorFormaciones.innerHTML = ''; 
    teamsButton.textContent = 'MOSTRAR FORMACIONES'; 
  });
}


function generarFormacion(nombreEquipo, jugadores) {
  const tarjeta = document.createElement('div');
  tarjeta.className = 'card';

  const titulo = document.createElement('h2');
  titulo.className = 'texto';
  titulo.textContent = `Once inicial de ${nombreEquipo}`;
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
  const contenedorFormaciones = document.querySelector('.contenedor-formaciones');
  contenedorFormaciones.appendChild(tarjeta); 
}

// FUNCIONES DE JUEGO
function jugando() {
  return (minutosJugados < 90 && golesArg < 5 && golesFrancia < 5);
}

// FUNCIONES DE GOL Y RELATO
function mostrarGol(equipo, jugador, minuto) {
  const contenedorPartido = document.querySelector('.contenedor-partido');

  const tarjetaGol = document.createElement('div');
  tarjetaGol.className = 'card';

  const imagenGol = document.createElement('img');
  const textoGol = document.createElement('h2');
  textoGol.className = 'texto';

  if (equipo === 'Argentina') {
    imagenGol.src = 'assets/festejos-gol/gol-arg.webp';
    imagenGol.alt = 'gol argentina';
    textoGol.textContent = `¡Gol de Argentina!`;
  } else if (equipo === 'Francia') {
    imagenGol.src = 'assets/festejos-gol/gol-francia.webp';
    imagenGol.alt = 'gol francia';
    textoGol.textContent = `¡Gol de Francia!`;
  }

  // tarjeta de gol
  const minutoGolElement = document.createElement('h5');
  minutoGolElement.textContent = `Minuto: ${minuto}, Autor: ${jugador}`;

  tarjetaGol.appendChild(imagenGol);
  tarjetaGol.appendChild(textoGol);
  tarjetaGol.appendChild(minutoGolElement);

  contenedorPartido.appendChild(tarjetaGol);
}

function relatoGol(equipo, minuto) {
  const titulares = equipo === equipoLocal ? titularesArgentina : titularesFrancia;

  const selector = document.createElement('select');

  titulares.forEach((jugador) => {
    const opcion = document.createElement('option');
    opcion.value = jugador.nombre;
    opcion.textContent = jugador.nombre;
    selector.appendChild(opcion);
  });

  selector.addEventListener('change', function () {
    const jugadorSeleccionado = selector.value;
    console.log('Gol de ' + equipo + ' en el minuto ' + minuto + ". Lo hizo " + jugadorSeleccionado);
    agregarGoleador(equipo, jugadorSeleccionado);
    selector.style.display = 'none';
    mostrarGol(equipo, jugadorSeleccionado, minuto); 
    actualizarContadorGoleadores(equipo);
  });

  const contenedorPartido = document.querySelector('.contenedor-partido');
  contenedorPartido.appendChild(selector);
}

// GOLEADORES
function agregarGoleador(equipo, jugador) {
  if (equipo === equipoLocal) {
    goleadoresArgentina.push(jugador);
  } else if (equipo === equipoVisitante) {
    goleadoresFrancia.push(jugador);
  }
  guardarDatosEnLocalStorage();
}

function actualizarContadorGoleadores(equipo) {
  if (equipo === equipoLocal) {
    goleadoresSeleccionadosArg += 1;
  } else if (equipo === equipoVisitante) {
    goleadoresSeleccionadosFra += 1;
  }
}

document.getElementById('goleadoresButton').addEventListener('click', function () {
  if (!goleadoresMostrados) {
    mostrarGoleadores();
  } else {
    ocultarGoleadores();
  }
});

function generarGoleadores(nombreEquipo, goleadores) {
  const tarjeta = document.createElement('div');
  tarjeta.className = 'card';

  const titulo = document.createElement('h2');
  titulo.className = 'texto';
  titulo.textContent = `Goleadores de ${nombreEquipo}`;
  tarjeta.appendChild(titulo);

  const listaGoleadores = document.createElement('ul');
  goleadores.forEach((goleador) => {
    const elementoGoleador = document.createElement('li');
    elementoGoleador.textContent = `${goleador}`;
    listaGoleadores.appendChild(elementoGoleador);
  });

  tarjeta.appendChild(listaGoleadores);

  return tarjeta;
}

function agregarGoleadores(tarjeta) {
  const contenedorGoleadores = document.querySelector('.contenedor-goleadores');
  contenedorGoleadores.appendChild(tarjeta);
}

function mostrarGoleadores() {
  if (goleadoresArgentina.length > 0 || goleadoresFrancia.length > 0) {
    const tarjetaArgentina = generarGoleadores('Argentina', goleadoresArgentina);
    agregarGoleadores(tarjetaArgentina);

    const tarjetaFrancia = generarGoleadores('Francia', goleadoresFrancia);
    agregarGoleadores(tarjetaFrancia);

    const goleadoresButton = document.getElementById('goleadoresButton');
    goleadoresButton.textContent = 'OCULTAR GOLEADORES';

    goleadoresMostrados = true;
  }
}

function ocultarGoleadores() {
  const contenedorGoleadores = document.querySelector('.contenedor-goleadores');
  contenedorGoleadores.innerHTML = '';
  const goleadoresButton = document.getElementById('goleadoresButton');
  goleadoresButton.textContent = 'MOSTRAR GOLEADORES';
  goleadoresMostrados = false;
}

// INICIO PARTIDO
document.getElementById('startButton').addEventListener('click', iniciarPartido);

function iniciarPartido() {
  while (jugando()) {
    const minuto = minutosJugados + 1;

    // PROBABILIDAD DE GOL
    const probabilidadGolArg = Math.random();
    const probabilidadGolFrancia = Math.random();

    if (probabilidadGolArg < 0.02) {
      golesArg += 1;
      relatoGol(equipoLocal, minuto);
    } else if (probabilidadGolFrancia < 0.02) {
      golesFrancia += 1;
      relatoGol(equipoVisitante, minuto);
    }

    minutosJugados = minuto;
  }

  resultadoFinal(equipoLocal, golesArg, golesFrancia, equipoVisitante);
}

// RESULTADO FINAL
function resultadoFinal(equipo1, goles1, goles2, equipo2) {
  const resultadoFinalElement = document.getElementById('resultadoFinal');

  let resultadoFinalTexto = ''; 

  if (goles1 > goles2) {
    resultadoFinalTexto = `${equipo1} ${goles1} - ${goles2} ${equipo2} (${equipo1} Campeón)`;
    const campeonArgHTML = `
      <div class="card">
        <img src="assets/campeon/arg-campeon.jpg" alt="argentina campeon">
        <h2 class="texto">¡Argentina Campeón de Mundo!</h2>
      </div>
      <div class="card">
        <img src="assets/campeon/arg-campeon-festejos.jpg" alt="argentina campeon">
        <h2 class="texto">¡Se festeja en las calles!</h2>
      </div>
      <div class="card">
        <img src="assets/campeon/arg-campeon-festejos.webp" alt="argentina campeon">
        <h2 class="texto">18-12-2022</h2>
      </div>
    `;

    resultadoFinalElement.innerHTML = campeonArgHTML;
    console.log("¡" + equipo1 + " Campeón del mundo!");
  } else if (goles2 > goles1) {
    resultadoFinalTexto = `${equipo2} ${goles2} - ${goles1} ${equipo1} (${equipo2} Campeón)`;
    const campeonFranciaHTML = `
      <div class="card">
        <img src="assets/campeon/francia-campeon.jpg" alt="francia campeon">
        <h2 class="texto">¡Francia Campeón de Mundo!</h2>
      </div>
    `;

    resultadoFinalElement.innerHTML = campeonFranciaHTML;
    console.log("¡" + equipo2 + " Campeón del mundo!");
  } else {
    resultadoFinalTexto = `Empate ${goles1} - ${goles2}`;
    const penalesHTML = `
      <div class="card">
        <img src="assets/campeon/penales.jpg" alt="francia campeon">
        <h2 class="texto">¡Habrá penales!</h2>
      </div>
    `;

    resultadoFinalElement.innerHTML = penalesHTML;
    console.log("¡Habrá penales en el Estadio Lusail!");
  }

  const marcadorFinalTexto = document.createElement('h3');
  marcadorFinalTexto.textContent = `Marcador Final: ${equipo1} ${goles1} - ${goles2} ${equipo2}`;
  resultadoFinalElement.appendChild(marcadorFinalTexto);

  guardarDatosEnLocalStorage();
}


// LOCAL STORAGE

function guardarDatosEnLocalStorage() {
  const datos = {
    'goleadoresArgentina': goleadoresArgentina,
    'goleadoresFrancia': goleadoresFrancia,
    'golesArg': golesArg,
    'golesFrancia': golesFrancia,
    'minutosJugados': minutosJugados,
    'goleadoresSeleccionadosArg': goleadoresSeleccionadosArg,
    'goleadoresSeleccionadosFra': goleadoresSeleccionadosFra
  };

  for (const clave in datos) {
    if (datos.hasOwnProperty(clave)) {
      localStorage.setItem(clave, JSON.stringify(datos[clave]));
    }
  }
}

function cargarDatosDesdeLocalStorage() {
  const claves = [
    'goleadoresArgentina',
    'goleadoresFrancia',
    'golesArg',
    'golesFrancia',
    'minutosJugados',
    'goleadoresSeleccionadosArg',
    'goleadoresSeleccionadosFra',
    'jugadoresArgentina', 
    'jugadoresFrancia'    
  ];

  claves.forEach((clave) => {
    const valorGuardado = localStorage.getItem(clave);
    if (valorGuardado) {
      if (clave.startsWith('goleadores')) {
        const variable = clave.replace('goleadores', '');
        window[variable] = JSON.parse(valorGuardado);
      } else if (clave === 'jugadoresArgentina' || clave === 'jugadoresFrancia') {
        window[clave] = JSON.parse(valorGuardado);
      } else {
        window[clave] = parseInt(valorGuardado);
      }
    }
  });

  titularesArgentina.length = 0;
  titularesArgentina.push(...jugadoresArgentina.filter((jugador) => jugador.titular === true));

  titularesFrancia.length = 0;
  titularesFrancia.push(...jugadoresFrancia.filter((jugador) => jugador.titular === true));
}

window.addEventListener('load', cargarDatosDesdeLocalStorage);
