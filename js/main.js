const equipoLocal = "Argentina";
const equipoVisitante = "Francia";

let golesLocal = 0;
let golesVisitante = 0;
let minutosJugados = 0;

console.log('Comienza el partido entre ' + equipoLocal + ' y ' + equipoVisitante);

while (minutosJugados < 90 && golesLocal < 5 && golesVisitante < 5) {
  const minuto = minutosJugados + 1; 
  
  const probabilidadGolLocal = Math.random();
  const probabilidadGolVisitante = Math.random();

  if (probabilidadGolLocal < 0.02) {
    golesLocal += 1;
    console.log('Gol de ' + equipoLocal + ' en el minuto ' + minuto);
    document.write('<div class="card"><img src="../assets/festejos-gol/gol-arg.webp" alt="gol argentina"><h2 class="texto">¡Gol de Argentina!</h2></div>');
  } else if (probabilidadGolVisitante < 0.02) {
    golesVisitante += 1;
    console.log('Gol de ' + equipoVisitante + ' en el minuto ' + minuto);
    document.write('<div class="card"><img src="../assets/festejos-gol/gol-francia.webp" alt="gol francia"><h2 class="texto">¡Gol de Francia!</h2></div>');
    
  }

  minutosJugados = minuto;
}

// Hay ganador
if (golesLocal > golesVisitante) {
  console.log('¡El partido ha terminado! Resultado final: ' + equipoLocal + ' ' + golesLocal + ' - ' + golesVisitante + ' ' + equipoVisitante + '. ¡' +equipoLocal + ' Campeón del mundo!');

  document.write('<div class="card"><img src="../assets/campeon/arg-campeon.jpg" alt="argentina campeon"><h2 class="texto">¡Argentina Campeon de Mundo!</h2></div>');
  document.write('<div class="card"><img src="../assets/campeon/arg-campeon-festejos.jpg" alt="argentina campeon"><h2 class="texto">¡Se festeja en las calles!</h2></div>');
  document.write('<div class="card"><img src="../assets/campeon/arg-campeon-festejos.webp" alt="argentina campeon"><h2 class="texto">18-12-2022</h2></div>');
} else if (golesVisitante > golesLocal) {
  console.log('¡El partido ha terminado! Resultado final: ' + equipoVisitante + ' ' + golesVisitante + ' - ' + equipoLocal + ' ' + golesLocal + '. ¡' +equipoVisitante + ' Campeón del mundo!');

  document.write('<div class="card"><img src="../assets/campeon/francia-campeon.jpg" alt="francia campeon"><h2 class="texto">¡Francia Campeon de Mundo!</h2></div>');
} else {
  // Hay empate -> penales
  console.log('Terminó el partido: ' + equipoLocal + ' ' + golesLocal + ' - ' + golesVisitante + ' ' + equipoVisitante+ '. Habrá penales en el Estadio Lusail');
  document.write('<div class="card"><img src="../assets/campeon/penales.jpg" alt="francia campeon"><h2 class="texto">¡Habrá penales!</h2></div>');
}
