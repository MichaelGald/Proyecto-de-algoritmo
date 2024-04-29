const presionarBtn = document.querySelector('#calcularCambio');
const montoInput = document.getElementById("monto");
const resultadoDiv = document.getElementById("resultado");
let residuo;

let monedasSeleccionadas = [];
let cambioMonedas = [];

cargarEventos();

function cargarEventos() {
    presionarBtn.addEventListener('click', calcularCambio)
}

function denominaciones() {
    cambioMonedas = [
        parseInt(document.getElementById("denominacion1").value),
        parseInt(document.getElementById("denominacion2").value),
        parseInt(document.getElementById("denominacion3").value),
    ];
}

function calcularCambio() {
    denominaciones();

    residuo = 0;
    let monto = parseInt(montoInput.value);

    if (monto > 0) { 
        //Ordenamos el arreglo
        cambioMonedas.sort((a, b) => a - b);

        monedasSeleccionadas = [];
        let index = cambioMonedas.length - 1;
        
        while(monto > 0){
            let pagar = monto - cambioMonedas[index];
        
            if(pagar >= 0 ){
                monedasSeleccionadas.push(cambioMonedas[index]);
                monto = pagar;
            }else{
                index --;
                if (index == -1) {
                    residuo = monto;
                    break;
                }
            }
        };
        mostrarCambio();
    }else{
        alert('El valor ingresado debe ser mayor a cero');
    }

    
}
function mostrarCambio() {
    // Objeto para almacenar el conteo de cada valor
    const conteo = {};
    // Contar la frecuencia de cada valor en monedasSeleccionadas
    monedasSeleccionadas.forEach(monedas => {
        conteo[monedas] = (conteo[monedas] || 0) + 1;
    });
    const listaHTML = Object.entries(conteo).map(([valor, cantidad]) => `<li>Se entrega ${cantidad} Monedas de denominacion ${valor}</li>`).join('');
    // Mostrar la lista en el HTML
    resultadoDiv.innerHTML = `
    <p>Cantidad mínima de monedas: ${monedasSeleccionadas.length}</p>
    <p>Cambio:</p>
    <ul>
        ${listaHTML}
    </ul>
    <ul>
        ${residuo > 0 ? `No se pudo entregar el cambio completo, cambio pendiente por entregar: ${residuo}` : ''}
    </ul>
    `;
}



