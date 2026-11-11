const FILAS = 8;
const COLUMNAS = 10;

// Crea una sala con todos los asientos libres.
export function inicializarSala(): number[][] {
  const sala: number[][] = [];

  for (let fila = 0; fila < FILAS; fila++) {
    const asientos: number[] = [];

    for (let columna = 0; columna < COLUMNAS; columna++) {
      asientos.push(0);
    }

    sala.push(asientos);
  }

  return sala;
}

// Valida la posición y ocupa el asiento si está libre.
export function reservarAsiento(
  sala: number[][],
  fila: number,
  columna: number
): string {
  const asientos = sala[fila];

  if (!Number.isInteger(fila) || asientos === undefined) {
    return "Esa fila no existe. Elegí una fila del 0 al 7.";
  }

  if (!Number.isInteger(columna) || columna < 0 || columna >= asientos.length) {
    return "Ese asiento no existe. Elegí una columna del 0 al 9.";
  }

  if (asientos[columna] === 1) {
    return `El asiento de la fila ${fila}, columna ${columna}, ya está ocupado.`;
  }

  asientos[columna] = 1;
  return `Reserva confirmada. Fila ${fila}, columna ${columna}.`;
}
