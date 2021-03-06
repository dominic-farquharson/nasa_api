// articles model
const Article = require('../models/article')

const articlesController = {};

articlesController.findAll = (req, res) => {
    Article.find({}).exec()
    .then(data => {
        res.status(200).json({data: 'All articles!', status:'okay', data})    
    })
    .catch(err => res.json({error: err}))
}

articlesController.findOne = (req, res, next) => {
  Article.findOne({title: req.params.articleId})
    .then(article => {
        console.log('article', article)
        

        if(!article) {res.status(404).json({'status': 'bad', 'msg': 'That Article does not exist'}); return };
        res.status(200).json({'status': 'okay', article});
    })
    .catch(err => console.log('erropr', error))
}

articlesController.edit = (req, res , next) => {
    if(req.query.API_KEY !== process.env.API_KEY) {
        return res.status(403).json({
            status: 'bad',
            code: 403,
            msg: 'No API KEY present'
        });
    }

    Article.update({title: req.params.articleId}, {
        title: req.body.title
    }, _ => res.redirect('/api/articles'))
}

module.exports = articlesController;