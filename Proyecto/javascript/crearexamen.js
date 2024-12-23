document.addEventListener('DOMContentLoaded', () => {
    const preguntas = JSON.parse(localStorage.getItem('preguntas')) || [];
    const categorias = JSON.parse(localStorage.getItem('categorias')) || [];
    const examenes = JSON.parse(localStorage.getItem('examenes')) || [];
    const categoriaFilter = document.getElementById('categoria-filter');
    const preguntasLista = document.getElementById('preguntas-lista');

    // Cargar categorías en el filtro
    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        categoriaFilter.appendChild(option);
    });

    // Mostrar preguntas
    const mostrarPreguntas = (categoriaSeleccionada) => {
        preguntasLista.innerHTML = '';
        const preguntasFiltradas = categoriaSeleccionada 
            ? preguntas.filter(p => p.categoria === categoriaSeleccionada) 
            : preguntas;

        preguntasFiltradas.forEach((pregunta, index) => {
            const li = document.createElement('li');

            li.innerHTML = `
                <input type="checkbox" id="pregunta-${index}" value="${index}">
                <label for="pregunta-${index}">
                    <strong>${pregunta.enunciado}</strong> (Categoría: ${pregunta.categoria})
                    <ul>
                        <li>A: ${pregunta.opciones.a}</li>
                        <li>B: ${pregunta.opciones.b}</li>
                        <li>C: ${pregunta.opciones.c}</li>
                    </ul>
                </label>
            `;

            preguntasLista.appendChild(li);
        });
    };

    // Filtrar preguntas al cambiar el filtro de categoría
    categoriaFilter.addEventListener('change', (event) => {
        const categoriaSeleccionada = event.target.value;
        mostrarPreguntas(categoriaSeleccionada);
    });

    // Guardar preguntas seleccionadas en el examen
    document.getElementById('guardar-examen').addEventListener('click', () => {
        const nombreExamen = document.getElementById('nombre-examen').value.trim();
        if (!nombreExamen) {
            alert('Por favor, ingresa un nombre para el examen.');
            return;
        }

        const preguntasSeleccionadas = Array.from(document.querySelectorAll('#preguntas-lista input:checked'))
            .map(input => preguntas[input.value]);

        if (preguntasSeleccionadas.length === 0) {
            alert('Por favor, selecciona al menos una pregunta para el examen.');
            return;
        }

        const nuevoExamen = {
            nombre: nombreExamen,
            preguntas: preguntasSeleccionadas
        };

        examenes.push(nuevoExamen);
        localStorage.setItem('examenes', JSON.stringify(examenes));
        alert('Examen guardado exitosamente.');
    });

    // Mostrar todas las preguntas inicialmente
    mostrarPreguntas('');
});