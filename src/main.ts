import { inicializarSala, reservarAsiento } from "./sala";

// Dibuja la sala con L para libre y X para ocupado.
function mostrarSala(sala: number[][]): void {
  console.log("    0 1 2 3 4 5 6 7 8 9");

  for (const [numeroFila, asientos] of sala.entries()) {
    let linea = `${numeroFila}   `;

    for (const asiento of asientos) {
      if (asiento === 0) {
        linea += "L ";
      } else {
        linea += "X ";
      }
    }

    console.log(linea);
  }
}

// Devuelve dos cantidades en este orden: libres y ocupados.
function contarAsientos(sala: number[][]): [number, number] {
  let libres = 0;
  let ocupados = 0;

  for (const asientos of sala) {
    for (const asiento of asientos) {
      if (asiento === 0) {
        libres++;
      } else {
        ocupados++;
      }
    }
  }

  return [libres, ocupados];
}

// Devuelve las dos posiciones del primer par libre en una misma fila.
function buscarAsientosContiguos(
  sala: number[][]
): [[number, number], [number, number]] | null {
  for (const [fila, asientos] of sala.entries()) {
    for (let columna = 0; columna < asientos.length - 1; columna++) {
      if (asientos[columna] === 0 && asientos[columna + 1] === 0) {
        return [[fila, columna], [fila, columna + 1]];
      }
    }
  }

  return null;
}

// Imprime el mapa, el recuento y el resultado de la búsqueda.
function mostrarDisponibilidad(titulo: string, sala: number[][]): void {
  console.log(`\n${titulo}`);
  mostrarSala(sala);

  const [libres, ocupados] = contarAsientos(sala);
  const par = buscarAsientosContiguos(sala);

  console.log(`${libres} asientos libres y ${ocupados} ocupados.`);

  if (par !== null) {
    const [[fila, primeraColumna], [, segundaColumna]] = par;
    console.log(`Primer par libre: fila ${fila}, columnas ${primeraColumna} y ${segundaColumna}.`);
  } else if (libres === 0) {
    console.log("Función agotada. No hay asientos disponibles.");
  } else {
    console.log("No hay dos asientos libres juntos. Hay asientos individuales disponibles.");
  }
}

const sala = inicializarSala();
mostrarDisponibilidad("1. Sala vacía", sala);

console.log("\nPruebas de reserva");
console.log(reservarAsiento(sala, 0, 0));
console.log(reservarAsiento(sala, 0, 0));
console.log(reservarAsiento(sala, 8, 0));
console.log(reservarAsiento(sala, 3, 12));
mostrarDisponibilidad("2. Sala parcialmente ocupada", sala);

const salaCasiLlena = inicializarSala();
for (const [fila, asientos] of salaCasiLlena.entries()) {
  asientos.fill(1);

  if (fila === 0) {
    asientos[9] = 0;
  } else if (fila === 1) {
    asientos[0] = 0;
  }
}
mostrarDisponibilidad("3. Sala casi llena, con dos asientos sueltos", salaCasiLlena);

const salaLlena = inicializarSala();
for (const asientos of salaLlena) {
  asientos.fill(1);
}
mostrarDisponibilidad("4. Sala completamente llena", salaLlena);