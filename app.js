var express = require('express'),
    mustacheExpress = require('mustache-express'),
	mongoose = require('mongoose'),
	router_article = require('./routes/article'),
	router_index = require('./routes/index');

// -----------------------------
// Mongoose Setup
mongoose.connect('mongodb://localhost/simpleapp');
var db = mongoose.connection;
var Article;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
	var articleSchema = mongoose.Schema({
		title: String,
		content: String
	});

	Article = mongoose.model('Article', articleSchema);
});

// -----------------------------
// Express Setup
var app = express();
app.use(express.static('static'));
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', './views');

app.use('/article', router_article);
app.use('/', router_index);

app.use(function(req, res, next) {
	var userAgent = "", userHost = "";

	if(req.headers !== null) {
		userAgent = req.headers['user-agent'];
		userHost = req.headers.host;
	}

	console.log('New request from [%s] [%s]', userHost, userAgent);

	next();
});



var server = app.listen(3000, function() {

	var host = server.address().address;
	var port = server.address().port;

	console.log('Simple app listening at http://%s:%s', host, port);

});


function saveHandler(err, obj) {
	if (err) return console.error(err);
}
