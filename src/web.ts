import "./style.css";
import { inicializarSala, reservarAsiento } from "./sala";

const sala = inicializarSala();
const contenedorAsientos = document.querySelector<HTMLDivElement>("#asientos");
const mensaje = document.querySelector<HTMLParagraphElement>("#mensaje");

if (contenedorAsientos && mensaje) {
  for (const [fila, asientos] of sala.entries()) {
    for (const [columna, estado] of asientos.entries()) {
      const boton = document.createElement("button");
      boton.type = "button";
      boton.dataset.fila = String(fila);
      boton.dataset.columna = String(columna);
      boton.setAttribute("aria-label", `Fila ${fila}, columna ${columna}, libre`);
      boton.className =
        "rounded bg-green-600 p-2 text-center font-bold text-white hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-100";
      boton.textContent = estado === 0 ? "L" : "X";

      boton.addEventListener("click", () => {
        const resultado = reservarAsiento(sala, fila, columna);
        const ocupado = sala[fila][columna] === 1;

        boton.textContent = ocupado ? "X" : "L";
        boton.disabled = ocupado;
        boton.className = ocupado
          ? "rounded bg-red-600 p-2 text-center font-bold text-white disabled:cursor-not-allowed disabled:opacity-100"
          : "rounded bg-green-600 p-2 text-center font-bold text-white hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-100";
        boton.setAttribute(
          "aria-label",
          `Fila ${fila}, columna ${columna}, ${ocupado ? "ocupado" : "libre"}`
        );
        mensaje.textContent = resultado;
      });

      contenedorAsientos.append(boton);
    }
  }
}
