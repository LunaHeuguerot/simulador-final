//VARIABLES Y CONSTANTES
const equipoLocal = "Argentina";
const equipoVisitante = "Francia";

let golesArg = 0;
let golesFrancia = 0;
let minutosJugados = 0;


//FUNCIONES
function jugando() {
  return (minutosJugados < 90 && golesArg < 5 && golesFrancia < 5)
}

function relatoGol(equipo, minuto) {
  let jugador = prompt("Elija un jugador de " + equipo);
  console.log('Gol de ' + equipo + ' en el minuto ' + minuto + ". Lo hizo " + jugador);
}

function resultadoFinal(equipo1, goles1, goles2, equipo2) {
  console.log('¡Terminó el partido! Resultado final: ' + equipo1 + ' ' + goles1 + ' - ' + goles2 + ' ' + equipo2);

  

  if (goles1 > goles2) {
    //MOSTRAR FESTEJOS ARG
    document.write('<div class="card"><img src="../assets/campeon/arg-campeon.jpg" alt="argentina campeon"><h2 class="texto">¡Argentina Campeon de Mundo!</h2></div>');
    document.write('<div class="card"><img src="../assets/campeon/arg-campeon-festejos.jpg" alt="argentina campeon"><h2 class="texto">¡Se festeja en las calles!</h2></div>');
    document.write('<div class="card"><img src="../assets/campeon/arg-campeon-festejos.webp" alt="argentina campeon"><h2 class="texto">18-12-2022</h2></div>');

    console.log("¡" + equipo1 + " Campeón del mundo!");
    
  } else if (goles2 > goles1) {
    //FESTEJO FRANCIA
    document.write('<div class="card"><img src="../assets/campeon/francia-campeon.jpg" alt="francia campeon"><h2 class="texto">¡Francia Campeon de Mundo!</h2></div>');

    
    console.log("¡" + equipo2 + " Campeón del mundo!");
  } else {
    //MOSTRAR PENALES
    document.write('<div class="card"><img src="../assets/campeon/penales.jpg" alt="francia campeon"><h2 class="texto">¡Habrá penales!</h2></div>');

    console.log("¡Habrá penales en el Estadio Lusail!");
  }

}


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
    document.write('<div class="card"><img src="../assets/festejos-gol/gol-arg.webp" alt="gol argentina"><h2 class="texto">¡Gol de Argentina!</h2></div>');

  } else if (probabilidadGolFrancia < 0.02) {
    golesFrancia += 1;
    relatoGol(equipoVisitante, minuto);


    //MOSTRAR GOL FRANCIA
    document.write('<div class="card"><img src="../assets/festejos-gol/gol-francia.webp" alt="gol francia"><h2 class="texto">¡Gol de Francia!</h2></div>');
    
  }

  minutosJugados = minuto;
}


//MOSTRAR RESULTADO
resultadoFinal(equipoLocal, golesArg, golesFrancia, equipoVisitante);

