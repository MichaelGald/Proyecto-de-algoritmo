document.addEventListener('DOMContentLoaded', function () {

     /* La clase Actividad representa una actividad con un identificador, un tiempo de inicio y
      un tiempo de fin. También tiene un método para calcular la duración de la actividad.*/
    class Actividad {
        constructor(id, inicio, fin) {
            this.id = id;
            this.inicio = inicio;
            this.fin = fin;
            this.asignada = false; // Marcar si la actividad ya ha sido asignada
        }
        
        calcularDuracion() {
            return this.fin - this.inicio;
        }
    }

   // Esta función asigna actividades a trabajadores
    function asignarActividades(actividades, numTrabajadores) {
        
        // Ordenar las actividades por su tiempo de inicio
        actividades.sort((a, b) => a.inicio - b.inicio);
        
        // Inicializar los arreglos de asignaciones y horas asignadas para cada trabajador
        const asignaciones = [];
        const horasAsignadas = new Array(numTrabajadores).fill(0);
        for (let i = 0; i < numTrabajadores; i++) {
            asignaciones.push([]);
        }
    
        // Iterar sobre todas las actividades
        actividades.forEach(actividad => {
            // Encontrar al trabajador con el menor tiempo asignado
            let trabajador = 0;
            let menorTiempo = horasAsignadas[0];
            for (let i = 1; i < numTrabajadores; i++) {
                if (horasAsignadas[i] < menorTiempo) {
                    trabajador = i;
                    menorTiempo = horasAsignadas[i];
                }
            }
    
            // Verificar si el trabajador tiene espacio para esta actividad
            if (horasAsignadas[trabajador] + actividad.calcularDuracion() <= 8) {
                // Asignar la actividad al trabajador
                asignaciones[trabajador].push(actividad);
                horasAsignadas[trabajador] += actividad.calcularDuracion();
            } else {
                // Si el trabajador no tiene espacio, marcar la actividad como no asignada
                actividad.asignada = false;
            }
        });
        
        return asignaciones;
    }

// Función para identificar las actividades no asignadas
function identificarActividadesNoAsignadas(actividades, asignaciones) {
    const actividadesNoAsignadas = [];

    // Convertir las asignaciones en un conjunto de IDs de actividades asignadas
    const actividadesAsignadas = new Set();
    asignaciones.forEach(trabajador => {
        trabajador.forEach(actividad => {
            actividadesAsignadas.add(actividad.id);
        });
    });

    // Identificar las actividades no asignadas
    actividades.forEach(actividad => {
        if (!actividadesAsignadas.has(actividad.id)) {
            actividadesNoAsignadas.push(actividad);
        }
    });

    return actividadesNoAsignadas;
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
            <button type="button" id="boton-enviar-horas" class="btn btn-primary">Enviar Horas</button>
        `;
        document.getElementById('boton-enviar-horas').innerHTML = botonEnviarHorasHtml;
    });

    // Evento de clic para enviar horas
    document.getElementById('boton-enviar-horas').addEventListener('click', enviarHoras);

    // Función para enviar horas
function enviarHoras() {
    const numActividades = parseInt(document.getElementById('num-actividades').value);
    const actividades = [];

    // Recopilar las actividades del formulario
    for (let i = 1; i <= numActividades; i++) {
        const inicio = parseInt(document.getElementById(`inicio-actividad-${i}`).value);
        const fin = parseInt(document.getElementById(`fin-actividad-${i}`).value);

        // Verificar si el tiempo de inicio y fin es válido
        if (!isNaN(inicio) && !isNaN(fin) && inicio < fin) {
            actividades.push(new Actividad(i, inicio, fin));
        }
    }

    // Verificar si se han ingresado todas las actividades correctamente
    if (actividades.length !== numActividades) {
        alert("Por favor, ingresa un tiempo de inicio válido menor que el tiempo de fin para todas las actividades.");
        return;
    }

    // Realizar la asignación de actividades
    const numTrabajadores = parseInt(document.getElementById('num-trabajadores').value);
    const asignaciones = asignarActividades(actividades, numTrabajadores);

    // Mostrar resultados en el DOM
    mostrarAsignacionesEnHTML(asignaciones);

    // Identificar actividades no asignadas
    const actividadesNoAsignadas = identificarActividadesNoAsignadas(actividades, asignaciones);

    // Mostrar actividades no asignadas en el DOM
    mostrarActividadesNoAsignadas(actividadesNoAsignadas);
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
    // Función para mostrar las actividades no asignadas en el DOM
    function mostrarActividadesNoAsignadas(actividadesNoAsignadas) {
        const actividadesNoAsignadasContainer = document.getElementById('actividades-no-asignadas');
        actividadesNoAsignadasContainer.innerHTML = '';

        if (actividadesNoAsignadas.length === 0) {
            actividadesNoAsignadasContainer.innerHTML = '<p>No hay actividades no asignadas.</p>';
        } else {
            const listaActividadesHtml = actividadesNoAsignadas.map(actividad => `<p>Actividad ${actividad.id}</p>`).join('');
            actividadesNoAsignadasContainer.innerHTML = listaActividadesHtml;
        }
    }

});
