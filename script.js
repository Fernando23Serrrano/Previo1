document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    var codigo = document.getElementById('codigo').value;
    var password = document.getElementById('password').value;

    fetch('https://24a0dac0-2579-4138-985c-bec2df4bdfcc-00-3unzo70c406dl.riker.replit.dev/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            codigo: codigo,
            password: password
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Inicio de sesión exitoso:', data);
        alert('Inicio de sesión exitoso. Bienvenido!');

        mostrarInterfazNotas(codigo);
    })
    .catch(error => {
        console.error('Error:', error);
        alert(error.message);
    });
});
function mostrarInterfazNotas(codigo) {
    // Ocultar el formulario de inicio de sesión
    document.getElementById('loginForm').style.display = 'none';

    // Mostrar la interfaz de notas
    document.getElementById('notasContainer').style.display = 'block';

    // Obtener las notas del estudiante
    fetch(`https://24a0dac0-2579-4138-985c-bec2df4bdfcc-00-3unzo70c406dl.riker.replit.dev/students/${codigo}/notas`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener las notas del estudiante');
        }
        return response.json();
    })
    .then(notas => {
        // Mostrar las notas en la tabla
        var notasBody = document.getElementById('notasBody');
        notas.forEach(nota => {
            var row = document.createElement('tr');
            row.innerHTML = `<td>${nota.asignatura}</td><td>${nota.nota}</td>`;
            notasBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert(error.message);
    });
}   