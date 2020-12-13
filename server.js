const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const nodemailer = require('nodemailer');
const helmet = require('helmet');

app.use(helmet());

//const config = require('config');
// DB Config
//const db = config.get('mongoURI');

const MONGODB_URI = "mongodb+srv://alaomichael:babatunde2@measurementcluster-op09y.gcp.mongodb.net/test?retryWrites=true&w=majority";

// const db = process.env.MONGOLAB_PURPLE_URI || MONGODB_URI;

// Connect Mongoose database

// const connectDB = async () => {
//     try {
//         await mongoose.connect(db, {
//             useUnifiedTopology: true,
//             useCreateIndex: true,
//             useNewUrlParser: true
//         });
//         console.log("MongoDB is Connected...");
//     } catch (err) {
//         console.error(err.message);
//         process.exit(1);
//     }
// };

// const MongoClient = require('mongodb').MongoClient;

// << db setup >>
// const db = require("./db");
// const dbName = "data";
// const collectionName = "measurements"

// Route setup
const todoRoutes = express.Router();
const userRoutes = express.Router();
// const MONGODB_URI = "mongodb+srv://alaomichael:babatunde2@measurementcluster-op09y.gcp.mongodb.net/test?retryWrites=true&w=majority";
const LOCALDB = 'mongodb://127.0.0.1:27017/fha';
let Todo = require('./models/todo.model');
let User = require('./models/user.model');

//const usersRouter = require('./routes/users');

// cors origin URL - Allow inbound traffic from origin
// let corsOptions = {
//     origin: "https://clothmeasurement.herokuapp.com",
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// let whitelist = ['https://clothmeasurement.herokuapp.com', 'https://clothmeasurementapp.netlify.app']
// let corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1 || !origin) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }
// }

//app.use(cors(corsOptions));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Offline Database
// mongoose.connect('mongodb://127.0.0.1:27017/fha', { useNewUrlParser: true, useCreateIndex: true });
// const connection = mongoose.connection;
// connection.once('open', function() {
// console.log("MongoDB database connection established successfully");
// })


//Online database
// mongoose.connect( 
//     process.env.MONGOLAB_PURPLE_URI || process.env.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
// const connection = mongoose.connection;
// connection.once('open', function () {
//     console.log("MongoDB database connection established successfully");
// }) process.env.

// Offline and Online database
mongoose.connect( LOCALDB || process.env.MONGOLAB_URI || process.env.MONGODB_PURPLE_URI  , { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection now established successfully");
})


//Allow all requests from all domains & localhost
todoRoutes.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET,DELETE,UPDATE");
    next();
});

//Allow all requests from all domains & localhost
userRoutes.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET,DELETE,UPDATE");
    next();
});

// User Route
userRoutes.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

userRoutes.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({ username });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Customer Data Route
todoRoutes.route('/').get(function (req, res) {
    const query = req.query;
    console.log(query);
    Todo.find(query,function (err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

todoRoutes.route('/home').get(function (req, res) {
    const query = req.query;
    console.log(query);
    Todo.find(query,function (err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

todoRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    console.log(id);
    Todo.findById(id, function (err, todo) {
        res.json(todo);
    });
});

// Just editted in case of any error
todoRoutes.route('/show/:id').get(function (req, res) {
    let id = req.params.id;
    console.log(id);
    Todo.findById(id, function (err, todo, user) {
        res.json(todo, user);
    });
});

todoRoutes.route('/delete/:id').delete(function (req, res) {
    let id = req.params.id;
    Todo.findByIdAndDelete(id, function (err, todo) {
        res.json(todo);
    }).catch(err => {
        res.status(400).send("Customer Deleted");
    });
});


todoRoutes.route('/update/:id').post(function (req, res) {
    Todo.findById(req.params.id, function (err, todo) {
        if (!todo)
            res.status(404).send("data is not found");
        else
        todo.username = req.body.username;
        todo.name = req.body.name;
        todo.phone = req.body.phone;
        todo.email = req.body.email;
        todo.underbust = req.body.underbust;
        todo.hip = req.body.hip;
        todo.length = req.body.length;
        todo.waist = req.body.waist;
        todo.sleeve = req.body.sleeve;
        todo.round_sleeve = req.body.round_sleeve;
        todo.nip = req.body.nip;
        todo.stk = req.body.stk;
        todo.shoulder = req.body.shoulder;
        todo.gown_length = req.body.gown_length;
        todo.skirt_length = req.body.skirt_length;
        todo.blouse_length = req.body.blouse_length;
        todo.skirt_waist = req.body.skirt_waist;
        todo.bust = req.body.bust;
        todo.image = req.body.image;
        todo.url = req.body.url;
        todo.date = Date.parse(req.body.date);
        todo.todo_description = req.body.todo_description;
        todo.todo_responsible = req.body.todo_responsible;
        todo.todo_priority = req.body.todo_priority;
        todo.todo_completed = req.body.todo_completed;
        todo.save().then(todo => {
            res.json('Todo updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

todoRoutes.route('/add').post(function (req, res) {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({ 'todo': 'Todo added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

// Contact Us API link
todoRoutes.route('/contactus').post(function (req, res) {
    let data = req.body;
    let smtpTransport = nodemailer.createTransport({
        service:'Gmail',
        port:465,
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    })
        .then(msg => {
            res.status(200).json({ 'msg': 'Message sent successfully' });
        })
        .catch(err => {
            res.status(400).send('Sending message failed');
        });

        let mailOptions ={
            from:data.email,
            to:'clothmeasurement@gmail.com,contactleomax@gmail.com',
            cc:'steadyincomes@gmail.com',
            subject:`Message from ${data.name}`,
            html:`
            <h1 Information </h1>
            <ul>
            <li>Name: ${data.name}</li>
            <li>Phone: ${data.phone}</li>
            <li>Email: ${data.email}</li>
            </ul>
            <h3>Message</h3>

<p>Message: ${data.message}</p>
           `
        };

        smtpTransport.sendMail(mailOptions,(error,res)=>{
    if(error){
        res.send(error)
    } else {
res.send('Success')
console.log('Message sent successfully to E-mail');
    }
})

smtpTransport.close();
});


app.use('/todos', todoRoutes);
app.use('/users', userRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// process.env.PORT || 
const PORT = process.env.PORT || 4000;

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});

