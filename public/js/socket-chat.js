var socket = io();
// Verificamos si existe usuario con nombre
var params = new URLSearchParams(window.location.search);
if (!params.has('name') || !params.has('room')) {
    window.location = 'index.html';
    throw new Error('Name is Required');
}

var user = {
    name: params.get('name'),
    room: params.get('room')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('chatEnter', user, function(resp) {
        console.log('Users Connected ', resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
//socket.emit('createMessage', {
//usuario: 'Jesus',
//mensaje: 'Hola Mundo'
//},
//function(resp) {
//console.log('respuesta server: ', resp);
//});

// Escuchar información
socket.on('createMessage', function(message) {

    console.log('Servidor:', message);

});

// Escuchar cambios de usuarios
socket.on('personList', function(users) {

    console.log(users);

});

//Private Message
socket.on('privateMessage', function(message) {
    console.log('Private Message', message);
});