class Casillero {
  constructor(posicion, contenido) {
    this.codigo = this.generarCodigo(posicion)
    this.contenido = contenido
  }

  generarCodigo(posicion) {
    let codigo
    switch (posicion % 3) {
      case 0:
        codigo = 'a'
        break
      case 1:
        codigo = 'b'
        break
      case 2:
        codigo = 'c'
    }

    if (posicion < 3) {
      codigo += 1
    } else if (posicion < 6) {
      codigo += 2
    } else {
      codigo += 3
    }

    return codigo
  }
}

class Jugador {
  constructor(tipo, ficha) {
    this.tipo = tipo
    this.ficha = ficha
  }
}