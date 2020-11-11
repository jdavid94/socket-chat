class Users {
    constructor() {
        this.people = [];
    }

    addPerson(id, name, room) {
        let person = {
            id,
            name,
            room
        }
        this.people.push(person);
        return this.people;
    }

    getPersonByID(id) {
        let person = this.people.filter(per => per.id === id)[0]; // Return the first position - Only one Register
        return person;
    }

    getAllPeople() {
        return this.people;
    }

    getPeopleByRoom(room) {
        let roomPeople = this.people.filter(person => person.room === room);
        return roomPeople;
    }

    removePerson(id) {
        let removePer = this.getPersonByID(id);
        this.people = this.people.filter(per => per.id != id);
        return removePer;
    }


}



module.exports = {
    Users
}