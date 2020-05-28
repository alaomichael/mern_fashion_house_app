const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Todo = new Schema({

  username: {
        type: String
    },
     users: {
type: Array
},
    name: {
        type: String, required: true
    },
    phone: {
        type: Number, required: true
    },
    underbust: {
        type: Number
    },
    hip: {
        type: Number
    },
    length: {
        type: Number
    },
    waist: {
        type: Number
    },
    sleeve: {
        type: Number
    },
    round_sleeve: {
        type: Number
    },
    nip: {
        type: Number
    },
    stk: {
        type: Number
    },
    shoulder: {
        type: Number
    },
    gown_length: {
        type: Number
    },
    skirt_length: {
        type: Number
    },
    blouse_length: {
        type: Number
    },
    skirt_waist: {
        type: Number
    },
    email: {
        type: String, required: true
    },
    bust: {
        type: Number
    },
    image: {
        type: String
    },
    url: {
        type: String
    },
    todo_description: {
        type: String
    },
    todo_responsible: {
        type: String
    },
    todo_priority: {
        type: String
    },
    todo_completed: {
        type: Boolean
    },
    date: {
        type: Date
    }
});

module.exports = mongoose.model('Todo', Todo);

