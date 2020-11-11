const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMessage } = require('../utils/utils')

const users = new Users();

io.on('connection', (client) => {

    client.on('chatEnter', (data, callback) => {

        if (!data.name || !data.room) {
            return callback({
                err: true,
                message: 'Name and Room are Required'
            })
        }
        client.join(data.room); // Join to room

        users.addPerson(client.id, data.name, data.room);
        client.broadcast.to(data.room).emit('personList', users.getPeopleByRoom(data.room));
        callback(users.getPeopleByRoom(data.room));
    })

    client.on('sendMessage', (data) => {
        let person = users.getPersonByID(client.id);
        let message = createMessage(person.name, data.message);
        client.broadcast.to(person.room).emit('createMessage', message);
    })

    client.on('disconnect', () => {
        let deletePerson = users.removePerson(client.id);
        client.broadcast.to(deletePerson.room).emit('createMessage', createMessage('Administrador', `Person ${ deletePerson.name } leave the chat`))
        client.broadcast.to(deletePerson.room).emit('personList', users.getPeopleByRoom(deletePerson.room));
    });

    //Private Message
    client.on('privateMessage', (data) => { // Validateion needed
        let person = users.getPersonByID(client.id);
        client.broadcast.to(data.to).emit('privateMessage', createMessage(person.name, data.message));
    });
});