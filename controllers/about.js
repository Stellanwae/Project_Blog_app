const BlogPost = require('../models/BlogPost')

const aboutController = (req, res)=> {
    res.render('about')
}

module.exports = aboutController