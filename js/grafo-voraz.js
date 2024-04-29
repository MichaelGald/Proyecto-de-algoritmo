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
    let nodo = inicio, ruta = [inicio], distancia = 0, visitados = new Set();

    while (nodo !== fin) {
      let distMinima = Infinity, siguiente = null;

      visitados.add(nodo);
      for (const vecino in this.grafo[nodo]) {
        if (!visitados.has(vecino) && !ruta.includes(vecino)) {
          if (this.grafo[nodo][vecino] < distMinima) {
            distMinima = this.grafo[nodo][vecino];
            siguiente = vecino;
          }
        }
      }

      if (siguiente === null) return { ruta: [], distancia: Infinity };

      ruta.push(siguiente);
      distancia += distMinima;
      nodo = siguiente;
    }

    return { ruta, distancia };
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const formularioDijkstra = document.getElementById("dijkstraForm");

  formularioDijkstra.addEventListener("submit", (event) => {
    event.preventDefault();
    const inicio = document.getElementById("startNode").value,
          end = document.getElementById("endNode").value,
          { ruta, distancia } = dijkstraVoraz.encontrarRutaVoraz(inicio, end),
          resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `Ruta más eficiente: ${ruta.join(" -> ")} <br> Total distancia: ${distancia}`;
  });
});
