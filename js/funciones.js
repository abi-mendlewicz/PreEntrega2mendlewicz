const inicializarTablero = () => {
  for (let i = 0; i < 9; i++) {
    tablero.push(new Casillero(i, '🔲'))
  }
}

const mostrarTablero = () => {
  let tableroDispuesto = '\n  A   B   C\n1 '
  let i = 1

  for (const casillero of tablero) {
    tableroDispuesto += casillero.contenido
    if (i % 3 == 0 && i < tablero.length) {
      tableroDispuesto += `\n${(i / 3) + 1} `
    }
    i++
  }

  return `${tableroDispuesto}\n\n`
}

const mostrarInstrucciones = () => {
  alert(`
    Pronto para jugar Tres en línea?\n
    En cada turno tenés que elegir uno de los casilleros libres que quieras ocupar.\n
    El objetivo es ocupar toda una fila, una columna o una de las dos diagonales principales.\n
    ${mostrarTablero()}
    Por ejemplo, en tu turno, si querés ocupar la casilla del medio y ésta se encuentra libre pasá el código B2 o si querés ocupar la casilla de abajo a la derecha: C3.
  `)
}

const establecerTurnos = () => {
  const arranque = confirm('Quién arranca?\nAceptar para ir primero con ❎ o\nCancelar para jugar segundo con ⏺️.')
  
  if (arranque) {
    jugadores.push(new Jugador('real', '❎'), new Jugador('ia', '⏺️'))
  } else {
    jugadores.push(new Jugador('ia', '❎'), new Jugador('real', '⏺️'))
  }
}

const validarJugada = (jugada) => {
  console.log('Validando jugada:', jugada, '...')
  const i = tablero.findIndex(casillero => casillero.codigo == jugada.toLowerCase())
  const jugador = jugadores.find(jugador => jugador.tipo == 'real')

  if (i > -1 && tablero[i].contenido == '🔲') {
    console.log('Jugada válida.')
    tablero[i].contenido = jugador.ficha
    return true
  }
  
  console.log('Jugada inválida.')
  return false
}

const solicitarJugada = (mensaje) => {
  return prompt(mostrarTablero() + mensaje)
}

const generarJugada = () => {
  const casillerosLibres = tablero.filter(casillero => casillero.contenido == '🔲')
  const i = Math.floor(Math.random() * casillerosLibres.length)
  const jugador = jugadores.find(jugador => jugador.tipo == 'ia')

  casillerosLibres[i].contenido = jugador.ficha

  return casillerosLibres[i].codigo
}

const realizarJugada = (jugador) => {
  if (jugador.tipo == 'real') {
    let jugada = solicitarJugada('Tu turno.\nElegí un casillero:')
    if (jugada === null) {
      return false
    }

    while (!validarJugada(jugada)) {
      jugada = solicitarJugada('Pasaste un código de casillero inválido.\nElegí un casillero válido:')
    }
  } else {
    let jugada = generarJugada()
    console.log('jugada ia:', jugada)
  }

  return true
}

const chequearGanador = () => {
  return (tablero[0].contenido != '🔲' && tablero[0].contenido == tablero[1].contenido && tablero[0].contenido == tablero[2].contenido) ||
    (tablero[3].contenido != '🔲' && tablero[3].contenido == tablero[4].contenido && tablero[3].contenido == tablero[5].contenido) ||
    (tablero[6].contenido != '🔲' && tablero[6].contenido == tablero[7].contenido && tablero[6].contenido == tablero[8].contenido) ||
    (tablero[0].contenido != '🔲' && tablero[0].contenido == tablero[3].contenido && tablero[0].contenido == tablero[6].contenido) ||
    (tablero[1].contenido != '🔲' && tablero[1].contenido == tablero[4].contenido && tablero[1].contenido == tablero[7].contenido) ||
    (tablero[2].contenido != '🔲' && tablero[2].contenido == tablero[5].contenido && tablero[2].contenido == tablero[8].contenido) ||
    (tablero[0].contenido != '🔲' && tablero[0].contenido == tablero[4].contenido && tablero[0].contenido == tablero[8].contenido) ||
    (tablero[6].contenido != '🔲' && tablero[6].contenido == tablero[4].contenido && tablero[6].contenido == tablero[2].contenido)
}

const decretarGanador = (jugador) => {
  if (jugador.tipo == 'real') {
    alert(mostrarTablero() + '🏆 FELICITACIONES GANASTE!')
  } else if (jugador.tipo == 'ia') {
    alert(mostrarTablero() + '🥈 A veces toca perder pero el Tres en línea siempre da revancha.')
  }

  return true
} 

const decretarEmpate = () => alert(mostrarTablero() + '🤝 Quedamos empatados. Buena partida!')