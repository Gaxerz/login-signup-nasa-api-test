const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Schema = mongoose.Schema;
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

mongoose.connect('mongodb://0.0.0.0:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

app.post('/signup', (req, res) => {
    // console.log(req)
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    user.save((err) => {
        if (err) return res.status(400).send(err);
        res.send('User created successfully');
    });
});

app.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err || !user) return res.status(400).send(err || 'User not found');
        if (user.password !== req.body.password) return res.status(400).send('Incorrect password');
        res.send('Login successful');
    });
});
app.get('/', (req, res) => {
    res.send('Login successful');
});
app.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err || !user) return res.status(400).send(err || 'User not found');
        if (user.password !== req.body.password) return res.status(400).send('Incorrect password');
        res.send('Login successful');
    });
});



app.listen(4000, () => console.log('Server started on port 4000'));


