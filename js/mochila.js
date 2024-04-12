document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("knapsack-form");
    const resultDiv = document.getElementById("result");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const weightsInput = document.getElementById("weights").value;
        const valuesInput = document.getElementById("values").value;
        const capacityInput = parseInt(document.getElementById("capacity").value);

        const weights = weightsInput.split(",").map(Number);
        const values = valuesInput.split(",").map(Number);

        if (weights.length !== values.length) {
            resultDiv.textContent = "Los pesos y los valores deben tener la misma cantidad de elementos.";
            return;
        }

        const [maxValue, itemsTaken] = knapsack(weights, values, capacityInput);
        
        resultDiv.innerHTML = `
            <p>Valor máximo que se puede llevar en la mochila: ${maxValue}</p>
            <p>Objetos seleccionados: ${itemsTaken.join(", ")}</p>
        `;
    });
});
