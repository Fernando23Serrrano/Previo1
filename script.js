document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    var codigo = document.getElementById('codigo').value;
    var password = document.getElementById('password').value;

    // Realizar la solicitud GET a la API para obtener la lista de usuarios
    fetch('https://24a0dac0-2579-4138-985c-bec2df4bdfcc-00-3unzo70c406dl.riker.replit.dev/students')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener la lista de usuarios');
        }
        return response.json();
    })
    .then(usuarios => {
        // Verificar si el código y la contraseña coinciden con algún usuario
        var usuarioValido = usuarios.find(usuario => usuario.codigo === codigo && usuario.clave === password);

        if (usuarioValido) {
            // Si el usuario es válido, mostrar la interfaz de notas
            alert('Inicio de sesión exitoso. Bienvenido!');
            mostrarInterfazNotas(codigo);
        } else {
            // Si el usuario no es válido, mostrar un mensaje de error
            alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al obtener la lista de usuarios. Por favor, inténtalo de nuevo.');
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
