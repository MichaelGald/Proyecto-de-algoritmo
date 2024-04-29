const dijkstraVoraz = {
  grafo: {
    A: { B: 20, C: 5 },
    B: { A: 20, C: 8, D: 10, G: 3 },
    C: { A: 5, B: 8, E: 11, G: 7 },
    D: { B: 10, E: 15, F: 9, G: 25 },
    E: { C: 11, D: 15, F: 14, G: 12 },
    F: { D: 9, E: 14 },
    G: { B: 3, C: 7, D: 25, E: 12 },
  },

  encontrarRutaVoraz(inicio, fin) {
    //Iniciamos de variables
    let nodo = inicio, ruta = [inicio], distancia = 0, visitados = new Set();

    // Bucle principal
    while (nodo !== fin) {
      let distMinima = Infinity, siguiente = null;

      // Marcar nodo actual como visitado
      visitados.add(nodo);

      // Iterar sobre los vecinos del nodo actual
      for (const vecino in this.grafo[nodo]) {

        // Verificar si el vecino no ha sido visitado y no está en la ruta actual
        if (!visitados.has(vecino) && !ruta.includes(vecino)) {

          // Actualizar la distancia mínima y el siguiente nodo si es necesario
          if (this.grafo[nodo][vecino] < distMinima) {
            distMinima = this.grafo[nodo][vecino];
            siguiente = vecino;
          }
        }
      }

      // Si no hay siguiente nodo válido, retornar una ruta vacía y distancia infinita
      if (siguiente === null) return { ruta: [], distancia: Infinity };

      ruta.push(siguiente);
      distancia += distMinima;
      nodo = siguiente;
    }

    // Retornar la ruta y la distancia encontradas
    return { ruta, distancia };
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const formularioDijkstra = document.getElementById("dijkstraForm");

  formularioDijkstra.addEventListener("submit", (event) => {
    event.preventDefault();
    const inicio = document.getElementById("inicioNodo").value,
          final = document.getElementById("finNodo").value;
    // Llama al método para encontrar la ruta más corta usando el algoritmo de Dijkstra
    const resultadoDijkstra = dijkstraVoraz.encontrarRutaVoraz(inicio, final);

    // Extrae la ruta y la distancia del resultado usando destructuring
    const ruta = resultadoDijkstra.ruta;
    const distancia = resultadoDijkstra.distancia;

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `Ruta más eficiente: ${ruta.join(" -> ")} <br> Total distancia: ${distancia}`;
  });
});
