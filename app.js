var express = require('express');
var controllers = require('./controllers/index');
var bodyParser = require('body-parser');
var path = require('path');
var hbs = require('express-handlebars');

var app = express();
var PORT = process.env.PORT || 3000;


app.engine('hbs', hbs(
  {
    extname: 'hbs',
    // defaultLayout: '_main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/layouts/'
  }
));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));
app.use('/img', express.static('public/img'));

app.use('/', controllers);

app.listen(PORT, function () {
  console.log('express on port ' + PORT);
});
