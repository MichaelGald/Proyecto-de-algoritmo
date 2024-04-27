document.addEventListener('DOMContentLoaded', function () {

    // Clase Actividad
    class Actividad {
        constructor(id, inicio, fin) {
            this.id = id;
            this.inicio = inicio;
            this.fin = fin;
        }

        calcularDuracion() {
            return this.fin - this.inicio;
        }
    }

    // Función para asignar actividades con balance
    function asignarActividadesConBalance(actividades, numTrabajadores) {
        // Ordenar las actividades por su tiempo de inicio
        actividades.sort((a, b) => a.inicio - b.inicio);

        // Inicializar un arreglo para almacenar las horas asignadas a cada trabajador
        const horasAsignadas = new Array(numTrabajadores).fill(0);

        // Inicializar un arreglo para almacenar las asignaciones de actividades
        const asignaciones = new Array(numTrabajadores).fill([]);

        // Iterar sobre todas las actividades
        for (let i = 0; i < actividades.length; i++) {
            const actividad = actividades[i];
            let trabajadorActual = 0; // Índice del trabajador actual

            // Encontrar al trabajador con menos horas asignadas
            for (let j = 1; j < numTrabajadores; j++) {
                if (horasAsignadas[j] < horasAsignadas[trabajadorActual]) {
                    trabajadorActual = j;
                }
            }

            // Verificar si el trabajador actual tiene espacio para más horas
            if (horasAsignadas[trabajadorActual] + actividad.calcularDuracion() <= 8) {
                asignaciones[trabajadorActual].push(actividad); // Asignar la actividad al trabajador actual
                horasAsignadas[trabajadorActual] += actividad.calcularDuracion(); // Actualizar las horas asignadas al trabajador
            }

            // Reequilibrar si un trabajador tiene más de 8 horas
            for (let j = 0; j < numTrabajadores; j++) {
                if (horasAsignadas[j] > 8) {
                    const exceso = horasAsignadas[j] - 8;
                    const actividadesTrabajador = asignaciones[j];
                    actividadesTrabajador.sort((a, b) => b.calcularDuracion() - a.calcularDuracion()); // Ordenar las actividades del trabajador por duración descendente
                    let k = 0;
                    while (exceso > 0 && k < actividadesTrabajador.length) {
                        const duracionActividad = actividadesTrabajador[k].calcularDuracion();
                        if (exceso >= duracionActividad) {
                            exceso -= duracionActividad;
                            horasAsignadas[j] -= duracionActividad;
                            asignaciones[j] = actividadesTrabajador.slice(0, k); // Eliminar la actividad del trabajador
                        }
                        k++;
                    }
                }
            }
        }

        return asignaciones;
    }

    // Evento de clic para generar la tabla de actividades
    document.getElementById('generar-tabla').addEventListener('click', function () {
        const actividadesContainer = document.getElementById('tabla-actividades');
        const numActividades = parseInt(document.getElementById('num-actividades').value);
        actividadesContainer.innerHTML = '';

        // Generar los campos de entrada para las actividades
        for (let i = 1; i <= numActividades; i++) {
            const actividadHtml = `
                <label for="inicio-actividad-${i}">Inicio Actividad ${i}:</label>
                <input type="number" id="inicio-actividad-${i}" min="0" value="0">
                <label for="fin-actividad-${i}">Fin Actividad ${i}:</label>
                <input type="number" id="fin-actividad-${i}" min="0" value="0">
                <br>
            `;
            actividadesContainer.insertAdjacentHTML('beforeend', actividadHtml);
        }

        // Agregar el botón de enviar horas
        const botonEnviarHorasHtml = `
            <button type="button" id="enviar-horas" class="btn btn-primary">Enviar Horas</button>
        `;
        document.getElementById('boton-enviar-horas').innerHTML = botonEnviarHorasHtml;
    });

    // Evento de clic para enviar horas
    document.getElementById('boton-enviar-horas').addEventListener('click', enviarHoras);

    // Función para enviar horas
    function enviarHoras() {
        const numActividades = parseInt(document.getElementById('num-actividades').value);
        const actividades = [];
        for (let i = 1; i <= numActividades; i++) {
            const inicio = parseInt(document.getElementById(`inicio-actividad-${i}`).value);
            const fin = parseInt(document.getElementById(`fin-actividad-${i}`).value);
            actividades.push(new Actividad(i, inicio, fin));
        }

        // Realizar selección de actividades
        const numTrabajadores = parseInt(document.getElementById('num-trabajadores').value);
        const asignaciones = asignarActividadesConBalance(actividades, numTrabajadores);

        // Mostrar resultados en el DOM
        mostrarAsignacionesEnHTML(asignaciones);
    }

    // Función para mostrar las asignaciones en HTML
    function mostrarAsignacionesEnHTML(asignaciones) {
        const asignacionesContainer = document.getElementById('asignaciones-container');
        asignacionesContainer.innerHTML = '';

        for (let i = 0; i < asignaciones.length; i++) {
            const trabajador = i + 1;
            const actividadesAsignadas = asignaciones[i];
            const listaActividadesHtml = `<p>Trabajador ${trabajador}: ${actividadesAsignadas.map(actividad => `Actividad ${actividad.id}`).join(', ')}</p>`;
            asignacionesContainer.insertAdjacentHTML('beforeend', listaActividadesHtml);
        }
    }
});
