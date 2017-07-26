const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const mustacheExpress = require('mustache-express');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use('/static', express.static(path.join(__dirname, 'public')));

const todos = [
  { id: 0, item: "Rise at 05:45", completed: false },
  { id: 1, item: "Commute to the The Iron Yard", completed: false },
  { id: 2, item: "Learn Sofware Development Skills from 09:00-05:00", completed: false }
];

app.get('/', function(req, res) {
  res.render('index', { todos: todos });
});
app.get('/list', function(req, res) {
  res.render('index', { todos: todos });
});

app.post('/', function(req, res) {
  req.checkBody('item', 'Add some text first!').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    res.render('index', { errorMessage: errors[0].msg, todos: todos });
  } else {
    todos.push({ id: todos.length, item: req.body.item, completed: false });
    res.render('index', { todos: todos });
  }
});

app.post('/list', function(req, res) {
  todos[req.body.check].completed = true;
  res.render('index', { todos: todos });
});

app.listen(3000, () => console.log('Server started'));
