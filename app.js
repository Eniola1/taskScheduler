var express = require('express');
var todoController = require('./controllers/todoController'); //including the todoController controller.

var app = express();

//set up template engine 
app.set('view engine', 'ejs');

//static files --This middleware allows the css link to function properly, hence styling our web pages.
app.use(express.static('./public'));

//fire controllers
todoController(app);

//listen to port
app.listen(5000);
