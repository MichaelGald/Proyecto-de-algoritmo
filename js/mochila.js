    // Clase para representar un elemento que puede ser incluido en la mochila
class Item {
    constructor(weight, value) {
        this.weight = weight;
        this.value = value;
        this.ratio = value / weight; 
    }
}
    // Funcion principal para resolver el problema de la mochila utilizando el enfoque voraz
function knapsack(obj, max_cost) {
    
    // Convertir el objeto en un array de objetos Item
    const items = Object.entries(obj).map(([n, [c, b]]) => new Item(c, b));
    
    // Ordenar los elementos por su ratio valor-peso de forma descendente
    items.sort((a, b) => b.ratio - a.ratio);
    let totalValue = 0;
    let remainingCapacity = max_cost;
    const objetosEnMochila = [];
    
    // Recorrer los elementos y agregarlos a la mochila si es posible
    for (const item of items) {
        if (remainingCapacity >= item.weight) {
            objetosEnMochila.push(item);
            totalValue += item.value;
            remainingCapacity -= item.weight;
        }
    }

    return {
        objetosEnMochila: objetosEnMochila,
        pesoMochila: max_cost - remainingCapacity,
        valorMochila: totalValue
    };
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('knapsack-form');
    
    // Escuchar el evento de envio del formulario
    form.addEventListener('submit', function (e) {
        e.preventDefault(); 
        
        const pesoInput = document.getElementById('peso').value;
        const valorInput = document.getElementById('valor').value;
        const capacidadInput = parseInt(document.getElementById('capacidad').value);
           
         // Validar que los valores ingresados sean números válidos
        if (isNaN(parseFloat(pesoInput)) || isNaN(parseFloat(valorInput)) || isNaN(capacidadInput)) {
            alert('Por favor, ingrese valores numéricos válidos en los campos.');
            return;
        }
        
        // Validar que los valores ingresados no sean negativos
        if (parseFloat(pesoInput) < 0 || parseFloat(valorInput) < 0 || capacidadInput < 0) {
            alert('Por favor, ingrese valores no negativos en los campos.');
            return;
        }

        // Convertir valores de entrada en arrays de numeros
        const pesos = pesoInput.split(',').map(parseFloat);
        const valores = valorInput.split(',').map(parseFloat);
         
        // Validar que no haya NaN en los valores ingresados
         if (pesos.includes(NaN) || valores.includes(NaN)) {
             alert('Por favor, ingrese valores numéricos válidos en los campos.');
             return;
         }

        // Verificar que la cantidad de pesos sea igual a la cantidad de valores
        if (pesos.length !== valores.length) {
            alert('La cantidad de pesos debe ser igual a la cantidad de valores.');
            return;
        }

        // Validar que la capacidad de la mochila sea suficiente para llevar algún objeto
        const pesoMinimo = Math.min(...pesos);
            if (capacidadInput < pesoMinimo) {
                alert('La capacidad de la mochila es insuficiente para llevar cualquier objeto.');
                return;
            }

        // Crear objeto con pesos y valores
        const obj = {};
        for (let i = 0; i < pesos.length; i++) {
            obj[i] = [pesos[i], valores[i]];
        }

        //mostrar el resultado
        const resultado = knapsack(obj, capacidadInput);
        const objetos = resultado.objetosEnMochila.map(item => `(${item.weight}, ${item.value})`).join(', ');
        const pesoMochila = resultado.pesoMochila;
        const valorMochila = resultado.valorMochila;

        document.getElementById('resultado').innerHTML = `
            <p>Objetos en la mochila: [${objetos}]</p>
            <p>Peso mochila: ${pesoMochila}</p>
            <p>Valor mochila: ${valorMochila}</p>
        `;
    });
});
