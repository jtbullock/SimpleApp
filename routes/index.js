var express = require('express');
var router = express.Router();

router.get(function(req, res) {
	Article.find(function(err, articles) {
		if (err) return console.error(err);
		
		res.render('home', {
			title: 'Hello Express!',
			message: 'Welcome to my first express app!',
			articles: articles
		});
	});
});

router.get('init', function(req, res) {
	var article1 = new Article({
		title: 'New article!',
		content: 'This is the content of the article.'});
	article1.save(saveHandler);

	var article2 = new Article({
		title: 'Another article',
		content: 'But seriuosly, this is an article.  And I cannot ytpe'
	});
	article2.save(saveHandler);

	res.send("Data Initialized.");	
});

exports = router;
