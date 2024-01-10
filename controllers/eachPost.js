const BlogPost = require('../models/BlogPost')

const eachPostController = async (req, res)=> {
    const blogpost = await BlogPost.findById(req.params.id).populate('userid')
    res.render('post', {
        blogpost
    })
}

module.exports = eachPostController