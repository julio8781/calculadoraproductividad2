
document.getElementById('productivityForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const hoursWorked = parseFloat(document.getElementById('hoursWorked').value);
    const minutesWorked = document.getElementById('minutesWorked').value ? parseFloat(document.getElementById('minutesWorked').value) : 0;
    const linesOfCode = parseInt(document.getElementById('linesOfCode').value);
    
    const totalHoursWorked = hoursWorked + (minutesWorked / 60);

    const linesPerHourBien = 37.5;
    const linesPerHourMedio = 28.125;
    const linesPerHourMal = 18.75;

    const requiredLinesBien = linesPerHourBien * totalHoursWorked;
    const requiredLinesMedio = linesPerHourMedio * totalHoursWorked;
    const requiredLinesMal = linesPerHourMal * totalHoursWorked;

    let resultMessage;
    let resultClass;

    if (linesOfCode >= requiredLinesBien) {
        resultMessage = '¡Bien! Has cumplido con la productividad requerida.';
        resultClass = 'bien-animation bien';
    } else if (linesOfCode >= requiredLinesMedio) {
        resultMessage = 'Medio. Has cumplido parcialmente con la productividad requerida.';
        resultClass = 'medio-animation medio';
    } else if (linesOfCode >= requiredLinesMal) {
        resultMessage = 'Mal. Necesitas más líneas de código para cumplir con la productividad.';
        resultClass = 'mal-animation mal';
    } else {
        resultMessage = 'Muy Mal. Tu productividad es insuficiente.';
        resultClass = 'muy-mal-animation muy-mal';
    }
    
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `<span class="result-message ${resultClass}">${resultMessage}</span>`;
});
