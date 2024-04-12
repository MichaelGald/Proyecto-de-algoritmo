function cambioDeMoneda(monto, denominaciones) {
    denominaciones.sort((a, b) => b.valor - a.valor); // Ordenar por valor de forma decreciente

    let cantidadMonedas = 0;
    const cambio = {};

    for (let i = 0; i < denominaciones.length; i++) {
        const denominacion = denominaciones[i];
        const cantidad = Math.floor(monto / denominacion.valor);

        cantidadMonedas += cantidad;
        cambio[denominacion.nombre] = cantidad;

        monto -= cantidad * denominacion.valor;
    }

    return { cantidadMonedas, cambio };
}

function calcularCambio() {
    const montoInput = document.getElementById("monto");
    const monto = parseFloat(montoInput.value);

    const denominaciones = [
        { nombre: "Denominación 1", valor: parseFloat(document.getElementById("denominacion1").value) },
        { nombre: "Denominación 2", valor: parseFloat(document.getElementById("denominacion2").value) },
        { nombre: "Denominación 3", valor: parseFloat(document.getElementById("denominacion3").value) }
        // Puedes agregar más objetos de denominación según sea necesario
    ];

    const resultado = cambioDeMoneda(monto, denominaciones);

    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `
        <p>Cantidad mínima de monedas: ${resultado.cantidadMonedas}</p>
        <p>Cambio:</p>
        <ul>
            ${Object.entries(resultado.cambio).map(([denominacion, cantidad]) => `<li>${cantidad} de ${denominacion}</li>`).join("")}
        </ul>
    `;
}

const sii = "";