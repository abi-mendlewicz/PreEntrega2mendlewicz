const tablero = []
const jugadores = []
let ganador = false
let abandono = false

inicializarTablero()
mostrarInstrucciones()
establecerTurnos()

// Comenzar por turnos
for (let i = 0; i < tablero.length; i++) {
  // Establecer jugador del array jugadores.
  const jugador = jugadores[i % 2]
  console.log(`Turno #${i + 1}:`, jugador)
  const turno = realizarJugada(jugador)
  if (!turno) {
    abandono = true
    break
  }
  
  if (i > 3 && chequearGanador()) {
    ganador = decretarGanador(jugador)
    break
  }
}

if (abandono) {
  alert('Lástima que tengas que irte.\nAquí estaré para jugar la próxima!')
} else if (!ganador) {
  decretarEmpate()
}