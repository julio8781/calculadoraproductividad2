// Función para calcular horas y minutos trabajados
function calculateHoursWorked() {
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;

    if (startTime && endTime) {
        const start = new Date(`1970-01-01T${startTime}:00`);
        const end = new Date(`1970-01-01T${endTime}:00`);
        
        // Calcula la diferencia en milisegundos
        const diff = end - start;
        const hoursWorked = Math.floor(diff / (1000 * 60 * 60));
        const minutesWorked = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        // Muestra el resultado en el elemento de resultado
        document.getElementById('hoursResult').textContent = `Tiempo trabajado: ${hoursWorked} horas y ${minutesWorked} minutos`;

        // Asigna los valores calculados a los campos para usarlos en el cálculo de productividad
        document.getElementById('hoursWorked').value = hoursWorked;
        document.getElementById('minutesWorked').value = minutesWorked;
    } else {
        alert("Por favor, ingresa la hora de inicio y la hora de fin.");
    }
}

// Asocia el botón "Calcular horas trabajadas" con la función de cálculo
document.getElementById('calculateHoursButton').addEventListener('click', calculateHoursWorked);

// Evento submit para el cálculo de productividad
document.getElementById('productivityForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtiene los valores de horas y minutos trabajados ya calculados
    const hoursWorked = parseFloat(document.getElementById('hoursWorked').value);
    const minutesWorked = parseFloat(document.getElementById('minutesWorked').value);
    const linesOfCode = parseInt(document.getElementById('linesOfCode').value);

    // Calcula el total de horas trabajadas en formato decimal
    const totalHoursWorked = hoursWorked + (minutesWorked / 60);

    // Definición de los valores de productividad
    const linesPerHourBien = 62.5; // 500 líneas / 8 horas

    // Calcular el tiempo necesario para las líneas trabajadas
    const requiredHoursForLines = linesOfCode / linesPerHourBien; // Horas necesarias para las líneas trabajadas
    const requiredMinutesForLines = (requiredHoursForLines - Math.floor(requiredHoursForLines)) * 60; // Minutos

    // Calcular cuántas líneas deberían haberse completado con el tiempo trabajado
    const linesShouldHaveCompleted = totalHoursWorked * linesPerHourBien; // Líneas que se deberían haber hecho
    const linesShouldHaveCompletedRounded = Math.round(linesShouldHaveCompleted); // Redondear para obtener un número entero

    // Mensaje adicional sobre el tiempo necesario para alcanzar las líneas trabajadas
    const additionalMessage = `Para ${linesOfCode} líneas, deberías haber trabajado aproximadamente ${Math.floor(requiredHoursForLines)} horas y ${Math.round(requiredMinutesForLines)} minutos.`;
    
    // Mensaje adicional sobre las líneas que deberías haber alcanzado
    const linesMessage = `Con ${totalHoursWorked.toFixed(2)} horas trabajadas, deberías haber completado aproximadamente ${linesShouldHaveCompletedRounded} líneas.`;

    // Determina el mensaje y clase de resultado según las líneas de pedido
    let resultMessage;
    let resultClass;

    if (linesOfCode >= linesPerHourBien * totalHoursWorked) {
        resultMessage = '¡Bien! Has cumplido con la productividad requerida.';
        resultClass = 'bien-animation bien';
    } else if (linesOfCode >= (linesPerHourBien / 2) * totalHoursWorked) {
        resultMessage = 'Medio. Has cumplido parcialmente con la productividad requerida.';
        resultClass = 'medio-animation medio';
    } else {
        resultMessage = 'Muy Mal. Tu productividad es insuficiente.';
        resultClass = 'muy-mal-animation muy-mal';
    }

    // Muestra el resultado en la página
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `<span class="result-message ${resultClass}">${resultMessage}</span><br><span>${additionalMessage}</span><br><span>${linesMessage}</span>`;
});
